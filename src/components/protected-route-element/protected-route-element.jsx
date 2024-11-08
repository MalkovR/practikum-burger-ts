import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  getUserAuthChecked,
  getIsUserLoaded,
} from "../../services/auth/selectors";

const ProtectedRouteElement = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector(getUserAuthChecked);
  const isUserLoaded = useSelector(getIsUserLoaded);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && isUserLoaded) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isUserLoaded) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
