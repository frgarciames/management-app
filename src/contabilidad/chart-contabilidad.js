import React, { Component } from 'react';
import Chart from '../utils/chart';
import moment from 'moment-with-locales-es6'

class ChartContabilidad extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData:{},
      cajas: props.data,
      amountCajas: [],
      show: true
    }
  }
  
  componentWillReceiveProps(props){
    var arrayAux = JSON.parse(JSON.stringify(props.data));
    arrayAux.sort((a, b) => {
        if (a.fecha_caja > b.fecha_caja) return 1;
        if (a.fecha_caja < b.fecha_caja) return -1;
        return 0;
    })
    var arrayAmount = arrayAux.map(el => el.amount);
    var arrayDate = arrayAux.map(el => moment(el.fecha_caja).format('L'));
    this.setState({
        amountCajas: arrayAux,
        show: props.show,
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
        {(this.state.show) ? 
        <Chart chartData={this.state.chartData} legendPosition="bottom" type="line" text="Cantidad en € de cajas diarias"/>
        : ''}
      </div>
    );
  }
}

export default ChartContabilidad;