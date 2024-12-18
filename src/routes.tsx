import { Navigate, RouteObject } from 'react-router-dom'

import ErrorPage from './pages/ErrorPage'
import ProhibitorySignsPage from './pages/ProhibitorySigns/ProhibitorySignsPage'
import RestrictionsPage from './pages/Restrictions/RestrictionsPage'
import RoadSectionPage from './pages/RoadSection/RoadSectionPage'

export const ROUTES: RouteObject[] = [
  {
    path: '/',
    id: 'HOME',
    element: <Navigate replace to="/bereikbaarheid" />,
  },
  {
    path: '/bereikbaarheid',
    id: 'ACCESSIBILITY_MAP',
    element: <ProhibitorySignsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/beperkingen',
    id: 'RESTRICTIONS_MAP',
    element: <RestrictionsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/wegvak/:wegvakId',
    id: 'ROAD_SECTION_DETAIL_PAGE',
    element: <RoadSectionPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    id: 'PAGE_NOT_FOUND',
    element: <p>Pagina niet gevonden.</p>,
  },
]

export function getPathTo(routeId: string): string {
  const route = ROUTES.filter(r => r.id === routeId)

  if (!route) {
    throw new Error(`Route with ID ${routeId} not found.`)
  }

  return route[0].path!
}
