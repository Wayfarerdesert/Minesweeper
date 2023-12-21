function Cell({ value = " ", onCellClick, color }) {
    return (
        <div>
            <button
                className="border border-2 border-dark-subtle fs-2 fw-bold text-success"
                style={{ minWidth: 50, minHeight: 50 }}
                onClick={onCellClick}
            >
                {value == " " ? "\u00A0" : value}
            </button>
        </div>
    );

}

export default Cell;