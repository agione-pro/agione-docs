export const enNavbar = [
  { text: 'Home', link: '/' },
  { text: 'Product Overview', link: '/product/' },
  {
    text: 'Documentation',
    items: [
      { text: "Installation", link: '/installation/' },
      { text: "Purchase & Activation", link: "/license/" },
      { text: "User Guide", link: "/userguide/" },
      { text: "User Manual", link: "/usermanual/" },
      {
        text: "Best Practices",
        items: [
          { text: "Technical Practices", link: "/practices/technical/" },
          { text: "Project Practices", link: "/practices/project/" },
        ]
      },
      {
        text: "Operations",
        items: [
          { text: "Admin Portal Manual", link: "/operations/admin-portal-manual/" },
          { text: "OM Guide", link: "/operations/om-guide/" },
        ],
      },
      // { text: "Tools", link: "/tools/" },
      {
        text: "Others",
        items: [
          { text: "FAQ", link: "/others/faq/" },
          { text: "Release Notes", link: "/others/release-notes/" }
        ]
      },
    ],
  },
  { text: 'AGIOne', link: 'https://agione.pro/' },
  // { text: 'Get Support', link: 'https://support.oneprocloud.com/' },
  // { text: 'FAQ', link: 'https://qa.oneprocloud.com/' },
  { text: 'OneProCloud', link: 'https://oneprocloud.com/' },
]
