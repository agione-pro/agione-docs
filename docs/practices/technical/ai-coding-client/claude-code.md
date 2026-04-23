# Claude Code

## Document Purpose

This document provides a practical guide for connecting Claude Code to AGIOne model services in enterprise environments.

## Integration Steps (Example)

1. Prepare AGIOne endpoint and project-scoped token.
2. Configure Claude Code client with endpoint, auth header, and model ID.
3. Apply workspace-level policy for safe prompt and output handling.
4. Validate generation quality and fallback behavior.

## Operational Recommendations

- Use separate environments for development and production
- Enforce token rotation and least-privilege access
- Keep prompt templates versioned for stable team workflows

## Validation Checklist

- Client can call the configured model successfully
- Access control policies are enforced by project scope
- Request logs are traceable for audit and troubleshooting
