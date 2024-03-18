import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRedFlag]'
})
export class RedFlagDirective {

  constructor(private elRef: ElementRef) {
    this.elRef.nativeElement.style.backgroundColor = 'red';
   }

}
