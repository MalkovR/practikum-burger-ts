import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {getIsUserLoaded, getUserAuthChecked,} from "../../services/auth/selectors";
import React from "react";

type TProtectedRouteElementProps = {
  onlyUnAuth?: boolean;
  component: React.ReactNode;
};

const ProtectedRouteElement = ({
  onlyUnAuth = false,
  component,
}: TProtectedRouteElementProps) => {
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
export const OnlyUnAuth = ({ component }: TProtectedRouteElementProps) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
