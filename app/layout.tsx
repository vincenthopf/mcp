import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Domain Checker MCP Server',
  description: 'Model Context Protocol server for domain availability checking',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}