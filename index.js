// alert('')
//first we want to make a function to load the images cause we have 382 images which takes a loat of time so we will make a fun and uplad the imgs
// cause it should be loaded so over scrll img run smoothly

//padstart is used to add padding in start or end here we are using it cause over images make have 4 digits like 0001 
//console log it "12".tostring().padStart(5,"0")
// here(5,"0 ") means add we have total 5 numbers and 0 mean add 0 before the 12 which mean it will add 3 zeros cause over total number is 5 so ans is '00012'
const canvas = document.querySelector("canvas");
//what ever we want to draw in canvas context will draw it what ever we do we will use context 
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,
    maxIndex: 538
};


//  a tracker function to track imgs
let imagesLoaded = 0;
const images = [];

function preloadImages() {


    for (var i = 0; i <= frames.maxIndex; i++) {
        //img route
        const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`
        // console.log(imageUrl)

        //make a blank img tag
        const img = new Image();
        // console.log(img)
        img.src = imageUrl;
        // console.log(img)
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === frames.maxIndex) {
                // console.log("all loaded")
                //after all imgs are loaded we want to send or render the 1img so

                loadImage(frame.currentIndex);
                startAnimation();
            }
        }
        //to send all img in images
        images.push(img);
    }
}

function loadImage(index) {
    if (index >= 1 && index <= frames.maxIndex) {
        const img = images[index];
        // console.log(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        //aspect resio some time img is large else windows.innerheight is large so we will
        //make a ratio of both and set the canvas height and width
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        //for responsive part
         
        //here we will talk the largeer one 
        const scale = Math.max(scaleX, scaleY);

        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        //by doing this the image will come in center
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2

        context.clearRect(0, 0, canvas.width, canvas.height)
        context.imageSmoothingQuality = "high";
        context.imageSmoothingEnabled = true;

        //now we will draw the image in canvas
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        frames.currentIndex = index



    }

}


function startAnimation() {
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".parent",
            start: "top top",
            scrub: 2,
            end: "bottom bottom",
            // markers: true
        }
    })

    function updateFrame(index){
   return{
            currentIndex: index,
            ease: 'linear',
            onUpdate: function () {
                loadImage(Math.floor(frames.currentIndex))
            }
        }
    }
    tl
    .to(frames,updateFrame(50), "first" )
    .to('.animate1', {opacity: 0, ease: "linear"}, "first")

    .to(frames,updateFrame(80), "second")
    .to('.animate2', {opacity: 1, ease: "linear"}, "second")

    .to(frames,updateFrame(110), "third")
    .to('.animate2', {opacity: 1, ease: "linear"}, "third")

    .to(frames,updateFrame(140), "forth")
    .to('.animate2', {opacity: 0, ease: "linear"}, "forth")

    .to(frames,updateFrame(170), "fifth")
    .to('.animate3', {opacity: 1, ease: "linear"}, "fifth")

    .to(frames,updateFrame(200), "sixth")
    .to('.animate3', {opacity: 1, ease: "linear"}, "sixth")

    .to(frames,updateFrame(230), "seven")
    .to('.animate3', {opacity: 0, ease: "linear"}, "seven")

    .to(frames,updateFrame(260), "eight")
    .to('.panel', {x: "0%", ease: "expo"}, "eight")

    .to(frames,updateFrame(290), "nineth")
    .to('.panel', {x: "0%", ease: "expo"}, "nineth")

    .to(frames,updateFrame(320), "tenth")
    .to('.panel', {opacity: 0, ease: "linear"}, "tenth")

    .to(frames,updateFrame(350), "eleventh")
    .to('canvas', {scale: .5, ease: "linear"}, "eleventh")

    .to(frames,updateFrame(380), "tweleveth")
    .to('.panelism', {opacity: 1, ease: "expo"}, "tweleveth")

    .to(frames,updateFrame(410), "tweleveth")
    .to('.panelism .span', {width: 200, ease: "expo"}, "tweleveth")

    .to(frames,updateFrame(440), "thirteen")
    .to('canvas', {scale: 1, ease: "linear"}, "thirteen")

    .to(frames,updateFrame(480), "fourteen")
    .to('.panelism', {scale: 2, ease: "circ"}, "fourteen")
 
    .to(frames,updateFrame(537), "fifteen")
    .to('.panelism', {scale: 2, ease: "circ"}, "fifteen")
}
window.addEventListener('resize', function(){
    loadImage(Math.floor(this.frames.currentIndex))
}  )
preloadImages();
