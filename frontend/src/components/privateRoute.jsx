import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
