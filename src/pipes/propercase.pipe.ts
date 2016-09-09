// greg hedin
// capitalize abbreviations and the first word of each sentence.
// fixme: allow the user to pipe in a series of domain specific acronyms.
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'propercase' })
export class ProperCasePipe implements PipeTransform {
  transform(stringIn: string): string {
    // the output
    var stringOut = '';
    // fixme: this removes duplicate strings... which should probably be its own pipe!
    // var words = stringIn.split(/\s/);
    // words.forEach ((word) => { stringOut += word[0].toUpperCase() + word.substr(1) + ' '; });
    // match the
    stringOut = stringIn;
    // a bunch of regexp.
    // 1. They must be wrapped in a single subexpression for the code to operate on them correctly.
    // capitalize the first letter of a string, and the letters in an abbreviation.
    //                1st char              abbreviations        
    let expressions = [/^(?:[a-z])/g, /(?:[a-z][.]){2,}/ig];
    expressions.forEach(regex => {
      // console.log(regex.lastIndex);
      let result: RegExpExecArray;
      result = regex.exec(stringOut);
      if (result) {
        do {
          let start = result.index;
          let end = regex.lastIndex;
          let length = regex.lastIndex - start;
          let capitalizedLetters = stringOut.substr(start, length).toUpperCase();
          // console.log('capitalized *************** "' + capitalizedLetters + '"');
          // console.log(result[0] + ' from ' + start + ' to ' + end + ' length of ' + length);
          stringOut = stringOut.substr(0, start) + capitalizedLetters + stringOut.substring(end);
          result = regex.exec(stringOut);
        } while (result);
      }
    });

    return stringOut;
  }

}
