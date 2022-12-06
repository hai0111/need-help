import { Formik, FormikHelpers, FormikProps, useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import { IItem } from '../../components/TableComponent'
import countries from '../../data/countries.json'
import provinces from '../../data/vietnam-province-district.json'

interface IIFormik extends FormikProps<IItem> {
	errors: any
}

interface IDistrict {
	[key: string]: string
}
interface IProvince {
	name: string
	cities: IDistrict
}

const TrackingValue = () => {
	const { values } = useFormikContext()
	useEffect(() => {
		console.log(values)
	}, [values])
	return null
}

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
		travels: []
	}

	const handleSubmit = (values: IItem, formikHelpers: FormikHelpers<any>) => {}

	const validationSchema = Yup.object({
		fullName: Yup.string().required('Name is required'),
		object: Yup.string().required('Object is required'),
		dateOfBirth: Yup.string().required('Date of birth is required'),
		gender: Yup.string().required('Gender is required'),
		nationality: Yup.string().required('Nationality is required'),
		nationId: Yup.string().required('Nation ID is required'),
		province: Yup.string().required('Contact province is required'),
		district: Yup.string().required('Contact district  is required'),
		address: Yup.string().required('Contact address is required'),
		email: Yup.string()
			.required('Contact email is required')
			.email('Email is invalid'),
		mobile: Yup.string()
			.required('Contact mobile is required')
			.matches(/^\d+$/, 'Mobile is invalid'),
		travels: Yup.array().of(
			Yup.object({
				departure: Yup.string().required('Departure is required'),
				departureDate: Yup.string().required('Departure Date is required'),
				destination: Yup.string().required('Destination is required'),
				immigrationDate: Yup.string().required('Immigration Date is required')
			})
		)
	})

	// [Handle Provinces]====================================================
	const [provincesList, setProvincesList] = useState<IProvince[]>([])
	const [districts, setDistricts] = useState<string[]>([])

	useEffect(() => {
		const provicesArray: IProvince[] = []
		const _provinces: { [key: string]: IProvince } = provinces
		for (const key in _provinces) {
			provicesArray.push(_provinces[key])
		}
		setProvincesList(provicesArray)
	}, [])

	return (
		<Container className="pb-5">
			<h1
				className="text-success h2 text-center my-5
			"
			>
				MEDICAL DECLARATION FORM FOR FOREIGN ENTRY
			</h1>
			<Formik
				initialValues={initValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				{({
					handleSubmit,
					values,
					errors,
					handleChange,
					handleBlur,
					touched,
					setFieldValue
				}: IIFormik) => {
					const addMoreTravel = () => {
						const _prev = values.travels
						setFieldValue('travels', [..._prev, initTravel], true)
					}
					const deleteTravel = (index: number) => {
						const _prev = values.travels.filter((_, _index) => _index !== index)
						setFieldValue('travels', _prev, true)
					}

					const changeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
						handleChange(e)
						const name = e.target.value
						const cities: IDistrict | undefined = provincesList.find(
							(item) => item.name === name
						)?.cities
						if (cities) {
							const _districts = []
							for (const key in cities) {
								_districts.push(cities[key])
							}
							setDistricts(_districts)
						} else {
							setDistricts([])
						}
					}
					return (
						<Form onSubmit={handleSubmit}>
							<Row>
								<Col xs={12}>
									<Form.Group className="mb-3">
										<Form.Label>
											Full name <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											placeholder="Full name..."
											name="fullName"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.fullName}
											isInvalid={!!(touched.fullName && errors.fullName)}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.fullName}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											Object <span className="text-danger">*</span>
										</Form.Label>
										<Form.Select
											name="object"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.object}
											isInvalid={!!(touched.object && errors.object)}
										>
											<option value="">------Choose</option>
											<option value="Expert">Expert</option>
											<option value="VietNamese">VietNamese</option>
											<option value="International Student">
												International Student
											</option>
											<option value="Other">Other</option>
										</Form.Select>
										<Form.Control.Feedback type="invalid">
											{errors.object}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col xs={12} md={3}>
									<Form.Group className="mb-3">
										<Form.Label>
											Date of birth <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											type="date"
											name="dateOfBirth"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.dateOfBirth}
											isInvalid={!!(touched.dateOfBirth && errors.dateOfBirth)}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.dateOfBirth}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col xs={12} md={3}>
									<Form.Group className="mb-3">
										<Form.Label>
											Gender <span className="text-danger">*</span>
										</Form.Label>
										<Form.Select
											name="gender"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.gender}
											isInvalid={!!(touched.gender && errors.gender)}
										>
											<option value="">------Choose</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
											<option value="Other">Other</option>
										</Form.Select>
										<Form.Control.Feedback type="invalid">
											{errors.gender}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											Nationality <span className="text-danger">*</span>
										</Form.Label>
										<Form.Select
											name="nationality"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.nationality}
											isInvalid={!!(touched.nationality && errors.nationality)}
										>
											<option value="">------Choose</option>
											{countries.map((item) => (
												<option key={item.code} value={item.name}>
													{item.name}
												</option>
											))}
										</Form.Select>
										<Form.Control.Feedback type="invalid">
											{errors.nationality}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											Nation ID or Passport ID{' '}
											<span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											placeholder="Nation ID or Passport ID..."
											name="nationId"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.nationId}
											isInvalid={!!(touched.nationId && errors.nationId)}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.nationId}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col xs={12}>
									<Form.Group>
										<p className="h5 fw-bold">Travel:</p>
									</Form.Group>
								</Col>
								<Col xs={12}>
									{values.travels.length ? (
										values.travels.map((item: any, index: any) => (
											<Row key={index}>
												<Col xs={12}>
													<p className="fw-bold text-primary mt-3">
														Travel {index + 1}
													</p>
												</Col>
												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Departure Date{' '}
															<span className="text-danger">*</span>
														</Form.Label>
														<Form.Control
															type="date"
															name={`travels[${index}].departureDate`}
															onChange={handleChange}
															onBlur={handleBlur}
															value={item.departureDate}
															isInvalid={
																!!(
																	touched.travels?.[index]?.departureDate &&
																	typeof errors.travels?.[index] !== 'string' &&
																	errors.travels?.[index]?.departureDate
																)
															}
														/>
														<Form.Control.Feedback type="invalid">
															{typeof errors.travels?.[index] !== 'string' &&
																errors.travels?.[index]?.departureDate}
														</Form.Control.Feedback>
													</Form.Group>
												</Col>
												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Immigration Date{' '}
															<span className="text-danger">*</span>
														</Form.Label>
														<Form.Control
															type="date"
															name={`travels[${index}].immigrationDate`}
															onChange={handleChange}
															onBlur={handleBlur}
															value={item.immigrationDate}
															isInvalid={
																!!(
																	touched.travels?.[index]?.immigrationDate &&
																	typeof errors.travels?.[index] !== 'string' &&
																	errors.travels?.[index]?.immigrationDate
																)
															}
														/>
														<Form.Control.Feedback type="invalid">
															{typeof errors.travels?.[index] !== 'string' &&
																errors.travels?.[index]?.immigrationDate}
														</Form.Control.Feedback>
													</Form.Group>
												</Col>
												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Departure <span className="text-danger">*</span>
														</Form.Label>
														<Form.Select
															name={`travels[${index}].departure`}
															onChange={handleChange}
															onBlur={handleBlur}
															value={item.departure}
															isInvalid={
																!!(
																	touched.travels?.[index]?.departure &&
																	typeof errors.travels?.[index] !== 'string' &&
																	errors.travels?.[index]?.departure
																)
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
															{typeof errors.travels?.[index] !== 'string' &&
																errors.travels?.[index]?.departure}
														</Form.Control.Feedback>
													</Form.Group>
												</Col>
												<Col xs={12} md={6}>
													<Form.Group className="mb-3">
														<Form.Label>
															Destination <span className="text-danger">*</span>
														</Form.Label>
														<Form.Select
															name={`travels[${index}].destination`}
															onChange={handleChange}
															onBlur={handleBlur}
															value={item.destination}
															isInvalid={
																!!(
																	touched.travels?.[index]?.destination &&
																	typeof errors.travels?.[index] !== 'string' &&
																	errors.travels?.[index]?.destination
																)
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
															{typeof errors.travels?.[index] !== 'string' &&
																errors.travels?.[index]?.destination}
														</Form.Control.Feedback>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Button
															variant="warning"
															onClick={addMoreTravel}
															className="fw-semibold"
														>
															Add more
														</Button>
														<Button
															variant="danger"
															onClick={() => {
																deleteTravel(index)
															}}
															className="fw-semibold ms-2"
														>
															Delete
														</Button>
													</Form.Group>
												</Col>
											</Row>
										))
									) : (
										<div className="d-flex align-items-center">
											<p className="mb-0 me-3">
												Do you travel in the last 14 days ?
											</p>
											<Button
												variant="warning"
												onClick={addMoreTravel}
												className="fw-semibold"
											>
												Add more
											</Button>
										</div>
									)}
								</Col>
								<Col xs={12} className="mt-3">
									<p className="h5 fw-bold">Contact:</p>
								</Col>
								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											Province <span className="text-danger">*</span>
										</Form.Label>
										<Form.Select
											name="province"
											onChange={changeProvince}
											onBlur={handleBlur}
											value={values.province}
											isInvalid={!!(touched.province && errors.province)}
										>
											<option value="">------Choose</option>
											{provincesList.map((item, index) => (
												<option key={index} value={item.name}>
													{item.name}
												</option>
											))}
										</Form.Select>
										<Form.Control.Feedback type="invalid">
											{errors.province}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>

								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											District <span className="text-danger">*</span>
										</Form.Label>
										<Form.Select
											name="district"
											onChange={changeProvince}
											onBlur={handleBlur}
											value={values.district}
											isInvalid={!!(touched.district && errors.district)}
										>
											<option value="">------Choose</option>
											{districts.map((item, index) => (
												<option key={index} value={item}>
													{item}
												</option>
											))}
										</Form.Select>
										<Form.Control.Feedback type="invalid">
											{errors.district}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col xs={12} lg={6}>
									<Form.Group className="mb-3">
										<Form.Label>
											Address <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											placeholder="Address..."
											name="address"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.address}
											isInvalid={!!(touched.address && errors.address)}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.address}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col xs={12} lg={3}>
									<Form.Group className="mb-3">
										<Form.Label>
											Email <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											placeholder="Email..."
											name="email"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email}
											isInvalid={!!(touched.email && errors.email)}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.email}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col xs={12} lg={3}>
									<Form.Group className="mb-3">
										<Form.Label>
											Mobile <span className="text-danger">*</span>
										</Form.Label>
										<Form.Control
											placeholder="Mobile..."
											name="mobile"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.mobile}
											isInvalid={!!(touched.mobile && errors.mobile)}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.mobile}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col xs={12}>
									<p className="h5 fw-bold">Symptoms:</p>
								</Col>
								<Col xs={12} lg={4}>
									<p>Do you have any following symptoms?:</p>
								</Col>
								<Col xs={12} lg={8}>
									<div className="d-flex">
										{[
											'Fiber',
											'Fever',
											'Sore throat',
											'Difficulty of breathing'
										].map((item) => (
											<Form.Check
												className="mx-3"
												name="symptoms"
												key={item}
												onChange={handleChange}
												type={'checkbox'}
												label={item}
												value={item}
											/>
										))}
									</div>
								</Col>
								<Col xs={12}>
									<p className="h5 fw-bold">Vaccines:</p>
								</Col>
								<Col xs={12} lg={4}>
									<p>Which one would you like to vaccinate ?:</p>
								</Col>
								<Col xs={12} lg={8}>
									<div className="d-flex">
										{[
											'NoneAstra',
											'Zenecca',
											'Pfizer',
											'Moderna',
											'Sinopharm'
										].map((item) => (
											<Form.Check
												type={'radio'}
												className="mx-3"
												name="vaccines"
												key={item}
												onChange={handleChange}
												label={item}
												value={item}
											/>
										))}
									</div>
								</Col>
								<Col xs={12} className="mt-4">
									<Button size="lg" variant="success" type="submit">
										Submit
									</Button>
									<Button
										size="lg"
										className="ms-2"
										variant="danger"
										type="button"
									>
										Cancel
									</Button>
									<Button
										size="lg"
										className="ms-2"
										variant="secondary"
										type="reset"
									>
										Reset
									</Button>
								</Col>
								<TrackingValue />
							</Row>
						</Form>
					)
				}}
			</Formik>
		</Container>
	)
}

export default Declaration
