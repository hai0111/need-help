import { Navigate, Route, Routes } from 'react-router-dom'
import Declaration from './pages/Declaration'
import Edit from './pages/Edit'
import Table from './pages/Table'

export interface INormalProps {
	children: React.ReactNode
}

const App = () => {
	return (
		<Routes>
			<Route path="*" element={<Navigate to={'/table'} />} />
			<Route path="table" element={<Table />} />
			<Route path="declaration" element={<Declaration />} />
			<Route path="edit/:id" element={<Edit />} />
		</Routes>
	)
}

export default App
