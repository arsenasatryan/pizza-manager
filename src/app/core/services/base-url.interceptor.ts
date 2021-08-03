import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor() {
  }
  // used this interceptor cause all the api calls are resolved to the same server
  // otherwise need to write a base http class which will handle resolving of the url
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const apiReq = request.clone({ url: `${environment.API_URL}/${request.url}` });
    return next.handle(apiReq);
  }
}
