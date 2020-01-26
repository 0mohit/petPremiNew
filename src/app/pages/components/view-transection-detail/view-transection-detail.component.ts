import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";

@Component({
  selector: "app-view-transection-detail",
  templateUrl: "./view-transection-detail.component.html",
  styleUrls: ["./view-transection-detail.component.scss"]
})
export class ViewTransectionDetailComponent implements OnInit, OnChanges {
  @Input() isClose: any;
  @Input() isDisplayForm: any;
  @Input() data: any;
  @Output() cancelEvent = new EventEmitter();
  increaseWidth = false;
  transectionData = null;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(change) {
    this.transectionData = change.data.currentValue;
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
