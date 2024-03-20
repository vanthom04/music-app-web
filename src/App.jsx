import { Toaster } from 'react-hot-toast'
import Router from '~/routes/Router'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import UploadModal from './components/UploadModal'

function App() {
  return (
    <>
      <Router />
      <LoginModal />
      <RegisterModal />
      <UploadModal />
      <Toaster position="top-center" />
    </>
  )
}

export default App
