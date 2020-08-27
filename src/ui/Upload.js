import React from 'react';
import styled from 'styled-components';
import Layout from 'ui/Layout';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone'


const Upload = (props) => {


  const handleDrop = (files) => {
    const file = files[0];
    if ( ! file ) { return; }
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result
      const parsed = JSON.parse(res);
      props.handleJson && props.handleJson(parsed);
    }
    // let's start with a very non scalable implementation - for testing!
    reader.readAsText(file);
  }


  return (
    <Layout>
    <Container>
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

    </Container>
    </Layout>
  )
}

export default Upload;

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

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
    background: red;
  }
}
`;

