import React, { Fragment } from 'react';
import styled from 'styled-components';


const Toggle = ({ item, style, margin, onToggle }) => {
  return (
    <KeyVal style={{ ...style, marginLeft: margin, marginRight: margin }} className={ item.match ? 'matched' : '' }>

      { item.hasChildren ? (
          <Fragment>
            <div onClick={ () => { onToggle(item.path) } } className={`key clickable`}>
              { item.open ? '-' : '+' } { item.title }
            </div>
          <div className="value">{ item.value }</div>
          </Fragment>
        ) : (
          <Fragment>
            <div className={`key`}>{ item.title }</div>
            <div className="value">{ item.value }</div>
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







/*
const Toggle = (props) => {
  const [ visible, setVisible ] = useState(true);

  if ( props.value && typeof props.value !== 'boolean' ) {
    if ( ! props.inline ) {
      return (
        <div className={`toggle-item ${props.match ? 'matched' : ''}`}>
          <div className="title link" onClick={ () => { setVisible(!visible) } }>{visible ? '-' : '+'} { props.title }</div>
          { visible && <div className="value">{ props.value }</div> }
        </div>
      )
    } else {
      return (
        <div className={`toggle-item inline ${props.match ? 'matched' : ''}`}>
          <div className="title">{ props.title }:</div>
          <div className="value">{ props.value }</div>
        </div>
      )
    }
  } else {
    return (
      <div className={`toggle-item inline ${props.match ? 'matched' : ''}`}>
        <div className="title">{ props.title }</div>
        <div className="value">{ typeof props.value === 'boolean' ? ( props.value === true ? 'true' : 'false' ) : props.value }</div>
      </div>
    )
  }

}


export default Toggle;
*/
