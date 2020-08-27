import React, { useState } from 'react';
import styled from 'styled-components';



const Toggle = (props) => {
  const [ visible, setVisible ] = useState(true);

  if ( props.value && typeof props.value !== 'boolean' ) {
    if ( ! props.inline ) {
      return (
        <div className="toggle-item">
          <div className="title link" onClick={ () => { setVisible(!visible) } }>{visible ? '-' : '+'} { props.title }</div>
          { visible && <div className="value">{ props.value }</div> }
        </div>
      )
    } else {
      return (
        <div className="toggle-item inline">
          <div className="title">{ props.title }:</div>
          <div className="value">{ props.value }</div>
        </div>
      )
    }
  } else {
    return (
      <div className="toggle-item inline">
        <div className="title">{ props.title }</div>
        <div className="value">{ typeof props.value === 'boolean' ? ( props.value === true ? 'true' : 'false' ) : props.value }</div>
      </div>
    )
  }

}






const generateJSX = (data, output = []) => {

  if ( Array.isArray(data) ) {
    data.forEach( (item, index) => {
      if ( typeof item === 'object' ) {
        const sub = generateJSX(item);
        output.push(<Toggle key={index} title={index} value={sub} />)
      } else {
        output.push(<Toggle inline={true} key={index} title={index} value={item} />)
      }
    });
  } else if ( typeof data === 'object' ) {
    Object.keys(data).forEach( (item, index) => {
      if ( typeof data[item] === 'object' ) {
        const sub = generateJSX(data[item]);
        output.push(<Toggle key={index} title={item} value={sub} />)
      } else {
        output.push(<Toggle inline={true} key={index} title={item} value={data[item]} />)
      }
    });

  } else {
  }

  return output;
}


const JSONRenderer = (props) => {
  const data = props.json;
  const json_jsx = generateJSX( data );

  return (
    <JSONWrapper>
      <Toggle title="#root" value={<div className="elements">{ json_jsx }</div>} />

    </JSONWrapper>
  )

}


export default JSONRenderer;


const JSONWrapper = styled.div`
  margin-top: 40px;
  border: 1px solid #ccc;
  padding: 20px;
  max-height: 600px;
  overflow: auto;
  max-width: 700px;
  margin-left: -100px;

  div.elements div {
    margin-left: 10px;
    border-left: 1px dotted #ccc;
  }

  .toggle-item {
    &.inline {
      display: flex;
      .title { margin-right: 5px; }
      .value { align-self: center; border: none; margin: 0; color: #009688; }
    }
    .title {
      cursor: default;
      font-size: 16px;
      &.link {
        cursor: pointer;
        color: blue;
      }
    }
    .value {
    }

    & .toggle-item { border: none; }

  }

`;

