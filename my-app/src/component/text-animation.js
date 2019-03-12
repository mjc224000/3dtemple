import React, {Component} from 'react';
import tween from './tween';

function drawTxt(context) {
    return function ({textBaseline, maxWidth, content, font, position, mode}) {
        let ctx = context;
        ctx.font = font || '64px serif';
        console.log(maxWidth);
        ctx.textBaseline = textBaseline || "middle";
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'white';
        let {x, y} = position;
        switch (mode) {
            case "stroke": {
                ctx.strokeText(content, x || 0, y || 0, maxWidth);
                break;
            }
            case "fill": {
                ctx.fillText(content, x || 0, y || 0, maxWidth);
                break;
            }
        }
    }
}

function isColored(arr) {
    let isColored = false;
    arr.forEach((item) => {
        if (item !== 0) {
            isColored = true
        }
    })
    return isColored;
}

function randColor() {
    return `rgba(${Math.random() * 50},${Math.random() * 225},${Math.random() * 225},${Math.random() * 100}`;
}

class Point {
    constructor({x, y, radius, color, ctx}) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.color = color;
        this.radius = radius;
        this.targetX = x;
        this.targetY = y;
        this.sourceX = x;
        this.sourceY = y;
        this.originX = x;
        this.originY = y;
        this.delay = Math.random() * 2;
    }

    static init(width, height, ctx) {
        Point.width = width;
        Point.height = height;
        Point.ctx = ctx;
        Point.isFinished=false;
        ctx.clearRect(0, 0, width, height);
    }

    static  points = [];
    static duration = 1000 / 60 * 5;

    static getPixel(startX, startY, width, height, skip) {
        let x, y;
        let ctx = Point.ctx;
        skip = skip || 1;
        Point.points=[];
        for (let i = 0; i < width; i += skip) {
            for (let j = 0; j < height; j += skip) {
                x = i + startX;
                y = j + startY;
                let data = ctx.getImageData(x, y, 1, 1).data;
                if (isColored(data)) {
                    let color = randColor();
                    let p = new Point({x, y, radius: 4, color, ctx});
                    p.setTarget({left: Math.random() * 400 - 200, top: Math.random() * 300 - 200});
                    Point.points.push(p);
                }
            }
        }
    }

    static setOrigin() {
        Point.points.forEach(item => {
            item.sourceX = item.x;
            item.sourceY = item.y;
            item.distX = item.originX - item.sourceX;
            item.distY = item.originY - item.sourceY;
        })
    }

    static draw() {
        Point.points.forEach((item) => {

            item.draw();

        })
    }

    static animation() {
        let {width, height, ctx, points, duration} = Point;
        return new Promise(function (resolve) {
            function animation(t) {
                ctx.clearRect(0, 0, width, height);
                points.forEach((item) => {
                    item.draw();
                    item.move(t, duration);
                })
                if (t > duration||Point.isFinished) {
                    resolve();
                    return;
                }

                setTimeout(() => {
                    requestAnimationFrame(() => {
                        animation(++t);
                    })
                }, 1000 / 60);
            }

            animation(0);
        })
    }

    static animationGroup() {
        if(Point.isFinished){
            return
        }
        Point.points.forEach(i => i.reset());
        Point.animation().then(() => {
            //回去
            Point.setOrigin();
        }).then(() => {

            return Point.animation();

        }).then(Point.animationGroup);
    }

    setTarget({x, y, left, top}) {
        left = left || 0;
        top = top || 0;
        x = x || this.x;
        y = y || this.y;
        this.targetX = x + left;
        this.targetY = y + top;
        this.distX = this.targetX - this.originX;
        this.distY = this.targetY - this.originY;
        return this;
    }

    move(t, duration) {
        if (t <= duration) {
            this.x = tween['Elastic']['easeOut'](t, this.sourceX, this.distX, duration);
            this.y = tween['Elastic']['easeOut'](t, this.sourceY, this.distY, duration);
        } else {

        }
    }

    reset() {
        this.x = this.originX;
        this.y = this.originY;
        this.sourceX = this.originX;
        this.sourceY = this.originY
    }

    draw() {

        let {ctx, x, y, radius, color} = this;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 360);
        ctx.fillStyle = color;
        ctx.closePath();
        ctx.fill();
    }
}


class TextAnimation extends Component {
    componentDidMount() {
        let canvas = this.refs['canvas'];
        let ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'lighten';
        let rem = window.rem;
        let width = 28 * rem;
        let height = 5 * rem;

        Point.init(width, height, ctx);
        drawTxt(ctx)({
            textBaseLine: 'top',
            width: width * 0.9,
            content: "试一下都有些什么",
            font: "64px serif",
            position: {x: width / 2, y: height / 2},
            mode: 'fill'
        })
        Point.getPixel(0, 0, width, height, 2, ctx);
        Point.animationGroup();
      console.log('触发');

    }
componentWillUnmount() {
        //window.clearTimeout(Point.t);
     Point.isFinished=true;
}

    render() {
        let rem = window.rem;
        let width = 25 * rem;
        let height = 5 * rem;
        return (<canvas  width={width} height={height} style={{width: width, height: height}} ref={'canvas'}>

        </canvas>)
    }
}

export default TextAnimation;