// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nodefusion Open Notes',
  tagline: 'Nodefusion public knowledge base and blog',
  favicon: 'img/favicon.ico',

  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'saveData',
          'queryString',
          'standalone',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/nodefusion-account.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#d37352',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#d37352',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/nodefusion-account.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/img/nodefusion-account.png',
            color: '#d37352',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: '/img/nodefusion-account.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#d37352',
          },
        ],
      },
    ],
  ],

  // Set the production url of your site here
  url: 'https://open-notes.nodefusion.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Nodefusion',
  projectName: 'OpenNotes',

  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          editUrl: 'https://github.com/Nodefusion/OpenNotes/tree/main/',
        },
        gtag: {
          trackingID: 'G-JJ1M16L7R1',
        },
        googleTagManager: {
          containerId: 'GTM-PL8JQMX5',
        },
        sitemap: {
          changefreq: 'weekly',
          lastmod: 'datetime',
        },
        blog: {
          showReadingTime: true,
          postsPerPage: 10,
          blogSidebarTitle: 'Blog posts',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/Nodefusion/OpenNotes/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/NFN - portal logo reactive.svg',
      navbar: {
        title: 'Nodefusion Open Notes',
        logo: {
          alt: 'Nodefusion',
          src: 'img/NFN - portal logo light.svg',
          srcDark: 'img/NFN - portal logo dark.svg',
        },
        items: [
          {
            to: '/blog',
            label: 'Blog',
            position: 'left',
          },
          {
            href: 'https://github.com/Nodefusion/OpenNotes',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      algolia: {
        appId: '3FFZZ03G3C',
        apiKey: 'ebfb8c7a0db9c702cdb0516d3f44dab4',
        indexName: 'Nodefusion Open Notes',
        insights: true,
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Nodefusion',
                href: 'https://www.nodefusion.com/en-us/',
              },
              {
                label: 'X',
                href: 'https://x.com/Nodefusion',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/nodefusion',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Nodefusion',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nodefusion`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;