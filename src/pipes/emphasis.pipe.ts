// greg hedin
// embolden text that should be emphasised semantically.
// wraps StringReplaceTemplatePipe and passes in a replace method.

import { Pipe, PipeTransform } from '@angular/core';
import { StringReplaceTemplatePipe } from './pipes';

@Pipe({ name: 'emphasis' })
export class EmphasisPipe implements PipeTransform {

  replace(section: string): string {
    return '<strong>' + section + '</strong>';
  }

  transform(stringIn: string, words: string[], flags: string = 'i'): string {
    let regex_words: RegExp[] = [];
    words.forEach(word => regex_words.push(new RegExp(word)));
    let stringReplacePipe = new StringReplaceTemplatePipe();
    let stringOut = stringIn;
    return stringReplacePipe.transform(stringOut, regex_words, this.replace);
  }
}
