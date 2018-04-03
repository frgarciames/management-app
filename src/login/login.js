import React, { Component } from 'react';
import styled from 'styled-components';
import Form from './form';
import { Redirect } from 'react-router-dom'

const Wrapper = styled.div `
  width: 100%;
  height: auto;
  max-width: 30em;
  margin: 0 auto;
`;

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      isMailFocused: false,
      isPswrdFocused: false
    }
    this.onAuthEmail = this.onAuthEmail.bind(this);
  }
  componentWillMount(){
    document.title = 'Gestión - Login';
  }
  onAuthEmail(email, password, event){
    this.props.onAuthEmail(email, password, event);
  }
  render() {
    return (
        this.props.user ? (
          <Redirect to="/home"/>
        ) : (
          <Wrapper>
            <Form email={this.state.isMailFocused} password={this.state.isPswrdFocused} onAuthLogin={this.props.onAuthMain} onAuthEmail={this.onAuthEmail} error={this.props.errorLogin}/>
          </Wrapper>
        )
    );
  }
}

export default Login;
