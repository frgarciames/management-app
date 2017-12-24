import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from 'firebase'
import uuid from 'uuid'
import Button from './button'
import Input from './input'
import { BrowserRouter, Link, Route, Router, Redirect } from 'react-router-dom'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import styles from '../styles/styles.css'
import moment from 'moment-with-locales-es6';
import { colContabilidad } from './columns/col-contabilidad'


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFormatted: [],
      dataNotFormatted: [],
      typeTable: '',
      columns: [],
      loading: true
    }
    moment.locale('es');
  }

  getColumns() {
    switch (this.state.typeTable) {
      case 'contabilidad':
        return colContabilidad;
      case 'trabajadores':
        return colContabilidad;
      case 'facturas':
        return colContabilidad;
      default:
        break;
    }
  }

  componentWillMount(){
      this.setState({
        typeTable: this.props.type,
        dataNotFormatted: this.props.data
      }, () => {
        var columns = this.getColumns();
        this.formattingData();
        this.setState({
          columns
        })
      }
      )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      this.setState({
        typeTable: nextProps.type,
        dataNotFormatted: nextProps.data
      }, () => {
        var columns = this.getColumns();
        this.formattingData();
        this.setState({
          columns
        })
      }
      )
    }
  }

  componentDidMount(){
    console.log('loading a false');
    this.setState({
      loading: false
    })
  }
  
  formattingData(){
    var dataFormat = this.state.dataNotFormatted;
    dataFormat.forEach(el => {
      for (var key in el) {
        if(key.includes('fecha')){
          el[key] = moment(el[key]).format('LL')
        }
      }
    })
    this.setState({ 
      dataFormatted: dataFormat
    })
  }

  render() {
    const data = this.state.dataFormatted;

    return (
      <ReactTable
        data={data}
        columns={this.state.columns}
        loading={this.state.loading}
        noDataText="No existen resultados"
        loadingText="Cargando resultados..."
        style={{
            height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
        className="-striped -highlight mrgTable"
        getTheadProps={() => {
          return {
            style: {
              fontWeight: 'bold'
            }
          }
        }
        

        }
        getPaginationProps={(rowInfo, state, ) => {
          return {
            nextText: 'Siguiente',
            previousText: 'Anterior',
            pageText: 'Página',
            ofText: 'de',
            rowsText: 'filas'
          }
        }}
      />
    );
  }
}

export default Table;