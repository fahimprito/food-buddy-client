import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location)

    if (loading) {
        return <div className='flex justify-center min-h-[80vh]'><span className="loading loading-ring loading-lg"></span></div>
    }

    if (user) {
        return children
    }

    return <Navigate to="/login" state={location?.pathname}></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;