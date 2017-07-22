const webpack = require('webpack')

module.exports = env => {
  const prod = (env && env.prod) || process.env.NODE_ENV === 'production'
  return {
    entry: './public/app.main.js',
    watch: !prod,
    output: {
      filename: './public/bundle.js'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ng-annotate-loader'
        }, {
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }]
      }, {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }]
    },
    plugins: !prod ? [] : [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]}
}
