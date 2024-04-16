export interface Exercise {
	id: number;
	name: string;
	duration: number;
	calories: number;
	date?: Date;
	state?: 'COMPLETED' | 'CANCELLED'
	username?: string
}