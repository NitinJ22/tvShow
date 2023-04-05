import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summaryFilter'
})
export class SummaryFilterPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if(value.includes("<p>")){
      value = value.replace("<p>", "").replace("</p>","");
    }
    if(value.includes("<b>")){
      value = value.replace("<b>", "").replace("</b>","");
    }
    if(value.includes("<i>")){
      value = value.replace("<i>", "").replace("</i>","");
    }
    return value;

  }

}
