export interface IPartyResourceDictEntry {
	name: string;
	varName: string;
	icon: string;
	description: string;
}

export interface IPartyResourceDict {
	[key: string]: IPartyResourceDictEntry
}


export const ResourcesDict: IPartyResourceDict = {
	gold: {
		name:        'Gold',
		varName:     'gold',
		icon:        'gold',
		description: 'The basic currency of Radia which is accepted nearly everywhere.'
	},

	meals: {
		name:        'Meals',
		varName:     'meals',
		icon:        'meals',
		description: 'A single meal sustains a single party member for 0.5 days of travel.'
	},

	wood: {
		name:        'Wood',
		varName:     'wood',
		icon:        'wood',
		description: 'Raw wood used for building fires or light construction.'
	}
};