let videoList = document.querySelectorAll ('.videolistcontainer .list');
videoList.forEach (vid => {
    vid.addEventListener ('click', () => {
        let src = vid.querySelector ('.videolist').src;
        let title = vid.querySelector ('.videolisttitle').innerHTML;
        document.querySelector ('.mainvideolist .videomain .videocontentbox .videosection .videomain').src = src;
        document.querySelector ('.mainvideolist .videomain .videotitle').innerHTML = title;
    })
});