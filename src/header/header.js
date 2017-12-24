import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import styles from './header.css';
import image from '../utils/logout.png';
import buttonImage from '../utils/hamburger.png';
import closeImage from '../utils/close.png';

const CustomHeader = styled.header `
  background-color: #222;
  width: 100%;
  transition: all .4s ease;
  height: 3.2em;
  border-bottom: 2px solid grey;
  position: relative;
`;

const FlexNav = styled.ul `
  display: flex;
  justify-content: center;
  padding: 1em;
  z-index: 11;
  @media (max-width: 880px) {
    width:100%;
    display: ${props => props.opened ? 'block' : 'none'};
    background-color: #222;
    margin-top: 19px;
    position: absolute;
    flex-direction: column;
    padding: 0;
  }
`;

const Title = styled.h2 `
  font-weight: bold;
  margin-left: -3em;
`;

const FlexItem = styled.li `
  color: white;
  margin-left: 3em;
  @media (max-width: 880px){
    width: 100%;
    height: 3em;
    border-bottom: 1px solid grey;
    padding-top: .8em;
    text-align: center;
    margin-left: 0;
  }
`;

const ContainerImage = styled.div `
  position: absolute;
  right: 1em;
  top: .6em;
  cursor: pointer;
`;

const ContainerImageMenu = styled.div `
  padding-top: .5em;
  margin-left: 1em;
  width: 30px;
  cursor:pointer;
`;

const ImageMenu = styled.img `
    display: ${props => props.opened ? 'none' : 'block'};
`;

const TitleMobile = styled.p `
  font-weight: bold;
  color: white;
  text-align: center;
`;

const ContainerTitle = styled.div `
display:none;
@media (max-width: 880px){
  display: block;
  margin: 0 auto;
  width: 50%;
  margin-top: -1.5em;
}
`;

class Header extends Component {
  constructor(){
    super();
    this.state = {
      isOpened: false,
      page: ""
    }
    this.openMenu = this.openMenu.bind(this);
    this.pageAreIn = this.pageAreIn.bind(this);
  }

  pageAreIn(){
    let page = window.location.pathname;
    page = page.slice(1);
    let pageTemp = page.split("");
    let pageFinal = [];
    for (var i = 0; i < pageTemp.length; i++) {
      if(pageTemp[i] === "/" || pageTemp[i] === "&" || pageTemp[i] === "?"){
        break;
      }
      pageFinal.push(pageTemp[i]);
    }
    pageFinal = pageFinal.toString();
    pageFinal = pageFinal.replace(/,/g, "");
    pageFinal = pageFinal.charAt(0).toUpperCase() + pageFinal.slice(1);
    this.setState({
      page: pageFinal
    })
  }

  openMenu(){
    if(this.state.isOpened){
      this.setState({
        isOpened: false
      })
    }else {
      this.setState({
        isOpened: true
      })
    }
  }

  render() {
    return (
        <CustomHeader className="header" opened={this.state.isOpened} onLoad={this.pageAreIn}>
        {this.props.user ? (
          <div>
            <ContainerImageMenu  className="containerImageMenu" onClick={this.openMenu}>
              <ImageMenu src={buttonImage} alt="Menu" width="100%" className="img-open" opened={this.state.isOpened}/>
              <ImageMenu src={closeImage} alt="Close_Menu" width="100%" className="img-close" opened={!this.state.isOpened}/>
            </ContainerImageMenu>
            <ContainerTitle>
              <TitleMobile>
                {this.state.page}
              </TitleMobile>
            </ContainerTitle>
            <FlexNav className="flex-nav" opened={this.state.isOpened} >
              <FlexItem className="title-menu" >
                <NavLink to={`/home`} onClick={() => {this.openMenu(); this.pageAreIn()}}>
                  <Title>Tu management</Title>
                </NavLink>
              </FlexItem>
              <FlexItem  opened={this.state.isOpened} onClick={() => {this.openMenu(); this.pageAreIn()}}>
                <NavLink to={`/home`} activeClassName="actived"className="flex-item" >Inicio</NavLink>
              </FlexItem>
              <FlexItem  opened={this.state.isOpened} onClick={() => {this.openMenu(); this.pageAreIn()}}>
                <NavLink to={`/contabilidad`} activeClassName="actived" className="flex-item" >Contabilidad</NavLink>
              </FlexItem>
              <FlexItem  opened={this.state.isOpened} onClick={() => {this.openMenu(); this.pageAreIn()}}>
                <NavLink to={`/facturas`} activeClassName="actived" className="flex-item" >Facturas</NavLink>
              </FlexItem>
              <FlexItem  opened={this.state.isOpened} onClick={() => {this.openMenu(); this.pageAreIn()}}>
                <NavLink to={`/proveedores`} activeClassName="actived" className="flex-item" >Proveedores</NavLink>
              </FlexItem>
              <FlexItem  opened={this.state.isOpened} onClick={() => {this.openMenu(); this.pageAreIn()}}>
                <NavLink to={`/trabajadores`} activeClassName="actived" className="flex-item" >Trabajadores</NavLink>
              </FlexItem>
            </FlexNav>
            <ContainerImage onClick={this.props.onLogout}>
              <NavLink to={`/`} >
                <img src={image} alt="Logout" width="30px"/>
              </NavLink>
            </ContainerImage>
          </div>

        ) : (
          <FlexNav>
            <FlexItem>
              <NavLink to={`/`} >
                <Title>Tu management</Title>
              </NavLink>
            </FlexItem>
          </FlexNav>
        )}

        </CustomHeader>
    );
  }
}

export default Header;
