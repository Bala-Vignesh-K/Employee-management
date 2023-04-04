import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AddAdminApiService {

  constructor(private http: HttpClient) { }

  addAdmin(data: any){
    return this.http.post<any>("http://127.0.0.1:8000/admin",data)
    .pipe(map((res: any)=>{
      return res;
    }));
  }

  editAdmin( id: number, data: any){
    return this.http.put<any>("http://127.0.0.1:8000/admin/"+id,data)
    .pipe(map((res: any)=>{
      return res;
    }));
  }

  getAdmin(){
    return this.http.get<any>("http://127.0.0.1:8000/admin")
    .pipe(map((res: any)=>{
      return res;
    }));
  }

  removeAdmin(id: number){
    return this.http.delete<any>("http://127.0.0.1:8000/admin/"+id)
    .pipe(map((res: any)=>{
      return res;
    }));
  }


}
