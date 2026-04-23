import type { DefaultTheme } from 'vitepress'

export const zhSidebar: DefaultTheme.Sidebar = {
  '/zh/product/': [
    {
      text: '产品概述',
      collapsed: false,
      items: [
        { text: '概述', link: '/zh/product/technical/overview' },
        { text: '功能与能力', link: '/zh/product/technical/features' },
        { text: '网络规划', link: '/zh/product/technical/network' },
        { text: '技术亮点', link: '/zh/product/technical/tech-highlights' },
      ],
    },
    {
      text: '兼容性与限制',
      collapsed: false,
      items: [
        { text: '纳管芯片', link: '/zh/product/limitations/chips' },
        { text: '支持矩阵', link: '/zh/product/limitations/support-matrix' },
        { text: '其他限制', link: '/zh/product/limitations/limitations' },
      ],
    },
    {
      text: '调研',
      collapsed: false,
      items: [
        { text: '需求快速调研', link: '/zh/product/investigation/quick-requirement-investigation' },
        { text: '环境快速调研', link: '/zh/product/investigation/quick-env-investigation' },
      ],
    },
  ],
  '/zh/installation/': [
    {
      text: '安装部署',
      collapsed: false,
      items: [
        { text: '（AGIOne）部署配置要求', link: '/zh/installation/agione-deployment-requirements' },
        { text: '纳管节点部署配置要求', link: '/zh/installation/deployment-requirements-for-managing-compute-nodes' },
        { text: '（AGIOne）快速安装指南', link: '/zh/installation/agione-quick-install' },
        { text: '纳管节点快速安装指南', link: '/zh/installation/quick-install-for-managing-compute-nodes' },
      ],
    },
  ],

  '/zh/license/': [
    {
      text: '购买与激活',
      collapsed: false,
      items: [
        { text: '在线支付与激活', link: '/zh/license/online-payment-activation' },
        { text: '激活码与激活', link: '/zh/license/activation-code-activation' },
      ],
    },
  ],

  '/zh/userguide/': [
    {
      text: '用户指南',
      collapsed: false,
      items: [
        {
          text: '算力资源接入',
          collapsed: false,
          items: [
            { text: '公共算力接入', link: '/zh/userguide/public-ai-integration' },
          ],
        },
        {
          text: '算力资源管理',
          collapsed: false,
          items: [
            { text: 'A100 管理', link: '/zh/userguide/a100-management' },
          ],
        },
        {
          text: '模型管理',
          collapsed: false,
          items: [
            { text: '模型部署', link: '/zh/userguide/mode-deployment' },
          ],
        },
      ],
    },
  ],

  '/zh/usermanual/': [
    {
      text: '用户手册',
      collapsed: false,
      items: [
        { text: '注册', link: '/zh/usermanual/register' },
        { text: '登录', link: '/zh/usermanual/login' },
        { text: '仪表盘', link: '/zh/usermanual/dashboard' },
      ],
    },
  ],

  '/zh/practices/': [
    {
      text: '最佳实践',
      items: [
        {
          text: '技术实践',
          collapsed: false,
          items: [
            {
              text: 'AI 编码集成',
              collapsed: false,
              items: [
                {
                  text: 'OpenClaw',
                  link: '/zh/practices/technical/ai-coding-client/openclaw',
                },
                {
                  text: 'Claude Code',
                  link: '/zh/practices/technical/ai-coding-client/claude-code',
                },
              ],
            },
          ],
        },
        {
          text: '项目实践',
          collapsed: false,
          items: [
            {
              text: '泰国 CP 裸金属算力管理与服务案例',
              link: '/zh/practices/project/thailand-cp',
            },
          ],
        },
      ],
    },
  ],
  '/zh/operations/admin-portal-manual/': [
    {
      text: '管理门户手册',
      collapsed: false,
      items: [
        { text: '用户管理', link: '/zh/operations/admin-portal-manual/user' },
      ],
    },
  ],
  '/zh/operations/om-guide/': [
    {
      text: '运维指南',
      collapsed: false,
      items: [
        { text: '用户管理', link: '/zh/operations/om-guide/user' },
      ],
    },
  ],
  '/zh/others/faq/': [
    {
      text: '常见问题（FAQ）',
      collapsed: false,
      items: [
        { text: '通用问题', link: '/zh/others/faq/general' },
      ],
    },
  ],
  '/zh/others/release-notes/': [
    {
      text: '版本说明',
      collapsed: false,
      items: [
        { text: '版本说明（示例）', link: '/zh/others/release-notes/example' },
      ],
    },
  ],
}
