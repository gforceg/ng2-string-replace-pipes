import { NgModule } from '@angular/core';
import { EmphasisPipe, ProperCasePipe, TitleCasePipe, UrlPipe, StringReplaceTemplatePipe } from './index';

@NgModule({
    imports: [],
    exports: [EmphasisPipe, ProperCasePipe, TitleCasePipe, UrlPipe, StringReplaceTemplatePipe],
    declarations: [EmphasisPipe, ProperCasePipe, TitleCasePipe, UrlPipe, StringReplaceTemplatePipe],
   providers: [],
})
export class StringReplacePipesModule { }
