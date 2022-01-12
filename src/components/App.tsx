import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'antd/dist/antd.css';

import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Avatar } from '@mui/material';
import { Typography } from 'antd';

import { useSortableData } from '../hooks/useSortableData';
import { IList } from '../interfaces/IList';
import { NewMeetButton } from './NewMeetButton';
import { INewList } from '../interfaces/INewList';
import { SortAscendingOutlined } from '@ant-design/icons';

const tableHead = [
	{ id: 'clinicianName', value: 'Clinician Name' },
	{ id: 'startDate', value: 'Start Date' },
	{ id: 'endDate', value: 'End Date' },
	{ id: 'patient', value: 'Patient Name' },
	{ id: 'status', value: 'Status' },
];

const { Title } = Typography;

export const App = () => {
	const [list, setList] = useState<IList[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [visible, setVisible] = useState(false);

	const onCreateNewMeet = (values: INewList) => {
		const dateValue = values?.date.filter((item: { _d: string }) => item._d);
		const newMeet = {
			id: Math.random().toString(36).substring(12),
			clinicianName: values?.clinicianName,
			startDate: dateValue[0],
			endDate: dateValue[1],
			status: values?.status.toUpperCase(),
			patient: {
				id: Math.random().toString(35).substring(15),
				name: values?.patientName,
			},
		};
		setList((prev) => [...prev, newMeet]);
		setVisible(false);
	};

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('http://localhost:3001/list')
			.then(({ data }) => {
				setList(data);
				setIsLoading(false);
			})
			.catch((error) => console.log(error));
	}, []);

	const onItemRemove = (id: string) => {
		setList((prevlist) => [...prevlist.filter((item) => item.id !== id)]);
	};

	const { items, requestSort } = useSortableData(list);

	const getOnSortClick = (id: string) => () => {
		requestSort(id);
	};

	const handleRemoveItem = (id: string) => () => {
		onItemRemove(id);
	};

	const mappedTableHead = useMemo(
		() =>
			tableHead.map((item) => (
				<th key={item.id}>
					<button type="button">
						{item.value}
						<SortAscendingOutlined onClick={getOnSortClick(item.id)} />
					</button>
				</th>
			)),
		[tableHead]
	);

	const mappedItems = useMemo(
		() =>
			items?.map((x) => (
				<tr key={x.id}>
					<td className="name">
						<Avatar>
							<AssignmentIcon />
						</Avatar>
						{x.clinicianName}
					</td>
					<td>{moment(x.startDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
					<td>{moment(x.endDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
					<td>{x.patient.name}</td>
					<td className={x.status === 'CANCELLED' ? 'cancelledTd' : null}>
						{x.status}
					</td>
					<td>
						<Button
							onClick={handleRemoveItem(x.id)}
							variant="outlined"
							startIcon={<DeleteIcon />}
						>
							Delete
						</Button>
					</td>
				</tr>
			)),
		[items]
	);

	return (
		<div className="wrapper">
			<div className="header">
				<Title type="secondary">LIST MEETINGS</Title>
				<NewMeetButton
					onCreate={onCreateNewMeet}
					visible={visible}
					setVisible={setVisible}
				/>
			</div>
			<table>
				<thead>
					<tr>
						{mappedTableHead}
						<th></th>
					</tr>
				</thead>
				<tbody>{isLoading ? <Title>Loading...</Title> : mappedItems}</tbody>
			</table>
		</div>
	);
};
