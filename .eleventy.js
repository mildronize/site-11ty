const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.setDataDeepMerge(true);
  // Move images to dist folder without processing
  eleventyConfig.addPassthroughCopy({ "src/template/images": "images" });
  // Move images from posts to dist folder without processing to `images/posts` folder
  // eleventyConfig.addPassthroughCopy({ "src/posts/**/*.png": "images/posts" });
  // eleventyConfig.addPassthroughCopy({ "src/posts/**/*.jpg": "images/posts" });
  // eleventyConfig.addPassthroughCopy({ "src/posts/**/*.gif": "images/posts" });
  // Alias `layouts/post.njk` to `post`
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

   // Get the first `n` elements of a collection.
   eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));


   /* Begin Markdown Plugins */
   let markdownIt = require("markdown-it");
   let markdownItAnchor = require("markdown-it-anchor");
   let options = {
     html: true,
     breaks: true,
     linkify: true
   };
   let opts = {
     permalink: true,
     permalinkClass: "direct-link",
     permalinkSymbol: "#"
   };
 
   eleventyConfig.setLibrary("md", markdownIt(options)
     .use(markdownItAnchor, opts)
   );
   /* End Markdown Plugins */

  return {
    dir: { input: 'src', output: 'dist', data: '_data', includes: "template/_includes" },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html', 'yml', 'gif','png','jpg'],
    htmlTemplateEngine: 'njk'
  }
}
