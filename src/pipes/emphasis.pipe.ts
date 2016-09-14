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

  transform(str: string, words: RegExp[], flags: string = 'i'): string {
    return new StringReplaceTemplatePipe().transform(str, words, this.replace);
  }
}
