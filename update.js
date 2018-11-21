var globalTime = new Date();
var times = new RegExp("daytime|afternoon|dawn|night");
const moonDarkPath = 'assets/images/svg/030-moon-1.svg';
const moonLightPath = 'assets/images/svg/030-moon-2.svg';
const grassDarkPath = "./assets/images/svg/NOVAglow/grass-night.svg"
const grassLightPath = "./assets/images/svg/NOVAglow/grass-day.svg"
const sunPath = 'assets/images/svg/012-sun.svg';

var time = [270, 360, 540, 660, 720, 840, 920, 955, 990, 1035, 1185, 1310, 1340, 1430, 40, 95, 170, 210]
var levels = [0, 1, 2, 3, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 3, 2, 1, 0]

var top_distance = ['65%', '20%', '35%', '50%', '10%'];
    // distance to top, used in setPlanetHeight()
var moon = false;

function in_range (arg, first, last){
    if (first <= last)
        return (first <= arg && arg < last);
    else
        return (first <= arg || arg < last);
}

updateTime();
setInterval (updateTime(), 1000 * 60 * 15);

function updateTime() {
    globalTime = new Date();
    setBackground();
    sunOrMoon(360, 1000);
    setGrassColor(60 * 6, 60 * 17 + 30);
    setHeight();
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
    // if (minute() >= 270 && minute() < 350) {
    if (in_range(minute(), 270, 350)) {
        return out.setAttribute("class", _class.replace(times, 'dawn'));
    }
    if (in_range(minute(), 350, 1000)) {
        return out.setAttribute("class", _class.replace(times, 'daytime'));
    }
    if (in_range(minute(), 1000, 1110)) {
        return out.setAttribute("class", _class.replace(times, 'afternoon'));
    }
    if (in_range(minute(), 1110, 270)) {
        return out.setAttribute("class", _class.replace(times, 'night'));
    }
}

function sunOrMoon(day, night) {
    if (minute() <= day || minute() >= night) {
        // change to moon
        document.querySelector('#sun-moon').setAttribute('src', moonLightPath);
        moon = true; return;
    }
    else {
        document.querySelector('#sun-moon').setAttribute('src', sunPath);
        moon = false;
    }
}

function setPlanetHeight(arg) {
    document.querySelector("#sun-moon").style.top = arg
}

function setHeight() {
    let current = minute();

}

function setGrassColor(day, night) {
    if (minute() <= day || minute() >= night) {
        // change to night
        document.querySelector('.grass').style.backgroundImage = "url(\'" + grassDarkPath + "\')";
        return;
    }
        document.querySelector('.grass').style.backgroundImage = "url(\'" + grassLightPath + "\')";
}

function find_prev_bound_rounded(arg, array) {
    for (let index = 0 ; index < array.length - 1; index++) {
        if (array[index] >= arg && array[index + 1] < arg) return index;
    };
    if (array[index.length - 1] <= arg && arg < array[0]) return array.length - 1;
    else return undefined;
}