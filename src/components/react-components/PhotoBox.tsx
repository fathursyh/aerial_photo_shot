import { useEffect, useRef, useState } from "react";
import BasicModal from "./composables/BasicModal";
import { createPortal } from "react-dom";
import StyleActionsButton from "./StyleActionsButton";
import CameraActions from "./CameraActions";

export default function PhotoBox() {
    let index = 0;
    const [stripStyle, setStripStyle] = useState('');
    const [count, setCount] = useState(3);
    const [modal, setModal] = useState(false);
    const [flash, setFlash] = useState(false);
    const stream = useRef<MediaStream | null>(null);
    const video = useRef<HTMLVideoElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const [isStreaming, setIsStreaming] = useState(false);

    const beforeUnloadHandler = (event: Event) => {
        if (index > 3) {
            event.preventDefault();
            return "";
        }
    };
    useEffect(() => {
        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
        }
    }, []);

    async function startCamera() {
        index = 0;
        setModal(true);
        if (isStreaming) return;
        await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false }).then((mediaStream) => {
            stream.current = mediaStream;
            video.current!.srcObject = mediaStream;
            video.current!.play();
            setIsStreaming(true);
        });
    }
    function takePhoto() {
        if (index < 4) {
            setFlash(true);
            const timeout = setTimeout(() => {
                setFlash(false);
                clearTimeout(timeout);
            }, 150);
            const photo = document.querySelectorAll(".photo");
            (canvas.current!.width = 250),
                (canvas.current!.height = 170),
                canvas.current!.getContext("2d")?.drawImage(video.current as CanvasImageSource, 0, 0, canvas.current?.width!, canvas.current!.height);
            const imageUrl = canvas.current?.toDataURL("image/jpeg");
            (photo[index] as HTMLImageElement).src = imageUrl!;
            setCount(3);
            index++;
        }
    }
    function setTimer() {
        const secondInterval = setInterval(() => {
            setCount((count) => count - 1);
        }, 1000);
        const interval = setInterval(() => {
            takePhoto();
            if (index > 3) {
                stopVideo();
                clearInterval(interval);
                clearInterval(secondInterval);
                window.addEventListener("beforeunload", beforeUnloadHandler);

            }
        }, 3000);
    }
    function stopVideo() {
        if (!isStreaming) return;
        setModal(false);
        video.current!.pause();
        stream.current!.getTracks().forEach((track) => track.stop());
        video.current!.srcObject = null;
        setIsStreaming(false);
    }
    function changeStyle(option : string) {
        setStripStyle(option);
    }
    return (
        <>
            {createPortal(
                <BasicModal max={true} show={modal} closeModal={stopVideo} confirm={setTimer}>
                    <span className="absolute bg-black/70 z-20 grid place-items-center w-10 h-10 rounded text-white text-2xl font-bold">{count}</span>
                    <section>
                        <div className="relative rounded-lg overflow-hidden mb-2">
                            <div className={`w-full h-full bg-white absolute transition-all duration-100 opacity-0 ${flash && "opacity-100"}`} />
                            <video ref={video} className={`w-[1000px] bg-neutral-800`} />
                        </div>
                        <div className="flex justify-center gap-4"></div>
                    </section>
                </BasicModal>,
                document.body
            )}
            <aside className={`p-8 flex flex-col gap-4 shadow-md rounded cursor-pointer hover:shadow-glow2 hover:shadow-accent transition-all duration-300 relative ${stripStyle} bg-gray-100 group xl:scale-95 2xl:scale-100`}>
                <canvas ref={canvas} style={{ display: "none" }}></canvas>
                {[...Array(4).keys()].map((item) => (
                    <img width={250} height={170} className="rounded-xl object-cover object-center photo max-h-[200px] overflow-hidden bg-neutral-600 z-20" key={item} />
                ))}
                <CameraActions startCamera={startCamera}/>
                <StyleActionsButton style={changeStyle} />
            </aside>
        </>
    );
}
