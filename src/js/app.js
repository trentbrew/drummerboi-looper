//- - - - - - - - - - main - - - - - - - - - -

window.onload = function() {
    playing = [];
    playing_DOM = [];
    pending = [];
    first = true;

    const pads_DOM = document.querySelectorAll(".pads div");
    const optionsUI = document.getElementById("options");

    const Drummerboi = new App(optionsUI);

    Drummerboi.buildSoundpacks(pads_DOM);
    Drummerboi.displaySoundpacks();

    const Timer1 = new Timer(pending, playing);
    
    //Timer1.startTimer();

    currentSoundpack = Drummerboi.soundpacks[0];
    
    //-----event handlers-----

    pads_DOM.forEach((pad, index) => {
        pad.onclick = function() {
            //console.log("first try?: " + first);
            if(first) {
                for(let i = 0; i < pad.children.length; i++) {
                    pad.children[i].style.opacity = 0.25;
                }
                console.log(pad.children);
                currentSoundpack.pads[index].playSound();
                pending.push(currentSoundpack.pads[index]);
                playing.push(currentSoundpack.pads[index]);
                playing_DOM.push(pad);
                Timer1.startTimer(pads_DOM);
                first = false;
            }
            else {
                pending.push(currentSoundpack.pads[index]);
                playing.push(currentSoundpack.pads[index]);
                playing_DOM.push(pad);
                pad.classList.add("waiting");
            }
            //console.log("pending: " + pending);
        }
    });
}

//- - - - - - - - - - app - - - - - - - - - -

class App {
    constructor(optionsUI) {
        this.optionsUI = optionsUI;
    }

    soundpacks = [];

    buildSoundpacks() {
        this.soundpacks.push(
            new Soundpack(
                "Drums",
                [
                    new Pad('sounds/splice/drums/drums1.wav', "red", false),
                    new Pad('sounds/splice/drums/drums2.wav', "orange", true),
                    new Pad('sounds/splice/drums/drums3.wav', "yellow", true),
                    new Pad('sounds/splice/drums/drums4.wav', "green", true),
                    new Pad('sounds/splice/drums/drums5.wav', "blue", true),
                    new Pad('sounds/splice/drums/drums6.wav', "violet", true)
                ]
            ),
            new Soundpack(
                "Bass",
                [
                    new Pad('sounds/splice/drums/drums1.wav', "violet", true),
                    new Pad('sounds/splice/drums/drums2.wav', "blue", true),
                    new Pad('sounds/splice/drums/drums3.wav', "green", true),
                    new Pad('sounds/splice/drums/drums4.wav', "yellow", true),
                    new Pad('sounds/splice/drums/drums5.wav', "orange", true),
                    new Pad('sounds/splice/drums/drums6.wav', "red", true)
                ]
            ),
            new Soundpack(
                "Guitar",
                [
                    new Pad('sounds/splice/drums/drums1.wav', "brown", true),
                    new Pad('sounds/splice/drums/drums2.wav', "gray", true),
                    new Pad('sounds/splice/drums/drums3.wav', "black", true),
                    new Pad('sounds/splice/drums/drums4.wav', "lightblue", true),
                    new Pad('sounds/splice/drums/drums5.wav', "yellow", true),
                    new Pad('sounds/splice/drums/drums6.wav', "green", true)
                ]
            ),
        );
    }

    displaySoundpacks() {
        for(let i = 0; i < this.soundpacks.length; i++) {
            const li = document.createElement("li");
            li.innerHTML = this.soundpacks[i].name;
            this.optionsUI.appendChild(li);
        }
    }

    getSoundpacks() {
        return soundpacks;
    }

    selectSoundpack() {

    }
    
}

//- - - - - - - - - - soundpack - - - - - - - - - -

class Soundpack {
    constructor(name, pads) {
        this.name = name;
        this.pads = pads;
    }

    displayPads() {

    }
}
  
//- - - - - - - - - - pad - - - - - - - - - -

class Pad {
    constructor(sound, color, loopable) {
        this.sound = sound;
        this.color = color;
        this.loopable = loopable;
    }

    isPlaying = true;
    volume = 1;
    visualOn = false;
    equalizer = $('.equalizer');
    bars = $('pads p');
    audio = new Audio();

    playSound() {
        this.audio.src = this.sound;
        this.audio.play();
    }

    stopSound() {
        this.audio.stop();
    }

    playVisual() {
        this.visualOn = true;
    }

    stopVisual() {
        this.visualOn = false;
    }

    setVolume() {
        
    }
}

//- - - - - - - - - - timer - - - - - - - - - -

class Timer {
    constructor(playing, pending) {
        this.playing = playing;
        this.pending = pending;
    }

    startTimer(pads_DOM) {
        var _this = this;
        this.displayTimer();
        setTimeout(function() {
            for(let i = 0; i < playing.length; i++) {
              playing[i].playSound();
              console.log("dump pending");
            }
            pads_DOM.forEach((pad, index) => {
                pads_DOM[index].classList.remove("waiting");
            });
            playing_DOM.forEach((pad, index) => {
                for(let i = 0; i < pad.children.length; i++) {
                    console.log(pad.children[i]);
                    pad.children[i].style.opacity = 0.25;
                }
            });
            pending = [];
            _this.startTimer(pads_DOM);
          }, 12000);
    }

    stopTimer() {
        var timer_DOM = document.getElementById("timer");
        timer_DOM.classList.remove("timer-active");
    }

    displayTimer() {
        var timer_DOM = document.getElementById("timer");
        timer_DOM.classList.add("timer-active");
    }
}

//- - - - - - - - - - custom - - - - - - - - - -