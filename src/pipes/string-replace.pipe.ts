// greg hedin

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
    // string out is the string we will process and return
    // pad stringOut so ReExp matches the edge words
    let stringOut = ' ' + stringIn + ' ';

    // a string and which regexp matched (this is passed back to the caller)
    interface IMatch {
      mString: string;
      expr: RegExp;
    }

    // 1. before any string replacement is done, find out where all of the expressions match
    // 2. if a match is found at stringIn[5], cache it in allMatches.getValue(5) (append it to an array of matches)
    // 3. now we know all of the matches that we found and we can determine which ones overlap with each other on stringIn
    let allMatches: Collections.Dictionary<number, IMatch[]> = new Collections.Dictionary<number, IMatch[]>();
    // 1.
    patterns.forEach(exp => {
      // do not match anything wrapped in a tag.
      let regex = new RegExp('[^>"\']' + exp.source + '[^<"\']', 'gi');
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
          let length = regex.lastIndex - start;
          let replacement = stringOut.substr(start, length - 1);

          // 2. cache matches
          if (!allMatches.getValue(start)) { allMatches.setValue(start, []); }
          allMatches.getValue(start).push({ mString: replacement, expr: exp });

          result = regex.exec(stringOut);
          counter++;
        } while (result);
      }
    });
    // 3. 

    // keep track of the offset of the next match as 
    // stringOut changes when matches are replaced with values of different lengths.
    // e.g. in the string 'do not forget to clock-out and do not forget to clock-in'
    // if 'do not' is to be replaced with '<strong>do not</strong>', then the second 'do not' will be offset by 17 ('<strong>'.length + '</strong>'.length)
    let offset = 0;

    let compareKeys = (a: number, b: number): number => { return a - b; }

    // 1. skip matches that overlap each other.
    //  e.g., if the strings 'or' and 'for' are to be replaced, don't replace the 'or' in the word 'for'
    //  (operate on [for], not on [f(or)])
    // do not replace the 'or' in 'for' (<strong>f<strong>or</strong></strong>)
    // 2. resolve the match (if there are multiple matches at the same index, go with the longest.)
    // 3. apply the replace() function
    // 4. record the prior key and prior length for step 1. in the next iteration.
    let prior_k = -1;
    let prior_length = -1;
    allMatches.keys().sort(compareKeys).forEach((_k) => {
      // 1. 
      if (_k >= prior_k && _k <= prior_length) {
        return;
      }
      let match: IMatch = null;
      let matches: IMatch[] = allMatches.getValue(_k);
      // 2.
      if (matches.length > 1) {
        matches.forEach((m) => {
          if (!match) {
            match = m;
          } else if (match.mString.length < m.mString.length) { match = m; }
        });
      } else { match = matches[0]; }
      // 3.
      let start = _k + offset;
      let toBeReplaced = stringOut.substr(start, match.mString.length);
      let replacement = replace(match.mString, match.expr);
      offset += (replacement.length - toBeReplaced.length);
      stringOut = stringOut.substr(0, start) + replacement + stringOut.substr(start + toBeReplaced.length);
      // 4.
      prior_k = _k;
      prior_length = _k + match.mString.length;
    });

    return stringOut;
  }

}
