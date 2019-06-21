import {Component, OnInit} from '@angular/core';
import 'angular2-fontawesome';
import {ChargenStore} from './chargen.store';

@Component({
	selector:    'app-chargen',
	templateUrl: './chargen.component.html',
	styleUrls:   ['./chargen.component.scss']
})
export class ChargenComponent implements OnInit {
	constructor(public store: ChargenStore) {

	}

	ngOnInit() {
		this.store.getBackstories();
	}
}
