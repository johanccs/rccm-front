import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProviderViewDto } from 'src/app/models/provider-view-dto';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddProvidersComponent } from '../add-providers/add-providers.component';
import { CardProviderService } from 'src/app/services/CardProviders/cardprovider.service';
import { ProviderDeleteDto } from 'src/app/models/provider-delete-dto';

@Component({
  selector: 'app-display-providers',
  templateUrl: './display-providers.component.html',
  styleUrls: ['./display-providers.component.scss'],
  providers: [DialogService]
})
export class DisplayProvidersComponent implements OnInit, OnDestroy {

  providers: ProviderViewDto[] = [];
  ref: DynamicDialogRef;

  constructor(
    public dialogService: DialogService, 
    private cpService: CardProviderService) { }
  
  ngOnDestroy(): void {
    if(this.ref){
      this.ref.close();
    }
  }

  ngOnInit(): void {
    this.loadProviders();
  }

  private loadProviders(){
   
    this.cpService.getAll().subscribe(data=> {
      this.providers = data as ProviderViewDto[];
    });

  }

  show(){
    this.ref=this.dialogService.open(AddProvidersComponent, {
      header: 'Add new Credit Card Provider',
      width: '37rem'
    });
  }

  deletePRovider(entity: ProviderDeleteDto){
    this.cpService.delete(entity.id).subscribe(data=>{
      console.log(data);
    });
  }

}
