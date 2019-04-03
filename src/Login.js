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
    this.state = {
      username: '',
      password: '',
      open: this.props.init,
      redirectToPreviousRoute: false,
    };
  }

  handleLogin = () => {
    const { username, password } = this.state;
    console.log("handleLogin. creds "+ username+"/"+password);
    this.props.onLogin(this.state);
    this.setState({ open: false });
  }

  handleLoginKatrin = () => {
    const katrin_cred = {
      username: "katrin",
      password: "test",
      open: false,
    };
    this.setState(katrin_cred);
    this.props.onLogin(this.state);
  }

  handleClose = () => {
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
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="login-dialog-title"
          >
          <DialogTitle id="login-dialog-title">Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter credentials for GM reporting service.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="username"
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
              id="password"
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
              onClick={this.handleClose}
              color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLoginKatrin}>
              Katrin
            </Button>
            <Button
              onClick={this.handleLogin}
              color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  username: state.login_name
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
