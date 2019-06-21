export interface IStatList {
	str: number;
	int: number;
	dex: number;
	con: number;
	luk: number;
}

export interface IVitality {
	health: [number, number];
	stamina: [number, number];
	mana: [number, number];
	exp?: [number, number];
}