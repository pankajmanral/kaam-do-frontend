import "../modal/modal.css"

export default function Modal({ isOpen, onClose, children }) {

    return (
        <div className={`modal-overlay ${isOpen ? "show" : ""}`}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    &#10005;
                </button>
                { children }
            </div>
        </div>
    )
        
}