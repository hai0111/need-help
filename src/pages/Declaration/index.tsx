import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import { IItem } from '../../components/TableComponent'
import * as Yup from 'yup'

interface ITravel {
	departure?: string
	departureDate?: string
	destination?: string
	immigrationDate?: string
}

interface IItemErrors {
	address?: string
	dateOfBirth?: string
	district?: string
	email?: string
	fullName?: string
	gender?: string
	id?: string
	mobile?: string
	nationId?: string
	nationality?: string
	object?: string
	province?: string
	symptoms?: string[]
	travels?: ITravel[]
}

const Declaration = () => {
	const initValues: IItem = {
		id: uuidv4(),
		address: '',
		dateOfBirth: '',
		district: '',
		email: '',
		fullName: '',
		gender: '',
		mobile: '',
		nationality: '',
		nationId: '',
		object: '',
		province: '',
		symptoms: [''],
		travels: [
			{
				departure: '',
				departureDate: '',
				destination: '',
				immigrationDate: ''
			}
		]
	}

	const handleSubmit = (values: IItem, formikHelpers: FormikHelpers<any>) => {}
	const validate = (values: IItem) => {
		const errors: IItemErrors = {}
		if (values.fullName === '') {
			errors.fullName = 'Name is required'
		}
		if (values.object === '') {
			errors.object = 'Object is required'
		}
		if (values.dateOfBirth === '') {
			errors.dateOfBirth = 'Date of birth is required'
		}
		return errors
	}

	const formik = useFormik({
		initialValues: { ...initValues },
		onSubmit: handleSubmit,
		validate
		// validateOnBlur: true,
		// validateOnChange: true
	})

	React.useEffect(() => {
		console.log(formik.values)
	}, [formik.values])

	return (
		<Container>
			<h1
				className="text-success h2 text-center my-5
			"
			>
				MEDICAL DECLARATION FORM FOR FOREIGN ENTRY
			</h1>
			<Form onSubmit={formik.handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>
						Full name <span className="text-danger">*</span>
					</Form.Label>
					<Form.Control
						placeholder="Full name..."
						name="fullName"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.fullName}
						isInvalid={!!formik.errors.fullName}
					/>
					<Form.Control.Feedback type="invalid">
						{formik.errors.fullName}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>
						Object <span className="text-danger">*</span>
					</Form.Label>
					<Form.Select
						name="object"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.object}
						isInvalid={!!formik.errors.object}
					>
						<option value="">------Choose</option>
						<option value="Expert">Expert</option>
						<option value="VietNamese">VietNamese</option>
						<option value="International Student">International Student</option>
						<option value="Other">Other</option>
					</Form.Select>
					<Form.Control.Feedback type="invalid">
						{formik.errors.object}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>
						Date of birth <span className="text-danger">*</span>
					</Form.Label>
					<Form.Control
						type="date"
						name="dateOfBirth"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.dateOfBirth}
						isInvalid={!!formik.errors.dateOfBirth}
					/>
					<Form.Control.Feedback type="invalid">
						{formik.errors.dateOfBirth}
					</Form.Control.Feedback>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	)
}

export default Declaration
