import React, { useRef, useEffect} from 'react';
import './board.css';
import plus from './plus.svg'
import minus from './minus.svg'
import paint from './paint.svg'

const Board = ({socket}) => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  var i=5;
  let size=useRef(i);
  useEffect(() => {

    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const test = colorsRef.current;
    const context = canvas.getContext('2d');

    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName('color');
    console.log(colors, 'the colors');
    console.log(test);
    // set the current color
    const current = {
      color: 'black',
    };

    // helper that will update the current color
    const onColorUpdate = (e) => {
      current.color = e.target.className.split(' ')[1];
    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', onColorUpdate, false);
    }
    let drawing = false;

    // ------------------------------- create the drawline ----------------------------

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      // if(x0<0){x0-=50
      //   x1-=50
      // }
      // else{x0-=50
      //   x1-=50
      // }
      // if(y0<0){
      //   y0-=50
      //   y1-=50
      // }else{
      //   y0-=50
      //   y1-=50
      // }
    
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      // context.lineWidth = 6;
      context.lineWidth=size;
      context.stroke();
      context.closePath();

      if (!emit) { return; }
      const w = canvas.width;
      const h = canvas.height;

      socket.emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
      });
    };

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = (e) => {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseMove = (e) => {
      if (!drawing) { return; }
      drawLine((current.x), (current.y), e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseUp = (e) => {
      if (!drawing) { return; }
      drawing = false;
      drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, true);
    };

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function() {
        const time = new Date().getTime();

        if ((time - previousCall) >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    // -----------------add event listeners to our canvas ----------------------

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

    // Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);

    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      canvas.width = window.innerWidth-80;
      canvas.height = window.innerHeight-80;
      
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    // ----------------------- socket.io connection ----------------------------
    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }
   
    socket.on('drawing', onDrawingEvent);
  });

  // ------------- The Canvas and color elements --------------------------
  const sizeIncHandler=()=>{
    if(i<100){
     i+=5;
     size=i;
     console.log(size);
    }
  }
  const sizeDecHandler=()=>{
    if(i>5){
      i-=5;
      size=i;
      console.log(size);
    }
  }
  return (
    <div>
      <canvas ref={canvasRef} className="whiteboard" />

      <div ref={colorsRef} className="colors">
      <img className="cnvs" src={paint} />
        <div className="color black" />
        <div className="color red" />
        <div className="color green" />
        <div className="color white" />
        <div className="color yellow" />
        <h2>Drawing Area</h2>
        <div className="size-btns">
        <button  className="size"  onClick={sizeIncHandler}> <img className="inc-dec" src={plus} /> </button>
        <button  className="size"  onClick={sizeDecHandler}> <img className="inc-dec" src={minus} /> </button>
        </div>
      </div>
    </div>
  );
};

export default Board;