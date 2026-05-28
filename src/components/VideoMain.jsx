import React, { useRef, useState } from "react";
import "../css/styleVideo.css";
export default function VideoPlayer ({ currentVideo, setCurrentVideo, videos , onEnded}) {
    const videoRef = useRef (null);
    const [isPlaying, setIsPlaying] = useState (true);
    const progressRef = useRef (null);
    const [order, setOrder] = useState ([]);
    const [isMuted, setIsMuted] = useState (true);
    const [volume, setVolume] = useState (0);
    const [title, setTitle] = useState ("");
    const [status, setStatus] = useState ("00:00/00:00");
    const progressContainerRef = useRef (null); 
    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play ();
            setIsPlaying (true);
        } 
        else {
            videoRef.current.pause();
            setIsPlaying (false);
        }
    };
    const toggleMute = () => {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted (videoRef.current.muted);
    };
    const changeVolume = (e) => {
        const vol = parseFloat (e.target.value);
        if (!videoRef.current) return;
        videoRef.current.volume = vol;
        setVolume (vol);
        if (vol === 0) {
            setIsMuted (true);
        } 
        else {
            setIsMuted (false);
        }
    };
    const nextVideo = () => {
        // let next = currentVideo + 1;
        // if (next >= videos.length) next = 0;
         setCurrentVideo (shuffle ());
        // shuffle (order, next);
    };
    const restartVideo = () => {
        videoRef.current.currentTime = 0;
        videoRef.current.play ();
        setIsPlaying (true);
    };
    const shuffle = () => {
        let currentIndex = videos.findIndex ((vid) => vid.src === currentVideo.src);
        let nextIndex = currentIndex;
        while (nextIndex === currentIndex && videos.length > 1) {
            nextIndex = Math.floor (Math.random () * videos.length);
        }
        return nextIndex;
    };
    const updateStatus = () => {
        if (!videoRef.current || !progressRef.current) return;
        setStatus (`${timeConversion (videoRef.current.currentTime)}/${timeConversion (videoRef.current.duration || 0)}`);
        let timePercentage = (100 * videoRef.current.currentTime) / videoRef.current.duration; 
        progressRef.current.style.width = `${timePercentage}%`;
    };
    const searchPoint = (e) => {
        if (!videoRef.current || !progressContainerRef.current) return;
        const clickPoint = e.nativeEvent.offsetX; // posición del click
        const widthBar = progressContainerRef.current.offsetWidth; // ancho de la barra contenedora
        const percentage = (100 * clickPoint) / widthBar;
        const position = Math.floor (
            videoRef.current.duration * (percentage / 100)
        );
        videoRef.current.currentTime = position;
    };
    const timeConversion = (sec) => {
        const dateVal = new Date (sec * 1000);
        const second = dateVal.getSeconds ().toString ().padStart (2, "0");
        const minute = dateVal.getMinutes ().toString ().padStart (2, "0");
        return `${minute}:${second}`;
    };
    const handleVideoEnd = () => {
        //const currentIndex = videos.findIndex ((v) => v.src === currentVideo.src);
        //const nextIndex = (currentIndex + 1) % videos.length; // vuelve al primero si es el ultimo
        //console.log(nextIndex);
        setCurrentVideo (shuffle ());
    };
    return (
        <div className="videomain">
            <div className="videocontentbox">
                <div className="videosection">
                    <video
                        ref={videoRef}
                        className="videomain"
                        src={videos[currentVideo].src}
                        autoPlay
                        muted={isMuted}
                        style={{ borderRadius: 0, padding: 0 }}
                        onTimeUpdate={updateStatus} 
                        onEnded={handleVideoEnd}
                    />
                </div>
                <div className="chargebar">
                    <div className="auxbar" ref={progressContainerRef} onClick={searchPoint}>
                        <div className="targetbar" ref={progressRef}></div>
                    </div>
                </div>
                <div className="buttonsection">
                    <div className="leftbox">
                        <div className="playbutton" onClick={togglePlay}>
                            {!isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 384 512">
                                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 320 512">
                                    <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
                                </svg>
                            )}
                        </div>
                        <div className="skipvideobutton" onClick={nextVideo}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 320 512">
                                <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z" />
                            </svg>
                        </div>
                        <div className="speedbutton">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 512 512">
                                <path d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM288 96c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM256 416c35.3 0 64-28.7 64-64c0-17.4-6.9-33.1-18.1-44.6L366 161.7c5.3-12.1-.2-26.3-12.3-31.6s-26.3 .2-31.6 12.3L257.9 288c-.6 0-1.3 0-1.9 0c-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM96 288c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32zm352-32c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32z" />
                            </svg>
                        </div>
                        <div className="restartvideobutton" onClick={restartVideo}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512">
                                <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
                            </svg>
                        </div>
                        <div className="volumebutton" style={{ display: "flex"}}>
                            {isMuted || volume === 0 ? (
                                <svg onClick={toggleMute} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 576 512" style={{ display: "block" }}>
                                    <path d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
                                </svg>
                            ) : (
                                <svg onClick={toggleMute} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 640 512" style={{ display: "block" }}>
                                    <path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
                                </svg>
                            )}
                            <input
                                className="volumebar"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={changeVolume}
                            />
                        </div>
                        <div class="statusbox">{status}</div>
                    </div>
                    <div className="rightbox">
                        <div className="fullscreenbox">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 448 512">
                                <path d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="videotitle">{videos [currentVideo].title}</h3>
        </div>
    );
}
