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
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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


class NewFactura extends Component {
  constructor(props){
    super(props);
    this.state = {
        openFactura: this.props.openFactura,
        facturas: [],
        fecha_factura: "",
        amount: 0,
        comment: "",
        provider: "",
        errorAmount: false,
        errorDate: false,
        proveedorSelected: '',
        selectDisabled: false
    }
    this.handleAddFactura = this.handleAddFactura.bind(this);
  }

  componentWillMount(){
    this.setState({
      facturas: this.props.facturas
    })
  }

  componentWillReceiveProps(props){
    this.setState({
      facturas: props.facturas
    })
  }

  handleChangeDate(event){
    this.setState({
      fecha_factura: event.target.value
    })
  }

  handleChangeSelect = (proveedorSelected) => {
    this.setState({ proveedorSelected });
    console.log(`Selected: ${proveedorSelected.label}`);
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
  
  handleChangeDisableSelect(event){
    this.setState({
      selectDisabled: !this.state.selectDisabled
    })
  }

  handleAddFactura(event){
    var errors = false;
    this.setState({
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
    if(this.state.fecha_factura == null || this.state.fecha_factura == ''){
      errors = true;
      this.setState({
        errorDate: true
      })
    }

    if(!errors){
      event.preventDefault();
      const facturaRef = firebase.database().ref().child('facturas');
      const facturaID = facturaRef.push();
      var newFactura = {
        id: facturaID.path.pieces_[1],
        fecha_insert: moment(Date.now()).format(),
        fecha_factura: moment(this.state.fecha_factura).format(),
        amount: this.state.amount,
        provider: this.state.provider,
        comment: this.state.comment
      }
    
      facturaID.set(newFactura)
      this.setState({
        openFactura: false
      })
      this.props.close();
      this.setState({
        fecha_factura: "",
        amount: 0,
        comment: "",
        provider: "",
        errorAmount: false,
        errorDate: false
      });
    }
  }

  render() {
    const { proveedorSelect } = this.state;
    const value = proveedorSelect && proveedorSelect.value;
    return (
      <ReactModal 
              isOpen={this.props.opened}
              contentLabel="Minimal Modal Example"
              onRequestClose={() => {this.props.close(), this.setState({errorAmount: false, errorDate: false, fecha_factura: "", provider: "", amount: 0})}}
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
            <ContainerClose onClick={() => {this.props.close(), this.setState({errorAmount: false, errorDate: false, fecha_factura: "", provider: "", amount: 0})}}>
              <MdClose 
                style={{
                  fontSize: '1.3em',
                  color: 'grey'
                }}
              />
              </ContainerClose>

        <p>
          <label htmlFor="fecha">Fecha factura:</label>
          <Input bdcolor="#ccc" color="#222" type="date"  id="fecha" name="fecha_factura" cursor="pointer" change={(event) => this.handleChangeDate(event)} />
          {(this.state.errorDate) ? <span style={{fontSize: '.8em', color: 'red', marginTop: '.3em'}}>*La fecha es obligatoria</span> : ''}
        </p>
        <div>
          <label htmlFor="">Proveedor:</label>
          <Select
                name="form-field-name"
                value={value}
                onChange={this.handleChange}
                placeholder='Busca un proveedor'
                disabled={this.state.selectDisabled}
                options={[
                { value: 'one', label: 'One' },
                { value: 'two', label: 'Two' },
                ]}
            />
          <label className="container" htmlFor="check-select">No es ninguno
            <input type="checkbox" onChange={(event) => this.handleChangeDisableSelect(event)} id="check-select" />
            <span className="checkmark"></span>
          </label>
        </div>
        {(this.state.selectDisabled) ? <p>Escriba el proveedor <input type="text" /></p> : ''}
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
        <Button color="white" bgcolor="#34A853" text="Guardar" width="100%" click={(event) => {this.handleAddFactura(event)}} type="submit"/>
      </ReactModal>
    );
  }
}

export default NewFactura;
