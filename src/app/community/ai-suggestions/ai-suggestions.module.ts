import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AiSuggestionsPageRoutingModule } from './ai-suggestions-routing.module';

import { AiSuggestionsPage } from './ai-suggestions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AiSuggestionsPageRoutingModule
  ],
  declarations: [AiSuggestionsPage]
})
export class AiSuggestionsPageModule {}
