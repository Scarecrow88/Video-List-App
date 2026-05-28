import { useState } from "react";
import VideoPlayer from "./VideoMain";
import VideoList from "./VideoListContainer";
import videos from "./media/Videos";
export default function VideoApp () {
    const [currentVideo, setCurrentVideo] = useState (0);
    return (
        <div className="mainvideolist">
            <VideoPlayer currentVideo={currentVideo} setCurrentVideo={setCurrentVideo} videos={videos}/>
            <VideoList videos={videos} onSelect={setCurrentVideo} />
        </div>
    );
}
