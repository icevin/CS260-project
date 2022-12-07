function getRandomNum(){
    return (Math.floor(Math.random() * 34)) // Random num 0 to 33
    // last 5 images are real ads
}

function getRandomPicture() {
    var fs = require('fs');
    var files = fs.readdirSync('img/photo');
    print(files)
å
}

function left(){
    
    // document.getElementById('rightImage').src="img/Photo" + getRandomNum() + ".png";
    var image = document.getElementById('leftImage').src.split("/");
    // don't want the same image as the right Image
    image = image[image.length - 1]
    var tempImage = "Photo" + getRandomNum() + ".png";
    // console.log("Image: ", image);
    // console.log("tempImage", tempImage);
    if (image == tempImage){
        // alert(image);
        
        tempImage = "Photo" + getRandomNum() + ".png";
    }
    
    document.getElementById('rightImage').src="img/" + tempImage;
}

function right(){
    var image = document.getElementById('rightImage').src.split("/");
    // don't want the same image as the left image
    image = image[image.length - 1]
    var tempImage = "Photo" + getRandomNum() + ".png";
    if (image == tempImage){
        // alert(image);
        tempImage = "Photo" + getRandomNum() + ".png";
    }
    
    document.getElementById('leftImage').src="img/" + tempImage;
    
}
