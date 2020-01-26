import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.scss"]
})
export class PagesComponent implements OnInit {
  isMobileMenuOpen = false;
  year = new Date().getFullYear();
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  menuToggel() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  goToProfile() {
    this.router.navigate(["/settings/profile"]);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
