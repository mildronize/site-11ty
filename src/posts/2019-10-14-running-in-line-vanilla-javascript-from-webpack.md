---
layout: post
title: Running in-line vanilla javascript from Webpack
tags:	
- webpack
- vanilla
- javascript

language: en
---

Webpack is so complex for the starter learner. I've found that rarely person talk about this topic. [Most of suggestion](https://stackoverflow.com/questions/34357489/calling-webpacked-code-from-outside-html-script-tag) that I found is to add the command in `webpack.config.js`

However, you can use this way.

1. setup `webpack.config.js` using code below:

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
```

2. Write JS es6 and `jQuery`

```js
window.$ = window.jQuery = require("jquery");

let hello = (name) => {
    console.log(`Hello ${name}`);
    $("#hello-text").html(`Hello ${name}, see also in 'Console'`);
};

(function(window){

    window.EntryPoint = {
        hello
    }
})(window)
```

3. Implment in the HTML file

```html
<h1 id="hello-text"></h1>
  
<script src="dist/index.js"></script>
<script type="text/javascript">
    EntryPoint.hello("Webpack");
</script>
```

Here is the screenshot.
![webpack]({{ site.image_prefix }}/2019-10-14-running-in-line-vanilla-javascript-from-webpack.png)


Checkout the [repo](https://github.com/mildronize/webpack-with-vanilla-js)