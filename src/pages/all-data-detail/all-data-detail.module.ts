import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllDataDetailPage } from './all-data-detail';

@NgModule({
  declarations: [
    AllDataDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AllDataDetailPage),
  ],
})
export class AllDataDetailPageModule {}
