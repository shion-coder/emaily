import React, { Suspense, lazy, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';
import { setDimensions } from 'redux/dimensions/dimensions.actions';
import { fetchOauth } from 'redux/oauth/oauth.actions';

import { debounce } from 'lodash-es';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/header/header.component';
import Footer from 'components/footer/footer.component';
import Loader from 'components/loader/loader.component';

import { Container } from './app.styles';

/* -------------------------------------------------------------------------- */

const Landing = lazy(() => import('pages/landing/landing.page'));
const Dashboard = lazy(() => import('pages/dashboard/dashboard.page'));

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

  return (
    <Container>
      <Header />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
        </Switch>
      </Suspense>

      <Footer />
    </Container>
  );
};

/* -------------------------------------------------------------------------- */

App.propTypes = {
  setDimensions: PropTypes.func,
  fetchOauth: PropTypes.func,
};

export default connect(null, { setDimensions, fetchOauth })(App);
