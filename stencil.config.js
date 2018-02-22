const postcss = require('@stencil/postcss');

exports.config = {
  namespace: 'stencil-app',
  generateDistribution: true,
  generateWWW: true,
  serviceWorker: null,
  plugins: [
    postcss({
      plugins: [
        require('postcss-import'),
        require('postcss-cssnext', {
          browsers: ['last 6 versions'],
          cascade: false
        })
      ]
    })
  ]
};

exports.devServer = { root: 'www', watchGlob: '**/**' };
