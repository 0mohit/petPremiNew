import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ViewTransectionDetailComponent } from "./view-transection-detail/view-transection-detail.component";
import { MatIconModule, MatButtonModule } from "@angular/material";
import { CreateUserModelComponent } from './userModel/create-user/create-user.component';

@NgModule({
  declarations: [ViewTransectionDetailComponent, CreateUserModelComponent],
  exports: [ViewTransectionDetailComponent,CreateUserModelComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule]
})
export class SharedComponentModule {}
