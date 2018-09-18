var globalTime = new Date();
var times = new RegExp("daytime|afternoon|dawn|night");
const moonDarkPath = 'assets/images/svg/030-moon-1.svg';
const moonLightPath = 'assets/images/svg/030-moon-2.svg';
const sunPath = 'assets/images/svg/011-sun-1.svg';
var moon = false;

setInterval (updateTime(), 1000 * 60 * 15);

function updateTime() {
    globalTime = new Date();
    setBackground();
    sunOrMoon();
    setGrassColor();
}

function minute() {
    return globalTime.getHours() * 60 + globalTime.getMinutes();
}

function setBackground() {
    // 4.30 [270] -> 5.50 [350] : dawn
    // 5.50 [350] -> 16.40 [1000] : daytime
    // 16.40 [1000] -> 18.30 [1110] : afternoon
    // 18.30 [1110] -> 4.30 [270] : night
    let out = document.querySelector('.fullscreen');
    let _class = out.getAttribute('class');
    if (minute() >= 270 && minute() < 350) {
        return out.setAttribute("class", _class.replace(times, 'dawn'));
    }
    if (minute() >= 350 && minute() < 1000) {
        return out.setAttribute("class", _class.replace(times, 'daytime'));
    }
    if (minute() >= 1000 && minute() < 1110) {
        return out.setAttribute("class", _class.replace(times, 'afternoon'));
    }
    if (minute() >= 1110 || minute() < 270) {
        return out.setAttribute("class", _class.replace(times, 'night'));
    }
}

function sunOrMoon() {
    if (minute() <= 6 * 60 || minute() >= 1000) { // 18h
        // change to moon
        if (!moon) {
            document.querySelector('#sun-moon').setAttribute('src', moonLightPath);
            moon = true; return;
        }
    }
    if (moon) {
        document.querySelector('#sun-moon').setAttribute('src', sunPath);
        moon = false;
    }
}

function setGrassColor() {
    
}