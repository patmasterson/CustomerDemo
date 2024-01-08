import { HttpClient } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Customer } from '../models/customer.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getCustomers() {
    console.log('getCustomers');
    return this.http.get<Customer[]>(`${this.baseUrl}/api/customer`);
  }

  getCustomer(customerId: number) {
    return this.http.get<Customer>(`${this.baseUrl}/api/customer/${customerId}`);
  }

  saveCustomer(customer: Customer) {
    if (customer.id > 0) {
      return this.http.put<Customer>(`${this.baseUrl}/api/customer/${customer.id}`, customer);
    } else {
      return this.http.post<Customer>(`${this.baseUrl}/api/customer`, customer);
    }
  }

  toDateTimeFormat(date: string) {
    return this.datePipe.transform(date, 'MM/dd/yyyy h:mm:ss');
  }

}
