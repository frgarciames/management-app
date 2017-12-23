import React, { Component } from 'react';
import firebase from 'firebase'
import Header from './header/header'
import styles from './styles/styles.css'
import {Redirect, Route} from 'react-router-dom'
import Login from './login/login'
import Facturas from './facturas/facturas'
import Trabajadores from './trabajadores/trabajadores'
import Home from './home/home'
import Contabilidad from './contabilidad/contabilidad'
import Proveedores from './proveedores/proveedores'


class App extends Component {

  constructor(){
    super();

    this.state = {
      user: null,
      errorLogin: null
    }
    this.handleOnAuthGoogle = this.handleOnAuthGoogle.bind(this);
    this.handleOnAuth = this.handleOnAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.badLogin = this.badLogin.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setState({user: user})
      } else {
        this.setState({user: null})
      }
    })
  }

  handleOnAuthGoogle (event){
    event.preventDefault();
    console.log('login en APP')
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.error(`Error: ${error.code}: ${error.code}`))
  }

  handleOnAuth(email, password, event){
    event.preventDefault();
    console.log(email, password);
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.badLogin(errorCode, errorMessage);
      }
    );
  }


  badLogin(errorCode, errorMessage){
    let errorCodeSpanish = "";
    switch (errorCode) {
      case "auth/wrong-password":
        errorCodeSpanish = "Contraseña incorrecta";
        break;
      case "auth/invalid-email":
        errorCodeSpanish = "E-mail no válido";
        break;
      case "auth/user-not-found":
        errorCodeSpanish = "E-mail incorrecto";
        break;
      default:
        errorCodeSpanish = "Error al hacer login";
        break;
    }
    this.setState({
      errorLogin: errorCodeSpanish
    })
  }

  handleLogout(){
    firebase.auth().signOut()
      .then(() => console.log("Desconectado correctamente"))
      .catch(() => console.log("Error al desconectarse"))
  }

  render() {
    if(this.state.user){
      switch (window.location.pathname) {
        case '/contabilidad':
          return(
            <div>
              <Header user={this.state.user} onLogout={this.handleLogout} />
              <Contabilidad />
            </div>
          )
          break;
        case '/facturas':
          return (
            <div>
              <Header user={this.state.user} onLogout={this.handleLogout}/>
              <Facturas />
            </div>
          )
          break;
        case '/trabajadores':
          return (
            <div>
              <Header user={this.state.user} onLogout={this.handleLogout}/>
              <Trabajadores  />
            </div>
          )
          break;
        case '/proveedores':
          return (
            <div>
              <Header user={this.state.user} onLogout={this.handleLogout}/>
              <Proveedores   />
            </div>
          )
          break;
        case '/home':
          return (
            <div>
              <Header user={this.state.user} onLogout={this.handleLogout}/>
              <Home   />
            </div>
          )
          break;
        case '/':
          return (
            <div>
              <Header user={this.state.user} onLogout={this.handleLogout}/>
              <Redirect to ='/home' />
              <Home   />
            </div>
          )
          break;
          default:
            return (
              <div>
                <Header user={this.state.user} onLogout={this.handleLogout}/>
                <Redirect to ='/home' />
                <Home  />
              </div>
            )
        }
    } else {
      return (
        <div>
          <Login onAuthMain={this.handleOnAuthGoogle} onAuthEmail={this.handleOnAuth} errorLogin={this.state.errorLogin}/>
        </div>
      )
    }
  }
}

export default App;
