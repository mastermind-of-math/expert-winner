function snap(){
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML = '<img id="captured_img" src="' + data_uri + '"/>';
    });
};

function modelLoaded(){
    console.log("model loaded")
}

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
Webcam.attach('#camera');

console.log('ml5 version: ', ml5.version);
var camera = document.getElementById('camera');
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/uQyLDK0b-/model.json', modelLoaded);
var pguess1 = null;
var pguess2 = null;

function iden(){
    var image = document.getElementById('captured_img');
    classifier.classify(image, gotResult);
}

function gotResult(error, results){
    if (error){
        window.alert(error);
    } else {
        console.log(results);
        pguess1 = results[0].label;
        pguess2 = results[1].label;
        document.getElementById("pre1").innerText = pguess1;
        document.getElementById("pre2").innerText = pguess2;
        speak()
        if(pguess1 == "thumbsup"){
            document.getElementById('pree1').innerHTML = "👍";
        } else if(pguess1 == "thumbsdown"){
            document.getElementById('pree1').innerHTML = "👎";
        } else if(pguess1 == "handfront"){
            document.getElementById('pree1').innerHTML = "✋";
        }
        if(pguess2 == "thumbsup"){
            document.getElementById('pree2').innerHTML = "👍";
        } else if(pguess2 == "thumbsdown"){
            document.getElementById('pree2').innerHTML = "👎";
        } else if(pguess2 == "handfront"){
            document.getElementById('pree2').innerHTML = "✋";
        }
    }
}
