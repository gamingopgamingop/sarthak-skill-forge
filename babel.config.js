export default function (api) {
  api.cache(false);

  const presets = [];
  const plugins = [];

  if (process.env.NODE_ENV === 'production') {
    presets.push('@babel/preset-env');
  }

  presets.push('@babel/preset-react');

  if (api.caller(caller => caller && caller.target === 'node')) {
    presets.push([
      '@babel/preset-env',
      { targets: { node: 'current' } }
    ]);
  }

  return { presets, plugins };
}
