import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GlobalRankingPage } from './global-ranking.page';

const routes: Routes = [
  {
    path: '',
    component: GlobalRankingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalRankingPageRoutingModule {}
