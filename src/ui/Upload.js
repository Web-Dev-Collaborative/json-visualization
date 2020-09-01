import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { StoreContext } from 'global/contexts';
import Layout from 'ui/Layout';
import Dropzone from 'react-dropzone'
import cogoToast from 'cogo-toast';



const sampleJSON = `{"store":{"book":[{"category":"reference","author":"Nigel Rees","title":"Sayings of the Century","price":8.95},{"category":"fiction","author":"Evelyn Waugh","title":"Sword of Honour","price":12.99},{"category":"fiction","author":"Herman Melville","title":"Moby Dick","isbn":"0-553-21311-3","price":8.99},{"category":"fiction","author":"J. R. R. Tolkien","title":"The Lord of the Rings","isbn":"0-395-19395-8","price":22.99}],"bicycle":{"color":"red","price":19.95}}}`;



const Upload = (props) => {
  const store = useContext(StoreContext);
  const [ url, setURL ] = useState('');

  const handleDrop = (files) => {
    const file = files[0];
    if ( ! file ) { return; }

    const { hide } = cogoToast.loading("Processing json file, please wait...", { hideAfter: 0 });

    const fileSize = file.size;
    const chunkSize = 64 * 1024;
    let offset = 0;
    let result = '';
    const callback = (str) => {
      result += str;
    }

    const handleFileReaderLoad = (evt) => {
      if ( evt.target.error == null ) {
        offset += evt.target.result.length;
        callback(evt.target.result);
      } else {
        console.log("Read error: " + evt.target.error);
        cogoToast.error(`Error occurred: ${evt.target.error}`);
        return;
      }

      if ( offset >= fileSize ) {
        // console.log("Done reading file");
        try {
          const parsed = JSON.parse(result);
          hide();
          cogoToast.success('Successfully processed The JSON file.');
          store.setJson(parsed);
          props.history.push('/'); // redirect the user back to the dashboard
        } catch (e) {
          hide();
          cogoToast.error(`Error occurred: ${e.message}`);
        }
        return;
      }

      // of to the next chunk
      chunkReaderBlock(offset, chunkSize, file);
    }

    const chunkReaderBlock = (_offset, length, _file) => {
      const reader = new FileReader();
      const blob = _file.slice(_offset, length + _offset);
      reader.onload = handleFileReaderLoad;
      reader.readAsText(blob);
    }

    // now let's start the read with the first block
    chunkReaderBlock( offset, chunkSize, file );

  }

  const loadSampleJson = () => {
    const parsed = JSON.parse(sampleJSON);
    store.setJson(parsed);
    cogoToast.success('Successfully loaded sample JSON file.');
    props.history.push('/');
  }


  const fetchJsonFile = async () => {
    if ( ! url ) { return cogoToast.warn('Please enter a valid url first'); }
    const { hide } = cogoToast.loading("Fetching json file, please wait...", { hideAfter: 0 });
    const corsFix = `https://cors-anywhere.herokuapp.com/`;

    try {
      const res = await fetch(`${corsFix}${url}`);
      const json = await res.json();
      hide();
      store.setJson(json);
      cogoToast.success('Successfully fetched the JSON file from given URL.');
      props.history.push('/');
    } catch (e) {
      hide();
      cogoToast.error(`Error occurred: ${e.message}`);
    }

  }



  return (
    <Layout>
    <div>
      <Description>
        Using this application you can easily query JSON object using the <strong>JSONPath</strong> with an instant and beautiful visualization.
      </Description>


      <Title style={{ marginTop: 40 }}><strong>Step #1</strong> - Select your file.</Title>
      <Dropzone
        onDrop={handleDrop}
        accept=".json"
        maxFiles={1}
        multiple={false}
      >
        {({getRootProps, getInputProps}) => (
          <UploadContainer>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Select or Drag and drop your <strong>JSON</strong> file here.</p>
            </div>
          </UploadContainer>
        )}
      </Dropzone>

      <Title style={{ marginTop: 40 }}><strong>OR</strong> - Fetch JSON file from URL</Title>
      <JSONFromURL>
        <input placeholder="http://" onChange={ ({ target: { value } }) => { setURL(value) } } />
        <Button onClick={ fetchJsonFile }>Fetch</Button>
      </JSONFromURL>

      <Title style={{ marginTop: 40 }}><strong>OR</strong> - Load a Sample JSON File</Title>
      <Button onClick={ loadSampleJson }>Load Sample JSON File</Button>

    </div>
    </Layout>
  )
}

export default Upload;


const Description = styled.div`
  font-size: 22px;
  background: #faffc9;
  padding: 40px;
  border-radius: 4px;
  border: 1px solid #e0ef51;
`;

const Title = styled.div`
  font-size: 14px;
  text-transform: uppercase;
  margin: 10px 0;
`;

const UploadContainer = styled.div`
& > div {
  border: 3px dashed #9e9e9e;
  padding: 20px;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  transition: all .3s;
  &:hover {
    border-color: #333;
  }
  &:active {
    background: #ccc;
  }
}
`;


const JSONFromURL = styled.div`
  display: flex;
  flex-direction: row;
  input {
    width: 100%;
    padding: 5px 10px;
    border: 2px solid #999;
    cursor: pointer;
    border-radius: 4px;
    margin-right: 10px;
    outline: 0;
    &:focus { border: 2px solid #000; }
  }
`;


const Button = styled.button`
  border: none;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  outline: 0;
  transition: all .3s;
  &:hover { background: #000; color: #fff; border-color: transparent; }
`;


