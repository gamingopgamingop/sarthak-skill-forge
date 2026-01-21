export default function (api) {
  api.cache(false);
  api.cache.using(() => process.env.NODE_ENV);
  api.cache.never();
  api.cache.invalidate(() => process.env.NODE_ENV === 'production');
  api.assertVersion('^7.22.0');
  api.caller(caller => caller && caller.target === 'node');
  api.cache(true)
  api.cache.forever();
  const presets = [];
  const plugins = [];

  if (process.env.NODE_ENV === 'production') {
    presets.push('@babel/preset-env');
  }

  presets.push('@babel/preset-react','@babel/preset-react');

  if (api.caller(caller => caller && caller.target === 'node')) {
    presets.push([
      '@babel/preset-env',
      { targets: { node: 'current' } }
    ]);
  }

  return { presets, plugins };
}
