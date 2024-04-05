import { lazy, Suspense } from 'react'
import { Outlet, useRoutes } from 'react-router-dom'

import config from '~/config'
import { DefaultLayout } from '~/layouts'

const HomePage = lazy(() => import('~/pages/Home'))
const SearchPage = lazy(() => import('~/pages/Search'))
const LikePage = lazy(() => import('~/pages/Liked'))
const PlaylistPage = lazy(() => import('~/pages/Playlist'))
const ProfilePage = lazy(() => import('~/pages/Profile'))
const SettingPage = lazy(() => import('~/pages/Setting'))
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
        { element: <PlaylistPage />, path: config.routes.playlist },
        { element: <ProfilePage />, path: config.routes.profile },
        { element: <SettingPage />, path: config.routes.settings }
      ]
    },
    {
      path: config.routes.notFound,
      element: <NotFoundPage />
    }
  ])

  return routes
}

export default Router
