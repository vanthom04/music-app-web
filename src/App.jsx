import { Toaster } from 'react-hot-toast'

import { MusicProvider } from '~/context'
import Router from '~/routes/Router'
import ModalProvider from '~/providers/ModalProvider'

function App() {
  return (
    <MusicProvider>
      <Router />
      <ModalProvider />
      <Toaster position="top-center" />
    </MusicProvider>
  )
}

export default App
