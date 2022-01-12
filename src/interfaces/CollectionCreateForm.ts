import { INewList } from './INewList';

export interface CollectionCreateFormProps {
	visible: boolean;
	onCreate: (values: INewList) => void;
	onCancel: () => void;
}
