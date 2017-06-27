module.exports = {
  entry: './public/src/app.main.js',
  watch: true,
  output: {
    filename: './public/src/bundle.js'
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
      exclude: /node_modules/,
      use: [ 'style-loader', 'css-loader' ]
    }]
  }
}
