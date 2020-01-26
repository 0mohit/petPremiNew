import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: "app-bank-account",
  templateUrl: "./bank-account.component.html",
  styleUrls: ["./bank-account.component.scss"]
})
export class BankAccountComponent implements OnInit {
  bankAccountDetailsFormGroup = this.fb.group({
    businessName: [{ value: null, disabled: true }, Validators.required],
    accountNumber: [null, Validators.required],
    bankName: [null, Validators.required],
    IFSCCode: [null, Validators.required],
    accountType: [null, Validators.required]
  });
  constructor(private fb: FormBuilder, public commonService: CommonService) {}

  ngOnInit() {}
}
