module.exports = {
  entry: './public/app.main.js',
  watch: true,
  output: {
    filename: './public/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.css$/,
      use: [ 'to-string-loader', 'style-loader', 'css-loader' ]
    }]
  }
}
