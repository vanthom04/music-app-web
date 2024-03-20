import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import GlobalStyles from '~/components/GlobalStyles'
import App from '~/App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <GlobalStyles>
        <Suspense>
          <App />
        </Suspense>
      </GlobalStyles>
    </BrowserRouter>
  </HelmetProvider>
)
