import { Route,Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import RegisterPage from "./Pages/RegisterPage"
import Login from "./Pages/Login"


function App() {
    return(
    <>
    <Routes>
        <Route path="/" element={<HomePage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
                <Route path="/login" element={<Login/>}></Route>

    </Routes>

    </>
    )
}
export default App