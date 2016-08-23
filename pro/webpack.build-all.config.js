var examples = [
  'red-configuration'
];

var baseroot = [
  {op:'../views/views/op'}
]

var root = [
  {'op_red':baseroot[0].op+'/red/js'}
]

var entry = {}
examples.forEach(function (name) {
  console.log(root[0].op_red)
  entry[name] = ['./build/bind.js', './pro/' + name + '/main.js']
})

module.exports = {
  entry: entry,
  output: {
    path: root[0].op_red,
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
