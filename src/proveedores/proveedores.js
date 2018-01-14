import React, { Component } from 'react';
import { getFacturas } from '../services/services'
import ChartFacturas from '../facturas/chart-facturas'
import styled from 'styled-components';

const ContainerChart = styled.div`
  width: 70%;
  margin: 0 auto;
`;

class Proveedores extends Component {
  constructor(props){
    super(props);

    this.state = {
      facturas: [],
      totalAmount: 0
    }
  }

  componentWillMount() {
    const facturasRef = getFacturas();

    facturasRef.on('value', snapshot => {
      var facturas = [];
      snapshot.forEach(factura => {
        facturas.push(factura.val());
      })
      this.setState({
        facturas
      }, () => {
        var totalAmount = this.state.facturas.reduce((a, b) => a + parseInt(b.amount), 0);
        this.setState({
          totalAmount
        })
      })
    })

  }

  render() {
    return (
      <ContainerChart>
        <ChartFacturas data={this.state.facturas} show={true} title={"Cantidad total de € en facturas del año: " + this.state.totalAmount + "€"} />
      </ContainerChart>
    );
  }
}

export default Proveedores;
