import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminLoginService } from './admin-login.service';
import { take, exhaustMap} from 'rxjs/operators'


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authservice: AdminLoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authservice.user.pipe(
      take(1),
      exhaustMap(user=>{
        if(!user){
          return next.handle(req);
        }
        const modifiedReq = req.clone({ 
          headers: req.headers.append('Authorization', 'Bearer' + user.token)
        })
        return next.handle(modifiedReq);
      })
    )
  }
}
