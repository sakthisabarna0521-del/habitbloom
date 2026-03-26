import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AiSuggestionsPage } from './ai-suggestions.page';

const routes: Routes = [
  {
    path: '',
    component: AiSuggestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiSuggestionsPageRoutingModule {}
