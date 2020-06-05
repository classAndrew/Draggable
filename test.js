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
    image.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/40/thinking-face_1f914.png"
    test.addDrawable(new ImageDrawable(75, 450, image));
}
