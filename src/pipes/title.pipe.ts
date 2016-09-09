// greg hedin
// the title pipe capitalizes each word in a string
// a side effect of this poorly written code is that it replaces multiple spaces w/ a single space.
// wait... it's not a bug... ITS A FEATURE!! :D
// fyi: this can be achieved with css: ".title { text-transform: capitalize }"

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'titlecase'})
export class TitleCasePipe implements PipeTransform {
  transform(stringIn: string): string {
    // the output
    var stringOut = '';
    // fixme: this removes duplicate strings... which should probably be its own pipe!
    var words = stringIn.split(/\s/);
    words.forEach ((word) => { stringOut += word[0].toUpperCase() + word.substr(1) + ' '; });
    return stringOut;
  }
}


