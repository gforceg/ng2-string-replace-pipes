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

```html
<h1>Emphasis Works!</h1>
<pre [innerHtml]="templateString | emphasis:emphasisWords"></pre>
```
