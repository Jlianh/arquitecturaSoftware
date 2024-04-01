import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ Component }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return isAuthenticated ? <Component/> : <Navigate to="/login/"/>

}

export default PrivateRoute