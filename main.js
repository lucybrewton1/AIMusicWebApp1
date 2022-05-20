song = "";
song2 = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
leftWristScore = 0;
song1Status = "";
function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600,500);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotResults);
}
function modelLoaded() {
    console.log("model is loaded");
}
function gotResults(results) {
    if (results.length>0) {
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristX+" Right Wrist Y = "+rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        leftWristScore = results[0].pose.keypoints[0].score;
        console.log("Left Wrist X = "+leftWristX+" Left Wrist Y = "+leftWristY);
    }
}
function draw() {
    image(video, 0, 0, 600, 500);
    canvas.position(570,280);
    fill("#000080");
    stroke("#000080");
    song1Status=song.isPlaying();
    if (leftWristScore>0.2) {
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1Status==false) {
            song.play();
            document.getElementById("song-name").innerHTML="Song Name: Harry Potter Song";
            console.log("song1 is playing");
        }
    }
}