// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { catchError, Observable, throwError } from 'rxjs';
// import { AuthService } from '../Services/auth.service';

// @Injectable()
// export class AuthInterceptorInterceptor implements HttpInterceptor {

//   constructor(private authService: AuthService) { }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     // Add authorization header with JWT token if available
//     const authToken = this.authService.getToken();
//     if (authToken) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });
//     }
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         return throwError(error);
//       })
//     );
//   }
// }



import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
