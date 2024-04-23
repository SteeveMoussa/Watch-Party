import Login from "../pages/Login"
import Watchlist from "../pages/Watchlist"
import PrivateRoute from "../router/PrivateRoute"

const routes = [
    {
      path: '/login',
      component: <Login />,
      title: 'Login',
    },
    {
      path: '/watchlist',
      component: <PrivateRoute Component={Watchlist}/>,
      title: 'Watchlist',
    }]

export default routes