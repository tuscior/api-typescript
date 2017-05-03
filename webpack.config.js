const webpack = require('webpack');
const path = require('path');



// abstract rules from config
const rules = [

  // javascript
  // {
  //   test: /\.js$/,
  //   exclude: /node_modules/,
  //   use: [ 'babel-loader' ]
  // },


  // typescript
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [ 'ts-loader' ]
  },

  // handlebars
  {
    test: /\.handlebars$/,
    use: [ 'handlebars-loader' ]
  },
  
];





// webpack config

const config = {

  target: 'node',

  resolve: {
    extensions: [ '.ts', '.js' ],
    modules: [ 'node_modules', 'src' ],
    alias: {
      src: path.resolve('./src'),
    }
   },

  // entry
  entry: {
    server: './src/index.ts'
  },

  // output
  output: {
    path: __dirname + '/build',
    filename: 'server.js'
  },

  // loaders/rules
  module: {
    rules: rules
  },

  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: true },
    //   output: { comments: false },
    //   mangle: false,
    //   sourcemap: true,
    //   minimize: true,
    //   mangle: { except: ['$super', '$', 'exports', 'require', '$q', '$ocLazyLoad'] },
    // })
  ],

  // shared 

  devtool: "source-map",

};

// export
module.exports = config;