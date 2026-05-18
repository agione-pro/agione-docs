import type { DefaultTheme } from 'vitepress'

export const enSidebar: DefaultTheme.Sidebar = {
  "/product/": [
    {
      text: "Product Overview",
      collapsed: false,
      items: [
        {
          text: "Overview",
          link: "/product/technical/overview"
        },
        {
          text: "Features & Ability",
          link: "/product/technical/features"
        },
        {
          text: "Network Planning",
          link: "/product/technical/network"
        },
        {
          text: "Technical Highlights",
          link: "/product/technical/tech-highlights"
        }
      ]
    },
    {
      text: "Compatibility & Limitations",
      collapsed: false,
      items: [
        {
          text: "Managed Chips",
          link: "/product/limitations/chips"
        },
        {
          text: "Support Matrix",
          link: "/product/limitations/support-matrix"
        },
        {
          text: "Other Limitations",
          link: "/product/limitations/limitations"
        },
      ]
    },
    {
      text: "Investigation",
      link: "/product/investigation/",
      items: [
        {
          text: "Quick Requirements Investigation",
          link: "/product/investigation/quick-requirement-investigation"
        },
        {
          text: "Quick Environmental Investigation",
          link: "/product/investigation/quick-env-investigation"
        },
      ]
    },
  ],
  "/installation/": [
    {
      text: "Installation",
      collapsed: false,
      items: [
        {
          text: "Requirements",
          link: "/installation/agione-deployment-requirements"
        },
        {
          text: "Installation & Deployment",
          link: "/installation/agione-environment-installation-deployment"
        },
        {
          text: "Compute Nodes-Requirements",
          link: "/installation/deployment-requirements-for-managing-compute-nodes"
        },
        {
          text: "Compute Nodes-Installation",
          link: "/installation/quick-install-for-managing-compute-nodes"
        },
      ],
    }
  ],
  "/license/": [
    {
      text: "Purchase & Activation",
      collapsed: false,
      items: [
        {
          text: "Online Payment & Activation",
          link: "/license/online-payment-activation"
        },
        {
          text: "Activation Code & Activation",
          link: "/license/activation-code-activation"
        }
      ]
    }
  ],
  "/userguide/": [
    {
      text: "User Guide",
      collapsed: false,
      items: [
        {
          text: "Compute Resource Integration",
          collapsed: false,
          items: [
            { text: "Public Integration", link: "/userguide/public-ai-integration" },
          ]
        },
        {
          text: "Compute Resource Management",
          collapsed: false,
          items: [
            { text: "A100 Management", link: "/userguide/a100-management" }
          ]
        },
        {
          text: "Model Management",
          collapsed: false,
          items: [
            { text: "Model Deployment", link: "/userguide/mode-deployment" },
          ]
        }
      ]
    }
  ],
  "/usermanual/": [
    {
      text: "User Manual",
      collapsed: false,
      items: [
        {
          text: "User Quick Guide",
          link: "/usermanual/user-quick-guide"
        },
        {
          text: "Provider Quick Guide",
          link: "/usermanual/provider-quick-guide"
        },
        {
          text: "Model Services",
          collapsed: false,
          items: [
            {
              text: "Overview",
              link: "/usermanual/model-services/"
            },
            {
              text: "Customer Calls",
              collapsed: false,
              items: [
                { text: "Overview", link: "/usermanual/model-services/customer-calls/overview/" },
                { text: "Call Analytics", link: "/usermanual/model-services/customer-calls/call-analytics/" },
                { text: "Call Logs", link: "/usermanual/model-services/customer-calls/call-logs/" },
              ]
            },
            {
              text: "Discover",
              collapsed: false,
              items: [
                { text: "Models", link: "/usermanual/model-services/discover/models/" },
              ]
            },
            {
              text: "Playground",
              collapsed: false,
              items: [
                { text: "Text", link: "/usermanual/model-services/playground/text/" },
                { text: "Audio", link: "/usermanual/model-services/playground/audio/" },
                { text: "Images", link: "/usermanual/model-services/playground/images/" },
                { text: "Video", link: "/usermanual/model-services/playground/video/" },
              ]
            },
            {
              text: "Studio",
              collapsed: false,
              items: [
                { text: "My Models", link: "/usermanual/model-services/studio/my-models/" },
              ]
            },
            {
              text: "Usage & Revenue",
              collapsed: false,
              items: [
                { text: "Usage", link: "/usermanual/model-services/usage-revenue/usage/" },
                { text: "Revenue", link: "/usermanual/model-services/usage-revenue/revenue/" },
              ]
            },
          ]
        },
        {
          text: "AI Infra on Cloud",
          link: "/usermanual/ai-infra-on-cloud/"
        },
        {
          text: "AI Infra on Prem",
          link: "/usermanual/ai-infra-on-prem/"
        }
      ]
    }
  ],
  "/practices/technical/": [
    {
      text: "Technical Practices",
      collapsed: false,
      items: [
        {
          text: "AI Coding Integration",
          collapsed: false,
          items: [
            { text: "CherryStudio", link: "/practices/technical/CherryStudio/" },
            { text: "claudeCode", link: "/practices/technical/claudeCode/" },
            { text: "ClaudeCode-plugin", link: "/practices/technical/ClaudeCode-plugin/" },
            { text: "Cline", link: "/practices/technical/Cline/" },
            { text: "Codex", link: "/practices/technical/Codex/" },
            { text: "Crush", link: "/practices/technical/Crush/" },
            { text: "Cursor", link: "/practices/technical/Cursor/" },
            { text: "dify", link: "/practices/technical/dify/" },
            { text: "KiloCode", link: "/practices/technical/KiloCode/" },
            { text: "n8n", link: "/practices/technical/n8n/" },
            { text: "open-webui", link: "/practices/technical/open-webui/" },
            { text: "openclaw", link: "/practices/technical/openclaw/" },
            { text: "OpenCode", link: "/practices/technical/OpenCode/" },
            { text: "RooCode", link: "/practices/technical/RooCode/" },
          ]
        },
      ]
    }
  ],
  "/practices/project/": [
    {
      text: "Project Practices",
      collapsed: false,
      items: [
        { text: "Multi-Compute Pool Heterogeneous Inference Scheduling Best Practice", link: "/practices/project/multi-compute-pool-heterogeneous-inference-scheduling" }
      ]
    }
  ],
  "/operations/admin-portal-manual/": [
    {
      text: "Admin Portal Manual",
      collapsed: false,
      items: [
        {
          text: "User", link: "/operations/admin-portal-manual/user",
        }
      ]
    }
  ],
  "/operations/om-guide/": [
    {
      text: "O&M Guide",
      collapsed: false,
      items: [
        {
          text: "User", link: "/operations/om-guide/user",
        }
      ]
    }
  ],
  "/others/faq/": [
    {
      text: "FAQ",
      collapsed: false,
      items: [
        {
          text: "General FAQ", link: "/others/faq/general",
        }
      ]
    }
  ],
  "/others/release-notes/": [
    {
      text: "Release Notes",
      collapsed: false,
      items: [
        {
          text: "Release Notes (Example)", link: "/others/release-notes/example",
        }
      ]
    }
  ],
}
