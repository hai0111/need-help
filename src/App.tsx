import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Edit from './pages/Edit'
import Loading from './pages/Loading'
import Table from './pages/Table'

const Declaration = React.lazy(() => import('./pages/Declaration'))
export interface INormalProps {
	children: React.ReactNode
}

const App = () => {
	return (
		<Routes>
			<Route path="*" element={<Navigate to={'/table'} />} />
			<Route path="table" element={<Table />} />
			<Route
				path="declaration"
				element={
					<Suspense fallback={<Loading />}>
						<Declaration />
					</Suspense>
				}
			/>
			<Route
				path="edit/:id"
				element={
					<Suspense fallback={<Loading />}>
						<Declaration />
					</Suspense>
				}
			/>
		</Routes>
	)
}

export default App
