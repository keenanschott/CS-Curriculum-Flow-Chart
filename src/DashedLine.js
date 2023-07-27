import React from 'react';

const DashedLine = ({ distanceFromTop }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: distanceFromTop,
        left: 0,
        right: 0,
        borderTop: '2px dashed black',
        zIndex: -9999, // all the way back
      }}
    />
  );
};

export default DashedLine;
