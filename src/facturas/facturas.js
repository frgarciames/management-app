import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '../utils/button'
import 'react-table/react-table.css'
import styles from '../styles/styles.css'
import moment from 'moment-with-locales-es6';
import Table from '../utils/table'
import { getMonths } from '../utils/utils';
import { getFacturas, deleteFactura } from '../services/services'
import ReactModal  from 'react-modal'
import {MdWarning, MdCheck, MdClose} from 'react-icons/lib/md';
import ChartFacturas from './chart-facturas'
import NewFactura from './new-factura'

const ContainerClose = styled.span`
  position: absolute;
  right: .5em;
  top: .5em;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const ContainerWrapper = styled.div`
  width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  @media(max-width: 1900px){
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 1000px;
  padding: 1em;
  padding-top: 0;
  @media(max-width: 1950px){
    margin: 0 auto;
  }
`;

const ContainerButton = styled.div`
  width: 80%;
  margin: 0 auto;
  max-width: 20em;
  @media(max-width:500px){
    
  }
`;

const HeaderModal = styled.div`
  width: 100%;
  background-color: #ccc;
  height: 2em;
  border-radius: 4px;
  @media(max-width: 500px){
    height: 4em;
  }
`;

const HeaderTextModal = styled.p`
  padding-top: .3em;
  padding-left: 1em;
  @media(max-width: 500px){
    padding-top: 1.3em;
  }
`;

const BodyContainerModal = styled.div`
  width: 100%;
  padding: 2em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media(max-width: 500px){
    height: 10em;
  }
`;

const BodyTextModal = styled.div`
  width: 80%;
`;

const FooterModal = styled.div`
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
  display:flex;
  justify-content: flex-end;
  @media(max-width: 500px){
    justify-content: center;
  }
`;

const SelectMonth = styled.div`
  margin-top: 1em;
`; 

class Facturas extends Component {
  constructor() {
    super();

    this.state = {
      openFactura: false,
      facturas: [],
      fecha_factura: "",
      amount: 0,
      comment: "",
      provider: "",
      showModal: false,
      facturaSelected: Object,
      showTable: true,
      showChart: true,
      facturasToChart: [],
      months: getMonths(),
      monthSelected: {
        id: 0,
        name: ""
      },
      showModalDeleted: false
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.openFactura = this.openFactura.bind(this);
    this.showTable = this.showTable.bind(this);
    this.showChart = this.showChart.bind(this);
    moment.locale('es');
  }

  componentWillMount() {
    const facturasRef = getFacturas();
    document.title = 'Gestión - Facturas';

    facturasRef.on('value', snapshot => {
      var facturas = [];
      snapshot.forEach(factura => {
        facturas.push(factura.val());
      })
      this.setState({
        facturas
      }, () => {
        let monthId = moment(new Date()).month() + 1;
        let monthSelected = this.state.months.find(el => parseInt(el.id) === parseInt(monthId))
        let facturasPerMonth = this.state.facturas.filter(el =>
           moment(new Date()).month() === moment(el.fecha_factura).month()
        )
        this.setState({
          facturasToChart: facturasPerMonth,
          monthSelected: monthSelected
        })
      })
    })

  }

  openFactura() {
    (this.state.openFactura) ? 
    this.setState({openFactura: !this.state.openFactura}) : 
    this.setState({openFactura: !this.state.openFactura})
  }

  handleOpenModal(id) {
    let facturaSelected = this.state.facturas.find(el => 
      el.id === id
    )
    this.setState({ showModal: true, facturaSelected });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false, showModalDeleted: false });
  }

  showTable(){
    this.setState({showTable: !this.state.showTable})
  }

  showChart(){
    this.setState({showChart: !this.state.showChart})
  }

  changeMonth(event){
    let month = this.state.months.find(el => parseInt(el.id) === parseInt(event.target.value))
    let facturasPerMonth = this.state.facturas.filter(el => 
      parseInt(event.target.value) === parseInt(moment(el.fecha_factura).month() + 1)
    )
    this.setState({
      monthSelected: month,
      facturasToChart: facturasPerMonth
    })
  }

  render() {
    const data = this.state.facturas;
    return (
      <ContainerWrapper>
        <ContainerButton>
          <Button color="white" bgcolor="#34A853" text='Nueva factura' width="100%" click={this.openFactura} />
          <NewFactura opened={this.state.openFactura} close={this.openFactura} facturas={this.state.facturas}/>
        </ContainerButton>
        <FlexWrapper>
          <Wrapper>
          <Button color="black" bgcolor="#fff" text={(this.state.showTable) ? 'Ocultar tabla' : 'Mostrar tabla' } width="10em" click={this.showTable} />
            <Table
              data={data}
              type='facturas'
              openModal={this.handleOpenModal}
              show={this.state.showTable}
            />

            <ReactModal 
              isOpen={this.state.showModal}
              contentLabel="Minimal Modal Example"
              onRequestClose={this.handleCloseModal}
              ariaHideApp={false} 
              style={{
                content: {
                  position: 'absolute',
                  margin: 'auto',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bottom: '',
                  right: '',
                  padding: '3px'
                }
              }}
            >
            <HeaderModal>
              <HeaderTextModal>¿Borrar ésta factura?</HeaderTextModal>
              <ContainerClose onClick={this.handleCloseModal}>
              <MdClose 
                style={{
                  fontSize: '1.3em',
                  color: 'grey'
                }}
              />
              </ContainerClose>
            </HeaderModal>
            <BodyContainerModal>
              <MdWarning style={{
                color: 'orange',
                fontSize: '1.5em'
              }} />
              <BodyTextModal>
              <p>Si borras esta factura no podrás volver a recuperar sus datos.</p>
              <p>¿Estás seguro/a?</p>
              </BodyTextModal>
            </BodyContainerModal>
            <hr style={{
              borderColor: '#F1F1F1',
              opacity: '0.3'
            }}/>  
            <FooterModal>
              <Button 
                color="white" 
                bgcolor="#34A853" 
                text="Aceptar" 
                width="40%" 
                click={() => {deleteFactura(this.state.facturaSelected),this.handleCloseModal(), this.setState({showModalDeleted:true})}} />
              <Button color="white" bgcolor="#EA4335" text="Cancelar" width="40%" marginLeft="2em" click={this.handleCloseModal} />
            </FooterModal>
            </ReactModal>

            <ReactModal 
              isOpen={this.state.showModalDeleted}
              contentLabel="Minimal Modal Example"
              onRequestClose={this.handleCloseModal}
              style={{
                content: {
                  position: 'absolute',
                  margin: 'auto',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  bottom: '',
                  right: '',
                  padding: '3px'
                }
              }}
            >
            <BodyContainerModal>
              <MdCheck style={{
                color: 'green',
                fontSize: '2em',
                fontWeight: 'bold'
              }} />
              <BodyTextModal>
              <p>Factura borrada satisfactoriamente</p>
              </BodyTextModal>
            </BodyContainerModal>
            <hr style={{
              borderColor: '#F1F1F1',
              opacity: '0.3'
            }}/>
            <FooterModal>
              <Button color="white" bgcolor="#34A853" text="Aceptar" width="100%" click={this.handleCloseModal} />
            </FooterModal>
            </ReactModal>

          </Wrapper>
          <Wrapper>
            <Button color="black" bgcolor="#fff" text={(this.state.showChart) ? 'Ocultar gráfica' : 'Mostrar gráfica' } width="13em" click={this.showChart} />
            {(this.state.showChart) ? 
            <div>
              <SelectMonth>
                <select onChange={(event) => this.changeMonth(event)} value={this.state.monthSelected.id}>
                {this.state.months.map((el) => {
                  return <option key={el.id} value={el.id} >{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</option>
                })}
                  
                </select>
              </SelectMonth>
            </div>
            : ''}
            <ChartFacturas data={this.state.facturasToChart} show={this.state.showChart} month={this.state.monthSelected.name}/>
          </Wrapper>
        </FlexWrapper>
      </ContainerWrapper>

    );
  }
}

export default Facturas;
