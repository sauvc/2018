(function(){
  window.addEventListener('load', function(){

    // Constants
    const MAX_GAIN = 0.5;
    const FADE_TIME = 2;

    var hero = document.getElementById('hero');

    // WebAudio Stuff
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var ac = new AudioContext();

    var gain = ac.createGain();
    var source = ac.createBufferSource();

    var fadingIn = false;
    var fadingOut = false;

    source.loop = true;
    gain.gain.value = 0.0;

    source.connect(gain);
    gain.connect(ac.destination);

    GetAudioFromURL('../bubbles.mp3', function (err, decodedBuf) {
      if (err) {
        console.error(err);
        return;
      }
      source.buffer = decodedBuf;
      source.start(0);
      gain.gain.setValueAtTime(0,ac.currentTime);
      if (isElementInViewport(hero)){
        fadeIn();
      }
    }, null, ac);

    function fadeIn(){
      if (!fadingIn){
        gain.gain.linearRampToValueAtTime(MAX_GAIN,ac.currentTime+FADE_TIME);
        fadingIn = true;
        fadingOut = false;
      }

    }

    function fadeOut(){
      if (!fadingOut){
        gain.gain.linearRampToValueAtTime(0,ac.currentTime+FADE_TIME);
        fadingOut = true;
        fadingIn = false;
      }
    }

    window.addEventListener('scroll', function() {
      if (isElementInViewport(hero)){
        fadeIn();
      }else{
        fadeOut();
      }
    })

    function isElementInViewport (el) {

      var rect = el.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        (rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)+100) &&
        (rect.right <= (window.innerWidth || document.documentElement.clientWidth)+100);
    }


    function GetAudioFromURL(URL, onLoadCallback, onProgressCallback, audioContext){
    if (!audioContext){
        window.AudioContext = window.AudioContext || window.webkitAudioContext
        audioContext = new AudioContext();
    }
    var request = new XMLHttpRequest();
    request.open('GET', URL, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        audioContext.decodeAudioData(request.response, function(buffer){
            if (typeof onLoadCallback === 'function')
                onLoadCallback(null, buffer);
        },function (){
            if (typeof onLoadCallback === 'function')
                onLoadCallback(new Error("Decoding Error"), null);
        });
    };
    request.onerror = function(){
        if (typeof onLoadCallback === 'function')
            onLoadCallback(new Error("Loading Error"), null);
    }
    request.onprogress = function(event){
        if (typeof onProgressCallback === 'function'){
            onProgressCallback(event);
        }
    }
    request.send();
}


  })
}())
