function Cell({ value = " ", onCellClick, status, onMarkClick }) {
    const cellColor = {
        '0': 'black',
        '1': 'blue',
        '2': 'green',
        '3': 'red'
    };

    const getCellStyles = (status) => {
        switch (status) {
            case "mine":
                return {
                    backgroundColor: '#ff6666',
                    color: 'transparent',
                    content: <img src="bomb.png" alt="Bomb" style={{ width: "30px" }} />
                };
            case "flag":
                return {
                    backgroundColor: '#FFD700',
                    color: 'transparent',
                    content: <img src="flag.png" alt="Flag" style={{ width: "30px" }} />
                };
            case "number":
                return { color: cellColor[value] || "black", content: value }
            case "hidden":
                return { backgroundColor: "gray" };
            default:
                return { backgroundColor: "white", color: "transparent" };
        }
    }

    const { backgroundColor, color, content } = getCellStyles(status);

    const handleMark = (e) => {
        e.preventDefault(); // Prevent the click event from bubbling up
        onMarkClick();
    }

    return (
        <div>
            <button
                className="border border-2 border-dark-subtle fw-bold"
                style={{
                    minWidth: 50, minHeight: 50, color: color || "black", fontSize: "20px",
                    backgroundColor
                }}
                onClick={onCellClick}
                onContextMenu={handleMark}
                data-status={status}
            >
                {content}
            </button>
        </div>
    );

}

export default Cell;