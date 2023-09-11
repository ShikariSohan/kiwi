import { Center } from '@mantine/core';
import * as React from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
};

const Canvas = () => {
  return (
    <div style={{height:"100vh", width:"100vh"}}>
        <Center style={{height:"100%", width:"100%"}}>
        <ReactSketchCanvas
            style={styles}
            width="700"
            height="700"
            strokeWidth={4}
            strokeColor="red"
        />
    </Center>

    </div>


  );
};

export default Canvas;
