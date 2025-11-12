import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';
import 'zone.js/node';
import { render } from '@analogjs/router/server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context);

export default {bootstrap , render(App, config);}

