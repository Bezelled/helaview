import React, { useContext, Suspense, useEffect, lazy } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import routes from '../routes'
import { SidebarContext } from '../context/SidebarContext'

const Sidebar = lazy(() => import('../components/sidebars'))
const Header = lazy(() => import('../components/Header'))
const Main = lazy(() => import('../containers/Main'))
const ThemedSuspense = lazy(() => import('../components/ThemedSuspense'))
const Page404 = lazy(() => import('../pages/404'))

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  let location = useLocation()

  useEffect(() => {
    closeSidebar()
  }, [closeSidebar, location])

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`/admin/dashboard${route.path}`}
                    render={(props) => <route.component {...props} />}
                  />
                ) : null
              })}
              <Route component={Page404} />
            </Switch>
          </Suspense>
        </Main>
      </div>
    </div>
  )
}

export default Layout
