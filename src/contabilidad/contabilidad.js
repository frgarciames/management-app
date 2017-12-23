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

const Wrapper = styled.div `
  width: 90%;
  margin: 0 auto;
`;

const WrapperBox = styled.div `
  width: 100%;
  margin-top: 1.5em;

`;

const NewCaja = styled.form `
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



class Contabilidad extends Component {
  constructor(){
    super();

    this.state = {
      openCaja: false,
      cajas: [],
      fecha_caja: "",
      amount: 0,
      comment: "",
      provider: ""
    }

    this.handleAddCaja = this.handleAddCaja.bind(this);
    this.openCaja = this.openCaja.bind(this);
    moment.locale('es');
    this.renderEditable = this.renderEditable.bind(this);
  }

  componentWillMount(){
    const cajasRef = firebase.database().ref().child('cajas');

    cajasRef.on('value', snapshot => {
      var cajas = [];
      snapshot.forEach(caja => {
        cajas.push(caja.val());
      })
      console.log(cajas);
      this.setState({
        cajas
      })
    })

  }

  renderEditable(cellInfo) {
  return (
    <div

      contentEditable
      suppressContentEditableWarning
      onBlur={e => {
        const data = [...this.state.cajas];
        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
        var caja = {
          amount: cellInfo.original.amount,
          comment: cellInfo.original.comment,
          fecha_caja: cellInfo.original.fecha_caja,
          fecha_insert: cellInfo.original.fecha_insert,
          id: cellInfo.original.id
        }

        var updates = {};
        updates['/cajas/' + caja.id] = caja;

        firebase.database().ref().update(updates);

      }}
      dangerouslySetInnerHTML={{
        __html: this.state.cajas[cellInfo.index][cellInfo.column.id]
      }}

    />
  );
}

  handleAddCaja(event){
    event.preventDefault();
    const cajaRef = firebase.database().ref().child('cajas');
    const cajaID = cajaRef.push();
    console.log(cajaID);
    var newCaja = {
      id: cajaID.path.pieces_[1],
      fecha_insert: moment(Date.now()).format('LL'),
      fecha_caja: moment(this.state.fecha_caja).format('LL'),
      amount: this.state.amount,
      comment: this.state.comment
    }

    cajaID.set(newCaja)
    this.setState({
      openCaja: false
    })
  }

  openCaja(){
    if(this.state.openCaja){
      this.setState({
        openCaja: false
      })
    } else {
      this.setState({
        openCaja: true
      })
    }
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

  render() {
    const data = this.state.cajas;
    const columns = [{
      Header: 'Cuantía',
      accessor: 'amount', // String-based value accessors!
      Cell: this.renderEditable
    }, {
      Header: 'Fecha caja',
      accessor: 'fecha_caja',
      Cell: this.renderEditable
    }, {
      Header: 'Fecha inserción',
      accessor: 'fecha_insert'
    }, {
      Header: 'Comentario', // Custom header components!
      accessor: 'comment',
      Cell: this.renderEditable
    }]
    return (
      <Wrapper>
        <Button color="white" bgcolor="#34A853" text="Nueva caja" width="100%" click={this.openCaja} />
        <NewCaja opened={this.state.openCaja}>
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
        </NewCaja>

        <ReactTable
          data={data}
          columns={columns}
          className="-striped -highlight mrgTable"
          getTheadProps={() => {
            return {
              style: {
                fontWeight: 'bold'
              }
          }}
        }
        getPaginationProps = {() => {
          return {
            nextText: 'Siguiente',
            previousText: 'Anterior',
            pageText: 'Página',
            ofText: 'de',
            rowsText: 'filas'
          }
        }}
        />
      </Wrapper>

    );
  }
}

export default Contabilidad;
