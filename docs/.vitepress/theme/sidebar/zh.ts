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
        { text: 'AGIOne-部署配置要求', link: '/zh/installation/agione-deployment-requirements' },
        { text: 'AGIOne-环境安装部署指南', link: '/zh/installation/agione-environment-installation-deployment' },
        { text: '节点纳管-部署配置要求', link: '/zh/installation/deployment-requirements-for-managing-compute-nodes' },
        { text: '节点纳管-快速安装指南', link: '/zh/installation/quick-install-for-managing-compute-nodes' },
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
        { text: '用户快速指引', link: '/zh/usermanual/user-quick-guide' },
        { text: '供应商快速指引', link: '/zh/usermanual/provider-quick-guide' },
        {
          text: '模型及AI服务',
          collapsed: false,
          items: [
            {
              text: '概览',
              link: '/zh/usermanual/model-services/'
            },
            {
              text: '客户调用',
              collapsed: false,
              items: [
                { text: '概览', link: '/zh/usermanual/model-services/customer-calls/overview/' },
                { text: '调用分析', link: '/zh/usermanual/model-services/customer-calls/call-analytics/' },
                { text: '调用日志', link: '/zh/usermanual/model-services/customer-calls/call-logs/' },
              ]
            },
            {
              text: '发现',
              collapsed: false,
              items: [
                { text: '模型', link: '/zh/usermanual/model-services/discover/models/' },
              ]
            },
            {
              text: '体验中心',
              collapsed: false,
              items: [
                { text: '文本对话', link: '/zh/usermanual/model-services/playground/text/' },
                { text: '语音', link: '/zh/usermanual/model-services/playground/audio/' },
                { text: '图片', link: '/zh/usermanual/model-services/playground/images/' },
                { text: '视频', link: '/zh/usermanual/model-services/playground/video/' },
              ]
            },
            {
              text: '创作空间',
              collapsed: false,
              items: [
                { text: '我的模型', link: '/zh/usermanual/model-services/studio/my-models/' },
              ]
            },
            {
              text: '用量与收益',
              collapsed: false,
              items: [
                { text: '用量', link: '/zh/usermanual/model-services/usage-revenue/usage/' },
                { text: '收益', link: '/zh/usermanual/model-services/usage-revenue/revenue/' },
              ]
            },
          ]
        },
        { text: '多云平台调度', link: '/zh/usermanual/ai-infra-on-cloud/' },
        { text: '异构卡纳管', link: '/zh/usermanual/ai-infra-on-prem/' },
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
                { text: 'CherryStudio', link: '/zh/practices/technical/cherry-studio/' },
                { text: 'claudeCode', link: '/zh/practices/technical/claude-code/' },
                { text: 'ClaudeCode-plugin', link: '/zh/practices/technical/claude-code-plugin/' },
                { text: 'Cline', link: '/zh/practices/technical/cline/' },
                { text: 'Codex', link: '/zh/practices/technical/codex/' },
                { text: 'Crush', link: '/zh/practices/technical/crush/' },
                { text: 'Cursor', link: '/zh/practices/technical/cursor/' },
                { text: 'dify', link: '/zh/practices/technical/dify/' },
                { text: 'KiloCode', link: '/zh/practices/technical/kilo-code/' },
                { text: 'n8n', link: '/zh/practices/technical/n8n/' },
                { text: 'open-webui', link: '/zh/practices/technical/open-webui/' },
                { text: 'openclaw', link: '/zh/practices/technical/openclaw/' },
                { text: 'OpenCode', link: '/zh/practices/technical/open-code/' },
                { text: 'RooCode', link: '/zh/practices/technical/roo-code/' },
              ],
            },
          ],
        },
        {
          text: '项目实践',
          collapsed: false,
          items: [
            {
              text: '多算力池异构推理调度最佳实践',
              link: '/zh/practices/project/multi-compute-pool-heterogeneous-inference-scheduling',
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
