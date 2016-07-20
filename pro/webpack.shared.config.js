module.exports = {
  entry: './main.js',
  output: {
    path: process.cwd(),
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-loader/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      { 
        test:/\.css$/,
        loader:'style-loader!css-loader' 
      },
      { 
        test:/\.(png|jpg|gif)$/, 
        loader:'url-loader'
      },
      { 
        test:/\.html$/, 
        loader:'html-loader'
      }
    ]
  },
  vue:{
    loaders:{
      css:'style!css!less'
    }
  },
  devtool: '#source-map'
}
