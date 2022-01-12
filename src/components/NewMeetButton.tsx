import { Button } from 'antd';
import React from 'react';
import { INewList } from '../interfaces/INewList';
import { MeetCreateForm } from './MeetCreateForm';

type PropButton = {
	visible: boolean;
	onCreate: (v: INewList) => void;
	setVisible: (v: boolean) => void;
};

export const NewMeetButton = ({
	visible,
	onCreate,
	setVisible,
}: PropButton) => {
	const handleClickButton = () => {
		setVisible(true);
	};

	const onCancelClick = () => {
		setVisible(false);
	};

	return (
		<div>
			<Button type="primary" onClick={handleClickButton}>
				New meet
			</Button>
			<MeetCreateForm
				visible={visible}
				onCreate={onCreate}
				onCancel={onCancelClick}
			/>
		</div>
	);
};
