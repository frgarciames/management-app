import React, { Component } from 'react';
import styled from 'styled-components';

const CustomButton = styled.button `
  color: ${props => props.color};
  background-color: ${props => props.bgcolor};
  border-color: ${props => props.bdcolor};
  width: ${props => props.width};
  font-weight: bolder;
  padding: .5em 1.1em .5em 1.1em;
  border: 0;
  box-shadow: 0 3px 5px grey;
  border-radius: 5px;
  cursor: pointer;
  transition: all .3s ease;
  margin-top: .5em;
  font-family: 'Poppins', sans-serif;
  :hover {
    color: ${props => props.bgcolor};
    background-color: ${props => props.color};
  }
`;

class Button extends Component {
  constructor(props){
    super(props);
    console.log(props);
  }


  render() {
    return (
      <CustomButton color={this.props.color}
                    bgcolor={this.props.bgcolor}
                    bdcolor={this.props.bdcolor}
                    width={this.props.width}
                    onClick={this.props.click}
                    type={this.props.type}
                    >
        {this.props.text}
      </CustomButton>
    );
  }
}

export default Button;
