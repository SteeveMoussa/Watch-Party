import { BrowserRouter as Router, Route, Navigate, Routes} from "react-router-dom"
import AuthProvider from "./hooks/AuthProvider"
import routes from "./router/routes"
import './App.css'

function routeWithSubRoutes(route) {
    const { path, component } = route;
    return <Route key={path} path={path} element={component} />;
  }

function App() {
    return(
        <div className="App">
            <Router>
                <AuthProvider>
                    <Routes>
                        {routes.map((route) => routeWithSubRoutes(route))}
                        <Route path='/' element={<Navigate replace to={"/login"} />} />
                        <Route path='*' element={<Navigate to={"/"} replace />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    )
}

export default App