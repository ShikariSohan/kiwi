import React, { useState } from 'react';
import dynamic from 'next/dynamic';
//import styles from "../styles/lensStyle.module.css";
import p5Types from 'p5'; //Import this for typechecking and intellisense
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});
import picturepuzle from './picturepuzlle.module.css';
let x = 50;
let y = 50;
let cnv: any;
let colorPicker: any;
let bubbles: Bubble[] = [];
class Bubble {
  x: number;
  y: number;
  p5: p5Types;
  image: any;
  action: string;
  height: number;
  width: number;
  direction: number;
  zooming_dir: number;
  constructor(x: number, y: number, p5: p5Types, image: any, action: string) {
    this.x = x;
    this.y = y;
    this.p5 = p5;
    this.image = image;
    this.action = action;
    this.height = 50;
    this.width = 50;
    this.direction = 1;
    this.zooming_dir = 1;
  }
  vibrate() {
    this.x = this.x + this.p5.random(-3, 3);
    this.y = this.y + this.p5.random(-3, 3);
  }
  zoom() {
    if (this.x + this.width < 650 && this.zooming_dir == 1) {
      this.height = this.height + 3;
      this.width = this.width + 3;
    } else {
      this.zooming_dir = 0;
      this.height = this.height - 3;
      this.width = this.width - 3;
      if (this.x + this.width < 0) {
        this.zooming_dir = 1;
      }
    }
  }

  slide() {
    if (this.direction == 1) {
      this.x = this.x + 5;
      if (this.x > 650) {
        this.direction = 2;
      }
    } else {
      this.x = this.x - 5;
      if (this.x < 50) {
        this.direction = 1;
      }
    }
  }
  show() {
    this.p5.stroke(255);
    this.p5.strokeWeight(4);
    this.p5.noFill();
    this.p5.image(this.image, this.x, this.y, this.height, this.width);
  }
  clicked(px: number, py: number) {
    let d = this.p5.dist(px, py, this.x, this.y);
    if (d < 50) {
      console.log('CLICKED ON BUBBLE');
    }
  }
  move() {
    if (this.action == 'Vibrate') {
      this.vibrate();
    } else if (this.action == 'Zoom') {
      this.zoom();
    } else {
      this.slide();
    }
  }
}
let button: any;
let dropDown: any;
let imageSelect: any;
let ww = 700;
let hh = 700;
const assets = [
  'camera',
  'castle',
  'flower',
  'flower2',
  'love',
  'monster',
  'star',
  'star2',
  'wheel',
];
let loadedAssets: { image: any; name: string }[] = [];
let capturer: any;

const AnimationCanvas = (props: any) => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    cnv = p5.createCanvas(ww, hh).parent(canvasParentRef);
    let canvasX = p5.displayWidth / 2 - p5.width / 2;
    let canvasY = p5.displayHeight / 2 - p5.height / 2;
    cnv.position(canvasX + 150, canvasY - 50);
    button = p5.createButton('Save Image');
    button.mousePressed(() => {
      p5.saveCanvas(cnv, 'myCanvas', 'jpg');
    });

    dropDown = p5.createSelect();
    dropDown.addClass(picturepuzle.classyDropdown);
    imageSelect = p5.createSelect();

    colorPicker = p5.createColorPicker('#ed225d');

    colorPicker.position(canvasX + ww + 100, canvasY + hh - 20);

    imageSelect.option('Select Image');
    for (let i = 0; i < assets.length; i++) {
      loadedAssets.push({
        name: assets[i],
        image: p5.loadImage(`/animland/${assets[i]}.gif`),
      });
      imageSelect.option(assets[i].toUpperCase());
    }

    dropDown.option('Select Action');
    dropDown.option('Vibrate');
    dropDown.option('Zoom');
    dropDown.option('Slide');
    dropDown.changed(() => {
      console.log(dropDown.value());
    });
    dropDown.position(canvasX + 150, canvasY + hh - 40);

    imageSelect.changed(() => {
      console.log(imageSelect.value());
      console.log('HERE');
    });
    imageSelect.position(canvasX + 150, canvasY + hh + 10);
    imageSelect.addClass(picturepuzle.classyDropdown);

    button.position(canvasX + ww / 2 + 80, canvasY + hh - 40);
    button.mousePressed(() => {
      p5.saveCanvas(cnv, 'myCanvas', 'jpg');
    });
    button.addClass(picturepuzle.customBtn);

    cnv.mousePressed(() => {
      if (imageSelect.value() == 'Select Image') {
        alert('Select Image');
        return;
      }
      if (dropDown.value() == 'Select Action') {
        alert('Select Action');
        return;
      }
      let img;
      for (let i = 0; i < loadedAssets.length; i++) {
        if (loadedAssets[i].name == imageSelect.value().toLowerCase()) {
          img = loadedAssets[i].image;
        }
      }

      let overlapping = false;
      for (let i = 0; i < bubbles.length; i++) {
        let other = bubbles[i];
        let d = p5.dist(p5.mouseX, p5.mouseY, other.x, other.y);
        if (d < 50) {
          overlapping = true;
          other.x = other.x + 5;
          other.y = other.y + 5;
        }
      }
      if (!overlapping) {
        const actions = ['Vibrate', 'Zoom', 'Slide'];
        // const action = actions[Math.floor(Math.random() * actions.length)];
        bubbles.push(
          new Bubble(p5.mouseX, p5.mouseY, p5, img, dropDown.value())
        );
      }
    });
  };
  const draw = (p5: p5Types) => {
    p5.frameRate(14);
    p5.background(colorPicker.color());
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].move();
      bubbles[i].show();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};
export default AnimationCanvas;
