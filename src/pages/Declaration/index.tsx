import { useFormik } from 'formik'
import { Button, Container, Form } from 'react-bootstrap'
import { IItem } from '../../components/TableComponent'
import { v4 as uuidv4 } from 'uuid'

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

	const handleSubmit = (e: any) => {
		console.log(e)
	}

	const formik = useFormik({
		initialValues: { ...initValues },
		onSubmit: handleSubmit
	})

	return (
		<Container>
			<h1
				className="text-success h2 text-center my-5
			"
			>
				MEDICAL DECLARATION FORM FOR FOREIGN ENTRY
			</h1>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>
						Full name <span className="text-danger">*</span>
					</Form.Label>
					<Form.Control placeholder="Full name..." />
					<Form.Control.Feedback type="invalid"></Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>
						Full name <span className="text-danger">*</span>
					</Form.Label>
					<Form.Control placeholder="Full name..." />
					<Form.Control.Feedback type="invalid"></Form.Control.Feedback>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	)
}

export default Declaration
