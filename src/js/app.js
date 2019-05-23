//- - - - - - - - - - main method - - - - - - - - - -

window.onload = function() {
    const pads_DOM = document.querySelectorAll(".pads div");

    const Drummerboi = new App();

    Drummerboi.buildSoundpacks(pads_DOM);
    Drummerboi.displaySoundpacks();

    currentSoundpack = Drummerboi.soundpacks[0];
    playing = [];

    console.log(currentSoundpack);
    
    //----------event listeners----------

    pads_DOM[0].onclick = function() {
        currentSoundpack.pads[0].playSound();
        playing.push(currentSoundpack.pads[0]);
        console.log(playing);
    }
    pads_DOM[1].onclick = function() {
        currentSoundpack.pads[1].playSound();
        playing.push(currentSoundpack.pads[1]);
        console.log(playing);
    }
    pads_DOM[2].onclick = function() {
        currentSoundpack.pads[2].playSound();
        playing.push(currentSoundpack.pads[2]);
        console.log(playing);
    }
    pads_DOM[3].onclick = function() {
        currentSoundpack.pads[3].playSound();
        playing.push(currentSoundpack.pads[3]);
        console.log(playing);
    }
    pads_DOM[4].onclick = function() {
        currentSoundpack.pads[4].playSound();
        playing.push(currentSoundpack.pads[4]);
        console.log(playing);
    }
    pads_DOM[5].onclick = function() {
        currentSoundpack.pads[5].playSound();
        playing.push(currentSoundpack.pads[5]);
        console.log(playing);
    }
}

//- - - - - - - - - - app - - - - - - - - - -

class App {
    optionsUI = document.getElementById("options");
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
    isPlaying = true;
    volume = 1;
    visualOn = false;
    equalizer = $('.equalizer');
    bars = $('music-bars');

    constructor(sound, color, loopable) {
        this.sound = sound;
        this.color = color;
        this.loopable = loopable;
    }

    playSound() {
        var sound = new Audio(this.sound);
        if(this.loopable) {
            sound.loop = true;
        }
        else {
            sound.loop = false;
        }

        sound.play();
        
        //console.log("is playing");
        //console.log(this.loopable);

        setTimeout(function() {
            if(this.loopable) {
                this.isPlaying = true;
            }
            else {
                this.isPlaying = false;
            }
        }, 12000);

        console.log(this.isPlaying);
    }

    stopSound() {

    }

    runVisual() {
        //var t1 = new TimelineMax({onUpdate:updateUI, repeat:-1})
	    window.setInterval(function() {
		    $(this.bars).each(function() {
			    TweenMax.to(this, 0.2, {height: Math.floor(Math.random()*121) + 30, ease:Power0.easeNone, yoyo: true});
		    });
	    }, 200);
    }

    playVisual() {
        this.equalizer.css({
            'dispaly': 'grid'
        });
        this.visualOn = true;
    }

    stopVisual() {
        this.equalizer.css({
            'display': 'none'
        });
        this.visualOn = false;
    }

    setVolume() {
        
    }
}

//- - - - - - - - - - timer - - - - - - - - - -

class Timer extends App {
    constructor(duration) {
        this.duration = duration;
    }

    startTimer() {

    }

    stopTimer() {

    }
}

//- - - - - - - - - - custom - - - - - - - - - -