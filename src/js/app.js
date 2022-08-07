// ---------- main ----------

window.onload = function() {
    playing = [];
    playing_DOM = [];
    pending = [];
    first = true;
    timerDone = false;

    const pads_DOM = document.querySelectorAll(".pads div");
    const optionsUI = document.getElementById("options");

    const Drummerboi = new App(optionsUI);

    Drummerboi.buildSoundpacks(pads_DOM);
    Drummerboi.displaySoundpacks();

    const options_DOM = document.querySelectorAll("li");

    const Timer1 = new Timer(pending, playing);
    
    //Timer1.startTimer();

    currentSoundpack = Drummerboi.soundpacks[0];
    
    //-----event handlers-----

    //pad click
    pads_DOM.forEach((pad, index) => {
        pad.onclick = function() {
            if(first) {
                for(let i = 0; i < pad.children.length; i++) {
                    pad.children[i].style.opacity = 0.25;
                }
                //console.log(pad.children);
                currentSoundpack.pads[index].playSound();
                pending.push(currentSoundpack.pads[index]);
                playing.push(currentSoundpack.pads[index]);
                playing_DOM.push(pad);
                Timer1.startTimer(pads_DOM);
                first = false;
            }
            else {
                if(!(currentSoundpack.pads[index].isPlaying)) {
                    pending.push(currentSoundpack.pads[index]);
                    playing.push(currentSoundpack.pads[index]);
                    playing_DOM.push(pad);
                    pad.classList.add("waiting");
                    $("header p").html("Just a sec...");
                }
                else {
                    pad.classList.remove("waiting");
                    currentSoundpack.pads[index].stopSound();
                    //console.log(index);
                    playing.pop();
                    Timer1.equalizerOff(pad);
                }

                if(playing.length == 0) {
                    first = true;
                    Timer1.stopTimer();
                    //console.log('STOP TIMER');
                }
            }

            //console.log("playing: " + playing.length);
        }
    });

    for(let i = 0; i < options_DOM.length; i++) {
        if (i != 0) {
            options_DOM[i].style.fontSize = "16px";
            options_DOM[i].style.fontWeight = "normal";
            options_DOM[i].style.color = "#484848";   
        }
    }

    //soundpack selection
    options_DOM.forEach((option, index) => {
        option.onclick = function() {
            //console.log(options_DOM);
            //console.log("clicked " + option.innerHTML);
            for(let i = 0; i < options_DOM.length; i++) {
                options_DOM[i].style.fontSize = "16px";
                options_DOM[i].style.fontWeight = "normal";
                options_DOM[i].style.color = "#777777";
            }
            //change title styles
            // option.style.fontSize = 28;
            // option.style.fontWeight = "bolder";
            // option.style.color = currentSoundpack.pads[index].color;
            option.style.color = '#ffffff';


            //changing current soundpack
            //console.log(option.innerHTML);
            /*for(let i = 0; i < Drummerboi.soundpacks.length; i++) {

            }*/

            if(option.innerHTML == Drummerboi.soundpacks[index].name) {
                currentSoundpack = Drummerboi.soundpacks[index];
            }

            //change pad styles
            for(let i = 0; i < pads_DOM.length; i++) {
                console.log("changing pad " + i + " to " + currentSoundpack.pads[i].color);
                pads_DOM[i].style.background = currentSoundpack.pads[i].color;
            }

            pads_DOM.forEach((pad, index) => {
                Timer1.equalizerOff(pad);
            });

            //console.log("current soundpack: " + currentSoundpack.name);

            //Drummerboi.updateSoundpacks();
            //Drummerboi.displaySoundpacks();
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
                "DRUMS",
                [
                    new Pad('sounds/splice/drums/drums1.wav', "#79B473", true),
                    new Pad('sounds/splice/drums/drums2.wav', "#70A37F", true),
                    new Pad('sounds/splice/drums/drums3.wav', "#41658A", true),
                    new Pad('sounds/splice/drums/drums4.wav', "#414073", true),
                    new Pad('sounds/splice/drums/drums5.wav', "#4C3957", true),
                    new Pad('sounds/splice/drums/drums6.wav', "#5C4B66", true)
                ]
            ),
            new Soundpack(
                "BASS",
                [
                    new Pad('sounds/splice/bass/bass1.wav', "#000000", true),
                    new Pad('sounds/splice/bass/bass2.wav', "#0C1821", true),
                    new Pad('sounds/splice/bass/bass3.wav', "#1B2A41", true),
                    new Pad('sounds/splice/bass/bass4.wav', "#324A5F", true),
                    new Pad('sounds/splice/bass/bass5.wav', "#CCC9DC", true),
                    new Pad('sounds/splice/bass/bass6.wav', "#E8E6EF", true)
                ]
            ),
            new Soundpack(
                "GUITAR",
                [
                    new Pad('sounds/splice/guitar/guitar1.wav', "#650D1B", true),
                    new Pad('sounds/splice/guitar/guitar2.wav', "#823200", true),
                    new Pad('sounds/splice/guitar/guitar3.wav', "#9B3D12", true),
                    new Pad('sounds/splice/guitar/guitar4.wav', "#AE8E1C", true),
                    new Pad('sounds/splice/guitar/guitar5.wav', "#C1DF1F", true),
                    new Pad('sounds/splice/guitar/guitar7.wav', "#E7F2A6", true)
                ]
            ),
        );
    }

    updateSoundpacks() {
        options_DOM.children = [0];
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

    isPlaying = false;
    volume = 1;
    visualOn = false;
    equalizer = $('.equalizer');
    bars = $('pads p');
    audio = new Audio();

    playSound() {
        this.audio.src = this.sound;
        this.audio.play();
        this.isPlaying = true;
    }

    stopSound() {
        this.audio.pause();
        this.isPlaying = false;
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
        timerDone = false;
        this.displayTimer();
        setTimeout(function() {
            $("header p").html("Make music by tapping");
            for(let i = 0; i < playing.length; i++) {
              playing[i].playSound();
              console.log("dump pending");
            }
            pads_DOM.forEach((pad, index) => {
                pads_DOM[index].classList.remove("waiting");
            });
            console.log("timer done?: " + timerDone);
            if(timerDone) {
                return; 0
            }
            _this.equalizerOn();
            pending = [];
            _this.startTimer(pads_DOM);
          }, 12000);
    }

    equalizerOn() {
        playing_DOM.forEach((pad, index) => {
            for(let i = 0; i < pad.children.length; i++) {
                //console.log(pad.children[i]);
                pad.children[i].style.opacity = 0.25;
            }
        });
    }

    equalizerOff(pad) {
        for(let i = 0; i < pad.children.length; i++) {
            //console.log(pad.children[i]);
            pad.children[i].style.opacity = 0;
        }
    }

    stopTimer() {
        var timer_DOM = document.getElementById("timer");
        timer_DOM.classList.remove("timer-active");
        timerDone = true;
    }

    displayTimer() {
        var timer_DOM = document.getElementById("timer");
        timer_DOM.classList.add("timer-active");
    }
}

//- - - - - - - - - - custom - - - - - - - - - -