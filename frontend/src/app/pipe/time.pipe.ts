import { Pipe, PipeTransform } from '@angular/core';


/**
 * Pipe to format a date as a time string (HH:mm)
 * 
 */
@Pipe({
  name: 'time'
})

/**
 * TimePipe
 * 
 */
export class TimePipe implements PipeTransform {
  /**
   *  transform function por formater la date en heure
   * @param value 
   * @returns 
   */
  transform(value: string): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return value; // Return the original value if it's not a valid date
    }
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}