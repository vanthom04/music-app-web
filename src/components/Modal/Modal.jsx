import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal({ isOpen, onChange, title, description, children }) {
  return (
    <Dialog.Root
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={cx('dialog-overlay')} />

        <Dialog.Content className={cx('dialog-content')}>
          <Dialog.Title className={cx('dialog-title')}>
            {title}
          </Dialog.Title>

          <Dialog.Description className={cx('dialog-description')}>
            {description}
          </Dialog.Description>

          <div>
            {children}
          </div>

          <Dialog.Close asChild>
            <button className={cx('button')}>
              <IoMdClose size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Modal
