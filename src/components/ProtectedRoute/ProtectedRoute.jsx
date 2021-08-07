/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { REFRESH_TOKEN } from '../../utils/constants';

function ProtectedRoute({ children, ...props }) {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const isRefreshExist = localStorage.getItem(REFRESH_TOKEN);
  return (
    <Route
      {...props}
      render={({ location }) => (isLoggedIn && isRefreshExist ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object.isRequired,
};
