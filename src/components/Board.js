// import React, { useState } from 'react';
// import Cell from './Cell';

const TITLE_STATUS = {
    HIDDEN: 'hidden',
    NUMBER: 'number',
    MARKED: 'marked',
    MINE: 'mine'
};

export function CreateBoard(boardSize, numberOfMines) {
    const board = [];
    const minePositions = getMinesPositions(boardSize, numberOfMines);
    console.log("Mines positions:", minePositions);

    for (let x = 0; x < boardSize; x++) {
        const row = [];
        for (let y = 0; y < boardSize; y++) {
            const isMine = minePositions.some((mine) => mine.x === x && mine.y === y);

            row.push({
                x,
                y,
                mine: isMine,
                status: TITLE_STATUS.HIDDEN,
            });
        }
        board.push(row);
    }
    return board;
}


function getMinesPositions(boardSize, numberOfMines) {
    const positions = [];

    while (positions.length < numberOfMines) {
        const x = Math.floor(Math.random() * boardSize);
        const y = Math.floor(Math.random() * boardSize);

        const position = { x, y };

        if (!positions.includes(position)) {
            positions.push(position);
        }
    }
    return positions;
}

export function CheckWin(board) {
    return board && board.every((row) =>
        row.every((cell) => {
            return cell.status === TITLE_STATUS.NUMBER ||
                (cell.mine &&
                    (cell.status === TITLE_STATUS.MARKED || cell.status === TITLE_STATUS.HIDDEN))
        }));
}

export function CheckLose(board) {
    return board && board.some((row) =>
        row.some((cell) =>
            cell.status === TITLE_STATUS.MINE));
}



