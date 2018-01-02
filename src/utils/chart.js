import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData,
      type:props.type
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true
  }

  render(){
    switch(this.state.type){
      case 'bar':
        return (
            <div className="chart">
            <Bar
              data={this.props.chartData}
              options={{
                title:{
                  display:this.props.displayTitle,
                  text:this.props.text,
                  fontSize:25
                },
                legend:{
                  display:this.props.displayLegend,
                  position:this.props.legendPosition
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
                  title:{
                      display:this.props.displayTitle,
                      text:this.props.text,
                      fontSize:20
                  },
                  legend:{
                      display:false,
                      position:this.props.legendPosition
                  }
                }}
            />
            </div>
        )
        break;
        case 'pie':
            return (
                <div className="chart">
                    <Pie
                    data={this.props.chartData}
                    options={{
                      title:{
                        display:this.props.displayTitle,
                        text:this.props.text,
                        fontSize:25
                      },
                      legend:{
                        display:this.props.displayLegend,
                        position:this.props.legendPosition
                      }
                    }}
                  />
                </div>
            )
            break;
        
    }
  }
}

export default Chart;