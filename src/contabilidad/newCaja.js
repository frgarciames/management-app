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
import ReactModal  from 'react-modal'
import {MdClose} from 'react-icons/lib/md';

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

const ContainerClose = styled.span`
position: absolute;
right: .5em;
top: .5em;
cursor: pointer;
border: 1px solid #ccc;
border-radius: 3px;
`;


class newCaja extends Component {
  constructor(props){
    super(props);
    this.state = {
        openCaja: this.props.openCaja,
        cajas: [],
        fecha_caja: "",
        amount: 0,
        comment: "",
        provider: "",
        errorAmount: false,
        errorDate: false,
        errorSameDate: false
    }
    this.handleAddCaja = this.handleAddCaja.bind(this);
  }

  componentWillMount(){
    this.setState({
      cajas: this.props.cajas
    })
  }

  componentWillReceiveProps(props){
    this.setState({
      cajas: props.cajas
    })
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
    var errors = false;
    this.setState({
      errorSameDate: false,
      errorDate: false,
      errorAmount: false
    })
    if(this.state.amount == null || this.state.amount == ''){
      errors = true;
      this.setState({
        errorAmount: true
      })
    } else {
      this.setState({
        errorAmount: false
      })
    } 
    if(this.state.fecha_caja == null || this.state.fecha_caja == ''){
      errors = true;
      this.setState({
        errorDate: true
      })
    } else {
      var dates = [];
      this.state.cajas.forEach(el => {
        for(var key in el){
          if(key === 'fecha_caja'){
            dates.push(el[key]);
          }
        }
      })

      dates.forEach(el => {
        if(moment(el).format().valueOf() === moment(this.state.fecha_caja).format().valueOf()){
          errors = true;
          this.setState({
            errorSameDate: true
          })
        } 
      })


    } 
    if(!errors){
      event.preventDefault();
      const cajaRef = firebase.database().ref().child('cajas');
      const cajaID = cajaRef.push();
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
      this.props.close();
      this.setState({
        fecha_caja: "",
        amount: 0,
        comment: "",
        provider: "",
        errorAmount: false,
        errorDate: false
      });
    }
  }

  render() {
    return (
      <ReactModal 
              ariaHideApp={false}
              isOpen={this.props.opened}
              contentLabel="Minimal Modal Example"
              onRequestClose={() => {this.props.close(), this.setState({errorAmount: false, errorDate: false, errorSameDate: false, fecha_caja: "", amount: 0})}}
              style={{
                content: {
                  position: 'absolute',
                  margin: 'auto',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bottom: '',
                  right: '',
                  padding: '1em'
                }
              }}
            >
            <ContainerClose onClick={() => {this.props.close(), this.setState({errorAmount: false, errorDate: false, errorSameDate: false, fecha_caja: "", amount: 0})}}>
              <MdClose 
                style={{
                  fontSize: '1.3em',
                  color: 'grey'
                }}
              />
              </ContainerClose>

        <p>
          <label htmlFor="fecha">Fecha caja:</label>
          <Input bdcolor="#ccc" color="#222" type="date"  id="fecha" name="fecha_caja" cursor="pointer" change={(event) => this.handleChangeDate(event)} />
          {(this.state.errorDate) ? <span style={{fontSize: '.8em', color: 'red', marginTop: '.3em'}}>*La fecha es obligatoria</span> : ''}
          {(this.state.errorSameDate) ? <span style={{fontSize: '.8em', color: 'red', marginTop: '.3em'}}>*Este día ya existe</span> : ''}
        </p>
        <p style={{marginTop: 1 + "em"}}>
          <label htmlFor="money">Total €:</label>
          <Input bdcolor="#ccc" color="#222" type="number"  id="money" name="amount" change={(event) => this.handleChangeAmount(event)} />
          {(this.state.errorAmount) ? <span style={{fontSize: '.8em', color: 'red', marginTop: '.3em'}}>*La cantidad es obligatoria</span> : ''}
        </p>
        <p style={{marginTop: 1 + "em"}}>
          <label htmlFor="comment">Comentario:</label>
          <TextArea name="comment" onChange={(event) => this.handleChangeComment(event)} id="comment" >
          </TextArea>
        </p>
        <Button color="white" bgcolor="#34A853" text="Guardar" width="100%" click={(event) => {this.handleAddCaja(event)}} type="submit"/>
      </ReactModal>
    );
  }
}

export default newCaja;
