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
      titleChart: ""
    }
  }

  componentWillMount(){

    var arrayAux = JSON.parse(JSON.stringify(this.props.data));
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
        show: this.props.show,
        titleChart: this.props.title,
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
    this.setState({
        show: props.show,
        titleChart: props.title,
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
        <Chart chartData={this.state.chartData} legendPosition="bottom" type="pie" text={(this.state.titleChart == "" ||
                                                                                          this.state.titleChart == null ||
                                                                                          this.state.titleChart == undefined) ? 
        "Cantidad en € de facturas" : this.state.titleChart}/>
        : ''}
      </div>
    );
  }
}

export default ChartFacturas;