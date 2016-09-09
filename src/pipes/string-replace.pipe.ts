// greg hedin
// a string replacement pipe that uses the template method pattern.(https://en.wikipedia.org/wiki/Template_method_pattern)
// pipes can't inherit from pipes yet in angular2 so you'll have to wrap this pipe up programmatically like this:
/* 
  replace(section: string): string {
    return '<strong>' + section + '</strong>';
  }

  transform(stringIn: string, words: string[] ): string {
    let stringReplacePipe = new StringReplaceTemplatePipe();
    let stringOut = stringIn;
    return stringReplacePipe.transform(stringOut, words, true, this.replace);
  }
*/
// this is sort of an abstract, so it must be inherited from by another pipe
// attempting to use it directly will result in a MethodNotImplemented exception.
import { Pipe, PipeTransform } from '@angular/core';
import * as Collections from 'typescript-collections';

@Pipe({ name: 'stringreplacetemplate' })
export class StringReplaceTemplatePipe implements PipeTransform {

  // replace is a callback function that returns a replacement for each item in the symbols list
  transform(stringIn: string, patterns: RegExp[], replace: (symbol: string, pattern?: RegExp) => string): string {

    if (!replace) {
      console.log('StringReplaceTemplatePipe was not passed a replace function!');
      return stringIn;
    }

    // the output
    // un-trim stringOut to make RegExp's happy.
    let stringOut = ' ' + stringIn + ' ';

    interface IMatch {
      mString: string;
      expr: RegExp;
    }

    let allMatches: Collections.Dictionary<number, IMatch[]> = new Collections.Dictionary<number, IMatch[]>();
    // iterate through each regexp and add each match and its regexp to the collection dictionary
    // after all matches are catalogued, iterate thru them. If any of them occupy the same substring
    // keep the longest one. Otherwise, keep the first one in the list.
    patterns.forEach(exp => {
      // do not match anything wrapped in a tag.  (be idempotent)
      let regex = new RegExp('[^>"\']' + exp.source + '[^<"\']', 'gi');
      // console.log('srp expression: ' + regex.source);
      let result: RegExpExecArray;
      result = regex.exec(stringOut);
      let counter = 0;
      let count_limit = 100;
      if (result) {
        do {
          if (counter === count_limit) {
            console.log('***stringStringReplaceTemplatePipe*** count limit reached! There might be an infinite loop. break;');
            break;
          }
          let start = result.index + 1;

          // let end = regex.lastIndex;
          let length = regex.lastIndex - start;
          let replacement = stringOut.substr(start, length - 1);

          // lazy cache each match
          if (!allMatches.getValue(start)) { allMatches.setValue(start, []); }
          allMatches.getValue(start).push({ mString: replacement, expr: exp });

          result = regex.exec(stringOut);
          counter++;
        } while (result);
      }
    });


    let offset = 0;
    // each key is an index in stringOut that matches a specified regexp.
    // iterate through them in order from lowest to highest index (this is crucial)
    // if two or more have the same index, use the one with more length.
    // if two or more have the same length, use the one you found first.
    // the replacement string will have a different length than the original string
    // offset the next string in keys by this difference.
    // rinse and repeat

    // let sortKeys = (a: , b: string) => { return parseInt(a) > parseInt(b); }
    let compareKeys = (a:number, b:number) => { return a - b; }

    // console.dir(allMatches);
    // console.dir(allMatches.keys());
    // allMatches.keys().sort(compareKeys).forEach(
    //   k => { allMatches.getValue(k).forEach(
    //     m => console.log(m.mString + ' @ index: ' + k)); });

    

    allMatches.keys().sort(compareKeys).forEach((i) => {
      let match: IMatch = null;
      let matches: IMatch[] = allMatches.getValue(i);
      // resolve the longest match
      if (matches.length > 1) {
        matches.forEach((m) => {
          if (!match) {
            match = m;
          } else if (match.mString.length < m.mString.length) { match = m; }
        });
      } else { match = matches[0]; }
      let start = i + offset;

      let overlap: boolean = false;
      // if there is a match somewhere in the range of this string
      // resolve it, otherwise, go ahead and replace it
      for (let k = i + 1; k < match.mString.length; k++) {
        if (allMatches.getValue(k)) { overlap = true; break; }
      }
      if (!overlap) {

        let toBeReplaced = stringOut.substr(start, match.mString.length);
        let replacement = replace(match.mString, match.expr);
        offset += (replacement.length - toBeReplaced.length);
        // let replacement = replace();
        stringOut = stringOut.substr(0, start) + replacement + stringOut.substr(start + toBeReplaced.length);
      } else {
        // if they overlap, don't make any changes to stringOut.
        // the problem could be w/ the RegExp or the policy naming convention...
        console.log('there was overlap and I don\'t know how to handle those kinds of things! -- StringReplacePipe. You might want to hire a better programmer!');
      }
    });

    return stringOut;
  }

}
