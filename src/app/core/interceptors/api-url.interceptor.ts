import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {

  constructor(private readonly configService: ConfigService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const url = request.url;
    const apiUrl = this.configService.getConfig('apiUrl');

    if (url.startsWith('/')) {
      request = request.clone({
        url: `${apiUrl}${url}`
      });
    }

    return next.handle(request);
  }
}
