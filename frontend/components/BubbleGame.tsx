import React, {  useState } from "react";
import dynamic from "next/dynamic";
import p5Types from "p5"; //Import this for typechecking and intellisense
import picturepuzle from "./picturepuzlle.module.css";
import { map, random, sortedIndexOf } from "lodash";
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
    ssr: false,
});
import { useEffect } from "react";
let cnv: any;
let ww = 900;
let hh = ww;
let startGame: any;
let modeSelect:any;
let timer: any;
let frameCount = 10;
let bubbles: Bubble[] = [];
let minBubble = 22;
let maxBubble = 65;
let timeMode = 30;
let Bg : any;
let bubbleColors = ["#ff0054","#390099","#ff5400","#ffbd00"]
let score = 0;
let missed = 0;
let started = false;
let reStart : any;
class Bubble {
    x: number;
    y: number;
    r: number;
    num: number;
    color: string;
    p5: p5Types;
    constructor(x: number, y: number, r: number, num: number,p5: p5Types) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.p5 = p5;
        this.num = p5.round(num);
        this.color = p5.random(bubbleColors);
    }
    move() {
        this.x = this.x + random(-2, 2);
        this.y = this.y + random(-2, 2);
    }
    show() {
        this.p5.stroke(this.color);
        this.p5.strokeWeight(3);
      
   
        this.p5.fill(230);
        this.p5.ellipse(this.x, this.y, this.r * 2);
        this.p5.strokeWeight(1);
        this.p5.fill(this.color);
        this.p5.textSize(20);
        this.p5.textAlign(this.p5.CENTER);
        this.p5.text(this.num, this.x , this.y);

    }
    shrink() {
        if(this.r > minBubble)
        {
          this.r = this.r - 0.1;
        }
        
    }
    clicked(p5: p5Types) {
        let d = p5.dist(p5.mouseX, p5.mouseY, this.x, this.y);
        if (d < this.r) {
            this.num = this.num - 1;
            score +=1;
        } else {
            return false;
        }
    }
}
const BubbleGame = (props: any) => {
  const [highScore,setHighScore] = useState(0);
  const [currentScore,setCurrentScore] = useState(0);
  useEffect(()=>{
    if(currentScore>highScore)
    {
      console.log("Need to work here");
    }
  },[currentScore])
  const preload = (p5:p5Types) => {
    let bgPath1 = "/bubbleBg1.png";
    let bgPath2 = "/bubbleBg2.png"
    // randomly load a background image
    let bgPath = p5.random([bgPath1, bgPath2]);
    Bg = p5.loadImage(bgPath);
    Bg.resize(ww,hh);
    Bg.filter(p5.BLUR, 2);
  }
  const setup = (p5:p5Types, canvasParentRef:Element) => {
   cnv = p5.createCanvas(ww, hh).parent(canvasParentRef);
   startGame = p5.createButton("Start");
   timer = 0;
   p5.frameRate(frameCount);
   modeSelect = p5.createSelect();
   modeSelect.parent(canvasParentRef);
   modeSelect.option("30 sec",20);
   modeSelect.option("45 sec",45);
   modeSelect.option("60 sec",60);
   modeSelect.selected(30);
   modeSelect.enable(started);
   modeSelect.changed(()=>{
    timeMode = modeSelect.value(); 
   })
  
   startGame.mousePressed(()=>{
        started = true;
        modeSelect.disable();
        p5.loop();
   });
    startGame.parent(canvasParentRef);
    reStart = p5.createButton("Restart");
    reStart.parent(canvasParentRef);
    reStart.mousePressed(()=>{
      
      score = 0;
      missed = 0;
      started = true;
      let num = p5.random(6,17);
      bubbles = [];
      timer = p5.frameCount;
      for(let i = 0; i < 10; i++){
       bubbles[i] = new Bubble(p5.random(p5.width),p5.random(p5.height),minBubble+num+2,num,p5);
   }
      p5.frameRate(frameCount);
      p5.loop();
    });
   let num = p5.random(6,17);
   for(let i = 0; i < 10; i++){
       bubbles[i] = new Bubble(p5.random(p5.width),p5.random(p5.height),minBubble+num+2,num,p5);
   }

    cnv.mousePressed(()=>{
        for(let i = 0; i < bubbles.length; i++){
            bubbles[i].clicked(p5);
            if(bubbles[i].num <= 0){
                bubbles.splice(i,1);
            }
        }
    });
 
  }

const draw = (p5:p5Types) => {
    Bg.resize(ww,hh);
    p5.image(Bg,0,0);
    let textContent = calculateElapsedTime(p5.frameCount,frameCount , timer);
    let rem = timeMode - textContent;
    if(!started)
    {
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.fill(0);
      p5.textSize(40);
      p5.text("Click Start to Play",p5.width/2,p5.height/2);
      p5.noLoop();
    }
    else if(rem>0)
    {
      drawTimer(p5,rem);

      for(let i = 0; i < bubbles.length; i++){
          bubbles[i].move();
          bubbles[i].shrink();
          bubbles[i].show();
      }
      for(let i = 0; i < bubbles.length; i++){
          if(bubbles[i].r <= minBubble){
             missed+=bubbles[i].num;
              bubbles.splice(i,1);
          }
      }
      let num = p5.random(6,17);
      if(p5.frameCount % 10 == 0){
        bubbles.push(new Bubble(p5.random(p5.width),p5.random(p5.height),minBubble+num+2,num,p5));
        num = p5.random(6,17);
        bubbles.push(new Bubble(p5.random(p5.width),p5.random(p5.height),minBubble+num+2,num,p5));
      }
      
      drawScore(p5);
    }
    else {
      drawFinalScore(p5);
    }
    
};
function drawScore(p5:p5Types) {
  let total = score;
  let missedScore = missed;

  // Set text alignment to top right
  p5.textAlign(p5.RIGHT, p5.TOP);

  // Set text size and color
  p5.fill(0);
  p5.textSize(20);

  // Position and display the total score
  let totalX = p5.width - 10; // 10 pixels from the right edge
  let totalY = 10; // 10 pixels from the top edge
  p5.text(`Total: ${total}`, totalX, totalY);

  // Position and display the missed score
  let missedX = p5.width - 10; // 10 pixels from the right edge
  let missedY = totalY + 30; // 30 pixels below the total score
  p5.text(`Missed: ${missedScore}`, missedX, missedY);
}

function drawTimer(p5:p5Types,rem:number)
{
  let rectX = 5;
  let rectY = 5;
  let rectWidth = 50;
  let rectHeight = 50;
  
   p5.fill(255);
    p5.rect(rectX, rectY, rectWidth, rectHeight);
    p5.stroke(255);
    p5.strokeWeight(1);
    
    p5.fill(0);
    p5.textSize(20);
    p5.textAlign(p5.CENTER, p5.CENTER); // Center text horizontally and vertically
    p5.text(rem, rectX + rectWidth / 2, rectY + rectHeight / 2);
    
}
function calculateElapsedTime(frameCount:number, frameRate:number, offset:number) {
    let elapsedTime = (frameCount - offset) / frameRate;
    // set precision 2 decimal places
    elapsedTime = Math.round(elapsedTime );
    return elapsedTime;
}
function drawFinalScore(p5:p5Types){
  p5.textAlign(p5.CENTER, p5.CENTER);
  
  for(let i = 0;i<bubbles.length;i++)
  {
     missed+=bubbles[i].num;
  }
  let accuracy = ((score / (score + missed)) * 100).toFixed(2);
  bubbles =[];
  modeSelect.enable();
  // Set text size and color
  p5.fill(0);
  p5.textSize(40); 

  // Calculate the center of the canvas
  let centerX = p5.width / 2;
  let centerY = p5.height / 2;

  // Display the final score
  p5.text(`Final Score: ${score}`, centerX, centerY-45);
  p5.text(`Accuracy: ${accuracy}%`, centerX, centerY ); // Adjust the vertical positioning
  p5.text(`High Score: ${highScore}%`,centerX,centerY+45)
  setCurrentScore(accuracy)
  p5.noLoop();
  
}


    return <Sketch setup={setup} draw={draw} preload={preload}/>;
};
export default BubbleGame;


