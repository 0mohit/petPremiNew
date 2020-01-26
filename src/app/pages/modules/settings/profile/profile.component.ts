import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  userDetailForm = this.fb.group(
    {
      mobile: [
        { value: "8754691842", disabled: true },
        Validators.compose([Validators.required])
      ],
      email: [
        { value: "ranjan@gmail.com", disabled: true },
        Validators.compose([Validators.required])
      ],
      oldPassword: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
          )
        ])
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
          )
        ])
      ],
      cPassword: [null, Validators.required]
    },
    { validator: this.passwordConfirming }
  );
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  passwordConfirming(c: AbstractControl) {
    if (c.get("password").value !== c.get("cPassword").value) {
      c.get("cPassword").setErrors({ mustMatch: true });
    } else {
      c.get("cPassword").setErrors(null);
    }
  }
}
