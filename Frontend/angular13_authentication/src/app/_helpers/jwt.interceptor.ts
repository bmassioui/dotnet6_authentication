import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AccountService } from "../_services";

/**
 * The JWT Interceptor intercepts http requests from the application to add a JWT auth token to the Authorization header if the user is logged in
 * and the request is to the application api url (environment.apiUrl)
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add auth header with JWT, if user is logged in and request it to API url

        const user = this.accountService.userValue
        const isLoggedIn = user && user.token
        const isApiUrl = req.url.startsWith(environment.apiUrl)

        if (isLoggedIn && isApiUrl) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            })
        }

        return next.handle(req)
    }
}