import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import { Button, Input } from '../Utils/Utils';
import UserContext from '../../contexts/UserContext';

import './LoginForm.css';

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null };

  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { email, password } = ev.target;

    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        email.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
        this.context.handleLoginData(res.authToken);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm container" onSubmit={this.handleSubmitJwtAuth}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="email input-label">
          <label htmlFor="LoginForm_email">Email Address</label>
          <Input
            required
            name="email"
            id="LoginForm_email"
            className="login_reg_inputs"
          ></Input>
        </div>
        <div className="password input-label">
          <label htmlFor="LoginForm_password">Password</label>
          <Input
            required
            name="password"
            type="password"
            id="LoginForm_password"
            className="login_reg_inputs"
          ></Input>
        </div>
        <Button className="standard login_reg_buttons" type="submit">
          Login
        </Button>
        <div>
          <h4>Test Users: (passwords ending with number one)</h4>
          <p>test-user-1: test1@ex.com, Pa$$word1</p>
          <p>test-user-2: test2@ex.com, Pa$$word1</p>
        </div>
      </form>
    );
  }
}
