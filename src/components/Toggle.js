import React, { Fragment } from 'react';
import styled from 'styled-components';


const Toggle = ({ item, style, margin, onToggle }) => {
  return (
    <KeyVal style={{ ...style, paddingLeft: margin, paddingRight: margin }} className={ item.match ? 'matched' : '' }>

      { item.hasChildren ? (
          <Fragment>
            <div onClick={ () => { onToggle(item.path) } } className={`key clickable`}>
              { item.open ? '-' : '+' } { item.title }
            </div>
          <div className="value">{ item.value.toString() }</div>
          </Fragment>
        ) : (
          <Fragment>
            <div className={`key`}>{ item.title }</div>
            <div className="value">{ item.value.toString() }</div>
          </Fragment>
        )
      }

    </KeyVal>
  )

}



export default Toggle;


const KeyVal = styled.div`
  display: flex;

  &.matched {
    background: rgb(255, 255, 243);
    .key, .value { color: #ff0000; }
  }

  .key {
    margin-right: 5px;

    &.clickable {
      cursor: pointer;
      color: blue;
    }
  }
  .value {
    align-self: center;
    border: none;
    margin: 0;
    color: #009688;
  }
`;

