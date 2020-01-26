import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare let $: any;
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  @Input() isDisplayEditForm: any;
  @Input() isCloseEditForm: any;
  @Output() cancelEvent = new EventEmitter();
  headingCss = {
    width: '550px'
  };
  expend = false;
  isSwap = true;
  constructor(
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.isDisplayEditForm = false;
      this.expend = true;
    }, 1000)
  }

  ngOnChanges(e) {

  }

  submit() {
    this.cancel();

  }
  cancel() {
    this.expend = false;
    this.isSwap = false;
    setTimeout(() => {
      this.cancelEvent.emit();
    }, 1000)

  }


}
