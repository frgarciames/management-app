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
import { getProviders, getColorProviderById } from '../services/services'

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
        colorProvider: '',
        amount: 0,
        comment: "",
        provider: {
          id: "",
          name: "",
          color: ""
        },
        errorAmount: false,
        errorDate: false,
        errorProvider: false,
        errorColor: false,
        selectDisabled: false,
        providers: [],
        options: [],
        selectedOption: {}
    }
    this.handleAddFactura = this.handleAddFactura.bind(this);
    this.closeModalAndResetState = this.closeModalAndResetState.bind(this);
  }

  componentWillMount(){
    const providersRef = getProviders();

    providersRef.on('value', snapshot => {
      var providers = [];
      snapshot.forEach(provider => {
        providers.push(provider.val());
      })
      this.setState({
        providers,
        facturas: this.props.facturas
      }, () => {
        this.setState({
          options: this.getOptions()
        })
      })
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

  handleChangeProvider(provider){
    if(null != provider){
      (this.state.selectDisabled) ? 
      this.setState({ provider: {id: "", name: provider.target.value} }) : 
      this.setState({ 
        provider: {
          id: provider.value, 
          name: provider.label, 
          color: getColorProviderById(provider.value)
        }, 
        selectedOption: {
          label: provider.label, 
          value: provider.value
        },
        colorProvider: getColorProviderById(provider.value)
      })
    } else {
      this.setState({
        selectedOption: provider,
        provider: {
          id: "",
          name: "",
          color: ""
        }
      })
    }
  }

  handleColorProvider(event){
    this.setState({
      colorProvider: event.target.value
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
  
  handleChangeDisableSelect(event){
    this.setState({
      selectDisabled: !this.state.selectDisabled,
      selectedOption: {}
    })
  }

  getOptions(){
    var options = this.state.providers.map(el => {
      return {
        value: el.id,
        label: el.name
      }
    });
    return options;
  }

  closeModalAndResetState(){
    this.props.close()
    this.setState({
      errorAmount: false, 
      errorProvider: false, 
      errorDate: false, 
      errorColor: false,
      fecha_factura: "", 
      provider: {}, 
      amount: 0, 
      colorProvider: '',
      selectDisabled: false,
      comment: ''
    })
  }

  handleAddFactura(event){
    var errors = false;
    this.setState({
      errorDate: false,
      errorAmount: false
    })
    if(this.state.amount == null || this.state.amount == 0){
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

    if(this.state.colorProvider == null || this.state.colorProvider == ''){
      errors = true;
      this.setState({
        errorColor: true
      })
    } else {
      let provider = this.state.provider;
      provider.color = this.state.colorProvider;
      this.setState({
        provider
      })
    }

    if(this.state.provider == null || 
      this.state.provider == undefined || 
      this.state.provider.name == null ||
      this.state.provider.name == "" 
    ) {
      errors = true;
      this.setState({
        errorProvider: true
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
      if(null === this.state.provider.id || "" === String(this.state.provider.id)){
        const providerRef = firebase.database().ref().child('providers');
        const providerID = providerRef.push();

        var provider = {
          id: providerID.path.pieces_[1],
          name: this.state.provider.name,
          color: this.state.provider.color
        }

        providerID.set(provider)

        newFactura.provider = provider
      }

      facturaID.set(newFactura)
      
      this.setState({
        openFactura: false
      })
      this.closeModalAndResetState();
    }
  }

  render() {
    const { selectedOption } = this.state;
  	const value = selectedOption && selectedOption.value;
    return (
      <ReactModal 
              ariaHideApp={false}
              isOpen={this.props.opened}
              contentLabel="Minimal Modal Example"
              onRequestClose={this.closeModalAndResetState}
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
            <ContainerClose onClick={this.closeModalAndResetState}>
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
        <div style={{marginTop: '1em'}}>
          {(!this.state.selectDisabled) ? 
            <div>
              <label>Proveedor:</label>
              <Select
                    name="form-field-name"
                    value={value}
                    onChange={(event) => this.handleChangeProvider(event)}
                    placeholder='Busca un proveedor'
                    disabled={this.state.selectDisabled}
                    options={this.state.options}
                    style={{
                      marginBottom: '1em',
                      marginTop: '1em'
                    }}
                />
            </div>
              : ''}
          <div className="pretty p-switch p-fill">
              <input type="checkbox" onChange={(event) => this.handleChangeDisableSelect(event)} />
              <div className="state">
                  <label>No es ninguno de los anteriores</label>
              </div>
          </div>
        </div>
        {(this.state.selectDisabled) ?
          <div>
            <p style={{marginTop: '1em'}}>Escriba el proveedor:
              <Input bdcolor="#ccc" color="#222" type="text"  id="providerOther" mgTop="0" name="providerOther" change={(event) => this.handleChangeProvider(event)} />
            {(this.state.errorProvider) ? <span style={{fontSize: '.8em', color: 'red', marginTop: '-1em'}}>*El proveedor es obligatorio</span> : ''}
            </p> 
            <p>Escoja su color:
              <Input type="color" id="providerColor" name="providerColor" change={(event) => this.handleColorProvider(event)} />
              {(this.state.errorColor) ? <span style={{fontSize: '.8em', color: 'red', marginTop: '.3em'}}>*El color es obligatorio</span> : ''}
            </p>
          </div>
            : ''} 
        <p style={{marginTop: 1 + "em"}}>
          <label htmlFor="money">Total €:</label>
          <Input bdcolor="#ccc" step="any" color="#222" type="number"  id="money" name="amount" change={(event) => this.handleChangeAmount(event)} />
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
