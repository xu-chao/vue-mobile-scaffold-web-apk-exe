module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'mand-mobile',
        libraryDirectory: 'lib'
      }, 'mand-mobile'
    ],
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es'
      }, 'vant'
    ]
  ]
}
