module.exports = api => {
  // Disable caching for now
  api.cache(false);

  const presets = [];
  const plugins = [];

  // Add preset-env only for production builds
  if (process.env.NODE_ENV === 'production') {
    presets.push('@babel/preset-env');
  }

  // Always add React preset
  presets.push('@babel/preset-react');

  // Handle server-side (Node) builds
  if (api.caller(caller => caller && caller.target === 'node')) {
    presets.push([
      '@babel/preset-env',
      { targets: { node: 'current' } }
    ]);
  }

  return {
    presets,
    plugins
  };
};
