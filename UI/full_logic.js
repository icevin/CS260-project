let length = Object.keys(prompt).length
let seen = new Set()

var data = new Array(length + 1).fill(0);
// Photo#.png where # will be the "key" and the "value" will keep track how many times clicked

function getRandomNum(){
    let num = (Math.floor(Math.random() * length)) + 1; // Random num 1 to length
    while (seen.has(num)) {
        num = (Math.floor(Math.random() * length)) + 1;
    }
    seen.add(num);
    return num;
    // last 5 images are real ads
}

function left(){
    if (seen.size == length)
        return;
    
    document.title = "Vote! (" + (length - seen.size - 1) + " remaining!)";
    // Since left was clicked as the "better option", we will change the right image
    var image = document.getElementById('leftImage').src.split("/");
    // don't want the same image as the right Image
    image = image[image.length - 1]
    var tempImage = getRandomNum() + ".png";
    if (image == tempImage){
        tempImage = getRandomNum() + ".png";
    }
    // replace right image
    document.getElementById('rightImage').src="blind/" + tempImage;

    // increment the "better" left image
    var leftNum = image.replace('.png', '');
    data[leftNum] += 1; 
   
    // console.log(data);

    if(seen.size == length)
        done();
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
    if (seen.size == length)
        return;

    document.title = "Vote! (" + (length - seen.size - 1) + " remaining!)";
    var image = document.getElementById('rightImage').src.split("/");
    // don't want the same image as the left image
    image = image[image.length - 1];
    var tempImage =  getRandomNum() + ".png";
    if (image == tempImage){
        // alert(image);
        tempImage = getRandomNum() + ".png";
    }
    document.getElementById('leftImage').src="blind/" + tempImage;

     // increment the "better" left image
    var rightNum = image.replace('.png', '');
    data[rightNum] += 1; 
    // console.log(data);

    if(seen.size == length)
        done();

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

function done() {
    document.title = "Voting done!";
    const max = Math.max(...data);
    const index = data.indexOf(max);
    const full_prompt = prompt[index];
    console.log(full_prompt);
    var results_text = document.getElementById('results-message');
    results_text.innerHTML = "Winning Prompt: " + full_prompt + " with " + max + " wins.";

    var results_image = document.getElementById('results-image');
    results_image.src = "blind/" + index + ".png";


    let newdata = {}
    for (const idx in data) {
        if (idx == 0) continue;
        newdata[prompt[idx]] = data[idx];
    }
    var tbody = document.getElementById('results-data');
    tbody.innerHTML = "<br><br>Debug data: <br><br>" + JSON.stringify(newdata);

    var hidden = document.querySelectorAll(".hidden");
    for (var i = 0; i < hidden.length; i++) {
        hidden[i].classList.remove("hidden");
    }

    var a = document.querySelectorAll(".a");
    for (var i = 0; i < a.length; i++) {
        a[i].classList.add("hidden");
    }
}