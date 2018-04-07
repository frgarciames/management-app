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
      show: true,
      titleChart: "",
      totalMonth: 0,
      month: ''
    }
  }

  componentWillReceiveProps(props){
    var arrayAux = JSON.parse(JSON.stringify(props.data));
    this.setState({
      totalMonth: arrayAux.reduce((a, b) => parseFloat(a) + parseFloat(b.amount), 0).toFixed(2),
      month: props.month
    })
    var providers = arrayAux.map(el => el.provider);
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
    var providerNames = uniq.map(el => el.name);
    var providerColors = uniq.map(el => el.color);
    var amountArr = [];
    providerNames.forEach((elName) => {
      var amount = 0;
      arrayAux.forEach(el => {
        if(elName == el.provider.name){
          amount += parseFloat(el.amount);
        }
      })
      amountArr.push(amount.toFixed(2));
    })
    this.setState({
        show: props.show,
        titleChart: props.title,
        chartData:{
            labels: providerNames,
            datasets:[
              {
                label:'Cantidad',
                data: amountArr,
                backgroundColor: providerColors,
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
        <Chart chartData={this.state.chartData} legendPosition="bottom" type="pie" text={(this.state.titleChart == "" ||
                                                                                          this.state.titleChart == null ||
                                                                                          this.state.titleChart == undefined) ? 
        "Cantidad en € de facturas de " + this.state.month.charAt(0).toUpperCase() + this.state.month.slice(1) + ": " + this.state.totalMonth : 
        this.state.titleChart}/>
        : ''}
      </div>
    );
  }
}

export default ChartFacturas;