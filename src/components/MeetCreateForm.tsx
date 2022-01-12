import React from 'react';
import { Modal, Form, Input, Radio, DatePicker } from 'antd';
import { CollectionCreateFormProps } from '../interfaces/CollectionCreateForm';
import { rules } from '../utils/rules';

const { RangePicker } = DatePicker;

export const MeetCreateForm: React.FC<CollectionCreateFormProps> = ({
	visible,
	onCreate,
	onCancel,
}) => {
	const [form] = Form.useForm();
	const rangeConfig = {
		rules: rules.required('Please select time!'),
	};

	const handleClickOnCreate = () => {
		form
			.validateFields()
			.then((values) => {
				form.resetFields();
				onCreate(values);
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
	};

	return (
		<Modal
			visible={visible}
			title="Create a new meet"
			okText="Create"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={handleClickOnCreate}
		>
			<Form
				form={form}
				layout="vertical"
				name="formInModal"
				initialValues={{ status: 'active' }}
			>
				<Form.Item
					name="clinicianName"
					label="Clinician name"
					rules={rules.required('Please enter clinician name!')}
				>
					<Input />
				</Form.Item>
				<Form.Item name="date" label="Date" {...rangeConfig}>
					<RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
				</Form.Item>
				<Form.Item
					name="patientName"
					label="Patient name"
					rules={rules.required('Please enter patient name!')}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="status"
					className="collection-create-form_last-form-item"
				>
					<Radio.Group>
						<Radio value="active">Active</Radio>
						<Radio value="cancelled">Cancelled</Radio>
					</Radio.Group>
				</Form.Item>
			</Form>
		</Modal>
	);
};
