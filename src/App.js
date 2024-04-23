import { BrowserRouter as Router, Route, Navigate, Routes} from "react-router-dom"
import AuthProvider from "./hooks/AuthProvider"
import Login from "./pages/Login"
import Watchlist from "./pages/Watchlist"
import PrivateRoute from "./router/route"
import './App.css'

function App() {
    return(
        <div className="App">
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" Component={Login} />
                        <Route path="/watchlist" element={<PrivateRoute Component={Watchlist}/>} />
                        <Route path="/" element={<Navigate replace to="/login" />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>

    )
}

export default App