import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { AuthGuard } from '../helpers/auth.guard';
import { UsersManagementComponent } from './modules/usersManagement/users.management.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard"
      },
      {
        path: "dashboard",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./modules/dashboard/dashboard.module").then(
            m => m.DashboardModule
          )
      },
      {
        path: "appointments",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./modules/appointments/appointments.module").then(
            m => m.AppointmentsModule
          )
      },
      {
        path: "customers",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./modules/customers/customers.module").then(m => m.CustomersModule)
      },
      {
        path: "notifications",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./modules/notifications/notifications.module").then(
            m => m.NotificationsModule
          )
      },
      {
        path: "tasks",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./modules/tasks/tasks.module").then(
            m => m.TasksModule
          )
      },
      {
        path: "settings",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./modules/settings/settings.module").then(m => m.SettingsModule)
      },
      {
        path: "pets",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./modules/pets/pets.module").then(
            m => m.PetsModule
          )
      }, {
        path: "user-management",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./modules/usersManagement/users.management.module").then(
            m => m.UsersManagementModule
          )
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
