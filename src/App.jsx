import { Toaster } from 'react-hot-toast'

import Router from '~/routes/Router'
import ModalProvider from './providers/ModalProvider'

function App() {
  return (
    <>
      <Router />
      <ModalProvider />
      <Toaster position="top-center" />
    </>
  )
}

export default App
