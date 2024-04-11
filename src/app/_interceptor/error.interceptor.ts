import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GroupResponse } from '../_models/response/group.response';
import { RootResponse } from '../_models/response/root.response';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(map(val => {
      if (val instanceof HttpResponse) {
        let body = val.body as RootResponse;
        //console.log(body);
        if (body.data != null) {
          return val.clone({ body: body.data });
        }
      }
      return val;
    }), catchError((err: HttpErrorResponse) => {
      if (err.status < 299) throw (err);
      switch (err.status) {
        case 400:
          if (Array.isArray(err.error)) {
            err.error.forEach(val => {
              this.toastr.error(val.description, "Bad Request");
            })
          } else {
            this.toastr.error(err.error, "Bad Request");
          }
          break;
        case 401:
          this.toastr.error("Unauthorised", err.status.toString());
          break;
        case 404:
          this.toastr.error("Not Found", err.status.toString())
          break;
        case 500:
          console.log(err);
          this.toastr.error("Server Error", err.error.Message ?? err.status.toString());
          break;
        default:
          this.toastr.error(err.error, err.status.toString())
      }
      throw (err);
    }));
  }
}
