import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      // request = request.clone({
      //     setHeaders: {
      //         user_id: user._id
      //     }
      // });
    }
    return next.handle(request);
  }
}
