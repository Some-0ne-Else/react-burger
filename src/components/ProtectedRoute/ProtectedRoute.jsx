/* eslint-disable react/jsx-props-no-spreading */
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

function ProtectedRoute({ children, ...props }) {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  return (
    <Route
      {...props}
            // Получим текущий маршрут, с которого произойдёт переадресация
            // для неавторизованного пользователя
      render={({ location }) => (isLoggedIn ? (
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
