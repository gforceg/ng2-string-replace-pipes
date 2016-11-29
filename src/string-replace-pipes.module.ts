import { NgModule } from '@angular/core';
import { StringReplaceTemplatePipe  } from './pipes/string-replace.pipe';
import { EmphasisPipe } from './pipes/emphasis.pipe';
import { ProperCasePipe } from './pipes/propercase.pipe';
import { TitleCasePipe } from './pipes/title.pipe';
import { UrlPipe } from './pipes/url.pipe';

@NgModule({
    imports: [],
    exports: [EmphasisPipe, ProperCasePipe, TitleCasePipe, UrlPipe, StringReplaceTemplatePipe],
    declarations: [EmphasisPipe, ProperCasePipe, TitleCasePipe, UrlPipe, StringReplaceTemplatePipe],
   providers: [],
})
export class StringReplacePipesModule { }
