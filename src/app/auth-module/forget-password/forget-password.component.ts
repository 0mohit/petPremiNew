import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"]
})
export class ForgetPasswordComponent implements OnInit {
  @Output() goBack = new EventEmitter();
  forgetForm = this.fb.group({
    mobile: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    ]
  });
  constructor(private fb: FormBuilder, public commonService: CommonService) {}

  ngOnInit() {}

  back() {
    this.goBack.emit();
  }
  forget() {}
  get f() {
    return this.forgetForm.controls;
  }
}
