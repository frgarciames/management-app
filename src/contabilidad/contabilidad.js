import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from 'firebase'
import Button from '../utils/button'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import styles from '../styles/styles.css'
import moment from 'moment-with-locales-es6';
import NewCaja from './newCaja'
import Table from '../utils/table'
import { formatDateForTable, printDataTable, renderEditableForTable } from '../utils/utils';
import { getCajas } from '../services/services'
import ReactModal  from 'react-modal'
import {MdWarning, MdCheck, MdClose} from 'react-icons/lib/md';
import {deleteCaja} from '../services/services'
import ChartContabilidad from './chart-contabilidad'

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
  @media(max-width: 1700px){
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 900px;
  padding: 1em;
  padding-top: 0;
  @media(max-width: 1700px){
    margin: 0 auto;
    max-width: 1000px;
  }
`;

const ContainerButton = styled.div`
  width: 80%;
  margin: 0 auto;
  max-width: 20em;
  @media(max-width:500px){
    
  }
`;

const WrapperBox = styled.div`
  width: 100%;
  margin-top: 1.5em;
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

class Contabilidad extends Component {
  constructor() {
    super();

    this.state = {
      openCaja: false,
      cajas: [],
      fecha_caja: "",
      amount: 0,
      comment: "",
      provider: "",
      showModal: false,
      cajaSelected: Object,
      cajasDate: []
    }

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.openCaja = this.openCaja.bind(this);
    moment.locale('es');
  }

  componentWillMount() {
    const cajasRef = getCajas();

    cajasRef.on('value', snapshot => {
      var cajas = [];
      snapshot.forEach(caja => {
        cajas.push(caja.val());
      })
      this.setState({
        cajas
      }, () => {
        var arrayDate = [];
        this.state.cajas.forEach(el => {
          arrayDate.push(moment(el.fecha_caja).format('L'));
        })
        arrayDate.sort(function(a,b){
          if (a > b) return -1;
          if (a < b) return 1;
          return 0;
        });
        this.setState({
          cajasDate: arrayDate
        })
      })
    })

  }

  openCaja() {
    if (this.state.openCaja) {
      this.setState({
        openCaja: false
      })
    } else {
      this.setState({
        openCaja: true
      })
    }
  }

  handleOpenModal (id) {
    var cajaSelected = Object;
    this.state.cajas.forEach(el => {
      if(el.id === id){
        cajaSelected = el;
        return
      } 
    })
    this.setState({ showModal: true, cajaSelected: cajaSelected });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false, showModalDeleted: false });
  }

  render() {
    const data = this.state.cajas;
    return (
      <ContainerWrapper>
        <ContainerButton>
          <Button color="white" bgcolor="#34A853" text='Nueva caja' width="100%" click={this.openCaja} />
          <NewCaja opened={this.state.openCaja} close={this.openCaja} cajas={this.state.cajas}/>
        </ContainerButton>
        <FlexWrapper>
          <Wrapper>
            <Table
              data={data}
              type='contabilidad'
              openModal={this.handleOpenModal}
            />

            <ReactModal 
              isOpen={this.state.showModal}
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
            <HeaderModal>
              <HeaderTextModal>¿Borrar ésta caja?</HeaderTextModal>
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
              <p>Si borras esta caja no podrás volver a recuperar sus datos.</p>
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
                click={() => {deleteCaja(this.state.cajaSelected),this.handleCloseModal(), this.setState({showModalDeleted:true})}} />
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
              <p>Caja borrada satisfactoriamente</p>
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
            <ChartContabilidad data={this.state.cajas} date={this.state.cajasDate}/>
          </Wrapper>
        </FlexWrapper>
      </ContainerWrapper>

    );
  }
}

export default Contabilidad;
