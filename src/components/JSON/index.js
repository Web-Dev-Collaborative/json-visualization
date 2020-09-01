import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Filter from 'components/Filter';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import Toggle from 'components/Toggle';
import { flattenJson, togglePath } from 'global/utils';

const ROW_HEIGHT = 16;
const ITEM_DEPTH_MARGIN = 20;


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
  }, [data,matched] );



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
