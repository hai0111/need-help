import React from 'react'
import { FormSelect, Pagination } from 'react-bootstrap'

interface IProps {
	totalRecord: number
	getPageInfo: (pageInfo: IPageInfo) => void
}

export interface IPageInfo {
	pageIndex: number
	pageSize: number
}

const PaginationCustom = ({ totalRecord = 1, getPageInfo }: IProps) => {
	const [items, setItems] = React.useState<React.ReactNode>([])
	const [pageIndex, setPageIndex] = React.useState<number>(1)
	const [pageSize, setPageSize] = React.useState<number>(2)
	React.useEffect(() => {
		const _items = []
		for (let i = 0; i < Math.ceil(totalRecord / pageSize); i++)
			_items.push(
				<Pagination.Item
					key={i + 1}
					active={pageIndex === i + 1}
					onClick={() => {
						changePageIndex(i + 1)
					}}
				>
					{i + 1}
				</Pagination.Item>
			)
		setItems(_items)
		getPageInfo({ pageIndex, pageSize })
	}, [totalRecord, pageSize, pageIndex])

	const changePageIndex = (type: '-' | '+' | number): void => {
		if (typeof type === 'number') {
			setPageIndex(type)
			return
		}
		switch (type) {
			case '+':
				setPageIndex((prev) => prev + 1)
				break
			case '-':
				setPageIndex((prev) => prev - 1)
				break
		}
	}

	const changePageSize = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setPageSize(Number(e.target.value))
		setPageIndex(1)
	}

	return (
		<div className="d-flex justify-content-center">
			<Pagination className="mb-0 me-3">
				<Pagination.First
					disabled={pageIndex === 1}
					onClick={() => {
						changePageIndex('-')
					}}
				>
					Previous
				</Pagination.First>
				{items}
				<Pagination.Last
					disabled={pageIndex === Math.ceil(totalRecord / pageSize)}
					onClick={() => {
						changePageIndex('+')
					}}
				>
					Next
				</Pagination.Last>
			</Pagination>
			<FormSelect onChange={changePageSize}>
				<option value={2}>2</option>
				<option value={4}>4</option>
				<option value={6}>6</option>
			</FormSelect>
		</div>
	)
}

export default PaginationCustom
