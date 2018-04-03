import React, { Component } from 'react';
import styled from 'styled-components';

const CustomInput = styled.input `
  color: ${props => props.color};
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid ${props => props.bdcolor};
  width: ${props => props.width ? props.width : '100%'};
  padding: .5em 0 .5em .3em;
  margin-top:  ${props => props.mgTop ? props.mgTop : '1em'};
  cursor: ${props => props.cursor};
`;

class Input extends Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <CustomInput
        placeholder={this.props.placeholder}
        type={this.props.type} id={this.props.id}
        bdcolor={this.props.bdcolor}
        color={this.props.color}
        onChange={this.props.change}
        name={this.props.name}
        width={this.props.width}
        cursor={this.props.cursor}
        required={this.props.required}
        mgTop={this.props.mgTop}
        step={this.props.step}
      />
    );
  }
}

export default Input;
