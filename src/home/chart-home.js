import React, { Component } from 'react';
import Chart from '../utils/chart';
import moment from 'moment-with-locales-es6'
import { getMonths } from '../utils/utils'

class ChartHome extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData:{},
      cajas: props.cajas,
      months: getMonths(),
      facturas: props.facturas,
      monthsPerName: [],
      cajasPerChart: [],
      facturasPerChart: []
    }
  }

  componentWillMount(){
    var arrayAuxCajas = JSON.parse(JSON.stringify(this.props.cajas));
    var arrayAuxFacturas = JSON.parse(JSON.stringify(this.props.facturas))
    let totalAmountCajasPerMonth = [];
    let totalAmountFacturasPerMonth = [];
    let monthsPerName = []
    this.state.months.forEach((el) => {
      monthsPerName.push(el.name.charAt(0).toUpperCase() + el.name.slice(1));
      let amountCaja = 0;
      let amountFactura = 0;
      arrayAuxCajas.forEach((caja) => {
        if(el.id == new Date(caja.fecha_caja).getMonth() + 1){
          amountCaja += parseInt(caja.amount)
        }
      })
      arrayAuxFacturas.forEach((factura) => {
        if(el.id == new Date(factura.fecha_factura).getMonth() + 1){
          amountFactura += parseInt(factura.amount)
        }
      })
      totalAmountCajasPerMonth.push(amountCaja)
      totalAmountFacturasPerMonth.push(amountFactura)
    })
    this.setState({
      cajasPerChart: totalAmountCajasPerMonth,
      facturasPerChart: totalAmountFacturasPerMonth,
      monthsPerName
    })

  }

  componentWillReceiveProps(props){
    var arrayAuxCajas = JSON.parse(JSON.stringify(props.cajas));
    var arrayAuxFacturas = JSON.parse(JSON.stringify(props.facturas))
    let totalAmountCajasPerMonth = [];
    let totalAmountFacturasPerMonth = [];
    let monthsPerName = []
    this.state.months.forEach((el) => {
      monthsPerName.push(el.name.charAt(0).toUpperCase() + el.name.slice(1));
      let amountCaja = 0;
      let amountFactura = 0;
      arrayAuxCajas.forEach((caja) => {
        if(el.id == new Date(caja.fecha_caja).getMonth() + 1){
          amountCaja += parseInt(caja.amount)
        }
      })
      arrayAuxFacturas.forEach((factura) => {
        if(el.id == new Date(factura.fecha_factura).getMonth() + 1){
          amountFactura += parseInt(factura.amount)
        }
      })
      totalAmountCajasPerMonth.push(amountCaja)
      totalAmountFacturasPerMonth.push(amountFactura)
    })
    this.setState({
      cajasPerChart: totalAmountCajasPerMonth,
      facturasPerChart: totalAmountFacturasPerMonth,
      monthsPerName
    })
  }

  render() {
    return (
      <div className="App">
        <Chart 
          cajas={this.state.cajasPerChart} 
          facturas={this.state.facturasPerChart} 
          legendPosition="bottom" type="mixed" 
          text="Cantidad en € de cajas diarias" 
          months={this.state.monthsPerName}/>
      </div>
    );
  }
}

export default ChartHome;