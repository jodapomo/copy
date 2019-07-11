import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.authService.token;

        // add authorization header with jwt token if available
        if ( token ) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${ token }`
                }
            });
        }

        return next.handle(req);
    }
}
