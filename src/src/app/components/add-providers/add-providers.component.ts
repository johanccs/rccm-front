import { Component, OnInit } from '@angular/core';
import { ProviderCreateDto } from 'src/app/models/provider-create-dto';
import { CardProviderService } from 'src/app/services/CardProviders/cardprovider.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProviderViewDto } from 'src/app/models/provider-view-dto';

@Component({
  selector: 'app-add-providers',
  templateUrl: './add-providers.component.html',
  styleUrls: ['./add-providers.component.scss'],
  providers: [MessageService]
})
export class AddProvidersComponent implements OnInit {

  newProvider: ProviderCreateDto;
  isBusy:boolean = false;

  constructor(
    private cardproviderService: CardProviderService, 
    private messageService: MessageService,
    private primeConfig: PrimeNGConfig, 
    private ref: DynamicDialogRef,
    private router: Router) { }

  ngOnInit(): void {
    this.newProvider = new ProviderCreateDto("",0,0);
    this.primeConfig.ripple = true;
  }

  createProvider(){
    this.isBusy = true;  
    
    if(!this.validate()){
      this.showError("Create Provider", "Invalid data. Try again...");
      this.reset();

      return false;
    }

    this.cardproviderService.create(this.newProvider).subscribe(data=>{     
      if((data as ProviderViewDto).id > 0){
        this.showSuccess("Card Provider", "New Provider Added");
        this.successRedirectTimeOut();
        this.isBusy = false;
      }
    },err=> {
      this.errRedirectTimout();
      this.isBusy = false;
    });

    return false;
  }

  private validate(){

    if(!this.newProvider) return false;

    if(this.newProvider.delimiter === 0) return false;

    if(this.newProvider.name.length === 0) return false;

    if(this.newProvider.nrOfDigits === 0) return false;

    return true;
  }

  private reset(){
    this.newProvider = new ProviderCreateDto("",0,0);
  }

  private showSuccess(summaryArg: string, detailArg: string){
    this.messageService.add({key: 't1', severity: 'success', summary: summaryArg, detail: detailArg});
  }

  private showError(summaryArg: string, detailArg: string){
    this.messageService.add({key: 't1', severity: 'error', summary: summaryArg, detail: detailArg});
  }

  private showBusy(){
    this.messageService.add({key: 't1', severity: 'warn', summary: 'Is  Busy', detail: 'Signing in. Please wait...'});
  }

  private successRedirectTimeOut(){
    setTimeout(()=>{
      this.ref.close();
    },2000);
  }

  private errRedirectTimout(){
    setTimeout(()=>{
      this.showError("Card Provider", "Error Connecting to backend");
      this.router.navigate(['cp']);
    },2000);
  }
}
