import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AccountService } from "../_services";
/**
 * The Error Interceptor intercepts http responses from the api to check if there were any errors. 
 * If there is a 401 Unauthorized or 403 Forbidden response the user is automatically logged out of the application, 
 * all other errors are re-thrown up to the calling service so an alert with the error can be displayed on the screen.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private unauthorized: number = 401
    private forbidden: number = 403

    constructor(private accountService: AccountService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError(error => {
                    if ([this.unauthorized, this.forbidden].includes(error.status) && this.accountService.userValue) {
                        // auto logout if Unauthorized or Forbidden response returned from API
                        this.accountService.logout();
                    }

                    const catchedError = error.error?.message || error.statusText;

                    // Console the catched error into browser console
                    console.log(catchedError)

                    return throwError(() => catchedError)
                })
            )
    }
}