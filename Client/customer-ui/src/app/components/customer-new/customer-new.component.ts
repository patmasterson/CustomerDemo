import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrl: './customer-new.component.scss'
})
export class CustomerNewComponent implements OnInit {
  custForm: FormGroup;


  constructor(private fb: FormBuilder, private customerService: CustomerService, 
              private router: Router, private snackBar: MatSnackBar) {

    this.custForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: [''],
      email: [''],
      nickName: ['']
    })
  }

  ngOnInit(): void {

  }

  save() {
    let cust: Customer = this.custForm.value;

    this.customerService.saveCustomer(cust).subscribe({
      next: resp => {
        this.snackBar.open('Customer Created Sucessfully', '', {
          duration: 2000
        });
        this.router.navigateByUrl('customers');
      },
      error: err => {
        this.snackBar.open('An error occurred', '', {
          duration: 2000
        });
        console.log(err);
      }
    })
  }

  cancel() {
    this.router.navigateByUrl('customers');
  }
}
