import {
	ComponentFactoryResolver,
	ComponentRef,
	Injectable,
	Injector,
	ReflectiveInjector,
	ViewContainerRef
} from '@angular/core';
import {GameWindowContainerComponent} from '../game-window-container/game-window-container.component';
import {DynamicWindow} from './dynamic-window.class';

@Injectable()
export class WindowFactoryService {
	constructor(private cfr: ComponentFactoryResolver) {
	}

	createWindow(windowHost: ViewContainerRef, window: DynamicWindow): { container: ComponentRef<GameWindowContainerComponent>, component: ComponentRef<any> } {
		if (!window.component) return;

		//Setup the container
		const windowInjector = Injector.create({
			providers: [],
			parent:    windowHost.injector
		});

		const containerComponentFactory = this.cfr.resolveComponentFactory(GameWindowContainerComponent),
		      containerRef              = containerComponentFactory.create(windowInjector);

		if (window.properties.settings) {
			Object.assign(containerRef.instance.settings, window.properties.settings);
		}

		//Setup the actual component
		let componentProviders = window.properties.providers ? Object.keys(window.properties.providers).map((inputName) => {
			return {provide: window.properties.providers[inputName], useValue: window.properties.providers[inputName]};
		}) : [];

		const injector = Injector.create({
			providers: componentProviders,
			parent:    containerRef.injector
		});

		const componentFactory = this.cfr.resolveComponentFactory(window.component),
		      componentRef     = componentFactory.create(injector);

		if (window.properties.inputs) {
			Object.assign(componentRef.instance, window.properties.inputs, {
				windowRef: window
			});
		}

		//Insert the component into the container
		containerRef.instance.contentContainer.insert(componentRef.hostView);

		return {
			container: containerRef,
			component: componentRef
		}
	}

}
