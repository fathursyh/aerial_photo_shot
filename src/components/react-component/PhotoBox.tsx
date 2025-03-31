import { useRef, useState } from "react";

export default function PhotoBox() {
    const stream = useRef<MediaStream | null>(null);
    const video = useRef<HTMLVideoElement>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    async function startCamera() {
        if(isStreaming) return;
        await navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(mediaStream => {
            stream.current = mediaStream
            video.current!.srcObject = mediaStream;
            video.current!.play();
            setIsStreaming(true);
        });
    }
    function stopVideo() {
        video.current!.pause();
        stream.current!.getTracks().forEach(track => track.stop());
        video.current!.srcObject = null;
        setIsStreaming(false);
        
    }
    return (
        <div className="w-full h-full bg-base-200 p-8">
            <section>
                <video ref={video} className={`rounded-lg shadow ${!isStreaming && 'hidden'}`} />
                <button onClick={startCamera} className="btn btn-primary">Take Photo</button>
                <button onClick={stopVideo} className="btn btn-error">stop</button>
            </section>
            <aside>
                <img />
            </aside>
        </div>
    );
}