export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Domain Checker MCP Server
          </h1>
          <p className="text-xl text-gray-600">
            Model Context Protocol server for domain availability checking
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🔍 Available Tools
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-800">check_domain</h3>
                <p className="text-gray-600">
                  Check if a specific domain is available for registration
                </p>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  domain: string (e.g., "example.com")
                </code>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-800">check_tlds</h3>
                <p className="text-gray-600">
                  Check a keyword across multiple top-level domains
                </p>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  keyword: string (e.g., "mycompany")
                </code>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ⚙️ Setup Instructions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Claude Desktop</h3>
                <p className="text-gray-600 mb-2">
                  Add to your claude_desktop_config.json:
                </p>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`{
  "mcpServers": {
    "domain-checker": {
      "command": "npx",
      "args": [
        "@vercel/mcp-adapter",
        "${process.env.VERCEL_URL || 'your-domain.vercel.app'}/api"
      ]
    }
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🚀 How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">DNS Lookup</h3>
              <p className="text-gray-600 text-sm">
                First checks if domain has active DNS records
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">RDAP Query</h3>
              <p className="text-gray-600 text-sm">
                Retrieves detailed registration data from domain registries
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Status Report</h3>
              <p className="text-gray-600 text-sm">
                Returns availability status with registration details
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📝 Supported TLDs
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              'com', 'net', 'org', 'io', 'co', 'app', 'dev', 'ai',
              'me', 'info', 'xyz', 'online', 'site', 'tech'
            ].map(tld => (
              <span
                key={tld}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                .{tld}
              </span>
            ))}
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-500">
          <p>
            Powered by{' '}
            <a
              href="https://vercel.com"
              className="text-blue-600 hover:underline"
            >
              Vercel
            </a>{' '}
            and{' '}
            <a
              href="https://modelcontextprotocol.io"
              className="text-blue-600 hover:underline"
            >
              Model Context Protocol
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}