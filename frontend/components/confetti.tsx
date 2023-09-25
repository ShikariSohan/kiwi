import React, { useState } from 'react';
import Confetti from 'react-dom-confetti';

function ShowConfetti() {
  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };

  return <Confetti active={true} config={config} />;
}

export default ShowConfetti;
