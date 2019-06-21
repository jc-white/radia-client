export interface IUserDocument {
	userID: string;
	email: string;
	password: string;
}

export interface User {
	_id: string;
	userID: string;
	email: string;
}