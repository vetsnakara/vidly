const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',

  plugins: [
    new Dotenv({
      path: './.env.development',
    }),
  ],

  devServer: {
    contentBase: './public',
    hot: true,
    open: true,
    overlay: true,
  },

  devtool: 'eval-source-map',
};
