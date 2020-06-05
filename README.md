# Draggable JS
## Easy to use canvas with drag-able elements written in pure JS.

![](https://github.com/classAndrew/Draggable/blob/master/sample.gif)
## Example

>HTML
```html
<drag-canvas id="drag" width="2000" height="2000"> </drag-canvas>
```
>JS

```js
// Create your own class from the abstract class

class ImageDrawable extends Drawable {
    constructor(ctx, x, y, htmlsrc) {
        super(ctx, x, y, x + 128, y + 128);
        Object.assign(this, {x, y, htmlsrc});
    }
    draw(ctx) {
        ctx.drawImage(this.htmlsrc, this.x, this.y);
    }
}

// Add your objects once the window loads

window.onload = () => {
    let test = document.querySelector("#drag");
    test.addDrawable(new Rectangle(test.getCtx(), 450, 24, 100, 100));
    test.addDrawable(new Rectangle(test.getCtx(), 0, 20, 300, 100));
    let image = document.createElement("img");
    image.src = "yourimgurl";
    test.addDrawable(new ImageDrawable(test.getCtx(), 75, 450, image));
}

```
