import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import p5Types from 'p5'; //Import this for typechecking and intellisense
import picturepuzle from './picturepuzlle.module.css';
import { map, random, sortedIndexOf } from 'lodash';
import { Center } from '@mantine/core';
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

let cnv: any;
let source: any;
let cols = 4;
let rows = cols;
let ww = 700;
let hh = ww;
let selectOption: any;
let video: any;
let radioSelect: any;
let orgImg: any;
let saveImg: any;
const FunnyImage = (props: any) => {
  const preload = (p5: p5Types) => {
    orgImg = p5.loadImage(`/funcam/panda.jpg`);
  };
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    cnv = p5.createCanvas(ww, hh).parent(canvasParentRef);
    let canvasX = (p5.displayWidth - ww) / 2;
    let canvasY = (p5.displayHeight - hh) / 2;
    cnv.position(canvasX + 150, canvasY + 50);
    video = p5.createCapture(p5.VIDEO);
    video.size(ww, hh);
    video.hide();
    radioSelect = p5.createRadio();
    radioSelect.option('Capture From Camera');
    radioSelect.option('Use Default Image');
    radioSelect.selected('Use Default Image');
    radioSelect.addClass(picturepuzle.classySelect);
    radioSelect.position(canvasX + 150, canvasY + hh + 60);

    selectOption = p5.createSelect();
    selectOption.parent(canvasParentRef);
    selectOption.option('original');
    selectOption.option('dottedImage');
    selectOption.option('pixelate');
    selectOption.option('invert');
    selectOption.option('blur');
    selectOption.option('ashes');
    selectOption.option('wavey');
    selectOption.option('ascii');
    selectOption.option('blobZoom');
    selectOption.position(canvasX + 10 + ww, canvasY + hh + 60);
    selectOption.addClass(picturepuzle.classyDropdown);

    saveImg = p5.createButton('Save Image');
    saveImg.addClass(picturepuzle.customBtn);
    saveImg.position(canvasX + 85 + ww / 2, canvasY + hh + 60);
    saveImg.mousePressed(() => {
      p5.saveCanvas(cnv, 'myCanvas', 'jpg');
    });
    cnv.mousePressed(() => {
      p5.saveCanvas(cnv, 'myCanvas', 'jpg');
    });
  };

  const draw = (p5: p5Types) => {
    if (radioSelect.value() === 'Capture From Camera') {
      source = video;
    } else {
      source = orgImg;
    }
    let img = p5.createImage(source.width, source.height);
    img.copy(
      source,
      0,
      0,
      source.width,
      source.height,
      0,
      0,
      source.width,
      source.height
    );
    img.resize(ww, hh);
    switch (selectOption.value()) {
      case 'pixelate':
        img.loadPixels();
        for (let x = 0; x < img.width; x += 10) {
          for (let y = 0; y < img.height; y += 10) {
            let c = img.get(x, y);
            p5.fill(c);
            p5.noStroke();
            p5.rect(x, y, 10, 10);
          }
        }

        break;
      case 'wavey':
        img.loadPixels();
        for (let x = 0; x < img.width; x += 10) {
          for (let y = 0; y < img.height; y += 10) {
            // calculate the color of the pixel
            let xPos = x;
            let yPos = y;
            let c = img.get(xPos, yPos);
            p5.push();
            p5.translate(xPos, yPos);
            p5.rotate(p5.radians(p5.random(0, 360)));
            p5.noFill();
            p5.strokeWeight(p5.random(1, 5));
            p5.stroke(p5.color(c));
            p5.point(xPos, yPos);
            p5.strokeWeight(p5.random(1, 3));
            p5.curve(
              xPos,
              yPos,
              p5.sin(xPos) * 10,
              p5.cos(yPos) * p5.sin(xPos) * 6,
              0,
              0,
              p5.cos(yPos) * p5.sin(xPos) * 30,
              p5.cos(yPos) * p5.sin(xPos) * 18
            );
            p5.pop();
          }
        }
        break;
      case 'invert':
        img.filter(p5.INVERT);
        p5.image(img, 0, 0);
        break;
      case 'blur':
        img.filter(p5.BLUR, 3);
        p5.image(img, 0, 0);
        break;

      case 'ashes':
        img.filter(p5.THRESHOLD);
        p5.image(img, 0, 0);
        break;
      case 'dottedImage':
        img.loadPixels();
        for (let x = 0; x < img.width; x += 10) {
          for (let y = 0; y < img.height; y += 10) {
            // calculate the color of the pixel
            let c = img.get(x, y);
            p5.stroke(p5.color(c));
            p5.strokeWeight(10);
            p5.point(x, y);
          }
        }
        break;
      case 'ascii':
        const ascii = '@&%$#*+=-:.    ';
        img.loadPixels();
        p5.background(0);
        for (let x = 0; x < img.width; x += 10) {
          for (let y = 0; y < img.height; y += 10) {
            // calculate the pixel brightness
            const index = (x + y * img.width) * 4;
            const r = img.pixels[index];
            const g = img.pixels[index + 1];
            const b = img.pixels[index + 2];
            const brightness = (r + g + b) / 3;
            // calculate the ascii index
            const asciiIndex = p5.floor(
              p5.map(brightness, 0, 255, ascii.length, 0)
            );
            // draw the character
            p5.textSize(10);
            p5.fill(255);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text(ascii[asciiIndex], x, y);
          }
        }
        break;
      case 'blobZoom':
        img.loadPixels();
        p5.background(0);
        // zoom a circle when the mouse is pressed
        // check if the mouse is in the canvas
        if (
          !(
            p5.mouseX > 0 &&
            p5.mouseX < p5.width &&
            p5.mouseY > 0 &&
            p5.mouseY < p5.height
          )
        ) {
          p5.image(img, 0, 0);
          return;
        }
        const zoom = p5.map(p5.mouseX, 0, p5.width, 0, 10);
        // loop through every pixel
        for (let x = 0; x < img.width; x += 10) {
          for (let y = 0; y < img.height; y += 10) {
            // calculate the pixel brightness
            const index = (x + y * img.width) * 4;
            const r = img.pixels[index];
            const g = img.pixels[index + 1];
            const b = img.pixels[index + 2];
            const brightness = (r + g + b) / 3;
            const distance = p5.dist(p5.mouseX, p5.mouseY, x, y);
            const circleSize = p5.map(distance, 0, 20, zoom, 0);
            // draw the circle
            p5.noStroke();
            p5.fill(r, g, b);
            p5.circle(x, y, circleSize);
          }
        }
        break;

      default:
        p5.image(img, 0, 0);
        break;
    }
    //   p5.noLoop();
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      preload={preload}
      style={{ height: '100%', margin: '5%' }}
    />
  );
};
export default FunnyImage;
