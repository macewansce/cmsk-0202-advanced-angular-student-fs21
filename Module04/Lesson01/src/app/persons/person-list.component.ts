import { Component, OnInit } from '@angular/core';
import { PersonService } from '../core/services/person.service';
import { TimeService } from '../core/services/time.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons: any;
  isDisplayPersonList: boolean = false;
  currentTime!: Date;

  constructor(private personService: PersonService, private timeService: TimeService) {

  }

  togglePersonList(): void {
    this.isDisplayPersonList = !this.isDisplayPersonList;
  }

  ngOnInit(): void {
    this.persons = this.personService.getPerson();
    this.timeService.getCurrentTime().subscribe(time => this.currentTime = time);
  }
}
