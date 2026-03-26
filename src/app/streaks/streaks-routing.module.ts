import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreaksPage } from './streaks.page';

const routes: Routes = [
  {
    path: '',
    component: StreaksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreaksPageRoutingModule {}
