# ng2-string-replace-pipes
a collection of handy string replacement pipes for angular 2.


#### StringReplacePipe
extending StringReplacePipe:

```typescript
// embolden text that should be emphasised semantically.
// wraps StringReplaceTemplatePipe and passes in a replace method.

import { Pipe, PipeTransform } from '@angular/core';
import { StringReplaceTemplatePipe } from './pipes';

@Pipe({ name: 'emphasis' })
export class EmphasisPipe implements PipeTransform {

  replace(section: string): string {
    return '<strong>' + section + '</strong>';
  }

  transform(str: string, words: RegExp[]): string {
    return new StringReplaceTemplatePipe().transform(str, words, this.replace);
  }
}
```

using the 
because the transform method in the above pipe takes an array of RegExp as a paremeter, it needs to be passed as a property

```typescript
import { Component, OnInit } from '@angular/core';
    @Component({
      moduleId: module.id,
      selector: 'app-emphasis',
      template: `
<h1>Emphasis Works!</h1>
<pre [innerHtml]="templateString | emphasis:emphasisWords"></pre>
      `
    })
    export class EmphasisComponent implements OnInit {

      // used in my template
      private emphasisWords: RegExp[] = [/for/, /and/, /or/];

      private templateString: string = `
for this and that do A.
for all other situations, do B.
don't forget, to do C if A and B both fail.
instructions can be found at http://www.wikipedia.org/wiki/RTFM
u.s.a p.r.c. u.s.a.a. a.a.r.p
`;
      ngOnInit() { }
    }
```
