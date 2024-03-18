import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  @Input() person: any;

  constructor() {
    console.log("PersonComponent: Constructor");
  }

  ngOnChanges() {
    console.log("PersonComponent: OnChanges");
  }

  ngOnInit() {
    console.log("PersonComponent: OnInit");
  }

  ngDoCheck() {
    console.log("PersonComponent: DoCheck");
  }

  ngAfterContentInit() {
    console.log("PersonComponent: AfterContentInit");
  }

  ngAfterContentChecked() {
    console.log("PersonComponent: AfterContentChecked");
  }

  ngAfterViewInit() {
    console.log("PersonComponent: AfterViewInit");
  }

  ngAfterViewChecked() {
    console.log("PersonComponent: AfterViewChecked");
  }

  ngOnDestroy() {
    console.log("AppComponent: OnDestroy");
  }



}
