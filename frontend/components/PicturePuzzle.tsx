import React, { useState } from "react";
import dynamic from "next/dynamic";
import p5Types from "p5"; //Import this for typechecking and intellisense
import picturepuzle from "./picturepuzlle.module.css";
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
    ssr: false,
});




class Tile{
  index: number;
  img: p5Types.Image;
  p5: p5Types;
  constructor(index: number, img: p5Types.Image,p5:p5Types) {
    this.index = index;
    this.img = img;
    this.p5 = p5;
  }

}


let cnv: any;
let source: any;
let cols = 4;
let rows = cols;
let ww = 400;
let hh = ww;
let tiles: any[] = [];
let board: any[] = [];
let solveState: any[] = [];
let images = ["pinwheel","eren"];
let loadedImages: any[] = [];
let imgSelect: any;
let typeRadio: any;
let autoSolveButton: any;
let shuffleItr = 50;
let fileInput:any;
let reShuffleButton:any;
let stepsArr:any[] = [];
const PicturePuzzle = (props: any) => {
  const preload = (p5:p5Types) => {
    for(let i = 0; i < images.length; i++) {
      
      loadedImages.push(p5.loadImage(`/preAsset/${images[i]}.jpg`));
    }
    source = loadedImages[0];
    source.resize(ww,hh);
  }
  const setup = (p5:p5Types, canvasParentRef:Element) => {
    cnv =  p5.createCanvas(ww,hh).parent(canvasParentRef);
    cnv.position(p5.height/2,p5.width/2);

    reShuffleButton = p5.createButton("Re-Shuffle");
    reShuffleButton.parent(canvasParentRef);
    reShuffleButton.addClass(picturepuzle.classyButton);
    reShuffleButton.mousePressed(() => {
      // if(isSolved(p5,board)) return;
      board = shufflePuzzle(board);
    });
    let div = p5.createDiv();
    div.parent(canvasParentRef);
   

    

    const autoSolveButton = p5.createButton("Auto Solve");
    autoSolveButton.parent(canvasParentRef);
    autoSolveButton.mousePressed(() => {
      if(isSolved(p5,board)) return;
      stepsArr.reverse();
      performStepsWithDelay(p5, board, stepsArr);
      stepsArr = [];
      
    });

    let tileSize = p5.floor(ww / cols);
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
          let x = i * tileSize;
          let y = j * tileSize;
          let img = p5.createImage(tileSize, tileSize);
          img.copy(source, x, y, tileSize, tileSize, 0, 0, tileSize, tileSize);
          let tile = new Tile(i + j * cols, img,p5);
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
    board = shufflePuzzle(board);
    console.log(board);
    cnv.mousePressed(() => mousePressed(p5));
    imgSelect = p5.createSelect();
    imgSelect.addClass(picturepuzle.classyDropdown);
    for(let i = 0; i < images.length; i++) {
      imgSelect.option(images[i].toUpperCase());
    }
    imgSelect.parent(canvasParentRef);

    imgSelect.changed(() => {
      if(typeRadio.value() == "Video") return;
      let index = imgSelect.selected();
      for(let i = 0; i < images.length; i++) {
        if(index == images[i].toUpperCase()) {
          source = loadedImages[i];
          source.resize(ww,hh);
          break;
        }
      }
      updateTiles(p5);

    });
    typeRadio = p5.createRadio();
    typeRadio.option("Video");
    typeRadio.option("Image");
    typeRadio.selected("Image");
    typeRadio.parent(canvasParentRef);
    typeRadio.changed(() => {
      if(typeRadio.value() == "Video") {
        source = p5.createCapture(p5.VIDEO);
        source.hide();
      
      } else {
        for(let i = 0; i < images.length; i++) {
          if(imgSelect.selected() == images[i].toUpperCase()) {
            source = loadedImages[i];
            break;
          }
        }
        source.resize(ww,hh);
       
      }
      updateTiles(p5);
     
    });

    
  }
const updateTiles = (p5:p5Types) => {
  let tileSize = p5.floor(ww / cols);
  for(let i = 0; i < tiles.length; i++) {
    let tile = tiles[i];
    let x = (tile.index % cols) * tileSize;
    let y = p5.floor(tile.index / cols) * tileSize;
    tile.img.copy(source, x, y, tileSize, tileSize, 0, 0, tileSize, tileSize);
  }
}

 
function performStepsWithDelay(p5:p5Types, board:any, stepsArr:any, index = 0) {
  if (index >= stepsArr.length) {
    // All steps have been completed
    return;
  }

  const step = stepsArr[index];
  if(isSolved(p5,board)) return;
  moveTile(p5, board, step[0], step[1]);

  // Use setTimeout to execute the next step with a delay
  setTimeout(() => {
    performStepsWithDelay(p5, board, stepsArr, index + 1);
  }, 200);
}
const draw = (p5:p5Types) => {
  if(typeRadio.value() == "Video") {
    console.log("Video");
    updateTiles(p5);
  }
   
    p5.background(244,152,58);
   
    for (let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            if(board[i + j * cols] == -1) continue;
            let tile = tiles[board[i + j * cols]];
            p5.image(tile.img, i * (ww/cols), j * (hh/rows));
        }
    }

    for(let i = 0; i < cols; i++) {
        p5.line(i * (ww/cols), 0, i * (ww/cols), hh);
    }
    for(let i = 0; i < rows; i++) {
        p5.line(0, i * (hh/rows), ww, i * (hh/rows));
    }
    if(isSolved(p5,board)) {
     
      p5.textSize(32);
      p5.textAlign(p5.CENTER);
      p5.textStyle(p5.BOLD);
      p5.textFont("Georgia")
      p5.fill(255,0,0);
      p5.text("SOLVED",ww/2,hh/2);
    }
};
function isSolvable(puzzle:any) {
  let inversionCount = 0;
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = i + 1; j < puzzle.length; j++) {
      if (puzzle[i] > puzzle[j] && puzzle[i] !== 0 && puzzle[j] !== 0) {
        inversionCount++;
      }
    }
  }
  return inversionCount % 2 === 0;
}

function shufflePuzzle(puzzle:any) {
  const goalState = solveState;
  let solvable = false;

  while (!solvable) {
    puzzle = [...goalState];
    for (let i = puzzle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
      stepsArr.push([i,j]);
    }
    solvable = isSolvable(puzzle);
  }

  return puzzle;
}


const moveTile = (p5:p5Types,board:any,blankIndex:number,tileIndex:number) => {
  let temp = board[blankIndex];
  board[blankIndex] = board[tileIndex];
  board[tileIndex] = temp;
  blankIndex = tileIndex;
}
const findBlankIndex = (p5:p5Types,board:any) => {
  for(let i = 0; i < board.length; i++) {
    if(board[i] == -1) return i;
  }
  return -1;
}
const isNeighbor = (p5:p5Types,board:any,blankIndex:number,tileIndex:number) => {
  if(tileIndex == blankIndex - 1) return true;
  if(tileIndex == blankIndex + 1) return true;
  if(tileIndex == blankIndex - cols) return true;
  if(tileIndex == blankIndex + cols) return true;
  return false;
}
const mousePressed = (p5:p5Types) => {
  let tileSize = p5.floor(ww / cols);
  let x = p5.floor(p5.mouseX / tileSize);
  let y = p5.floor(p5.mouseY / tileSize);
  let tileIndex = x + y * cols;
  let blankIndex = findBlankIndex(p5,board);
  if(isNeighbor(p5,board,blankIndex,tileIndex)) {
    stepsArr.push([blankIndex,tileIndex]);
    moveTile(p5,board,blankIndex,tileIndex);
  }
}
const isSolved = (p5:p5Types,board:any) => {

  for(let i = 0; i < board.length; i++) {
    if(board[i] != solveState[i]) return false;
  }
  
  return true;
}




    return <Sketch setup={setup} draw={draw} preload={preload}/>;
};
export default PicturePuzzle;


