import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProviderViewDto } from 'src/app/models/provider-view-dto';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddProvidersComponent } from '../add-providers/add-providers.component';

@Component({
  selector: 'app-display-providers',
  templateUrl: './display-providers.component.html',
  styleUrls: ['./display-providers.component.scss'],
  providers: [DialogService]
})
export class DisplayProvidersComponent implements OnInit, OnDestroy {

  providers: ProviderViewDto[] = [];
  ref: DynamicDialogRef;

  constructor(public dialogService: DialogService) { }
  
  ngOnDestroy(): void {
    if(this.ref){
      this.ref.close();
    }
  }

  ngOnInit(): void {
    this.loadProviders();
  }

  private loadProviders(){
    this.providers = [
      new ProviderViewDto("Visa", 6),
      new ProviderViewDto("MasterCard", 5),
      new ProviderViewDto("Diners", 6),
    ];
  }

  show(){
    this.ref=this.dialogService.open(AddProvidersComponent, {
      header: 'Add new Credit Card Provider',
      width: '30rem'
    });
  }
}
