import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBasketItem } from '../../models/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Output() addItem = new EventEmitter<IBasketItem>();
  @Output() removeItem = new EventEmitter<{id: number, quantity: number}>();
  @Input() isBasket = true;
  
  constructor(public basketService: BasketService) { }

  ngOnInit(): void {
  }

  addBasketItem(item: IBasketItem){
    this.addItem.emit(item);
  }

  removeBasketItem(id: number, quantity = 1){
    this.removeItem.emit({id, quantity});
  }
}
