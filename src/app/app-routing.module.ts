import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChecksumGeneratorComponent } from './checksum-generator/checksum-generator.component';

const routes: Routes = [
  {
    path: 'checksum-generator',
    component: ChecksumGeneratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
