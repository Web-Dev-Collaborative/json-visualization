import React, { useState } from 'react';
// import styled from 'styled-components';



const Toggle = (props) => {
  const [ visible, setVisible ] = useState(true);

  if ( props.value && typeof props.value !== 'boolean' ) {
    if ( ! props.inline ) {
      return (
        <div className="toggle-item" className={`toggle-item ${props.match ? 'matched' : ''}`}>
          <div className="title link" onClick={ () => { setVisible(!visible) } }>{visible ? '-' : '+'} { props.title }</div>
          { visible && <div className="value">{ props.value }</div> }
        </div>
      )
    } else {
      return (
        <div className="toggle-item inline" className={`toggle-item inline ${props.match ? 'matched' : ''}`}>
          <div className="title">{ props.title }:</div>
          <div className="value">{ props.value }</div>
        </div>
      )
    }
  } else {
    return (
      <div className="toggle-item inline" className={`toggle-item inline ${props.match ? 'matched' : ''}`}>
        <div className="title">{ props.title }</div>
        <div className="value">{ typeof props.value === 'boolean' ? ( props.value === true ? 'true' : 'false' ) : props.value }</div>
      </div>
    )
  }

}


export default Toggle;
