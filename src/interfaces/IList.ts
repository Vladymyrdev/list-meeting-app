export interface IList {
	id: string;
	clinicianName: string;
	startDate: string;
	endDate: string;
	status: string;
	patient: { id: string; name: string };
}
