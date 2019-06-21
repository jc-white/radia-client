import {ElementRef, Type} from '@angular/core';
import * as _ from 'lodash';
import {Dictionary} from 'lodash';

export interface DynamicWindowSettings {
	width?: number;
	height?: number;
	responsive?: boolean;
	window?: boolean;
	draggable?: boolean;
	showOverflow?: boolean;
	label?: string;
	header?: string;
	bounds?: ElementRef;
}

export interface DynamicWindowProperties {
	settings?: DynamicWindowSettings;
	inputs?: { [inputName: string]: any };
	providers?: Dictionary<any>;
}

export class DynamicWindow {
	public id: string;

	private defaultWindowSettings = {
		width:        700,
		height:       null,
		responsive:   true,
		window:       true,
		draggable:    true,
		showOverflow: false
	};

	constructor(public component: Type<any>, public properties: DynamicWindowProperties) {
		this.properties.inputs    = this.properties.inputs || {};
		this.properties.settings  = _.defaults(properties.settings || {}, this.defaultWindowSettings);
		this.properties.providers = this.properties.providers || {};
	}
}