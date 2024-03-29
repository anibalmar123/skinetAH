import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  
  constructor(public basketService: BasketService) { }

  ngOnInit(): void {
  }

  removeItem(event: {id: number, quantity: number}){
    this.basketService.removeItemFromBasket(event.id, event.quantity);
  }

  incrementQuantity(item: IBasketItem){
    this.basketService.addItemToBasket(item);
  }

}
