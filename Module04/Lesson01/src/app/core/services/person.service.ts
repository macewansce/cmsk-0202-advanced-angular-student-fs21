import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  getPerson() {
    return PERSON;
  }
}

const PERSON = [{
  id: 1,
  firstName: 'Allan',
  lastName: 'Levsen',
  address: '123 Jasper Avenue',
  city: 'Calgary',
  province: 'Alberta',
  phone: '7801231234',
  lastUpdated: new Date('December 12, 2021 10:13:11')
},
{
  id: 2,
  firstName: 'Hammad',
  lastName: 'Tawfig',
  address: '123 Jasper Avenue',
  city: 'Edmonton',
  province: 'Alberta',
  phone: '7804445555',
  lastUpdated: new Date('December 15, 2021 13:13:11')
}];
