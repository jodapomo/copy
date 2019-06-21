import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {

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
