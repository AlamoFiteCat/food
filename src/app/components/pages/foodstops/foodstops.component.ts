import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Foodstop } from 'src/app/interfaces/foodstop';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-foodstops',
  templateUrl: './foodstops.component.html',
  styleUrls: ['./foodstops.component.scss'],
})
export class FoodstopsComponent implements OnInit {
  availableFoodstops: Foodstop[];
  foodstopsSubscription: Subscription;
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.foodstopsSubscription = this.sharedService.foodstopsChanged.subscribe(
      (foodstops) => {
        console.log(foodstops);
        this.availableFoodstops = foodstops;
      }
    );
    this.sharedService.getFoodstops();
  }
}
