import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';
import { setDimensions } from 'redux/dimensions/dimensions.actions';
import { fetchOauth } from 'redux/oauth/oauth.actions';

import { debounce } from 'lodash-es';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/header/header.component';

/* -------------------------------------------------------------------------- */

const App = ({ setDimensions, fetchOauth }) => {
  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 1000);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setDimensions]);

  useEffect(() => {
    fetchOauth();
  }, [fetchOauth]);

  const Surveys = () => <></>;

  return (
    <>
      <Header />

      <Switch>
        <Route exact path="/surveys" component={Surveys} />
      </Switch>
    </>
  );
};

/* -------------------------------------------------------------------------- */

App.propTypes = {
  setDimensions: PropTypes.func,
  fetchOauth: PropTypes.func,
};

export default connect(null, { setDimensions, fetchOauth })(App);
