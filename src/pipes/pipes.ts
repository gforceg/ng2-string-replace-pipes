export * from './propercase.pipe';
export * from './title.pipe';
export * from './emphasis.pipe';
// export * from './policynet.pipe';
export * from './string-replace.pipe';
export * from './url.pipe';

import {ProperCasePipe} from './propercase.pipe';
import {TitleCasePipe} from './title.pipe';
import {EmphasisPipe} from './emphasis.pipe';
import {StringReplaceTemplatePipe} from './string-replace.pipe';
// import {PolicynetPipe} from './policynet.pipe';
import {UrlPipe} from './url.pipe';


// some shared functionality
export const NG_POLICYNET_PIPES = [ProperCasePipe, TitleCasePipe, EmphasisPipe, /*PolicynetPipe,*/ StringReplaceTemplatePipe, UrlPipe ];

