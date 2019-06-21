import {Component, Input, OnInit} from '@angular/core';
import {GameLayoutService} from '../game-layout.service';

@Component({
	selector:    'slide-panel',
	templateUrl: './slide-panel.component.html',
	styleUrls:   ['./slide-panel.component.scss']
})
export class SlidePanelComponent implements OnInit {
	@Input('direction') direction: 'left' | 'right' = 'left';
	@Input('size') size: 'small' | 'medium' | 'large' | 'huge' | 'absolute-unit' = 'medium';

	constructor(public gameLayoutService: GameLayoutService) {
	}

	ngOnInit() {
	}

	get isOpen() {
		return (this.direction == 'left' && this.gameLayoutService.leftPanelOpen) || (this.direction == 'right' && this.gameLayoutService.rightPanelOpen);
	}

	close() {
		if (this.direction == 'left') {
			this.gameLayoutService.toggleLeftPanel(null);
		} else {
			this.gameLayoutService.toggleRightPanel(null);
		}
	}
}
