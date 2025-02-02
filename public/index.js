let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;


boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            if (turn == "X") {
                e.style.color = "rgb(251,19,73)";
            }
            else {
                e.style.color = "rgb(190,228,251)";
            }
            checkWin();
            checkDraw();
            changeTurn();
        }
    })
})

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".background").style.left = "90px";
        document.querySelector(".background").style.backgroundColor = "rgb(190,228,251)";
    }

    else if (turn === "O") {
        turn = "X";
        document.querySelector(".background").style.left = "0px";
        document.querySelector(".background").style.backgroundColor = "rgb(251,19,73)";
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    for (let conditions = 0; conditions < winConditions.length; conditions++) {
        let cellA = boxes[winConditions[conditions][0]].innerHTML;
        let cellB = boxes[winConditions[conditions][1]].innerHTML;
        let cellC = boxes[winConditions[conditions][2]].innerHTML;
        if (cellA != "" && cellA === cellB && cellA === cellC) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " win";
            document.querySelector("#results").style.color="white";
            document.querySelector("#try").style.display = "inline";

            for (let cell = 0; cell < 3; cell++) {
                boxes[winConditions[conditions][cell]].style.backgroundColor = "white";
                boxes[winConditions[conditions][cell]].style.color = "red";
            }
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") {
                isDraw = false;
            }
        })
        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").color = "white";
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#try").style.display = "inline";
        }
    }
}

document.querySelector("#try").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".background").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#try").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        // e.style.color = "blue";
    })
})