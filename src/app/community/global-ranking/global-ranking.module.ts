import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlobalRankingPageRoutingModule } from './global-ranking-routing.module';

import { GlobalRankingPage } from './global-ranking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalRankingPageRoutingModule
  ],
  declarations: [GlobalRankingPage]
})
export class GlobalRankingPageModule {}
