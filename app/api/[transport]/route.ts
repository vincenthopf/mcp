import { createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod';
import { resolve } from 'dns/promises';

const TOP_TLDS = [
  "com", "net", "org", "io", "co", "app", "dev", "ai", 
  "me", "info", "xyz", "online", "site", "tech"
];

const USER_AGENT = "DomainCheckerBot/1.0";

async function getRdapData(domain: string): Promise<any> {
  try {
    const tld = domain.split('.').pop()?.toLowerCase();
    if (!tld) return null;

    let rdapUrl: string;
    if (tld === 'ch' || tld === 'li') {
      rdapUrl = `https://rdap.nic.${tld}/domain/${domain}`;
    } else if (tld === 'com' || tld === 'net') {
      rdapUrl = `https://rdap.verisign.com/${tld}/v1/domain/${domain}`;
    } else if (tld === 'org') {
      rdapUrl = `https://rdap.publicinterestregistry.org/rdap/domain/${domain}`;
    } else {
      rdapUrl = `https://rdap.org/domain/${domain}`;
    }

    const response = await fetch(rdapUrl, {
      headers: {
        "Accept": "application/rdap+json",
        "User-Agent": USER_AGENT
      },
      signal: AbortSignal.timeout(5000)
    });

    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error(`RDAP error for ${domain}:`, error);
    return null;
  }
}

async function checkDns(domain: string): Promise<boolean> {
  try {
    await resolve(domain, 'A');
    return true;
  } catch {
    try {
      await resolve(domain, 'NS');
      return true;
    } catch {
      return false;
    }
  }
}

async function checkDomainTool(domain: string): Promise<string> {
  console.log(`Checking domain: ${domain}`);
  
  const hasDns = await checkDns(domain);
  
  if (hasDns) {
    const rdapData = await getRdapData(domain);
    
    if (rdapData) {
      let registrar = "Unknown";
      let regDate = "Unknown";
      let expDate = "Unknown";
      
      const entities = rdapData.entities || [];
      for (const entity of entities) {
        if (entity.roles?.includes("registrar")) {
          const vcard = entity.vcardArray;
          if (vcard && vcard.length > 1 && Array.isArray(vcard[1])) {
            for (const entry of vcard[1]) {
              if ((entry[0] === "fn" || entry[0] === "org") && entry.length > 3) {
                registrar = entry[3];
                break;
              }
            }
          }
        }
      }
      
      const events = rdapData.events || [];
      for (const event of events) {
        if (event.eventAction === "registration") {
          regDate = event.eventDate || "Unknown";
        } else if (event.eventAction === "expiration") {
          expDate = event.eventDate || "Unknown";
        }
      }
      
      return `Domain: ${domain}
Status: Registered
Registrar: ${registrar}
Registration Date: ${regDate}
Expiration Date: ${expDate}`;
    } else {
      return `Domain: ${domain}
Status: Registered
Note: Domain has DNS records but RDAP data couldn't be retrieved`;
    }
  }
  
  const rdapData = await getRdapData(domain);
  if (rdapData) {
    return `Domain: ${domain}
Status: Registered
Note: Domain found in RDAP registry`;
  }
  
  return `Domain: ${domain}
Status: Available
Note: No DNS records or RDAP data found`;
}

async function checkTldsTool(keyword: string): Promise<string> {
  console.log(`Checking keyword: ${keyword} across TLDs`);
  
  const available: string[] = [];
  
  for (const tld of TOP_TLDS) {
    const domain = `${keyword}.${tld}`;
    const hasDns = await checkDns(domain);
    
    if (!hasDns) {
      const rdapData = await getRdapData(domain);
      if (!rdapData) {
        available.push(domain);
      }
    }
  }
  
  let response = `Keyword: ${keyword}\n`;
  response += `TLDs checked: ${TOP_TLDS.length}\n`;
  response += `Available domains: ${available.length}\n\n`;
  
  if (available.length > 0) {
    response += "Available domains:\n";
    for (const domain of available) {
      response += `- ${domain}\n`;
    }
  } else {
    response += "No available domains found for this keyword.\n";
  }
  
  return response;
}

const handler = createMcpHandler(
  async server => {
    server.tool(
      'check_domain',
      'Check if a domain is available for registration',
      {
        domain: z.string().describe('Domain name to check (e.g., example.com)')
      },
      async ({ domain }) => {
        const result = await checkDomainTool(domain);
        return {
          content: [{ type: 'text', text: result }],
        };
      }
    );

    server.tool(
      'check_tlds',
      'Check a keyword across top TLDs',
      {
        keyword: z.string().describe('Keyword to check across TLDs')
      },
      async ({ keyword }) => {
        const result = await checkTldsTool(keyword);
        return {
          content: [{ type: 'text', text: result }],
        };
      }
    );
  }
);

export { handler as GET, handler as POST, handler as DELETE };