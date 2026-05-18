import { defineConfig } from 'vitepress'
import { baseConfig } from './shared'
import { enTheme } from '../theme/en'
import { zhTheme } from '../theme/zh'
import { socialLinks } from '../social'

export default defineConfig({
  ...baseConfig,
  ignoreDeadLinks: true,
  themeConfig: {
    // Local Search (enabled)
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询',
                backButtonTitle: '关闭搜索',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },

    // Algolia DocSearch (disabled)
    /*
    search: {
      provider: 'algolia',
      options: {
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_API_KEY',
        indexName: 'YOUR_INDEX_NAME',
      },
    },
    */
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        ...enTheme,
        socialLinks,
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        ...zhTheme,
        socialLinks,
      },
    },
  },
})
