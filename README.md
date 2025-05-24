# Domain Checker MCP Server

A Model Context Protocol (MCP) server for checking domain availability, built with Next.js and deployed on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvincenthopf%2Fmcp)

## Features

- **Check Domain**: Verify if a specific domain is available for registration
- **Check TLDs**: Check a keyword across multiple top-level domains
- **DNS + RDAP**: Uses DNS resolution and RDAP queries for accurate results
- **Web Interface**: Homepage with setup instructions and documentation

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

## MCP Setup

Add to your Claude Desktop config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "domain-checker": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-fetch",
        "https://your-domain.vercel.app/api"
      ]
    }
  }
}
```

## Available Tools

- `check_domain(domain: string)` - Check specific domain availability
- `check_tlds(keyword: string)` - Check keyword across popular TLDs

## Supported TLDs

com, net, org, io, co, app, dev, ai, me, info, xyz, online, site, tech

## Tech Stack

- Next.js 14 + TypeScript
- @vercel/mcp-adapter
- Tailwind CSS
- dns2 for DNS resolution
- RDAP for registration data