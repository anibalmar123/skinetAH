import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity= 1;
  quantityInBasket = 0;

  constructor(private shopService: ShopService, private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService, private basketService: BasketService) {
      this.bcService.set('@productDetails', ' ');
    }

  ngOnInit(): void {
    this.loadProduct();
  }

  updateBasket(){
    if(this.product){
      if(this.quantity > this.quantityInBasket){
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.product, itemsToAdd);
      }else{
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
      }
    }
  }

  get buttonText(){
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if(this.quantity > 0){
      this.quantity--;
    }
  }

  loadProduct() {
    const id = +this.activateRoute.snapshot.paramMap.get('id');
    this.shopService.getProduct(id).subscribe({
      next: product => 
      {
        this.product = product;
        this.bcService.set('@productDetails', this.product.name);
        this.basketService.basket$.pipe(take(1)).subscribe({
          next: basket => {
            const item = basket.items.find(x => x.id === id);
            if(item){
              this.quantity = item.quantity;
              this.quantityInBasket = item.quantity;
            }
          }
        })
      },
      error: e => console.log(e),
      complete: () => console.info('complete individual product')
    });
  }

}
