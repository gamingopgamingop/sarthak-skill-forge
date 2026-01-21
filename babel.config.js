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
  const targets = {};
  const env = process.env.NODE_ENV;
  const isTest = api.env('test');
  const isProduction = api.env('production');
  const isDevelopment = api.env('development');
  const isServer = api.caller(caller => caller && caller.target === 'node');
  const isClient = api.caller(caller => caller && caller.target === 'web');
  const isWebWorker = api.caller(caller => caller && caller.target === 'webworker');
  const isElectronMain = api.caller(caller => caller && caller.target === 'electron-main');
  const isElectronRenderer = api.caller(caller => caller && caller.target === 'electron-renderer');
  const isElectronPreload = api.caller(caller => caller && caller.target === 'electron-preload');
  const isNode = api.caller(caller => caller && caller.target === 'node');
  const isWeb = api.caller(caller => caller && caller.target === 'web');
  const isElectron = api.caller(caller => caller && caller.target === 'electron');
  const isElect = api.caller(caller => caller && caller.target === 'electron');

  if (process.env.NODE_ENV === 'production') {
    presets.push('@babel/preset-env');
  }

  is
  presets.push('@babel/preset-react','@babel/preset-react');

  if (api.caller(caller => caller && caller.target === 'node')) {
    presets.push([
      '@babel/preset-env',
      { targets: { node: 'current' } }
    ]);
  }

  return { presets, plugins };
}
