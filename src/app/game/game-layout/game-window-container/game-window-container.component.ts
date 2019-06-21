import {
	AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
	ViewContainerRef
} from '@angular/core';
import {GameWindowRef} from '../game-layout.interface';
import {DynamicWindowSettings} from '../game-window-host/dynamic-window.class';
import * as _ from 'lodash';

@Component({
	selector:    'game-window-container',
	templateUrl: './game-window-container.component.html',
	styleUrls:   ['./game-window-container.component.scss']
})
export class GameWindowContainerComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild('contentContainer', {read: ViewContainerRef}) contentContainer: ViewContainerRef;

	@Output('onShow') onShow: EventEmitter<any> = new EventEmitter<any>();
	@Output('onHide') onHide: EventEmitter<any> = new EventEmitter<any>();

	@Input('settings') settings: DynamicWindowSettings = {
		draggable: true
	};

	showOverflow: boolean = false;
	visible: boolean      = false;
	windowRef: GameWindowRef;

	startX: number = 0;
	startY: number = 0;

	constructor() {

	}

	ngOnInit() {
		//Adjust the window position to center-screen plus some randomness to avoid stacking windows on top of one another
		if (this.settings.width) this.startX = -Math.floor(this.settings.width / 2) + _.random(0, 35);
		if (this.settings.height) this.startY = -Math.floor(this.settings.height / 2) + _.random(0, 35);
	}

	ngAfterViewInit() {
		//setTimeout here allows us to have a fade-in animation
		setTimeout(() => this.visible = true);
	}

	ngOnDestroy() {

	}

	close(event: Event) {
		this.visible = false;

		//200ms to allow fade-out animation to finish
		setTimeout(() => {
			this.onHide.emit();
		}, 200);
	}
}
