import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProviderViewDto } from 'src/app/models/provider-view-dto';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService,MessageService } from 'primeng/api';
import { AddProvidersComponent } from '../add-providers/add-providers.component';
import { CardProviderService } from 'src/app/services/CardProviders/cardprovider.service';
import { ProviderDeleteDto } from 'src/app/models/provider-delete-dto';

@Component({
  selector: 'app-display-providers',
  templateUrl: './display-providers.component.html',
  styleUrls: ['./display-providers.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class DisplayProvidersComponent implements OnInit, OnDestroy {

  providers: ProviderViewDto[] = [];
  ref: DynamicDialogRef;
  isOffline: boolean = false;
  offLineMsg: string = "";

  constructor(
    private dialogService: DialogService, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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
    }, err=>{
      this.isOffline = true;
      this.offLineMsg = "Backend cannot be reached. Try again later...";
    });
  }

  show(){
    this.ref=this.dialogService.open(AddProvidersComponent, {
      header: 'Add new Credit Card Provider',
      width: '37rem'
    });

    this.ref.onClose.subscribe(()=>{
      this.loadProviders();
    });
  }

  confirmDelete(event: Event, entity: ProviderDeleteDto){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete the record?',
      icon: 'pi pi-exclamation-triangle',
      accept: ()=>{
        this.deleteProvider(entity);        
      },
      reject: ()=>{
        this.showInfo("Delete Provider", "Action canceled by user");
      }
    });
  }

  private deleteProvider(entity: ProviderDeleteDto){
    this.cpService.delete(entity.id).subscribe(data=>{
      if(data === true){
        this.loadProviders();
      }
    });
  }

  private showSuccess(summaryArg: string, detailArg: string){
    this.messageService.add({key: 't1', severity: 'success', summary: summaryArg, detail: detailArg});
  }

  private showInfo(summaryArg: string, detailArg: string){
    this.messageService.add({key: 't1', severity: 'info', summary: summaryArg, detail: detailArg});
  }

  private showError(summaryArg: string, detailArg: string){
    this.messageService.add({key: 't1', severity: 'error', summary: summaryArg, detail: detailArg});
  }

  private showBusy(){
    this.messageService.add({key: 't1', severity: 'warn', summary: 'Is  Busy', detail: 'Signing in. Please wait...'});
  }
}
