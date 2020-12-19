import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { tap } from 'rxjs/operators'
import { AuthService } from "./auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const isLoggedIn = this.authService.isLoggedIn;
      if (isLoggedIn) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.token}`
          }
        });
      }
      return next.handle(request);
    }
}