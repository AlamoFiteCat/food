import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { SharedService } from '../../../services/shared.service';
import { Company } from '../../../interfaces/company';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  companies: Observable<any>;
  companySubscription: Subscription;
  signupForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    ]),
    company: new FormControl(null, Validators.required),
  });

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.companies = this.sharedService.getCompanies();
  }

  onRegisterSubmit() {
    this.authService.register({ ...this.signupForm.value });
  }
}
