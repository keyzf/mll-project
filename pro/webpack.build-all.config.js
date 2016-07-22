var examples = [
  'red-configuration'
]

var entry = {}
examples.forEach(function (name) {
  console.log(name)
  entry[name] = ['./build/bind.js', './pro/' + name + '/main.js']
})

module.exports = {
  entry: entry,
  output: {
    path: '../../../../../javamll/st-activity/activity-web/src/main/webapp/views/js',
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
        test:/\.(png|jpg|gif)$/, 
        loader:'url-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  }
}
