import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagementComponent } from './users.management.component';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { FeatureComponent } from './feature/feature/feature.component';
import { FunctionalityComponent } from './functionality/functionality/functionality.component';
import { RoleComponent } from './role/role/role.component';
import { PrivilegeComponent } from './privilege/privilege/privilege.component';
import { CreateUserComponent } from './userAction/create-user/create-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './../../../material.module';
import { SharedComponentModule } from '../../components/shared-component.module';
import { ThemeModule } from './../../../theme/theme.module';
import { CreateRoleComponent } from './create-role/create-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent,
    children: [
      {
        path: "",
        redirectTo: "user",
        pathMatch: 'full'
      },
      {
        path: "user",
        component: UsersComponent
      },
      {
        path: "feature",
        component: FeatureComponent
      },
      {
        path: "functionality",
        component: FunctionalityComponent
      }, {
        path: "role",
        component: RoleComponent
      }, {
        path: "privilege",
        component: PrivilegeComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    UsersManagementComponent,
    UsersComponent,
    FeatureComponent,
    FunctionalityComponent,
    RoleComponent,
    PrivilegeComponent,
    CreateUserComponent,
    CreateRoleComponent,
    EditRoleComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    SharedComponentModule,
    ReactiveFormsModule,
    FormsModule,
    ThemeModule
  ],
  entryComponents: [],
  exports: [RouterModule]
})
export class UsersManagementModule { }
