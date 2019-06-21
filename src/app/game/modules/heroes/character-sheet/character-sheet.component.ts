import {Component, Input, OnInit} from '@angular/core';
import {AffinitiesDictionary} from '../../../common/dicts/affinities.dict';
import {EquipmentSlotsDict} from '../../../common/dicts/misc.dict';
import {SkillsDictionary} from '../../../common/dicts/skills.dict';
import {IAffinityList, IBackstory} from '../../../common/interfaces/hero/hero.interface';
import {ISkillList} from '../../../common/interfaces/skills/skills.interface';
import {ItemService} from '../../../common/services/item/item.service';
import {PartyService} from '../../party/party.service';
import {Hero} from '../models/hero.model';

@Component({
	selector:    'character-sheet',
	templateUrl: './character-sheet.component.html',
	styleUrls:   ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit {
	@Input('hero') hero: Hero;
	@Input('readOnly') readOnly: boolean = false;

	public equipmentSlots: typeof EquipmentSlotsDict = EquipmentSlotsDict;
	public backstory: IBackstory                     = null;
	public skills: ISkillList                        = SkillsDictionary;
	public affinities: IAffinityList                 = AffinitiesDictionary;

	constructor(private partyService: PartyService, public itemService: ItemService) {

	}

	ngOnInit() {

	}

	unequipItem(slot: string) {
		this.partyService.sendUnequipItemPacket(this.hero.heroID, slot);
	}
}
