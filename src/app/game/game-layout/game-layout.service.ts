import {ElementRef, Injectable, ViewContainerRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {GameWindowRef} from './game-layout.interface';
import {DynamicWindow, DynamicWindowProperties} from './game-window-host/dynamic-window.class';
import {WindowFactoryService} from './game-window-host/game-window-factory.service';
import {ISlidePanelOptions, SlidePanelDefaultOptions} from './slide-panel/slide-panel.interface';
import * as shortid from 'shortid';
import * as _ from 'lodash';

@Injectable()
export class GameLayoutService {

	//Slide panels
	leftPanelModule: string;
	rightPanelModule: string;
	leftPanelOptions: ISlidePanelOptions      = SlidePanelDefaultOptions;
	rightPanelOptions: ISlidePanelOptions     = SlidePanelDefaultOptions;
	leftPanelOpen: boolean                    = false;
	rightPanelOpen: boolean                   = false;
	$leftPanelOpen: BehaviorSubject<boolean>  = new BehaviorSubject<boolean>(false);
	$rightPanelOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

	//Windows
	windowHost: ViewContainerRef;
	windows: Array<GameWindowRef> = [];

	//Misc
	contentArea: ElementRef;

	constructor(private windowFactory: WindowFactoryService) {
		this.$leftPanelOpen.subscribe(open => {
			this.leftPanelOpen = open;
		});

		this.$rightPanelOpen.subscribe(open => {
			this.rightPanelOpen = open;
		});
	}

	setContentArea(ref: ElementRef) {
		this.contentArea = ref;
	}

	toggleLeftPanel(module: string, options: ISlidePanelOptions = SlidePanelDefaultOptions) {
		if (!this.leftPanelOpen) {
			this.leftPanelModule  = module;
			this.leftPanelOptions = options;
			this.$leftPanelOpen.next(true);
		} else {
			this.leftPanelModule = null;
			this.$leftPanelOpen.next(false);
		}
	}

	toggleRightPanel(module: string, options: ISlidePanelOptions = SlidePanelDefaultOptions) {
		if (!this.rightPanelOpen) {
			this.rightPanelModule  = module;
			this.rightPanelOptions = options;
			this.$rightPanelOpen.next(true);
		} else {
			this.rightPanelModule = null;
			this.$rightPanelOpen.next(false);
		}
	}

	setWindowHost(host: ViewContainerRef) {
		this.windowHost = host;
	}

	openWindow(component: any, windowProperties: DynamicWindowProperties = {}) {
		const window          = new DynamicWindow(component, windowProperties),
		      windowComponent = this.windowFactory.createWindow(this.windowHost, window);

		this.windowHost.insert(windowComponent.container.hostView);

		Object.assign(window, {
			id: shortid.generate()
		});

		const windowRef: GameWindowRef = {
			id:           window.id,
			window:       window,
			sub:          windowComponent.container.instance.onHide.subscribe(() => this.closeWindow(window.id)),
			onHide:       windowComponent.container.instance.onHide,
			containerRef: windowComponent.container,
			componentRef: windowComponent.component,
			bounds:       windowProperties.settings.bounds || this.contentArea
		};

		this.windows.push(windowRef);

		Object.assign(windowComponent.container.instance, {
			windowRef: windowRef
		});

		return _.last(this.windows);
	}

	closeWindow(windowID?: string) {
		let removedWindow;

		if (windowID) {
			removedWindow = _.first(_.remove(this.windows, {
				id: windowID
			}));

			removedWindow.sub.unsubscribe();
			removedWindow.containerRef.destroy();
		} else {
			removedWindow = _.last(this.windows);

			removedWindow.sub.unsubscribe();
			removedWindow.containerRef.destroy();
			this.windows.pop();
		}
	}
}