import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-add-terminal",
  templateUrl: "./add-terminal.component.html",
  styleUrls: ["./add-terminal.component.scss"]
})
export class AddTerminalComponent implements OnInit, OnChanges {
  @Input() isClose: any;
  @Input() isDisplayForm: any;
  @Input() data: any;
  @Output() cancelEvent = new EventEmitter();
  increaseWidth = false;
  ternimalForm = this.fb.group({
    refNo: [null, Validators.required],
    status: [null, Validators.required],
    address: this.fb.group({
      address1: [null, Validators.required],
      address2: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      pincode: [null, Validators.required]
    })
  });
  constructor(private fb: FormBuilder, public commonService: CommonService) {}

  ngOnInit() {}

  sendInvoice() {
    this.cancel();
  }

  ngOnChanges(change) {
    setTimeout(() => {
      this.increaseWidth = true;
    }, 1500);
  }

  bodyClick(e) {
    if (e.target.id === "model-body") {
      this.cancel();
    }
  }

  cancel() {
    this.isDisplayForm = false;
    setTimeout(() => {
      this.cancelEvent.emit();
      this.increaseWidth = false;
    }, 1000);
  }
}
