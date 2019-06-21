import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {NgArrayPipesModule, NgObjectPipesModule, NgStringPipesModule} from 'ngx-pipes';
import {GameCommonModule} from '../../../common/game-common.module';
import {TraitLabelModule} from '../../../common/trait-label/trait-label.module';
import {CharacterSheetComponent} from './character-sheet.component';

@NgModule({
	imports:         [
		CommonModule,
		GameCommonModule,
		NgbTabsetModule,
		NgObjectPipesModule,
		NgStringPipesModule,
		NgArrayPipesModule,
		TraitLabelModule
	],
	declarations:    [
		CharacterSheetComponent
	],
	exports:         [
		CharacterSheetComponent
	],
	entryComponents: [
		CharacterSheetComponent
	]
})
export class CharacterSheetModule {
}
