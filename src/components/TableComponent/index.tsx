import { Table } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'
import { FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface IProps {
	search: string
}

interface ITravel {
	departure: string
	departureDate: string
	destination: string
	immigrationDate: string
}

export interface IItem {
	address: string
	dateOfBirth: string
	district: string
	email: string
	fullName: string
	gender: string
	id: string
	mobile: string
	nationId: string
	nationality: string
	object: string
	province: string
	symptoms: string[]
	travels: ITravel[]
}

const TableComponent = (props: IProps) => {
	const showModal = (item: string) => {}
	const test: IItem = {
		address: '213',
		dateOfBirth: '2022-12-03',
		district: 'Huyện Cẩm Khê',
		email: 'tektra_test@mobifone.com',
		fullName: 'nguyen hai',
		gender: 'female',
		id: '_ze32s',
		mobile: '0956012312',
		nationId: '13231231',
		nationality: 'Austria',
		object: 'Vietnamese',
		province: 'Tỉnh Phú Thọ',
		symptoms: ['Fiber'],
		travels: [
			{
				departure: 'Bahamas',
				departureDate: '2022-12-27',
				destination: 'Australia',
				immigrationDate: '2022-12-31'
			},
			{
				departure: 'Bahamas',
				departureDate: '2022-12-27',
				destination: 'Australia',
				immigrationDate: '2022-12-31'
			}
		]
	}
	const tests = [test, test]
	return (
		<Table striped bordered hover className="mt-5">
			<thead className="bg-success bg-opacity-25">
				<tr>
					<th>#</th>
					<th>Form ID</th>
					<th>Full Name</th>
					<th>Object</th>
					<th>Date Of Birth</th>
					<th>Gender</th>
					<th>Contact Province</th>
				</tr>
			</thead>
			<tbody>
				{tests.map((item, index) => (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>
							<div className="d-flex align-items-center">
								<Link to={`/edit/${item.id}`}>
									<BiEdit />
								</Link>
								<FaTrashAlt
									className="text-danger pointer mx-3 mt-1 "
									onClick={() => {
										showModal(item.id)
									}}
								/>
								{item.id}
							</div>
						</td>
						<td>{item.fullName}</td>
						<td>{item.object}</td>
						<td>{item.dateOfBirth}</td>
						<td>{item.gender}</td>
						<td>{item.province}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default TableComponent
