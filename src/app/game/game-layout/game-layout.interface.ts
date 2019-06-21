import {ComponentRef, ElementRef, EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs';
import {GameWindowContainerComponent} from './game-window-container/game-window-container.component';
import {DynamicWindow} from './game-window-host/dynamic-window.class';

export interface GameWindowRef {
	id: string,
	window: DynamicWindow,
	sub: Subscription,
	onHide: EventEmitter<any>,
	containerRef: ComponentRef<GameWindowContainerComponent>,
	componentRef: ComponentRef<any>,
	bounds?: ElementRef
}