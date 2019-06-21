import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {LogMessageType} from '../../../common/interfaces/misc.enum';
import * as Typed from 'typed.js';

@Component({
	selector:    'log-message',
	templateUrl: './log-message.component.html',
	styleUrls:   ['./log-message.component.scss']
})
export class LogMessageComponent implements OnInit {
	@Input('text') text: string;
	@Input('type') type: LogMessageType;

	constructor(private el: ElementRef) {

	}

	ngOnInit() {
		const numWords = this.text.split(' ').length;

		//@ts-ignore: Typed is not new-able according to TS. They don't think it be like it is, but it do.
		new Typed(this.el.nativeElement, {
			strings:              [this.text],
			typeSpeed:            2 + Math.max(0, (numWords > 10 ? -(numWords * .02) : 0)),
			showCursor:           false,
			bindInputFocusEvents: false,
			smartBackspace:       false,
			shuffle:              false
		});

		this.el.nativeElement.scrollIntoView({
			block:    'end',
			inline:   'nearest',
			behavior: 'instant'
		});
	}
}
