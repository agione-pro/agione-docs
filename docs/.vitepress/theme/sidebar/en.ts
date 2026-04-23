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
          text: "(AGIOne)Deployment Configuration Requirements",
          link: "/installation/agione-deployment-requirements"
        },
        {
          text: "(PowerOne)Deployment Configuration Requirements",
          link: "/installation/calculator-deplyment-requirments"
        },
        {
          text: "(AGIOne)Quick Installation Guide",
          link: "/installation/agione-quick-install"
        },
        {
          text: "(PowerOne)Quick Installation Guide",
          link: "/installation/calculator-quick-install"
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
          text: "Register",
          link: "/usermanual/register"
        },
        {
          text: "Login",
          link: "/usermanual/login"
        },
        {
          text: "Dashboard",
          link: "/usermanual/dashboard"
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
            {
              text: "OpenClaw",
              link: "/practices/technical/ai-coding-client/openclaw",
            },
            {
              text: "Claude Code",
              link: "/practices/technical/ai-coding-client/claude-code",
            }
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
        { text: "Bare Metal Compute Resource Management and Services for Thailand CP", link: "/practices/project/thailand-cp" }
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
