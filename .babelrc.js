const env = process.env.NODE_ENV;

if (env === 'commonjs' || env === 'es') {
  module.exports = {
    presets: ['env', 'react', 'stage-1'],
  };
}

if (env === 'test') {
  module.exports = {
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
    presets: ['env', 'react', 'stage-1'],
  };
}
