import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConferenciasPage } from './conferencias';

@NgModule({
  declarations: [
    ConferenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(ConferenciasPage),
  ],
})
export class ConferenciasPageModule {}
