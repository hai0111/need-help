import React, { useEffect, useState } from 'react'
import { FormControl, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PaginationCustom, { IPageInfo } from '../../components/Pagination'
import TableComponent from '../../components/TableComponent'

const Table = () => {
	const [search, setSearch] = useState<string>('')
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearch(e.target.value)
	}
	useEffect(() => {}, [search])
	const getPageInfo = (pageInfo: IPageInfo) => {}
	return (
		<Container>
			<h1 className="text-center my-5">
				Vietnam Health Declaration for foreign entry
			</h1>
			<Row className="justify-content-center">
				<Col xs="4">
					<FormControl
						placeholder="Search..."
						value={search}
						onChange={handleChange}
					/>
				</Col>
				<Col />
				<Col xs={'auto'}>
					<Link to={'/declaration'} className="btn btn-success">
						New form
					</Link>
				</Col>
				<Col xs={12}>
					<TableComponent search={search} />
				</Col>
				<Col xs={'auto'}>
					<PaginationCustom totalRecord={10} getPageInfo={getPageInfo} />
				</Col>
			</Row>
		</Container>
	)
}

export default Table
