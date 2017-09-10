(function(){
  window.addEventListener('load', function(){

    // Constants
    const MAX_GAIN = 0.5;
    const FADE_TIME = 2;

    var action = document.getElementById('action');
    var bubblesaudio = document.getElementById('bubbles-audio');

    // WebAudio Stuff
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var ac = new AudioContext();

    var gain = ac.createGain();
    var source = ac.createMediaElementSource(bubblesaudio);

    var fadingIn = false;
    var fadingOut = false;

    gain.gain.value = 0.0;

    source.connect(gain);
    gain.connect(ac.destination);
    bubblesaudio.play();

    if (isElementInViewport(action)){
      fadeIn();
    }

    window.addEventListener('scroll', function() {
      if (isElementInViewport(action)){
        fadeIn();
      }else{
        fadeOut();
      }
    })

    document.addEventListener("visibilitychange", function(){
      if (document.visibilityState == 'visible'){
        fadeIn();
      }else if (document.visibilityState == 'hidden' || document.visibilityState == 'unloaded' ){
        fadeOut();
      }
    });


    function fadeIn(){
      if (!fadingIn){
        console.log("fading in")
        gain.gain.linearRampToValueAtTime(MAX_GAIN,ac.currentTime+FADE_TIME);
        fadingIn = true;
        fadingOut = false;
      }
    }

    function fadeOut(){

      if (!fadingOut){
        console.log("fading out")
        gain.gain.linearRampToValueAtTime(0,ac.currentTime+FADE_TIME);
        fadingOut = true;
        fadingIn = false;
      }
    }

    function isElementInViewport (el) {

      var rect = el.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        (rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) &&
        (rect.right <= (window.innerWidth || document.documentElement.clientWidth)));
    }

  })
}())
