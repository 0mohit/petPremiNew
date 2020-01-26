import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { BusinessDetailsComponent } from "./business-details/business-details.component";
import { BankAccountComponent } from "./bank-account/bank-account.component";
import { TerminalComponent } from "./terminal/terminal.component";
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatChipsModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AddTerminalComponent } from './terminal/add-terminal/add-terminal.component';

@NgModule({
  declarations: [
    ProfileComponent,
    BusinessDetailsComponent,
    BankAccountComponent,
    TerminalComponent,
    AddTerminalComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    HttpClientModule
  ]
})
export class SettingsModule {}
