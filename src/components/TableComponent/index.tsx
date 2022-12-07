import { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'
import { FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ModalComponent from '../Modal'
import PaginationCustom, { IPageInfo } from '../Pagination'

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

interface IRow {
	formId: string
	fullname: string
	object: string
	birth: string
	gender: string
	contact: string
}

const TableComponent = (props: IProps) => {
	const [dataOrigin, setDataOrigin] = useState<IItem[]>([])
	const [dataFiltered, setDataFiltered] = useState<IRow[]>([])
	const [deleteId, setDeleteId] = useState<string | null>(null)
	const [showDelete, setShowDelete] = useState<boolean>(false)
	const [pageInfo, setPageInfo] = useState<IPageInfo>({
		pageIndex: 1,
		pageSize: 2
	})

	const getPageInfo = (pageInfo: IPageInfo): void => {
		setPageInfo(pageInfo)
	}

	const toggleModal = (id: string | null = null): void => {
		setDeleteId(id)
		setShowDelete(!showDelete)
	}

	const deleteItem = (): void => {
		const _data = dataOrigin.filter((item) => item.id !== deleteId)
		setDataOrigin(_data)
		toggleModal()
	}

	useEffect(() => {
		const data: IItem[] = JSON.parse(localStorage.getItem('data-form') || '[]')
		setDataOrigin(data)
	}, [])

	useEffect(() => {
		const { pageIndex, pageSize } = pageInfo
		const pageStart = (pageIndex - 1) * pageSize
		const pageEnd = pageIndex * pageSize
		const dataFilter = dataOrigin
			.map((item) => ({
				formId: item.id,
				fullname: item.fullName,
				object: item.object,
				birth: item.dateOfBirth,
				gender: item.gender,
				contact: item.province
			}))
			.filter((item: any) => {
				for (const key in item) {
					if (item[key].includes(props.search)) return true
				}
				return false
			})
			.slice(pageStart, pageEnd)
		setDataFiltered(dataFilter)
	}, [props.search, dataOrigin, pageInfo])

	useEffect(() => {
		localStorage.setItem('data-form', JSON.stringify(dataOrigin))
	}, [dataOrigin])

	const getIndex = (index: number): number => {
		const { pageIndex, pageSize } = pageInfo
		return (pageIndex - 1) * pageSize + index + 1
	}

	return (
		<Row className="justify-content-center">
			<Col xs={12}>
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
						{dataFiltered.map((item, index) => (
							<tr key={index}>
								<td>{getIndex(index)}</td>
								<td>
									<div className="d-flex align-items-center">
										<Link to={`/edit/${item.formId}`}>
											<BiEdit />
										</Link>
										<FaTrashAlt
											className="text-danger pointer mx-3 mt-1 "
											onClick={() => {
												toggleModal(item.formId)
											}}
										/>
										{item.formId.slice(0, 6)}
									</div>
								</td>
								<td>{item.fullname}</td>
								<td>{item.object}</td>
								<td>{item.birth}</td>
								<td>{item.gender}</td>
								<td>{item.contact}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Col>
			<Col xs="auto" className="mt-3">
				<PaginationCustom
					totalRecord={dataOrigin.length}
					getPageInfo={getPageInfo}
				/>
			</Col>
			<ModalComponent
				show={showDelete}
				title="Confirm delete"
				color="danger"
				children="Are you sure you want to delete this record?"
				onSuccess={deleteItem}
				toggle={toggleModal}
			/>
		</Row>
	)
}

export default TableComponent
