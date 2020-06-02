
class Drawable {
    x;
    y;
    center;
    src;
    ctx;
    padding; // This is in case the mouse pointer runs out of bounds, a bit extra will help catch
    constructor(ctx, x, y, src, x1, y1) {
        this.padding = 100;
        this.center = [(x+x1)/2,(y+y1)/2];
        Object.assign(this, {ctx, x, y, src, x1, y1});
    }
    draw(ctx){}
    isWithin(x, y, dy, dx) {
        let padding = (dy > 20 || dx > 20) ? this.padding : 0
        return (x < this.x1+padding) && (x > this.x-padding) 
        && (y < this.y1+padding) && (y > this.y-padding);
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
        this.x1 += dx;
        this.y1 += dy;
    }
}

class Rectangle extends Drawable {
    w;
    h;
    constructor(ctx, x, y, w, h) {
        super(ctx, x, y, null, x+w, y+h);
        Object.assign(this, {w, h});
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.font = '25px Arial';
        ctx.fillText(Date.now(), this.x, this.y, 100);
        ctx.stroke();
    }
}

class DraggableCanvas extends HTMLElement {
    static fps = 60;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML += `<canvas width="100" height="100"></canvas>`;
        this.canvas = this.shadowRoot.lastChild;
        this.canvas.width = this.getAttribute("width");
        this.canvas.height = this.getAttribute("height");
        this.canvas.onmousemove = (event)=> {
            if (event.button ^ event.buttons) {
                this.handleDragEvent(event);
            }
        }
        this.canvas.onmouseup = (event) => {
            this.lastx = this.lasty = -1;
        }
        this.items = [new Drawable()];
        console.log(this.items);
        this.loop();
        setInterval(()=>this.loop(), 1000/DraggableCanvas.fps);
        this.lastx = this.lasty = -1;
    }
    getCtx() {
        return this.canvas.getContext('2d');
    }
    loop() {
        this.getCtx().clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.items.forEach((drawable)=> {
            // this.getCtx().font = "30px Arial";
            // this.getCtx().fillText(Date.now(), 10, 50);
            drawable.draw(this.getCtx());
        });
    }
    addDrawable(drawable) {
        this.items.push(drawable);
    }
    handleDragEvent(event) {
        let x, y, dx, dy;
        ({x, y} = {x: event.offsetX, y: event.offsetY});
        [dx, dy] = [x-this.lastx, y-this.lasty];
        if (this.lastx == -1) {
            dx = dy = 0;
        }
        let hover = this.items.filter((e)=>e.isWithin(x, y, dy, dx))[0];
        if (hover) {
            console.log(hover);
            console.log(x, y, `diff: ${dx}, ${dy}`);
            hover.move(dx, dy);
            this.lastx = x;
            this.lasty = y;
        }
    }
}

customElements.define("drag-canvas", DraggableCanvas);

