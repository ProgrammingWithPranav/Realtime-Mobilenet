
previous_answer = "";

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded)
}

function modelLoaded() {
  console.log("Model");
}

function draw() {
  image(video, 0, 0, 300, 300)
  classifier.classify(video, getResult);
}

function getResult(error, results) {
  if(error) {
    console.log(error);
  }
  else {
    if((results[0].confidence > 0.5) && (results[0].label != previous_answer)) {
      previous_answer = results[0].label;
      console.log(results)
      document.getElementById("obj").innerHTML = results[0].label;
      document.getElementById("acc").innerHTML = results[0].confidence.toFixed(2);
      var synth = window.speechSynthesis;
      var sayThis = new SpeechSynthesisUtterance("The object is " + results[0].label)
      synth.speak(sayThis)
    }
  }
}



