import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AddManagerApiService {

  constructor(private http: HttpClient) { }

  addManager(data: any){
    return this.http.post<any>("http://127.0.0.1:8000/manager",data)
    .pipe(map((res: any)=>{
      return res;
    }));
  }

  editManager( id: number, data: any){
    return this.http.put<any>("http://127.0.0.1:8000/manager/"+id,data)
    .pipe(map((res: any)=>{
      return res;
    }));
  }

  getManager(){
    return this.http.get<any>("http://127.0.0.1:8000/manager")
    .pipe(map((res: any)=>{
      return res;
    }));
  }

  removeManager(id: number){
    return this.http.delete<any>("http://127.0.0.1:8000/manager/"+id)
    .pipe(map((res: any)=>{
      return res;
    }));
  }


}
