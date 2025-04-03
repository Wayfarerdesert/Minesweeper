function Cell({ value = " ", onCellClick, color }) {
    return (
        <div>
            <button
                className="border border-2 border-dark-subtle fw-bold"
                style={{ minWidth: 50, minHeight: 50, color: color || "black", fontSize: "20px" }}
                onClick={onCellClick}
            >
                {value === "*" ? <img src="bomb.png" alt="*" style={{ width: "30px" }} /> : value}
            </button>
        </div>
    );

}

export default Cell;