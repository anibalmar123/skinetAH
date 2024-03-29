import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order?: IOrder;

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService,
    private orderService: OrdersService) { 
      this.breadcrumbService.set('@OrderDetailed', ' ');
    }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    id && this.orderService.getOrderDetailed(id)
      .subscribe({
        next: order => {
          this.order = order;
          this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
        },
        error: error => {
          console.log(error)
        }
      });
  }

}
