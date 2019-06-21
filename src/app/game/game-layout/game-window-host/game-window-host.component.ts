import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {GameLayoutService} from '../game-layout.service';

@Component({
	selector:    'game-window-host',
	templateUrl: './game-window-host.component.html',
	styleUrls:   ['./game-window-host.component.scss']
})
export class GameWindowHostComponent implements OnInit {
	@ViewChild('windowContainer', {
		read: ViewContainerRef
	}) windowContainer: ViewContainerRef;

	constructor(private viewContainerRef: ViewContainerRef, private layoutService: GameLayoutService) {
	}

	ngOnInit() {
		this.layoutService.setWindowHost(this.windowContainer);
	}

}
