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

  isStep1Visible: boolean = false;
  isStep2Visible: boolean = false;
  isStep3Visible: boolean = false;
    
  step1Msg: string = "Step 1";
  step2Msg: string = "Step 2";
  step3Msg: string = "Step 3";

  cardNumber: string = "";
  providers: ProviderViewDto[] = [];
  providerId: number = 0;

  ngOnInit(): void {
    this.getCardProviders();
  }

  submit(){
    this.reset();    
    if(this.startValidation()){
      this.create();
    }
  }

  private create(){
   
    const newCard = new CreditCardCreateDto(this.cardNumber, this.providerId);

    this.creditCardService.createCard(newCard).subscribe(data=>{

      if(data === true)
      {
        this.showSuccess("Credit Card", `${newCard.cardNumber} has been saved`);
        setTimeout(()=>{
          this.router.navigate(['vc']);
        },2000);
      }
    }, err=>{
      this.showError("Credit Card", `Error saving credit card - ${err.error}`);
      this.router.navigate(['home']);
    });
  
  }

  private getProviderId(){
   
    const creditCardNumber = this.cardNumber;
    let id = 0;

    this.providers.forEach(x=>{
      var delimiter = x.delimiter.toString();
      var delimiterLength = delimiter.toString().length;
      var creditCardDelimiter = creditCardNumber.substring(0,delimiterLength);

      if(delimiter === creditCardDelimiter){
        id = x.id;
      }else{
        id = -1;
      }
    })

    return id;
  }

  private runstepOne(){   
    
    let result: boolean = false;

    try{
      this.step1Msg = "Checking Card Length";
      if(this.cardNumber.length === 0){
        this.step1Msg = "Invalid card length";
        result = false;
      }else if(this.cardNumber.length > 0){
        this.step1Msg = "Passed";
        result = true;
      }
    }
    catch(ex){
      console.log(ex);
    }
    return result;
  }

  private runStepTwo(){

    let result: boolean = false;

    try{
      let maxLength = this.getProviderMaxLength();
      if(maxLength == 0){
        return false;
      }        
      
      this.step2Msg = "Checking Card Length";
      if(this.cardNumber.length > maxLength){
        this.step2Msg = "Validation failed. Invalid Card Length";
        result = false;
      }else{
        result = true;
      }
    }
    catch(ex){
      console.log(ex);
    }

    return result;
  }

  private runStepThree(){   
    
    try {

      this.step3Msg = "Retrieving provider id";
      this.providerId = this.getProviderId();  
      if(this.providerId === -1){
        return false;
      }else{
        return true;
      }
    }
    catch(ex){
      console.log(ex);
      return false;
    }
  }
  
  private stepOneValidation = () => {
   
     this.isStep1Visible = true;
     return this.runstepOne();
  }
  
  private stepTwoValidation(){
    
     this.isStep2Visible = true;
     return this.runStepTwo();     
  }
  
  private stepThreeValidation(){
    
    this.isStep3Visible = true;
 
    return this.runStepThree();       
  }
  
  private startValidation = () => {
    this.step1Msg = "Busy. Please wait...";
    let result = this.stepOneValidation();
    
    if(result === true){
      this.step1Msg="Complete";
    }else {
      return false;
    }

    result = this.stepTwoValidation();
    if(result === true){
      this.step2Msg="Complete";
    }else {
      return false;
    }

    result = this.stepThreeValidation();
    if(result === true){
      this.step3Msg="Complete";
    }else {
      return false;
    }

    return true;
  }

  private reset(){
    this.isStep1Visible = false;
    this.isStep2Visible = false;
    this.isStep3Visible = false;
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

  private getCardProviders(){
    this.cardProviderService.getAll().subscribe(data => {
      this.providers = data as ProviderViewDto[];    
    });
  }

  private getProviderMaxLength(){
   
    const creditCardNumber = this.cardNumber;
    let maxLength: number = 0;
    let id = 0;

    this.providers.forEach(x=>{
      var delimiter = x.delimiter.toString();
      var delimiterLength = delimiter.toString().length;
      var creditCardDelimiter = creditCardNumber.substring(0,delimiterLength);

      if(delimiter === creditCardDelimiter){
         maxLength = x.nrOfDigits;
      }
    });   

    return maxLength;
  }
}

