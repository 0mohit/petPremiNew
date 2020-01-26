import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: "app-business-details",
  templateUrl: "./business-details.component.html",
  styleUrls: ["./business-details.component.scss"]
})
export class BusinessDetailsComponent implements OnInit {
  businessDetailsFormGroup = this.fb.group({
    businessEntity: [null, Validators.required],
    role: [null, Validators.required],
    businessName: [null, Validators.required],
    registeredAddress: this.fb.group({
      address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      pincode: [null, Validators.required],
      country: [{ value: "IN", disabled: true }, Validators.required]
    }),
    operatingAddress: this.fb.group({
      address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      pincode: [null, Validators.required],
      country: [{ value: "IN", disabled: true }, Validators.required]
    }),
    STDCode: [null, Validators.required],
    landlineNumber: [null, Validators.required],
    PAN: [null, Validators.required],
    addressProof: [null, Validators.required],
    identityProof: [null, Validators.required]
  });
  constructor(private fb: FormBuilder, public commonService: CommonService) {}

  ngOnInit() {}
}
