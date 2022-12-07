var data = new Array(34).fill(0);
// Photo#.png where # will be the "key" and the "value" will keep track how many times clicked

function getRandomNum(){
    return (Math.floor(Math.random() * 34)) // Random num 0 to 33
    // last 5 images are real ads
}



function left(){
    // Since left was clicked as the "better option", we will change the right image
    var image = document.getElementById('leftImage').src.split("/");
    // don't want the same image as the right Image
    image = image[image.length - 1]
    var tempImage = "Photo" + getRandomNum() + ".png";
    if (image == tempImage){
        tempImage = "Photo" + getRandomNum + ".png";
    }
    // replace right image
    document.getElementById('rightImage').src="img/" + tempImage;

    // increment the "better" left image
    var leftNum = image.replace('Photo', '');
    leftNum = leftNum.replace('.png', '');
    data[leftNum] += 1; 
   
    console.log(data);

    // $.ajax({
    //     type: "POST",
    //     url: serverUrl, // used to send to our serverurl
    //     data: JSON.stringify(data),
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     error: function() {
    //       alert("Error");
    //     },
    //     success: function() {
    //       alert("OK");
    //     }
    //   });
}

function right(){
    var image = document.getElementById('rightImage').src.split("/");
    // don't want the same image as the left image
    image = image[image.length - 1];
    var tempImage = "Photo" + getRandomNum() + ".png";
    if (image == tempImage){
        // alert(image);
        tempImage = "Photo" + getRandomNum() + ".png";
    }
    document.getElementById('leftImage').src="img/" + tempImage;

     // increment the "better" left image
    var rightNum = image.replace('Photo', '');
    rightNum = rightNum.replace('.png', '');
    data[rightNum] += 1; 
    console.log(data);

    // $.ajax({
    //     type: "POST",
    //     url: serverUrl, // used to send to our serverurl
    //     data: JSON.stringify(data),
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     error: function() {
    //       alert("Error");
    //     },
    //     success: function() {
    //       alert("OK");
    //     }
    //   });
}

