import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";

@NgModule({
  declarations: [
    PagesComponent,
    SideMenuComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class PagesModule {}
