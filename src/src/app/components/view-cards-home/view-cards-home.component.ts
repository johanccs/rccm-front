import { Component, OnInit } from '@angular/core';
import { CreditCardViewDto, ICreditCardView } from 'src/app/models/creditcard-view-dto';
import { ConfirmationService,MessageService } from 'primeng/api';
import { CreditCardService } from 'src/app/services/CardProviders/creditcard.service';
import { CreditCardDeleteDto } from 'src/app/models/creditcard-delete-dto';

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards-home.component.html',
  styleUrls: ['./view-cards-home.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ViewCardsHomeComponent implements OnInit {

  cards: ICreditCardView[] = [];
  displayColumns: string[] = ["cardNumber", "provider"]
 
  constructor(
    private confirmationService: ConfirmationService,
    private creditCardService: CreditCardService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadCreditCards();
  }

  private loadCreditCards(){
    this.creditCardService.getAll().subscribe(data=>{
      this.cards = data as ICreditCardView[];
    });
  }

  public confirmDelete(event: Event, entity: CreditCardDeleteDto){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete the record?',
      icon: 'pi pi-exclamation-triangle',
      accept: ()=>{
        this.deleteCreditCard(entity);        
      },
      reject: ()=>{
        this.showInfo("Delete Provider", "Action canceled by user");
      }
    });
  }

  private deleteCreditCard(entity: CreditCardDeleteDto){
    this.creditCardService.deleteCard(entity.id).subscribe(data=>{
      if(data === true){
        this.showSuccess("Card deleted", `Card ${entity.cardNumber} deleted successfully`);
        this.loadCreditCards();
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
