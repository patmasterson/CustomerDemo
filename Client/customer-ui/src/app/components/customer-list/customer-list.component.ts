import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CustomerEditDialogComponent } from '../customer-edit-dialog/customer-edit-dialog.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit, AfterViewInit {
  customers: Customer[] = [];
  displayedColumns: string[] = ['edit', 'firstName', 'lastName', 'nickName', 'email', 'createdDate', 'lastUpdatedDate'];
  selectedCustomer: Customer | undefined;

  
  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router, 
      private dialog: MatDialog) {
    
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe({
      next: data => {
        this.customers = data;
        console.log(data);

        // check session storage for last selected user
        let id = sessionStorage.getItem('lastSelectedCustomer');
        if (id && id !== '') {
          let customerId: number = +id;

          let selected = this.customers.find(x => x.id === customerId);
          if (selected && selected !== undefined) {
            this.selectedCustomer = selected;
          }
        }

      }, 
      error: err => console.log(err)
    })
  }
  public rowClick(e: any) {
    console.log(e);
    this.selectedCustomer = e;
    if (this.selectedCustomer) {
      var selectedId = this.selectedCustomer.id + '';
      sessionStorage.setItem('lastSelectedCustomer', selectedId);
    }
    
  }

  onNewClick() {
    this.router.navigateByUrl('customers/new');
  }

  editCustomer(e: any) {
    console.log(e);
    this.selectedCustomer = e;

    const dialogRef = this.dialog.open(CustomerEditDialogComponent, {
      height: "550px",
      width: "400px",
      data: this.selectedCustomer
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let customer = new Customer();
        customer = result;
        this.customerService.saveCustomer(customer).subscribe({
          next: resp => {
            console.log(resp);
            this.getCustomers();
          },
          error: err => console.log(err)
        })
      }
    })

  }
}
