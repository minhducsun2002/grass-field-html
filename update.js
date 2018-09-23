var globalTime = new Date();
var times = new RegExp("daytime|afternoon|dawn|night");
const moonDarkPath = 'assets/images/svg/030-moon-1.svg';
const moonLightPath = 'assets/images/svg/030-moon-2.svg';
const sunPath = 'assets/images/svg/011-sun-1.svg';
var top_distance = ['65%', '20%', '35%', '50%', '10%'];
    // distance to top, used in setPlanetHeight()
var moon = false;

function in_range (arg, first, last){
    if (first <= last)
        return (first <= arg && arg < last);
    else 
        return (first <= arg || arg < last);
}

setInterval (updateTime(), 1000 * 60 * 15);

function updateTime() {
    globalTime = new Date();
    setBackground();
    sunOrMoon();
    setGrassColor();
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

function setPlanetHeight(arg) {
    document.querySelector("#sun-moon").style.top = arg
}

function setHeight() {
    // levels :  top = 10% - 20% - 35% - 50% - 65%
    //  day : 
    //      - 04.30 = 0270 : sun at 0
    //      - 06.00 = 0360 : sun at 1
    //      - 09.00 = 0540 : sun at 2
    //      - 11.00 = 0660 : sun at 3
    //      - 12.00 = 0720 : sun at 4
    //      - 14.00 = 0840 : sun at 3
    //      - 15.20 = 0920 : sun at 2
    //      - 15.55 = 0955 : sun at 1
    //      - 16.30 = 0990 : sun at 0
    if (in_range(minute(), 270, 360) || in_range(minute(), 990, 1035))
        setPlanetHeight(top_distance[0]);
    if (in_range(minute(), 360, 540) || in_range(minute(), 1035, 1185))
        setPlanetHeight(top_distance[1]);
    if (in_range(minute(), 540, 660) || in_range(minute(), 1185, 1310))
        setPlanetHeight(top_distance[2]);
    if (in_range(minute(), 660, 720) || in_range(minute(), 1310, 1340))
        setPlanetHeight(top_distance[3]);
    if (in_range(minute(), 720, 840) || in_range(minute(), 1340, 1430))
        setPlanetHeight(top_distance[4]);
    if (in_range(minute(), 840, 920) || in_range(minute(), 1430, 40))
        setPlanetHeight(top_distance[3]);
    if (in_range(minute(), 920, 955) || in_range(minute(), 40, 95))
        setPlanetHeight(top_distance[2]);
    if (in_range(minute(), 955, 990) || in_range(minute(), 95, 170))
        setPlanetHeight(top_distance[1]);
    if (in_range(minute(), 170, 270))
        setPlanetHeight(top_distance[0]);
    //  night : 
    //      - 17.15 = 1035 : moon at 0
    //      - 19.45 = 1185 : moon at 1
    //      - 21.50 = 1310 : moon at 2
    //      - 22.20 = 1340 : moon at 3
    //      - 23.50 = 1430 : moon at 4
    //      - 00.40 = 0040 : moon at 3
    //      - 01.35 = 0095 : moon at 2
    //      - 02.50 = 0170 : moon at 1
    //      - 03.30 = 0210 : moon at 0
}

function setGrassColor() {
    
}