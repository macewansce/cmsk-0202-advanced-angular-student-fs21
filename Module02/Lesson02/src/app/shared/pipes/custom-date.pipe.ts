import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): Date {
    var customDate = new Date(value.match(/\d+/)[0] * 1);  
    return  customDate;
  }

}
