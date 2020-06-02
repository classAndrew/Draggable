// NOT PART OF THE LIB
window.onload = () => {
    let test = document.querySelector("#drag");
    test.addDrawable(new Rectangle(test.getCtx(), 0, 0, 100, 100));
    test.addDrawable(new Rectangle(test.getCtx(), 0, 0, 300, 100));
    //test.addDrawable(new Rectangle(test.getCtx(), 0, 0, 200, 100));
}
