 const gatsby_plugin_feed = 
 {
   resolve: `gatsby-plugin-feed`,
   options: {
     query: `
       {
         site {
           siteMetadata {
             title
             description
             siteUrl
             site_url: siteUrl
           }
         }
       }
     `,
     feeds: [
       {
         serialize: ({ query: { site, allMarkdownRemark } }) => {
           return allMarkdownRemark.edges.map(edge => {
             return Object.assign({}, edge.node.frontmatter, {
               description: edge.node.excerpt,
               date: edge.node.fields.date,
               url: site.siteMetadata.siteUrl + edge.node.fields.slug,
               guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
               custom_elements: [{ "content:encoded": edge.node.html }],
             })
           })
         },
         query: `
           {
             allMarkdownRemark(
               limit: 1000,
               sort: { order: DESC, fields: [fields___date] }
             ) {
               edges {
                 node {
                   excerpt
                   html
                   fields { 
                     slug 
                     date
                   }
                   frontmatter {
                     title
                     
                   }
                 }
               }
             }
           }
         `,
         output: "/rss.xml",
         title: "Gatsby RSS Feed",
       },
     ],
   },
 }

module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Blog`,
    author: `Kyle Mathews`,
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      twitter: `kylemathews`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    gatsby_plugin_feed,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}

