import { APP_INITIALIZER, Injector } from '@angular/core';
import { ConfigService } from '../services/config.service';

export function configServiceFactory(configService: ConfigService): () => Promise<any> {
  return async () => await configService.loadConfig();
}

export const appInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: configServiceFactory,
    deps: [ConfigService],
    multi: true
  }
];
