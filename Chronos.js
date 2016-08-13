const moment = require('moment');

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

Math.TAU = 2 * Math.PI;

var Chronos = {
  font: [ // These are our numbers, in matrix form :D
     // 0
    [false, true, true, true, false,
     true, false, false, false, true,
     true, false, false, false, true,
     true, false, false, false, true,
     true, false, false, false, true,
     true, false, false, false, true,
     false, true, true, true, false],
     // 1
    [false, false, true, false, false,
     false, true, true, false, false,
     false, false, true, false, false,
     false, false, true, false, false,
     false, false, true, false, false,
     false, false, true, false, false,
     false, true, true, true, false],
     // 2
    [false, true, true, true, false,
     true, false, false, false, true,
     false, false, false, false, true,
     false, true, true, true, false,
     true, false, false, false, false,
     true, false, false, false, false,
     true, true, true, true, true],
     // 3
    [false, true, true, true, false,
     true, false, false, false, true,
     false, false, false, false, true,
     false, false, true, true, false,
     false, false, false, false, true,
     true, false, false, false, true,
     false, true, true, true, false],
     // 4
    [false, false, false, true, false,
     false, false, true, true, false,
     false, true, false, true, false,
     true, false, false, true, false,
     true, true, true, true, true,
     false, false, false, true, false,
     false, false, false, true, false],
     // 5
    [true, true, true, true, true,
     true, false, false, false, false,
     true, false, false, false, false,
     true, true, true, true, false,
     false, false, false, false, true,
     true, false, false, false, true,
     false, true, true, true, false],
     // 6
    [false, false, true, true, false,
     false, true, false, false, false,
     true, false, false, false, false,
     true, true, true, true, false,
     true, false, false, false, true,
     true, false, false, false, true,
     false, true, true, true, false],
     // 7
    [true, true, true, true, true,
     false, false, false, false, true,
     false, false, false, true, false,
     false, false, true, false, false,
     false, true, false, false, false,
     false, true, false, false, false,
     false, true, false, false, false],
     // 8
    [false, true, true, true, false,
     true, false, false, false, true,
     true, false, false, false, true,
     false, true, true, true, false,
     true, false, false, false, true,
     true, false, false, false, true,
     false, true, true, true, false],
     // 9
    [false, true, true, true, false,
     true, false, false, false, true,
     true, false, false, false, true,
     false, true, true, true, true,
     false, false, false, false, true,
     true, false, false, false, true,
     false, true, true, true, false]
  ],
  currentTime: moment(),
  ledOffColor: '#333',
  ledOnColor: '#039be5',
  grid: 60, // Size of the 7x5 grid, in pixels
  radius: 22, // Radius of each individual circle, in pixels

  /**
   * Our base draw function, this re-draws the entire canvas
   */
  draw: function () {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    var diameter = Math.min(width, height);
    ctx.beginPath();

    // Set our background
    ctx.fillStyle = '#222';
    ctx.rect(0, 0, width, height);
    ctx.fill();

    ctx.save();

    // Setup our location / size of brush
    ctx.translate(width / 2.0, height / 2.0);
    ctx.scale(diameter / 2000.0, diameter / 2000.0);

    // Draw... :D
    Chronos.drawClock();
    Chronos.drawScale();

    // Reset our location / size of brush
    ctx.restore();
  },

  /**
   * Draws the digits of the clock
   */
  drawClock: function () {
    var digitHour1 = Chronos.currentTime.format('HH').substring(0, 1);
    var digitHour2 = Chronos.currentTime.format('HH').substring(1, 2);
    var digitMinute1 = Chronos.currentTime.format('mm').substring(0, 1);
    var digitMinute2 = Chronos.currentTime.format('mm').substring(1, 2);
    var digitSecond1 = Chronos.currentTime.format('ss').substring(0, 1);
    var digitSecond2 = Chronos.currentTime.format('ss').substring(1, 2);

    ctx.save();

    // Draw the hour digits
    ctx.translate(-10 * Chronos.grid, 0);
    Chronos._drawMatrix(digitHour1);
    ctx.translate(6 * Chronos.grid, 0);
    Chronos._drawMatrix(digitHour2);

    // Draw the minute digits
    ctx.translate(8 * Chronos.grid, 0);
    Chronos._drawMatrix(digitMinute1);
    ctx.translate(6 * Chronos.grid, 0);
    Chronos._drawMatrix(digitMinute2);
    ctx.restore();

    // Draw the second digits
    ctx.save();
    ctx.translate(0, 8 * Chronos.grid);
    ctx.scale(0.7, 0.7); // Smaller circles are now drawn
    ctx.translate(-3 * Chronos.grid, 0);
    Chronos._drawMatrix(digitSecond1);
    ctx.translate(6 * Chronos.grid, 0);
    Chronos._drawMatrix(digitSecond2);
    ctx.restore();

    // Draw the central colon
    ctx.fillStyle = Chronos.ledOnColor;
    ctx.beginPath();
    ctx.arc(0, -1 * Chronos.grid, Chronos.radius, 0, Math.TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, Chronos.grid, Chronos.radius, 0, Math.TAU);
    ctx.fill();
  },

  /**
   * Draws the outer-scale of the clock
   */
  drawScale: function () {
    // Draw the 12 inner points
    var points = [true, true, true, true, true, true, true, true, true, true, true, true];
    Chronos._drawRadial(13.8 * Chronos.grid, Math.TAU / 12, points);

    // Generate / draw the 60 outer points
    var ledCircle = [];
    for (var i = 0; i < 60; i++) {
      ledCircle[i] = (i <= parseInt(Chronos.currentTime.format('ss'))) ? true : false;
    }

    Chronos._drawRadial(15 * Chronos.grid, Math.TAU / 60, ledCircle);
  },

  /**
   * Draws a 7x5 dot matrix
   * @param {INT} digit
   */
  _drawMatrix: function (digit) {
    var x, y;
    for (var i = 0; i < Chronos.font[digit].length; i++) {
      x = (i % 5 - 2) * Chronos.grid;
      y = (Math.floor(i/5) - 3) * Chronos.grid;

      ctx.beginPath();
      ctx.fillStyle = Chronos.font[digit][i] ? Chronos.ledOnColor : Chronos.ledOffColor;
      ctx.arc(x, y, Chronos.radius, 0, Math.TAU);
      ctx.fill();
    }
  },

  /**
   * Draws radial led scale.
   * @param {FLOAT} distance Scale radius
   * @param {FLOAT} angle Angle between LEDs -- in radians
   * @param {OBJECT} data An itreable of bool data representing LED status
   */
  _drawRadial: function (distance, angle, data) {
    ctx.save();

    for (var i = 0; i < data.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = data[i] ? Chronos.ledOnColor : Chronos.ledOffColor;
      ctx.arc(0, -distance, Chronos.radius, 0, Math.TAU);
      ctx.fill();
      ctx.rotate(angle);
    }

    ctx.restore();
  }
};
