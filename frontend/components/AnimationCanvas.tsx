import React, { useState } from "react";
import dynamic from "next/dynamic";
//import styles from "../styles/lensStyle.module.css";
import p5Types from "p5"; //Import this for typechecking and intellisense
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
    ssr: false,
});

let x = 50;
let y = 50;
let cnv: any;
let colorPicker: any;
let bubbles: Bubble[] = [];
class Bubble {
    x: number;
    y: number;
    p5:p5Types;
    image : any;
    action : string;
    height : number;
    width : number;
    direction : number;
    constructor(x: number, y: number,p5:p5Types,image:any,action:string) {
        this.x = x;
        this.y = y;
        this.p5 = p5;
        this.image = image;
        this.action = action;
        this.height = 50;
        this.width = 50;
        this.direction = 1;

    }
    vibrate() {
        this.x = this.x + this.p5.random(-3, 3);
        this.y = this.y + this.p5.random(-3, 3);
    }
    zoom() {
        this.height = this.height + 3;
        this.width = this.width + 3;

    }

    slide() {
        if(this.direction == 1){
            this.x = this.x + 5;
            if(this.x > 650){
                this.direction = 2;
            }
        }
        else{
            this.x = this.x - 5;
            if(this.x < 50){
                this.direction = 1;
            }
        }
        
    }
    show() {
        this.p5.stroke(255);
        this.p5.strokeWeight(4);
        this.p5.noFill();
        this.p5.image(this.image,this.x,this.y,this.height,this.width);  
    }
    clicked(px: number, py: number) {
        let d = this.p5.dist(px, py, this.x, this.y);
        if (d < 50) {
            console.log("CLICKED ON BUBBLE");
        }
    }
    move() {
        if(this.action == "Vibrate"){
            this.vibrate();
        }
        else if(this.action == "Zoom"){
            this.zoom();
        }
        else{
            this.slide();
        }
        
    }
}
let button: any;
let dropDown: any;
let imageSelect : any;
let startAnimation: any;
let stopAnimation: any;
const assets = [
    "star","book","castle","editor","trolley","love"
]
let loadedAssets: { image: any; name:string }[] = [];
let capturer: any;

const AnimationCanvas = (props: any) => {
 
  const setup = (p5:p5Types, canvasParentRef:Element) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
  cnv =  p5.createCanvas(700,700).parent(canvasParentRef);
 
    button = p5.createButton("Add Bubble");
    startAnimation = p5.createButton("Start Animation");
    stopAnimation = p5.createButton("Stop Animation");
    startAnimation.position(0, 450);
    stopAnimation.position(0, 500);
    
    dropDown = p5.createSelect();
    imageSelect = p5.createSelect();
    colorPicker = p5.createColorPicker("#ed225d");
    colorPicker.position(0, 550);
    for(let i = 0; i < assets.length; i++){
        loadedAssets.push({
            name : assets[i],
            image : p5.loadImage(`/preAsset/${assets[i]}.gif`)
        });
        imageSelect.option(assets[i].toUpperCase());
    }
    startAnimation.mousePressed(() => {
        
    });
    dropDown.option("Vibrate");
    dropDown.option("Zoom");
    dropDown.option("Slide");
    dropDown.changed(() => {
        console.log(dropDown.value());
    });
    
    imageSelect.changed(() => {
        console.log(imageSelect.value());
        console.log("HERE");
    });
    imageSelect.position(0, 600);
    dropDown.position(0, 650);
    button.position(0, 700);
    button.mousePressed(() => {
        p5.saveCanvas(cnv, "myCanvas", "jpg");
    });
  

  cnv.mousePressed(()=> {
    let img ;
    for(let i = 0; i < loadedAssets.length; i++){
        if(loadedAssets[i].name == imageSelect.value().toLowerCase()){
            img = loadedAssets[i].image;
        }
    }
    // check overlap with other bubbles
    let overlapping = false;
    for(let i = 0; i < bubbles.length; i++){
        let other = bubbles[i];
        let d = p5.dist(p5.mouseX, p5.mouseY, other.x, other.y);
        if(d < 50){
            overlapping = true;
            other.x = other.x + 5;
            other.y = other.y + 5;
        }
        }
        if(!overlapping){
            const actions = ["Vibrate","Zoom","Slide"];
            // const action = actions[Math.floor(Math.random() * actions.length)];
            bubbles.push(new Bubble(p5.mouseX, p5.mouseY,p5,img,dropDown.value()));
        }
    
    
  });
  };
    const draw = (p5:p5Types) => {
    p5.frameRate(14);
    p5.background(colorPicker.color());
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].show();
    }
    const addBubble = (p5:p5Types) => {
        p5.saveCanvas(cnv, "myCanvas", "jpg");
    }

};


 
    


    return <Sketch setup={setup} draw={draw} />;
};
export default AnimationCanvas;


