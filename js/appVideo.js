window.addEventListener ('DOMContentLoaded', () => {
    let mediaVideo = document.querySelector ('video');
    let playButton = document.querySelector ('.playbutton');
    let skipButton = document.querySelector ('.skipvideobutton');
    let restartButton = document.querySelector ('.restartvideobutton')
    let statusCounter = document.querySelector ('.statusbox');
    let targetBar = document.querySelector ('.targetbar');
    let auxBar = document.querySelector ('.auxbar');
    let volumeButton = document.querySelector ('.volumebutton');
    let volumeBar = document.querySelector ('.volumebar');
    let titleVideo = document.querySelector ('.videotitle');
    let fullScreen = document.querySelector ('.fullscreenbox');
    let currentVideo = 0;
    let videos = [
        "Mensaka - No necesito verte más.mp4", 
        "The Ramones - She s The One.mp4", 
        "Sex Pistols - God Save The Queen.mp4",
        "Expulsados - Lejos De Olvidar.mp4",
        "The Exploited - Fuck The USA.mp4",
        "Vice Squad - Stand Strong Stand Proud.mp4"
    ];
    let order = [];
    mediaVideo.src = `./video/${videos [currentVideo]}`;
    volumeBar.value = 0;
    playButton.addEventListener ('click', playSett);
    skipButton.addEventListener ('click', nextVideo);
    restartButton.addEventListener ('click', restart);
    mediaVideo.addEventListener ('timeupdate', updateStatus);
    mediaVideo.addEventListener ('loadeddata', updateStatus);
    mediaVideo.addEventListener ('ended', endVideo)
    auxBar.addEventListener ('mousedown', searchPoint);
    volumeBar.addEventListener ('mousemove', UpDownVolume);
    volumeBar.addEventListener ('click', UpDownVolume);
    volumeBar.addEventListener ('touchmove', UpDownVolume);
    volumeBar.addEventListener ('touchstart', UpDownVolume);
    fullScreen.addEventListener ('click', fullScreenSize);
    fullScreen.addEventListener ('touchstart', fullScreenSize);
    reorder ();
    function playSett () {
        let disPlay = this.firstChild.nextSibling;
        let disPause = this.firstChild.nextSibling.nextSibling.nextSibling;
        if (mediaVideo.paused) {
            mediaVideo.play ();
            disPlay.style.display = 'none';
            disPause.style.display = 'block';
        }
        else {
            mediaVideo.pause ();
            disPlay.style.display = 'block';
            disPause.style.display = 'none';
        }
    }
    function reorder () {
        for (const vid of videos) {
            let change;
            do {
                change = Math.floor (Math.random () * videos.length);
            }
            while (order.indexOf (change) >= 0);
            order.push (change)
        }
        shuffle ();
    }
    function shuffle () {
        let playingVideo = order [currentVideo];
        mediaVideo.src = `./video/${videos [playingVideo]}`;
        mediaVideo.play ();
        titleVideo.innerHTML = nameVideo (videos [playingVideo]);
        // console.log(nameVideo (videos [playingVideo]));
    }
    function nextVideo () {
        currentVideo ++;
        if (currentVideo >= videos.length) {
            currentVideo = 0;
        }
        shuffle ();
    }
    function endVideo () {
        if (mediaVideo.currentTime === mediaVideo.duration) {
            nextVideo ();
        }
    }
    function restart () {
        mediaVideo.currentTime = 0;
    }
    function updateStatus () {
        statusCounter.innerHTML = `${timeConversion (mediaVideo.currentTime)}/${timeConversion (mediaVideo.duration)}`
        let timePercentage = (100 * mediaVideo.currentTime) / mediaVideo.duration;
        targetBar.style.width = `${timePercentage}%`;
    }
    function timeConversion (sec) {
        let dateVal = new Date (sec * 1000)
        let second = (dateVal.getSeconds () <= 9) 
            ? '0' + dateVal.getSeconds ()
            : dateVal.getSeconds ();
            let minute = (dateVal.getMinutes () <= 9) 
            ? '0' + dateVal.getMinutes ()
            : dateVal.getMinutes ();
            return `${minute}:${second}`;
    }
    function searchPoint (e) {
        let clickPoint =  e.offsetX;
        let widthBar = auxBar.offsetWidth;
        let percentage = (100 * clickPoint) / widthBar;
        let position = Math.floor (mediaVideo.duration * (percentage / 100));
        mediaVideo.currentTime = position;
    }
    function UpDownVolume () {
        mediaVideo.volume = volumeBar.value / 100;
        let volOn = volumeButton.firstChild.nextSibling;
        let volOf = volumeButton.firstChild.nextSibling.nextSibling.nextSibling;
        if (mediaVideo.volume === 0) {
            volOn.style.display = 'none';
            volOf.style.display = 'block';
            mediaVideo.muted = false;
        }
        else {
            volOn.style.display = 'block';
            volOf.style.display = 'none';
        }
    }
    function fullScreenSize () {
        mediaVideo.requestFullscreen ();
    }
    function nameVideo (currVideo) {
        let titleVid = currVideo.slice (0, currVideo.length -4)
        return titleVid;
    }
});
