import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile/profile.component";
import { BankAccountComponent } from "./bank-account/bank-account.component";
import { BusinessDetailsComponent } from "./business-details/business-details.component";
import { TerminalComponent } from "./terminal/terminal.component";

const routes: Routes = [
  { path: "", redirectTo: "profile" },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "bank-account",
    component: BankAccountComponent
  },
  {
    path: "business-details",
    component: BusinessDetailsComponent
  },
  {
    path: "terminal",
    component: TerminalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
