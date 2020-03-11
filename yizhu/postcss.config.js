module.exports = {
  plugins: {
    'autoprefixer': {},
    "postcss-px2rem-exclude": {
      "remUnit": 32,
      "exclude": "/node_modules/i"
    }
  }
}