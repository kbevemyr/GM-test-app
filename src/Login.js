import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from './store/actions';


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginKatrin = this.handleLoginKatrin.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      username: 'pia',
      password: 'ppp',
      rememberme: false,
      open: this.props.init,
      redirectToPreviousRoute: false,
    };
  }

  handleLogin = (e) => {
    const { username, password } = this.state;
    //console.log(JSON.stringify(this.state));
    console.log("handleLogin. creds "+ username+"/"+password);
    this.setState({ open: false });
    this.props.onLogin({ username: username, password: password });
  }

  handleLoginKatrin = (e) => {
    const katrin_cred = {
      username: "katrin",
      password: "test",
    };
    this.setState(katrin_cred);
    console.log(JSON.stringify(this.state));
    this.setState({ open: false });
    this.props.onLogin(katrin_cred);
  }

  handleClose = (e) => {
    this.setState({ open: false });
  };

  render() {
    const { from } = this.props.location.state || { from : {patname: '/'} };
    const { redirectToPreviousRoute } = this.state;

    if (redirectToPreviousRoute) {
      console.log("Login.render redirect path "+from.pathname);
      return (<Redirect to={from} />);
    }

    return (

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="login-dialog-title"
          onBackdropClick={this.handleClose}
          >
          <DialogTitle id="login-dialog-title">Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter credentials for GM reporting service.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="usernameinput"
              label="Username"
              type="text"
              fullWidth
              >
              <Input
                value={this.state.username}
                type='text'
                onChange={(e) => this.setState({username: e.target.value})}
                />
            </TextField>
            <TextField
              margin="dense"
              id="passwordinput"
              label="Password"
              type="password"
              fullWidth
              >
              <Input
                value={this.state.password}
                type='password'
                onChange={(e) => this.setState({password: e.target.value})}
                />
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => this.handleClose(e)}
              color="primary">
              Cancel
            </Button>
            <Button onClick={(e) => this.handleLoginKatrin()}>
              Katrin
            </Button>
            <Button
              onClick={(e) => this.handleLogin(e)}
              color="primary"
              raised>
              Login
            </Button>
          </DialogActions>
        </Dialog>

    );
  }
}

// Store handling
const mapStateToProps = state => ({
  username: state.userprofile,
});

const mapDispatchToProps = dispatch => ({
    onLogin: (creds) => {
      dispatch(loginUser(creds));
  },
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default withRouter(LoginContainer);
