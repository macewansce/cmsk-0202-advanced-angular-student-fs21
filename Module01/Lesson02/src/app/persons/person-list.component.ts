import { Component, OnInit } from '@angular/core';
import { PersonService } from '../core/services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons: any;
  isDisplayPersonList: boolean = false;

  constructor(private personService: PersonService) {

  }

  togglePersonList(): void {
    this.isDisplayPersonList = !this.isDisplayPersonList;
  }

  ngOnInit(): void {
    this.persons = this.personService.getPerson();
  }
}
