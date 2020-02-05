import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class ApiService {
    constructor(private http: HttpClient) { }
    // postTypeRequest(path, data) {
    //     return this.http.get(`assets/mockData/${path}`)
    // }
    
    getTypeRequest(url) {
        return this.http.get(`${environment.base_url}${url}`).pipe(map(res => {
          return res;
        }));
      }
    
      postTypeRequest(url, payload) {
        return this.http.post(`${environment.base_url}${url}`, payload).pipe(map(res => {
          return res;
        }));
      }
}
