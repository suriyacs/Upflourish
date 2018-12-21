import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Alert from 'react-s-alert';

import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Injecting Toastify CSS
import storage from '../../globals/localStorage';
import AppSection from '../Routes/index';
import UserActions from '../../actions/user';
import '../../../assets/styles/components/App.scss';

class App extends React.Component {
  componentDidMount() {
    const user = storage.getItem('user');
    if (user) {
      this.props.loadUserDetails(user);
    }
  }

  render() {
    return (
      <Fragment>
        <AppSection />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Alert stack={{ limit: 3 }} timeout={3000} />
      </Fragment>
    );
  }
}

App.propTypes = {
  loadUserDetails: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  loadUserDetails: userId => dispatch(UserActions.onAppLoad(userId))
});

export default withRouter(connect(null, mapDispatchToProps)(App));
