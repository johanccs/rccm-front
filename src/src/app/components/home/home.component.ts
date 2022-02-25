import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CreditCardCreateDto } from 'src/app/models/creditcard-create-dto';
import { CreditCardService } from 'src/app/services/CardProviders/creditcard.service';
import { MessageService } from 'primeng/api';
import { CardProviderService } from 'src/app/services/CardProviders/cardprovider.service';
import { ProviderViewDto } from 'src/app/models/provider-view-dto';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ MessageService ]
})
export class HomeComponent implements OnInit {

  @ViewChild('newCreditCardForm') public createCreditCardForm: NgForm

  constructor(
    private creditCardService: CreditCardService, 
    private cardProviderService: CardProviderService,
    private messageService: MessageService,
    private router: Router) { }

  isStep1Vis: boolean = false;
  isStep2Vis: boolean = false;
  isStep3Vis: boolean = false;
    
  step1Msg: string = "Step 1";
  step2Msg: string = "Step 2";
  step3Msg: string = "Step 3";

  cardNumber: string = "";
  maxLength: number = 16;
  providers: ProviderViewDto[] = [];
  tempProviderId: number = 0;

  ngOnInit(): void {
  }

  submit(){
    this.reset();    
    if(this.startValidation()){
      this.create();
    }
  }

  private create(){

    this.cardProviderService.getAll().subscribe(data => {
      this.providers = data as ProviderViewDto[];
      console.log(this.providers);
      this.tempProviderId = this.getProviderId("mastercard");
   
    const newCard = new CreditCardCreateDto(this.cardNumber, this.tempProviderId);

    this.creditCardService.createCard(newCard).subscribe(data=>{

      if(data === true)
      {
        this.showSuccess("Credit Card", `${newCard.cardNumber} has been saved`);
        setTimeout(()=>{
          this.router.navigate(['vc']);
        },2000);
      }
    }, err=>{
      this.showError("Credit Card", `Error saving credit card - ${err.message}`);
      this.router.navigate(['home']);
    });
  });
  }

  private getProviderId(name: string){
    let id = 0;
    this.providers.forEach(e => {
      if(e.name.toLowerCase().includes(name.toLowerCase())){
        id = e.id;
      }else{
        id = -1;
      }
    });

    return id;
  }

  private runstepOne(){   
    
    try
    {
      this.step1Msg = "Checking Card Provider";
      if(this.cardNumber.length === 0){
        this.step1Msg = "Invalid card length";
        return false;
      }else if(this.cardNumber.length > 0){
        this.step1Msg = "Passed";
        return true;
      }
    }
    catch(ex){
      console.log(ex);
    }
    return false;
  }

  private runStepTwo(){

    if(this.cardNumber.length > this.maxLength){
      this.step2Msg = "Validation failed. Invalid Card Length";
      return false;
    }else{
      return true;
    }
  }

  private runStepThree(){   
    return true;
  }
  
  private stepOneValidation = () => {
    return new Promise((resolve,reject)=>{
     this.isStep1Vis = true;

     if(this.runstepOne()){
       resolve(true);
     }else{
       reject(false);
     }});   
  }
  
  private stepTwoValidation(){
     return new Promise((resolve,reject)=>{
     this.isStep2Vis = true;

     if(this.runStepTwo()){       
      resolve(true);
     }else{
       reject(false);
     }});   
  }
  
  private stepThreeValidation(){
    return new Promise((resolve,reject)=>{
      this.isStep3Vis = true;
 
      if(this.runStepThree()){
       resolve(true);
      }else{
        reject(false);
      }});   
  }
  
  private startValidation = async() => {
    this.step1Msg = "Busy. Please wait...";
    let result = await this.stepOneValidation();
    
    if(result === true){
      this.step1Msg="Complete";
    }

    result = await this.stepTwoValidation();
    if(result === true){
      this.step2Msg="Complete";
    }

    result = await this.stepThreeValidation();
    if(result === true){
      this.step3Msg="Complete";
    }

    return true;
  }

  private reset(){
    this.isStep1Vis = false;
    this.isStep2Vis = false;
    this.isStep3Vis = false;
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

