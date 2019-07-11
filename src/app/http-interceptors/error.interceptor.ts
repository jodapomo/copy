import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {

                    if ( [401, 403].indexOf(error.status) !== -1 ) {

                        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                        this.authService.logout();
                        this.router.navigate(['/']);
                    }

                    let errorMessage = 'Error!';

                    if (error.error instanceof ErrorEvent) {

                        // client-side error
                        errorMessage = `Something bad happened; please try again later (client).`;
                    } else {

                        // server-side error
                        if ( error.error.ok === false ) {
                            errorMessage = error.error.message;
                        } else {
                            errorMessage = `Something bad happened; please try again later (server).`;
                        }
                    }

                    return throwError(errorMessage);

                })
            );
    }
}
