import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class ApiService {
    constructor(private http: HttpClient) { }
    postTypeRequest(path, data) {
        return this.http.get(`assets/mockData/${path}`)
    }

}
