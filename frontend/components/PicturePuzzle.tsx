import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import p5Types from 'p5'; //Import this for typechecking and intellisense
import picturepuzle from './picturepuzlle.module.css';
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});
import axios from 'axios';
class Tile {
  index: number;
  img: p5Types.Image;
  p5: p5Types;
  constructor(index: number, img: p5Types.Image, p5: p5Types) {
    this.index = index;
    this.img = img;
    this.p5 = p5;
  }
}

let cnv: any;
let source: any;
let cols = 3;
let rows = cols;
let ww = 700;
let hh = ww;
let tiles: any[] = [];
let board: any[] = [];
let solveState: any[] = [];
let images = ['car', 'dori', 'monster', 'panda', 'shark', 'walle'];
let loadedImages: any[] = [];
let imgSelect: any;
let typeRadio: any;
let reShuffleButton: any;
let stepsArr: any[] = [];
let timer: any;
let time = 0;
let start = false;
let fRate = 10;
let score: any;
const PicturePuzzle = ({profile}:{
  profile:any
}) => {
  const [currentScore, setCurrentScore] = useState('0');
  const [highScore, setHighScore] = useState('0');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
    if(currentScore > highScore){
      setHighScore(currentScore);
      profile.puzzle = currentScore;
      localStorage.setItem('profile', JSON.stringify(profile));
      const f = async () => {
        try {
          const res = await axios.put(
            '/api/profiles',
            profile,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      }
      f();
    }


    
  }, [currentScore]);
  const preload = (p5: p5Types) => {
    for (let i = 0; i < images.length; i++) {
      loadedImages.push(p5.loadImage(`/puzzle/${images[i]}.jpg`));
    }
    source = loadedImages[0];
    source.resize(ww, hh);
  };
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    cnv = p5.createCanvas(ww, hh).parent(canvasParentRef);

    let canvasX = (p5.displayWidth - ww) / 2;
    let canvasY = (p5.displayHeight - hh) / 2;
    cnv.position(canvasX + 150, canvasY);
    p5.frameRate(fRate);

    score = p5.createP(`Lowest Time: ${profile.puzzle} sec`);
    score.addClass(picturepuzle.classyScore);
    score.position(canvasX + ww / 2 + 80, canvasY-50);



    let tileSize = p5.floor(ww / cols);
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        let x = i * tileSize;
        let y = j * tileSize;
        let img = p5.createImage(tileSize, tileSize);
        img.copy(source, x, y, tileSize, tileSize, 0, 0, tileSize, tileSize);
        let tile = new Tile(i + j * cols, img, p5);
        tiles.push(tile);
        board.push(tile.index);
        solveState.push(tile.index);
      }
    }
    board.pop();
    tiles.pop();
    solveState.pop();
    solveState.push(-1);
    board.push(-1);
    console.log(board);
    cnv.mousePressed(() => mousePressed(p5));
    //dropdown
    imgSelect = p5.createSelect();
    imgSelect.addClass(picturepuzle.classyDropdown);
    for (let i = 0; i < images.length; i++) {
      imgSelect.option(images[i].toUpperCase());
    }
    imgSelect.position(canvasX + 150, canvasY - 45);

    imgSelect.changed(() => {
      if (typeRadio.value() == 'Video') return;
      let index = imgSelect.selected();
      for (let i = 0; i < images.length; i++) {
        if (index == images[i].toUpperCase()) {
          source = loadedImages[i];
          source.resize(ww, hh);
          break;
        }
      }
      updateTiles(p5);
    });
    //radio button
    typeRadio = p5.createRadio();
    typeRadio.option('Video');
    typeRadio.option('Image');
    typeRadio.selected('Image');
    typeRadio.position(canvasX + ww + 30, canvasY - 30);
    typeRadio.addClass(picturepuzle.classyRadio);
    typeRadio.changed(() => {
      if (typeRadio.value() == 'Video') {
        source = p5.createCapture(p5.VIDEO);
        source.size(ww, hh);
        source.hide();
      } else {
        for (let i = 0; i < images.length; i++) {
          if (imgSelect.selected() == images[i].toUpperCase()) {
            source = loadedImages[i];
            break;
          }
        }
        source.resize(ww, hh);
      }
      updateTiles(p5);
    });
    // timer
    
    // start button
    const startButton = p5.createButton('Start');
    startButton.addClass(picturepuzle.classyStartButton);
    startButton.position(canvasX + ww / 2 + 140, canvasY + hh + 20);
    start = false;
    startButton.mousePressed(() => {
      if (start) {
        start = false;
        startButton.html('Start');
        board = solveState;
      } else {
        start = true;
        startButton.html('Stop!');
        time = p5.frameCount;
        board = shufflePuzzle(board);
      }
    });
  };

  const updateTiles = (p5: p5Types) => {
    let tileSize = p5.floor(ww / cols);
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      let x = (tile.index % cols) * tileSize;
      let y = p5.floor(tile.index / cols) * tileSize;
      tile.img.copy(source, x, y, tileSize, tileSize, 0, 0, tileSize, tileSize);
    }
  };


  const draw = (p5: p5Types) => {
    if (typeRadio.value() == 'Video') {
      updateTiles(p5);
    }

    p5.background(244, 152, 58);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (board[i + j * cols] == -1) {
          let x = i * (ww / cols);
          let y = j * (hh / rows);
          if(start){
          let times = calculateElapsedTime(p5.frameCount, fRate, time);
          p5.textSize(20);
          p5.textAlign(p5.CENTER);
          p5.textStyle(p5.BOLD);
          p5.textFont('Georgia');
          p5.fill(255);
          p5.text(`${times} s`, x + ww / cols / 2, y + hh / rows / 2);
          }
          continue;
        }
        let tile = tiles[board[i + j * cols]];
        p5.image(tile.img, i * (ww / cols), j * (hh / rows));
      }
    }

    for (let i = 0; i < cols; i++) {
      p5.line(i * (ww / cols), 0, i * (ww / cols), hh);
    }
    for (let i = 0; i < rows; i++) {
      p5.line(0, i * (hh / rows), ww, i * (hh / rows));
    }
    if (isSolved(p5, board)) {
      if(start){
        let eTime = calculateElapsedTime(p5.frameCount, fRate, time);
      setCurrentScore(eTime.toString());
      }
      p5.textSize(32);
      p5.textAlign(p5.CENTER);
      p5.textStyle(p5.BOLD);
      p5.textFont('Georgia');
      p5.fill(255, 0, 0);
      p5.text('SOLVED', ww / 2, hh / 2);
    }
  };
  function calculateElapsedTime(frameCount:number, frameRate:number, offset:number) {
    let elapsedTime = (frameCount - offset) / frameRate;
    // set precision 2 decimal places
    elapsedTime = Math.round(elapsedTime );
    return elapsedTime;
}


function shufflePuzzle(board:[]) {
  const numTiles = board.length;

  // Define a function to swap two elements in the board array
  function swap(array:[], i:number, j:number) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  // Shuffle the board using Fisher-Yates algorithm
  for (let i = numTiles - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    swap(board, i, j);
  }

  return board;
}


  const moveTile = (
    p5: p5Types,
    board: any,
    blankIndex: number,
    tileIndex: number
  ) => {
    let temp = board[blankIndex];
    board[blankIndex] = board[tileIndex];
    board[tileIndex] = temp;
    blankIndex = tileIndex;
  };
  const findBlankIndex = (p5: p5Types, board: any) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] == -1) return i;
    }
    return -1;
  };
  const isNeighbor = (
    p5: p5Types,
    board: any,
    blankIndex: number,
    tileIndex: number
  ) => {
    if (tileIndex == blankIndex - 1) return true;
    if (tileIndex == blankIndex + 1) return true;
    if (tileIndex == blankIndex - cols) return true;
    if (tileIndex == blankIndex + cols) return true;
    return false;
  };
  const mousePressed = (p5: p5Types) => {
    let tileSize = p5.floor(ww / cols);
    let x = p5.floor(p5.mouseX / tileSize);
    let y = p5.floor(p5.mouseY / tileSize);
    let tileIndex = x + y * cols;
    let blankIndex = findBlankIndex(p5, board);
    if (isNeighbor(p5, board, blankIndex, tileIndex)) {
      stepsArr.push([blankIndex, tileIndex]);
      moveTile(p5, board, blankIndex, tileIndex);
    }
  };
  const isSolved = (p5: p5Types, board: any) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] != solveState[i]) return false;
    }

    return true;
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      preload={preload}
      style={{ height: '100vh', width: '100vw' }}
    />
  );
};
export default PicturePuzzle;
