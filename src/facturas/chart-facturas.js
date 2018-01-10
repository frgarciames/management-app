import React, { Component } from 'react';
import Chart from '../utils/chart';
import moment from 'moment-with-locales-es6'

class ChartFacturas extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData:{},
      facturas: props.data,
      amountFacturas: []
    }
  }

  componentWillMount(){

    var arrayAux = JSON.parse(JSON.stringify(this.props.data));
    arrayAux.sort((a, b) => {
        if (a.fecha_factura > b.fecha_factura) return -1;
        if (a.fecha_factura < b.fecha_factura) return 1;
        return 0;
    })
    var arrayAmount = [];
    arrayAux.forEach(el => {
        arrayAmount.push(el.amount);
    })
    var arrayDate = [];
    arrayAux.forEach(el => {
        arrayDate.push(moment(el.fecha_factura).format('L'));
    })
    this.setState({
        amountFacturas: arrayAux,
        chartData:{
            labels: arrayDate,
            datasets:[
              {
                label:'Cantidad',
                data: arrayAmount,
                backgroundColor:'#F38069',
                borderColor: '#FF2E00'
              }
            ]
          }
    })
  }

  componentWillReceiveProps(props){
    var arrayAux = JSON.parse(JSON.stringify(props.data));
    arrayAux.sort((a, b) => {
        if (a.fecha_factura > b.fecha_factura) return 1;
        if (a.fecha_factura < b.fecha_factura) return -1;
        return 0;
    })
    var arrayAmount = [];
    arrayAux.forEach(el => {
        arrayAmount.push(el.amount);
    })
    var arrayDate = [];
    arrayAux.forEach(el => {
        arrayDate.push(moment(el.fecha_factura).format('L'));
    })
    this.setState({
        amountCajas: arrayAux,
        chartData:{
            labels: arrayDate,
            datasets:[
              {
                label:'Cantidad',
                data: arrayAmount,
                backgroundColor:'#F38069',
                borderColor: '#FF2E00'
              }
            ]
          }
    })
  }

  render() {
    return (
      <div className="App">
        <Chart chartData={this.state.chartData} legendPosition="bottom" type="line" text="Cantidad en € de facturas"/>
      </div>
    );
  }
}

export default ChartFacturas;