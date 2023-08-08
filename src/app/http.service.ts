import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
url=environment.baseUrl
  constructor(private http:HttpClient) { }

  getData(method:string,data:number){
    return this.http.get(`${this.url}${method}/${data}`)
  }

}
