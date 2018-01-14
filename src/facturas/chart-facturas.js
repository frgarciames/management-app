import React, { Component } from 'react';
import Chart from '../utils/chart';
import moment from 'moment-with-locales-es6'

class ChartFacturas extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData:{},
      facturas: props.data,
      amountFacturas: [],
      show: true
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
        show: this.props.show,
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
    var providers = [];
    arrayAux.forEach((el) => {
        providers.push(el.provider)
    })
    var uniq = providers.reduce((a, b) => {
      function indexOfProperty (a, b){
          for (var i=0;i<a.length;i++){
              if(a[i].id == b.id){
                   return i;
               }
          }
         return -1;
      }

      if (indexOfProperty(a,b) < 0 ) a.push(b);
        return a;
    },[]);
    var providerNames = [];
    
    uniq.forEach(el => {
      providerNames.push(el.name)
    })
    var amountArr = [];
    providerNames.forEach((elName) => {
      var amount = 0;
      arrayAux.forEach(el => {
        if(elName == el.provider.name){
          amount += parseInt(el.amount);
        }
      })
      amountArr.push(amount);
    })
    console.log(amountArr)
    this.setState({
        show: props.show,
        chartData:{
            labels: providerNames,
            datasets:[
              {
                label:'Cantidad',
                data: amountArr,
                backgroundColor: ['#F38069', 'blue'],
                borderColor: 'white'
              }
            ]
          }
    })
  }

  render() {
    return (
      <div className="App">
      {(this.state.show) ?
        <Chart chartData={this.state.chartData} legendPosition="bottom" type="pie" text="Cantidad en € de facturas"/>
        : ''}
      </div>
    );
  }
}

export default ChartFacturas;