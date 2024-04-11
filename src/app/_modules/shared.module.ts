import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    DataTablesModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({ positionClass: "toast-bottom-right" }),
    NgxSpinnerModule.forRoot({ type: "ball-scale-multiple" })
  ],
  exports: [
    TabsModule,
    DataTablesModule,
    ModalModule,
    ToastrModule,
    NgxSpinnerModule
  ]
})
export class SharedModule { }
