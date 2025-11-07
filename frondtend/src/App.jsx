import { Navigate, Route,Routes } from "react-router-dom"
import { ConfigProvider } from "antd"
import HomePage from "./Pages/HomePage"
import RegisterPage from "./Pages/RegisterPage"
import Login from "./Pages/Login"


function App() {
    return(
    <ConfigProvider>
    <Routes>
        <Route path="/" element={
            <ProtectedRoutes>
            <HomePage/></ProtectedRoutes>
        }></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
                <Route path="/login" element={<Login/>}></Route>

    </Routes>
    </ConfigProvider>
    )
}
export function ProtectedRoutes(props){
    if(localStorage.getItem('user')){
        return props.children
    }
    else{
        return <Navigate to="/login"/>
    }
}


export default App