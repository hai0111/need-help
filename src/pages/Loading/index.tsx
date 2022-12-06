import styles from './styles.module.css'

const Loading = () => {
	return (
		<main className={styles.wrapper}>
			<div className={styles.loading}>
				<div className={styles.cyan}></div>
				<div className={styles.magenta}></div>
				<div className={styles.yellow}></div>
			</div>
		</main>
	)
}

export default Loading
