/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/index';

function ProtectedRoute({ children, ...props }:{[x:string]: any, children: React.ReactNode}) {
  const isLoggedIn = useSelector((store:RootState) => store.user.isLoggedIn);
  return (
    <Route
      {...props}
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
