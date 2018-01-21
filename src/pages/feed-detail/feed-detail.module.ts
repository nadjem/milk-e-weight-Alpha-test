import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedDetailPage } from './feed-detail';

@NgModule({
  declarations: [
    FeedDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedDetailPage),
  ],
})
export class FeedDetailPageModule {}
