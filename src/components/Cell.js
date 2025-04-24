function Cell({ value = " ", status, onCellClick, onMarkClick }) {
    const numColor = {
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
                    content: <img src="/images/bomb.png" alt="Bomb" style={{ width: "30px" }} />
                };
            case "marked":
                return {
                    // backgroundColor: '#FFD700',
                    color: 'transparent',
                    content: <img src="/images/flag.png" alt="Flag" style={{ width: "30px" }} />
                };
            case "number":
                return { color: numColor[value] || "black", content: value }
            case "hidden":
                return { backgroundColor: "gray" };
            default:
                return { backgroundColor: "white", color: "transparent" };
        }
    }

    const { backgroundColor, color, content } = getCellStyles(status);

    const handleClick = () => {
        if (onCellClick) {
            onCellClick();
        }
    };

    const handleMark = (e) => {
        e.preventDefault(); // Prevent the click event from bubbling up
        if (onMarkClick) onMarkClick();
    };

    return (
        <div>
            <button
                className="border border-2 border-dark-subtle fw-bold"
                style={{
                    minWidth: 50, minHeight: 50, color: color || "black", fontSize: "20px",
                    backgroundColor
                }}
                onClick={handleClick}
                onContextMenu={handleMark}
                data-status={status}
            >
                {content}
            </button>
        </div>
    );

}

export default Cell;