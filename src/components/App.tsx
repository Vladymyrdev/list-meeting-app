import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

function generate(element: React.ReactElement) {
	return [0, 1, 2].map((value) =>
		React.cloneElement(element, {
			key: value,
		})
	);
}

const Demo = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
}));

export const App = () => {
	const [list, setList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [dense, setDense] = React.useState(false);
	const [secondary, setSecondary] = React.useState(false);

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
	console.log(list);

	return (
		<div className="wrapper">
			<Grid item xs={12} md={6}>
				<Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
					List of appointments
				</Typography>
				<Demo>
					<List dense={dense}>
						{generate(
							<ListItem
								secondaryAction={
									<IconButton edge="end" aria-label="delete">
										<DeleteIcon />
									</IconButton>
								}
							>
								<ListItemAvatar>
									<Avatar>
										<FolderIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="Single-line item" />
							</ListItem>
						)}
					</List>
				</Demo>
			</Grid>
		</div>
	);
};
