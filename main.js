song1 = "";
song2 = ""
scoreLeftWrist = 0
scoreRightWrist = 0
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song1 = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500)
    canvas.center()
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized')
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000")
    stroke("#FF0000")
    status1 = song1.isPlaying()
    status2 = song2.isPlaying()
    
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20)
       if(status1 ==false){
           song2.stop() 
           song1.play()
       }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20)
        
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results) {
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score
    scoreLeftWrist = results[0].pose.keypoints[9].score
    console.log("scoreLeftWrist = " + scoreLeftWrist)
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX=" + leftWristX + "leftWristY=" + leftWristY)
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX=" + rightWristX + "rightWristY=" + rightWristY)
}