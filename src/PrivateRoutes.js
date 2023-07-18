import { Navigate, Outlet } from 'react-router-dom'
import Cookies from "universal-cookie";
import Header from './HeaderComponent/Header';
const PrivateRoutes = () => {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    return (
        token ? <>
        <Header/><Outlet /></> : <><Header/><Navigate to='/auth' /></>
    )
}

export default PrivateRoutes;