# Draggable JS
## Easy to use canvas with drag-able elements written in pure JS.

![](https://github.com/classAndrew/Draggable/blob/master/sample.gif)
## Example

>HTML
```html
<head> 
  <script src="https://raw.githubusercontent.com/classAndrew/Draggable/master/draggables.js">
  <script src="your_script.js">
</head>
<body>
  <drag-canvas id="drag" width="2000" height="2000"> </drag-canvas>
</body>
```
>JS

```js
// Create your own class from the abstract class

class ImageDrawable extends Drawable {
    constructor(x, y, htmlsrc) {
        super(x, y, x + 128, y + 128);
        Object.assign(this, {x, y, htmlsrc});
    }
    draw(ctx) {
        ctx.drawImage(this.htmlsrc, this.x, this.y);
    }
}

// Add your objects once the window loads

window.onload = () => {
    let test = document.querySelector("#drag");
    test.addDrawable(new Rectangle(450, 24, 100, 100));
    test.addDrawable(new Rectangle(0, 20, 300, 100));
    let image = document.createElement("img")
    image.src = "your_img_url.png"
    test.addDrawable(new ImageDrawable(75, 450, image));
}

```
