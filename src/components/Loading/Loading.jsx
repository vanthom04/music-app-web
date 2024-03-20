import { BounceLoader } from 'react-spinners'
import styles from './Loading.module.scss'

function Loading() {
  return (
    <div className={styles.loading}>
      <BounceLoader color="#22c55e" size={40} />
    </div>
  )
}

export default Loading
