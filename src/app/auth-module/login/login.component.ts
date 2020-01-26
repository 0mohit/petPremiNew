import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CommonService } from "src/app/services/common.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  isForgetEnable = false;
  loginForm = this.fb.group({
    mobile: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    ],
    password: [
      null,
      Validators.compose([Validators.required, Validators.minLength(8)])
    ]
  });
  year = new Date().getFullYear();
  constructor(
    private fb: FormBuilder,
    public commonService: CommonService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  signIn() {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value);
      this.router.navigate(["/dashboard"]);
    }
  }

  restrictOnlyNumeric(e) {
    return this.commonService.restrictOnlyNumeric(e);
  }

  get f() {
    return this.loginForm.controls;
  }
}
