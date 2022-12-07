import { Button, Modal } from 'react-bootstrap'
import { INormalProps } from '../../App'

interface IProps extends INormalProps {
	show: boolean
	title: string
	color: string
	onSuccess(): void
	toggle(): void
}

const ModalComponent = (props: IProps) => {
	return (
		<Modal show={props.show} onHide={props.toggle}>
			<Modal.Header closeButton>
				<Modal.Title>{props.title}</Modal.Title>
			</Modal.Header>

			<Modal.Body>{props.children}</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={props.toggle}>
					Đóng
				</Button>
				<Button variant={props.color} onClick={props.onSuccess}>
					Xác nhận
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalComponent
