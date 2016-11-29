import { NgModule } from '@angular/core';
import { StringReplaceTemplatePipe, EmphasisPipe, ProperCasePipe, TitleCasePipe, UrlPipe } from './index';

@NgModule({
    imports: [],
    exports: [EmphasisPipe, ProperCasePipe, TitleCasePipe, UrlPipe, StringReplaceTemplatePipe],
    declarations: [EmphasisPipe, ProperCasePipe, TitleCasePipe, UrlPipe, StringReplaceTemplatePipe],
   providers: [],
})
export class StringReplacePipesModule { }
