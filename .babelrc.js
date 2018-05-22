const env = process.env.NODE_ENV;

if (env === 'commonjs' || env === 'es') {
  module.exports = {
    plugins: ['transform-runtime'],
    presets: ['env', 'react', 'stage-1'],
  };
}

if (env === 'development') {
  module.exports = {
    presets: ['env', 'react', 'stage-1'],
  };
}

if (env === 'production') {
  module.exports = {
    comments: false,
    plugins: ['transform-runtime'],
    presets: ['env', 'react', 'stage-1'],
  };
}
