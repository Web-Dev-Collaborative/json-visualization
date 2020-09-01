import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Filter from 'components/Filter';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import Toggle from 'components/Toggle';


const ROW_HEIGHT = 16;
const ITEM_DEPTH_MARGIN = 20;



const flattenJson = ( json, matched, output=[], path=``, depth=0, _match=false ) => {
  if ( ! json ) { return []; }

  // provided json is an array
  if ( typeof json === 'object' && Array.isArray(json) ) {
    // console.log("json::array");
    json.forEach( (item, index) => {
      const currentPath = path+`[${index}]`;
      const match = matched.includes(`$${currentPath}`) || _match;

      if ( typeof json[index] !== 'object' ) {
        output.push({ path: currentPath, title: index, value: item, depth: depth, hasChildren: true, open: true, match: match });
      } else {
        output.push({ path: currentPath, title: index, value: '', depth: depth, hasChildren: true, open: true, match: match });
        flattenJson( item, matched, output, currentPath, depth+1, match );
      }
    });
  }
  // provided json is an object
  else if ( typeof json === 'object' ) {
    // console.log("json::object");

    Object.keys(json).forEach( (item, index) => {
      const currentPath = path + `['${item}']`;
      const match = matched.includes(`$${currentPath}`) || _match;

      if ( typeof json[item] === 'object' ) {
        output.push({ path: currentPath, title: item, value: '', depth: depth, hasChildren: true, open: true, match: match });
        const children = flattenJson( json[item], matched, output, currentPath, depth+1, match );
      } else {
        output.push({ path: currentPath, title: item, value: json[item], depth: depth, visible: true, match: match });
      }
    });
  }
  // provided json is not an array or object
  else {
    console.log("json::!array && !object");
  }

  return output;
}



const togglePath = (list, togglePaths, origList) => {
  let output = [ ...origList ];

  if ( togglePaths.length > 0 ) {
    togglePaths.map( path => {
      const nodeIndex = output.findIndex( item => item.path === path );
      const node = { ...output[nodeIndex] };
      node.open = false;
      output[nodeIndex] = node;

      output = output.filter( item => {
        if ( item.path === path ) { return true; }
        if ( item.path.includes(path) ) { return false; }
        return true;
      });

    });

    return output;
  }

  return origList;
}





const JSONRenderer = (props) => {

  const [ origList, setOrigList ] = useState([]);
  const [ list, setList ] = useState([]);
  const [ togglePaths, setTogglePaths ] = useState([]);

  const data = props.json;
  const matched = props.matched;


  useEffect( () => {
    const flattened = flattenJson(data, matched);
    setList(flattened);
    setOrigList(flattened);
  }, [matched] );



  const onToggle = (path) => {
    let _paths = [...togglePaths];
    if ( _paths.includes(path) ) {
      _paths = _paths.filter( item => item !== path );
    } else { _paths.push(path); }
    setTogglePaths(_paths)

    const json = togglePath(list, _paths, origList);
    setList(json);
  }

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: ROW_HEIGHT,
  });

  const rowRenderer = ({ key, index, style, parent }) => {
    const item = list[index];
    const margin = item.depth* ITEM_DEPTH_MARGIN;
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <Toggle
          style={style}
          margin={margin}
          item={item}
          onToggle={ onToggle }
        />
      </CellMeasurer>
    )
  }


  return (
    <Wrapper>
      <Filter data={data} />

      <AutoSizer>
        {({ width, height }) => (
          <VirtualizedList
            width={ width }
            height={ height - 75 }
            rowCount={ list.length }
            deferredMeasurementCache={ cache }
            rowHeight={ cache.rowHeight }
            rowRenderer={ rowRenderer }
          />
        )}
      </AutoSizer>

    </Wrapper>
  )
}

export default JSONRenderer;


const Wrapper = styled.div`
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #ccc;
  min-height: 500px;
  height: calc( 100vh - 220px );
`;


const VirtualizedList = styled(List)`
  outline: 0;
  padding-right: 10px;
`;


const KeyVal = styled.div`
  display: flex;
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
        <div key={key} style={{ ...style, marginLeft: item.depth* ITEM_DEPTH_MARGIN, paddingRight: item.depth* ITEM_DEPTH_MARGIN }}>
          <span style={ !item.hasChildren ? { marginLeft: ITEM_DEPTH_MARGIN } : {} }>{ item.hasChildren ? '-' : '' } {item.title}:</span> <span>{item.value}</span>
        </div>


*/
