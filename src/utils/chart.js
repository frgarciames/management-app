import React, { Component } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
      type: props.type
    }
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true
  }

  render() {
    switch (this.state.type) {
      case 'bar':
        return (
          <div className="chart">
            <Bar
              data={this.props.chartData}
              options={{
                title: {
                  display: this.props.displayTitle,
                  text: this.props.text,
                  fontSize: 25
                },
                legend: {
                  display: this.props.displayLegend,
                  position: this.props.legendPosition
                }
              }}
            />
          </div>
        )
        break;
      case 'line':
        return (
          <div className="chart">
            <Line
              height={180}
              data={this.props.chartData}
              options={{
                title: {
                  display: this.props.displayTitle,
                  text: this.props.text,
                  fontSize: 20
                },
                legend: {
                  display: false,
                  position: this.props.legendPosition
                }
              }}
            />
          </div>
        )
        break;
      case 'pie':
        return (
          <div className="chart">
            <Doughnut
              data={this.props.chartData}
              options={{
                title: {
                  display: this.props.displayTitle,
                  text: this.props.text,
                  fontSize: 25
                },
                legend: {
                  display: this.props.displayLegend,
                  position: this.props.legendPosition
                }
              }}
            />
          </div>
        )
        break;
      case 'mixed':
      const data = {
        labels: this.props.months,
        datasets: [{
            type: 'line',
            label: 'Facturas',
            data: this.props.facturas,
            fill: false,
            backgroundColor: '#fff',
            borderColor: 'red',
            hoverBackgroundColor: '#71B37C',
            hoverBorderColor: '#71B37C'
          },{
            label: 'Cajas',
            type:'bar',
            data: this.props.cajas,
            fill: false,
            borderColor: '#85cc00',
            borderWidth: 3,
            backgroundColor: '#fff',
            pointBorderColor: '#EC932F',
            pointBackgroundColor: '#EC932F',
            pointHoverBackgroundColor: '#EC932F',
            pointHoverBorderColor: '#EC932F'
          }]
      };
      const options = {
        responsive: true,
        tooltips: {
          mode: 'label'
        },
        elements: {
          line: {
            fill: false
          }
        },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-1',
              gridLines: {
                display: false
              }
            },
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-2',
              gridLines: {
                display: false
              }
            }
          ]
        }
      };
      /*const plugins = [{
        afterDraw: (chartInstance, easing) => {
            const ctx = chartInstance.chart.ctx;
            ctx.fillText("Diferencia entre facturas y ganancia", 200, 200);
        }
    }];*/
        return (
          <div className="chart" style={{
            width: '80%',
            margin: '0 auto'
          }}>
            <Bar
              data={data}
              options={options}
              /*plugins={plugins}*/
            />
          </div>
        )
        break;

    }
  }
}

export default Chart;