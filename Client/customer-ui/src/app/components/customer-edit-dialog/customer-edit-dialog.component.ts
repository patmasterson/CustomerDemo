import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../models/customer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-customer-edit-dialog',
  templateUrl: './customer-edit-dialog.component.html',
  styleUrl: './customer-edit-dialog.component.scss'
})
export class CustomerEditDialogComponent {
  data = new Customer();
  custForm: FormGroup;


  constructor(private dialogRef: MatDialogRef<CustomerEditDialogComponent>, private fb: FormBuilder,
        @Inject(DIALOG_DATA) public customer: Customer) {

    this.data = customer;

    this.custForm = this.fb.group({
      id: [customer.id],
      firstName: [customer.firstName, Validators.required],
      lastName: [customer.lastName],
      email: [customer.email, Validators.email],
      nickName: [customer.nickName]
    })

    console.log(customer.id);

    this.initForm();
  }

  initForm() {
    this.custForm.controls['firstName'].setValue(this.data.firstName);
    this.custForm.controls['lastName'].setValue(this.data.lastName);
    this.custForm.controls['nickName'].setValue(this.data.nickName);
    this.custForm.controls['email'].setValue(this.data.email);
  }

  save() {
    let cust = new Customer();
    cust = this.custForm.value;

    console.log(this.custForm);

    this.dialogRef.close(cust);
  }

  cancel() {
    this.dialogRef.close();
  }
}
