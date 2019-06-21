import {IStdApiResponseSingle} from './std-api.interface';

export interface ISigninResponse extends IStdApiResponseSingle {
	user: any;
}