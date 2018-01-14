import React, { Component } from 'react';
import ChartHome from './chart-home'
import moment from 'moment-with-locales-es6';
import { getFacturas, deleteFactura, getCajas } from '../services/services'



class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      cajas: [],
      facturas: []
    }
  }

  componentWillMount() {
    const facturasRef = getFacturas();
    const cajasRef = getCajas();

    facturasRef.on('value', snapshot => {
      var facturas = [];
      snapshot.forEach(factura => {
        facturas.push(factura.val());
      })
      this.setState({
        facturas
      })
    })

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

  render() {
    return (
      <div>
        <ChartHome cajas={this.state.cajas} facturas={this.state.facturas} />
      </div>
    );
  }
}

export default Main;
