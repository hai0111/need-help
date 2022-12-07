import React, { useState } from 'react'
import { Container, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import TableComponent from '../../components/TableComponent'

const Table = () => {
	const [search, setSearch] = useState<string>('')
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearch(e.target.value)
	}
	return (
		<Container>
			<h1 className="text-center my-5">
				Vietnam Health Declaration for foreign entry
			</h1>
			<div className="d-flex align-items-center justify-content-between">
				<FormControl
					placeholder="Search..."
					value={search}
					onChange={handleChange}
					style={{ width: '250px' }}
				/>
				<Link to={'/declaration'} className="btn btn-success">
					New form
				</Link>
			</div>
			<TableComponent search={search} />
		</Container>
	)
}

export default Table
