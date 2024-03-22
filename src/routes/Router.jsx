import { lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import config from '~/config'
import { DefaultLayout } from '~/layouts'

const HomePage = lazy(() => import('~/pages/Home'))
const SearchPage = lazy(() => import('~/pages/Search'))
const LikePage = lazy(() => import('~/pages/Liked'))
const PlaylistPage = lazy(() => import('~/pages/Playlist'))
// const UploadPage = lazy(() => import('~/pages/Upload'))
const NotFoundPage = lazy(() => import('~/pages/NotFound'))

function Router() {
  const routes = useRoutes([
    {
      element: (
        <DefaultLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DefaultLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { element: <SearchPage />, path: config.routes.search },
        { element: <LikePage />, path: config.routes.liked },
        { element: <PlaylistPage />, path: config.routes.playlist }
      ]
    },
    {
      path: config.routes.notFound,
      element: <NotFoundPage />
    },
    {
      path: '*',
      element: <Navigate to={config.routes.notFound} replace />
    }
  ])

  return routes
}

export default Router
