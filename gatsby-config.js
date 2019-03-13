

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

const fs = require("fs");
const yaml = require('json2yaml');

// const gatsby_source_firbase =  {
//       resolve: `gatsby-source-firebase`,
//       options: {
//         // point to the firebase private key downloaded
//         credential: require("./firebase-key.json"),

//         // your firebase database root url
//         databaseURL: "https://mildronize-blog.firebaseio.com/",

//         // you can have multiple "types" that point to different paths
//         types: [
//           {
//             // this type will become `allWorkshop` in graphql
//             type: "Post",
//             path: "/posts",

//             map: node => {
//               console.log("Debug: ")
//               console.log(node)
//               const date = node.frontmatter.date
//               const title = node.frontmatter.title
//               const markdown = node.markdown
//               const slug = node.frontmatter.slug;

//               ymlText = yaml.stringify(node.frontmatter);

//               const content = `${ymlText}---\n\n${markdown}`

//               try {
//                 const data = fs.writeFileSync(`${__dirname}/content/tmp/${date}-${title}.md`, content)
//                 //file written successfully
//               } catch (err) {
//                 console.error(err)
//               }

//               // finally, return the node
//               return node
//             },
//           }
//         ]
//       }
//     }

const gatsby_remark_prismjs = {
  resolve: `gatsby-remark-prismjs`,
  options: {
    // Class prefix for <pre> tags containing syntax highlighting;
    // defaults to 'language-' (eg <pre class="language-js">).
    // If your site loads Prism into the browser at runtime,
    // (eg for use with libraries like react-live),
    // you may use this to prevent Prism from re-processing syntax.
    // This is an uncommon use-case though;
    // If you're unsure, it's best to use the default value.
    classPrefix: "language-",
    // This is used to allow setting a language for inline code
    // (i.e. single backticks) by creating a separator.
    // This separator is a string and will do no white-space
    // stripping.
    // A suggested value for English speakers is the non-ascii
    // character '›'.
    inlineCodeMarker: null,
    // This lets you set up language aliases.  For example,
    // setting this to '{ sh: "bash" }' will let you use
    // the language "sh" which will highlight using the
    // bash highlighter.
    aliases: {},
    // This toggles the display of line numbers globally alongside the code.
    // To use it, add the following line in src/layouts/index.js
    // right after importing the prism color scheme:
    //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
    // Defaults to false.
    // If you wish to only show line numbers on certain code blocks,
    // leave false and use the {numberLines: true} syntax below
    showLineNumbers: false,
    // If setting this to true, the parser won't handle and highlight inline
    // code used in markdown i.e. single backtick code like `this`.
    noInlineHighlight: false,
  }
}

module.exports = {
  siteMetadata: {
    title: `Mildronize`,
    author: `Thada Wangthammang`,
    description: `Next version of mildronize.com`,
    siteUrl: `https://mildronize.com`,
    social: {
      twitter: `mildronize`,
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
          gatsby_remark_prismjs
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

