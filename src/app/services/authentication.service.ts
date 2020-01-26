import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  logout() {
    localStorage.removeItem("user");
  }
}
