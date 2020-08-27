import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import Filter from 'components/Filter';
import { JSONPath } from 'jsonpath-plus';
import { StoreContext } from 'contexts';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';



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

  if ( ! data || data.length === 0 ) {
    return;
  }

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
  console.log("JSONRenderer", props.json)
  const data = props.json;
  const store = useContext(StoreContext);

  return useObserver( () => {

    let json_jsx = null;

    if ( !store.error && store.expression ) {
      try {
        const result = JSONPath({path: store.expression, json: data});
        if ( result.length === 0 ) {
          json_jsx = null;
        } else {
          json_jsx = generateJSX( result );
          store.setError('');
        }
      } catch (e) {
        store.setError(e.message);
      }
    } else {
      json_jsx = generateJSX( data );
    }

    return (
      <Container>
        <Filter error={store.error} />
        <JSONWrapper>
          { json_jsx ? (
            <Toggle title="#root" value={<div className="elements">{ json_jsx }</div>} />
            ) : (
              <div>No match found!</div>
            )
          }
        </JSONWrapper>
      </Container>
    )
  })


  // return (
  //   <Container>
  //     <Filter />
  //     <JSONWrapper>
  //       <Toggle title="#root" value={<div className="elements">{ json_jsx }</div>} />
  //     </JSONWrapper>
  //   </Container>
  // )

}


export default JSONRenderer;

const Container = styled.div`
  margin-top: 40px;
`;

const JSONWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  max-height: 600px;
  overflow: auto;

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

