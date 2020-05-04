import React, { Suspense, lazy, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';
import { setDimensions } from 'redux/dimensions/dimensions.actions';
import { fetchOauth } from 'redux/oauth/oauth.actions';

import { Switch, Route } from 'react-router-dom';
import { debounce } from 'lodash-es';

import Header from 'components/header/header.component';
import Footer from 'components/footer/footer.component';
import Loader from 'components/loader/loader.component';

import { Container, Body } from './app.styles';

/* -------------------------------------------------------------------------- */

const Landing = lazy(() => import('pages/landing/landing.page'));
const Dashboard = lazy(() => import('pages/dashboard/dashboard.page'));
const SurveyNew = lazy(() => import('pages/survey-new/survey-new.page'));

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

      <Body>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </Switch>
        </Suspense>
      </Body>

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
