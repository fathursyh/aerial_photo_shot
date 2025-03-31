import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
    children: ReactNode,
    show?: boolean,
    closeModal? : () => void,
    confirm?: () => void,
    max?: boolean
}
export default function BasicModal(props : ModalProps) {
    const modal = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (props.show) {
            modal.current!.showModal();
        } else {
            modal.current!.close();
        }
    }, [props.show]);
  return (
    <>
      <dialog id="my_modal_1" className="modal" ref={modal}>
        <div className={`modal-box ${props.max && 'max-w-3xl'}`}>
          {props.children}
          <div className="modal-action">
            <form method="dialog">
                <button type="button" className="btn btn-primary" onClick={props.confirm}>Take Photo</button>
                <button className="btn btn-error ms-4" onClick={props.closeModal}>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
