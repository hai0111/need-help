import { FormikHelpers, useFormik } from 'formik'
import React, { Fragment } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import { IItem } from '../../components/TableComponent'
import countries from '../../data/countries.json'
import * as Yup from 'yup'

const Declaration = () => {
	const initTravel = {
		departure: '',
		departureDate: '',
		destination: '',
		immigrationDate: ''
	}

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
		symptoms: [],
		travels: [initTravel]
	}

	const handleSubmit = (values: IItem, formikHelpers: FormikHelpers<any>) => {}

	const validationSchema = Yup.object({
		fullName: Yup.string().required('Name is required'),
		object: Yup.string().required('Object is required'),
		dateOfBirth: Yup.string().required('Date of birth is required'),
		gender: Yup.string().required('Gender is required'),
		nationality: Yup.string().required('Nationality is required'),
		nationId: Yup.string().required('Nation ID is required'),
		travels: Yup.array().of(
			Yup.object({
				departure: Yup.string().required('Departure is required'),
				departureDate: Yup.string().required('Departure Date is required'),
				destination: Yup.string().required('Destination is required'),
				immigrationDate: Yup.string().required('Immigration Date is required')
			})
		)
	})

	const formik = useFormik({
		initialValues: { ...initValues },
		onSubmit: handleSubmit,
		validationSchema
	})

	React.useEffect(() => {
		console.log(formik.values)
	}, [formik.values])

	return (
		<Container className="pb-5">
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
						isInvalid={!!(formik.touched.fullName && formik.errors.fullName)}
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
						isInvalid={!!(formik.touched.object && formik.errors.object)}
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
						isInvalid={
							!!(formik.touched.dateOfBirth && formik.errors.dateOfBirth)
						}
					/>
					<Form.Control.Feedback type="invalid">
						{formik.errors.dateOfBirth}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>
						Gender <span className="text-danger">*</span>
					</Form.Label>
					<Form.Select
						name="gender"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.gender}
						isInvalid={!!(formik.touched.gender && formik.errors.gender)}
					>
						<option value="">------Choose</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
						<option value="Other">Other</option>
					</Form.Select>
					<Form.Control.Feedback type="invalid">
						{formik.errors.gender}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>
						Gender <span className="text-danger">*</span>
					</Form.Label>
					<Form.Select
						name="nationality"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.nationality}
						isInvalid={
							!!(formik.touched.nationality && formik.errors.nationality)
						}
					>
						<option value="">------Choose</option>
						{countries.map((item) => (
							<option key={item.code} value={item.name}>
								{item.name}
							</option>
						))}
					</Form.Select>
					<Form.Control.Feedback type="invalid">
						{formik.errors.nationality}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>
						Nation ID or Passport ID <span className="text-danger">*</span>
					</Form.Label>
					<Form.Control
						placeholder="Nation ID or Passport ID..."
						name="nationId"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.nationId}
						isInvalid={!!(formik.touched.nationId && formik.errors.nationId)}
					/>
					<Form.Control.Feedback type="invalid">
						{formik.errors.nationId}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group>
					<p className="h4 fw-bold">Travel:</p>
				</Form.Group>
				{formik.values.travels.length ? (
					formik.values.travels.map((item, index) => (
						<Fragment key={index}>
							<p className="fw-bold text-primary">Travel 1</p>
							<Form.Group className="mb-3">
								<Form.Label>
									Departure Date <span className="text-danger">*</span>
								</Form.Label>
								<Form.Control
									type="date"
									name={`travels[${index}].departureDate`}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={item.departureDate}
									isInvalid={
										!!(
											formik.touched.travels?.[index].departureDate &&
											typeof formik.errors.travels?.[index] !== 'string' &&
											formik.errors.travels?.[index].departureDate
										)
									}
								/>
								<Form.Control.Feedback type="invalid">
									{typeof formik.errors.travels?.[index] === 'string'
										? formik.errors.travels?.[index]
										: formik.errors.travels?.[index].departureDate}
								</Form.Control.Feedback>
							</Form.Group>
						</Fragment>
					))
				) : (
					<div className="d-flex align-items-center">
						<p className="mb-0 me-3">Do you travel in the last 14 days ?</p>
						<Button variant="warning" className="fw-semibold">
							Add more
						</Button>
					</div>
				)}
				{/* <Button variant="primary" type="submit">
					Submit
				</Button> */}
			</Form>
		</Container>
	)
}

export default Declaration
