import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from 'firebase'
import Button from '../utils/button'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import styles from '../styles/styles.css'
import moment from 'moment-with-locales-es6';
import NewCaja from './newCaja'
import Table from '../utils/table'
import { formatDateForTable, printDataTable, renderEditableForTable} from '../utils/utils';
import { getCajas } from '../services/services'

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const WrapperBox = styled.div`
  width: 100%;
  margin-top: 1.5em;

`;

class Contabilidad extends Component {
  constructor() {
    super();

    this.state = {
      openCaja: false,
      cajas: [],
      fecha_caja: "",
      amount: 0,
      comment: "",
      provider: ""
    }

    this.openCaja = this.openCaja.bind(this);
    moment.locale('es');
  }

  componentWillMount() {
    const cajasRef = getCajas();

    cajasRef.on('value', snapshot => {
      var cajas = [];
      snapshot.forEach(caja => {
        cajas.push(caja.val());
      })
      this.setState({
        cajas
      })
    })

  }

  openCaja() {
    if (this.state.openCaja) {
      this.setState({
        openCaja: false
      })
    } else {
      this.setState({
        openCaja: true
      })
    }
  }

  render() {
    const data = this.state.cajas;
    return (
      <Wrapper>
        <Button color="white" bgcolor="#34A853" text="Nueva caja" width="100%" click={this.openCaja} />
        <NewCaja opened={this.state.openCaja} />
        <Table 
          data={data}
          type='contabilidad'
              />
      </Wrapper>

    );
  }
}

export default Contabilidad;
