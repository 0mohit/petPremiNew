import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule)
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth-module/auth-module.module").then(m => m.AuthModuleModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
