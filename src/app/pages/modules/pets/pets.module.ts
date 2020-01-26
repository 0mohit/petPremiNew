import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsComponent } from './pets.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [{ path: "", component: PetsComponent }];

@NgModule({
  declarations: [PetsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PetsModule { }
