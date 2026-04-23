export const zhNavbar = [
  { text: '首页', link: '/zh/' },
  { text: '产品概述', link: '/zh/product/' },
  {
    text: '文档中心',
    items: [
      { text: '安装部署', link: '/zh/installation/' },
      { text: '购买与激活', link: '/zh/license/' },
      { text: '用户指南', link: '/zh/userguide/' },
      { text: '用户手册', link: '/zh/usermanual/' },
      {
        text: '最佳实践',
        items: [
          { text: '技术实践', link: '/zh/practices/technical/' },
          { text: '项目实践', link: '/zh/practices/project/' },
        ]
      },
      {
        text: '运维',
        items: [
          { text: '管理门户手册', link: '/zh/operations/admin-portal-manual/' },
          { text: '运维指南', link: '/zh/operations/om-guide/' },
        ],
      },
      {
        text: '其他',
        items: [
          { text: 'FAQ', link: '/zh/others/faq/' },
          { text: '版本说明', link: '/zh/others/release-notes/' },
        ]
      },
    ]
  },
  { text: 'AGIOne', link: 'https://agione.pro/' },
  // { text: '技术支持', link: 'https://support.oneprocloud.com/' },
  // { text: '常见问题', link: 'https://qa.oneprocloud.com/' },
  { text: 'OneProCloud', link: 'https://oneprocloud.com/' },
]
