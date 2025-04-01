type CameraActions = {
    startCamera: () => void,
};
export default function CameraActions(props : CameraActions) {

    return (
        <div className="absolute left-0 opacity-0 delay-200 group-hover:-left-30 group-hover:opacity-100 top-[50%] translate-y-[-50%] flex flex-col gap-2 transition-all duration-500">
            <button className="action-buttons text-4xl pb-3" onClick={props.startCamera}>📸</button>
        </div>
    )
}