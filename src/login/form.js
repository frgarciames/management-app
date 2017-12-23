import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../utils/button';
import Input from '../utils/input';
import image from '../utils/logo.png'

const Wrapper = styled.form `
  width: 80%;
  height: auto;
  margin: 0 auto;
  margin-top: 2em;
`;

const ContainerInput = styled.div `
  padding-top: 1em;
  padding-bottom: 1em;
`;

const ContainerLogo = styled.div `
  width: 100%;
  text-align: center;
`;

const ErrorLogin = styled.p `
  font-weight: bold;
  color: red;
  text-align: center;
  margin-top: 1em;
`;

class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }

  }

  setEmail(event){
    this.setState({
      email: event.target.value
    })
  }

  setPassword(event){
    this.setState({
      password: event.target.value
    })
  }

  render() {
    return (
      <Wrapper>
        <ContainerLogo>
          <img src={image} alt="Logo" width="100px"/>
        </ContainerLogo>
        <ContainerInput>
          <Input bdcolor="#ccc" color="#222" type="text" placeholder="E-mail" id="email"  change={(event) => this.setEmail(event)}/>
          <Input bdcolor="#ccc" color="#222" type="password" placeholder="Contraseña"  id="pass"  change={(event) => this.setPassword(event)}/>
          <ErrorLogin>{this.props.error}</ErrorLogin>
        </ContainerInput>
        <p>
          <Button color="white" bgcolor="#6DCCD7" text="Entrar" width="100%" click={(event) => this.props.onAuthEmail(this.state.email, this.state.password, event)} />
          <Button color="white" bgcolor="#EA4335" text="Entrar con Google" width="100%" click={(event) => this.props.onAuthLogin(event)} />
        </p>
      </Wrapper>
    );
  }
}

export default Form;
