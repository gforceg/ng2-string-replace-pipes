// greg hedin
// automatically create hyperlinks where http:// and https:// is present in a string.

import { Pipe, PipeTransform } from '@angular/core';
import { StringReplaceTemplatePipe } from './string-replace.pipe';

@Pipe({ name: 'url' })
export class UrlPipe implements PipeTransform {
  private target: string = '';
  replace = (url: string): string => {
    return '<a href="' + url + '" target="' + this.target + '">' + url + '</a>';
  }

  transform(stringIn: string, target: string = ''): string {
    let stringReplacePipe = new StringReplaceTemplatePipe();
    let stringOut = stringIn;
    this.target = target;
    return stringReplacePipe.transform(stringOut, [/https?:\/\/\S+/], this.replace);
  }
}
