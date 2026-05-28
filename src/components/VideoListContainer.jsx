import "../css/listVideo.css";
export default function VideoList ({videos, onSelect}) {
    return (
        <div className="videolistcontainer">
            {videos.map ((vid, idx) => (
                <div className="list" key={idx} onClick={() => onSelect (idx)}>
                    <video className="videolist" src={vid.src}></video>
                    <h3 className="videolisttitle">{vid.title}</h3>
                </div>
            ))}
        </div>
    );
}