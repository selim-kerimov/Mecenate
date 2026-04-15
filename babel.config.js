module.exports = function (api) {
  const isProduction = api.env('production')
  const removeConsolePlugin = isProduction ? ['transform-remove-console'] : []

  return {
    plugins: [...removeConsolePlugin],
    presets: ['babel-preset-expo'],
  }
}
