/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/hotels',
    icon: 'FormsIcon',
    name: 'Hotels',
  },
  {
    path: '/tourists',
    icon: 'CardsIcon',
    name: 'Tourists',
  },
  // {
  //   path: '/charts',
  //   icon: 'ChartsIcon',
  //   name: 'Charts',
  // },
  // {
  //   path: '/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Buttons',
  // },
  // {
  //   path: '/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Modals',
  // },
  // {
  //   path: '/tables',
  //   icon: 'TablesIcon',
  //   name: 'Tables',
  // },
  {
    icon: 'PagesIcon',
    name: 'Other Admin Pages...',
    routes: [
      // submenu
      {
        path: '/login',
        name: 'Login',
      },
      {
        path: '/create-account',
        name: 'Create account',
      },
      {
        path: '/forgot-password',
        name: 'Forgot password',
      },
      {
        path: '/404',
        name: '404',
      },
      {
        path: '/blank',
        name: 'Blank',
      },
    ],
  },
]

export default routes
