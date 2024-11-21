import Login from "../pages/Login"
import Watchlist from "../pages/Watchlist"
import Home from "../pages/Home"
import PrivateRoute from "../router/PrivateRoute"

const routes = [
    {
      path: '/login',
      component: <Login />,
      title: 'Login',
    },
    {
      path: '/watchlist',
      component: <PrivateRoute Component={Watchlist} />,
      title: 'Watchlist',
    },
    {
      path: '/home',
      component: <PrivateRoute Component={Home} />,
      title: 'Home',
    }]

export default routes