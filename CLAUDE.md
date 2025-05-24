# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application deployed on Vercel that serves as a Model Context Protocol (MCP) server for domain availability checking. The server exposes two main tools:
- `check_domain`: Check if a specific domain is available for registration
- `check_tlds`: Check a keyword across multiple top-level domains

## Architecture

The application uses:
- **Next.js 14** with TypeScript for the web framework
- **@vercel/mcp-adapter** for MCP server functionality
- **dns2** for DNS resolution
- **Tailwind CSS** for styling
- **Zod** for input validation

### Key Files:
- `app/api/[transport]/route.ts` - MCP server endpoint with domain checking logic
- `app/page.tsx` - Homepage with usage instructions
- `package.json` - Dependencies and scripts

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checking
```

## Domain Checking Logic

The server uses a two-step verification process:
1. **DNS lookup** - Check if domain has active A or NS records using dns2
2. **RDAP query** - Retrieve detailed registration data from domain registries

RDAP endpoints are configured for major TLDs:
- .com/.net: Verisign RDAP
- .org: Public Interest Registry RDAP
- .ch/.li: NIC-specific RDAP
- Others: Generic rdap.org fallback

## Deployment

This project is designed for Vercel deployment with:
- Serverless functions for MCP endpoints
- Static homepage generation
- 60-second max duration for domain checking operations