import { Component, OnInit ,Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-model-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserModelComponent implements OnInit {
  @Input() isClose: any;
  @Input() isDisplayForm: any;
  @Input() data: any;
  @Output() cancelEvent = new EventEmitter();
  increaseWidth = false;
  transectionData = null;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(change) {
    setTimeout(() => {
      this.increaseWidth = true;
    }, 2000);
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
