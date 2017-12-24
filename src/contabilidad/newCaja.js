import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from 'firebase'
import uuid from 'uuid'
import Button from '../utils/button'
import Input from '../utils/input'
import { BrowserRouter, Link, Route,Router, Redirect } from 'react-router-dom'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import styles from '../styles/styles.css'
import moment from 'moment-with-locales-es6';

const ContainerBox = styled.form `
width: 100%;
padding: 1em;
display: ${props => props.opened ? 'block' : 'none'};
margin-top: 1.5em;
box-shadow: 0 0 5px 3px #ccc;
`;

const TextArea = styled.textarea `
width: 100%;
border: 1px solid #ccc;
resize: none;
padding: .5em 0 .5em .3em;
margin-top: 1em;
`;


class newCaja extends Component {
  constructor(props){
    super(props);
    this.state = {
        openCaja: this.props.openCaja,
        fecha_caja: "",
        amount: 0,
        comment: "",
        provider: ""
    }
    this.handleAddCaja = this.handleAddCaja.bind(this);
  }

  handleChangeDate(event){
    this.setState({
      fecha_caja: event.target.value
    })
  }

  handleChangeAmount(event){
    this.setState({
      amount: event.target.value
    })
  }

  handleChangeComment(event){
    this.setState({
      comment: event.target.value
    })
  }

  handleChangeProvider(event){
    this.setState({
      provider: event.target.provider
    })
  }

  handleAddCaja(event){
    event.preventDefault();
    const cajaRef = firebase.database().ref().child('cajas');
    const cajaID = cajaRef.push();
    console.log(cajaID);
    var newCaja = {
      id: cajaID.path.pieces_[1],
      fecha_insert: moment(Date.now()).format(),
      fecha_caja: moment(this.state.fecha_caja).format(),
      amount: this.state.amount,
      comment: this.state.comment
    }

    cajaID.set(newCaja)
    this.setState({
      openCaja: false
    })
  }

  render() {
    return (
        <ContainerBox opened={this.props.opened}>
        <p>
          <label htmlFor="fecha">Fecha caja:</label>
          <Input bdcolor="#ccc" color="#222" type="date"  id="fecha" name="fecha_caja" cursor="pointer" change={(event) => this.handleChangeDate(event)}/>
        </p>
        <p style={{marginTop: 1 + "em"}}>
          <label htmlFor="money">Total €:</label>
          <Input bdcolor="#ccc" color="#222" type="number"  id="money" name="amount" change={(event) => this.handleChangeAmount(event)}/>
        </p>
        <p style={{marginTop: 1 + "em"}}>
          <label htmlFor="comment">Comentario:</label>
          <TextArea name="comment" onChange={(event) => this.handleChangeComment(event)} id="comment">
          </TextArea>
        </p>
        <Button color="white" bgcolor="#13P191" text="Guardar" width="100%" click={this.handleAddCaja} type="submit"/>
      </ContainerBox>
    );
  }
}

export default newCaja;
