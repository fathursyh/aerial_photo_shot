type StyleProps = {
    style: (option: string) => void,
};
export default function StyleActionsButton(props : StyleProps) {
    function clickHandler(option : string) {
        props.style(option);
    }
    return (
        <div aria-label="style buttons" className="absolute right-0 opacity-0 delay-200 group-hover:-right-30 group-hover:opacity-100 top-[50%] translate-y-[-50%] flex flex-col gap-2 transition-all duration-500">
            <button className="action-buttons" onClick={() => {clickHandler('')}}>Default</button>
            <button className="action-buttons" onClick={() => {clickHandler('isometric')}}>Isometric</button>
            <button className="action-buttons" onClick={() => {clickHandler('wavy')}}>Wavy</button>
            <button className="action-buttons" onClick={() => {clickHandler('sky')}}>Sky</button>
            <button className="action-buttons" onClick={() => {clickHandler('sunset')}}>Sunsets</button>
            <button className="action-buttons" onClick={() => {clickHandler('moon')}}>Moon</button>
        </div>
    )
}