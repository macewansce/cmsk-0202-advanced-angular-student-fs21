import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  getCustomers() {
    return CUSTOMERS;
  }
}

const CUSTOMERS = [{
  id: 1,
  companyName: 'Dreams Ltd.',
  contctName: 'Mr Boss',
  contactTitle: 'CEO',
  address: '123 Jasper Avenue',
  city: 'Calgary',
  province: 'Alberta',
  postalCode: 'T6G 2M4',
  country: 'Canada',
  phone: '7801233333',
  email: 'mr.boss@dreams.ltd',
  lastUpdated: new Date('December 19, 2020 10:13:11')
},
{
  id: 2,
  companyName: 'Dreams Ltd.',
  contctName: 'Mr Boss',
  contactTitle: 'CEO',
  address: '123 Jasper Avenue',
  city: 'Calgary',
  province: 'Alberta',
  postalCode: 'T6G 2M4',
  country: 'Canada',
  phone: '7801233333',
  email: 'mr.boss@dreams.ltd',
  lastUpdated: new Date('December 19, 2020 10:13:11')
}];
