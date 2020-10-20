import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Foodstop } from 'src/app/interfaces/foodstop';
import { SharedService } from 'src/app/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-foodstops',
  templateUrl: './foodstops.component.html',
  styleUrls: ['./foodstops.component.scss'],
})
export class FoodstopsComponent implements OnInit {
  availableFoodstops: Foodstop[];
  foodstopsSubscription: Subscription;
  constructor(private sharedService: SharedService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.foodstopsSubscription = this.sharedService.foodstopsChanged.subscribe(
      (foodstops) => {
        this.availableFoodstops = foodstops;
      }
    );
    this.sharedService.getFoodstops();
  }

  onDialogOpen(foodstop: Foodstop) {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '450px',
      data: foodstop,
    });
  }
}
