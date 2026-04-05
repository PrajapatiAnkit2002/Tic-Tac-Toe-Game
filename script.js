let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let msg_container = document.querySelector(".msg-container");
let new_btn = document.querySelector("#new-btn");
let clickCount = 0;
let winner = false;

let turnO = true;
let winningPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]];


// after game reset or new game we can we want to make every box should be clickable and empty
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

// after someone wins the game all box should be unclickable
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

// displaying the winner
const showWinner = (winner) =>{
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msg_container.classList.remove("hide");
    reset_btn.classList.add("hide");
    disableBoxes();
}

// it is checking does anyone wins the game or not
const checkWinner = () => {
    for(let pattern of winningPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if((pos1Val != "" && pos2Val != "" && pos3Val != "") 
            && (pos1Val === pos2Val && pos2Val === pos3Val)){
        
            showWinner(pos1Val);
            winner =  true;
        }
    }
}

// if none wins the game so show draw
const draw = () => {
    msg.innerText = "Match Draw";
    msg_container.classList.remove("hide");
    reset_btn.classList.add("hide");
}

// iterating on all boxes which one is clicked and showing on UI
boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(turnO){
            box.innerText = "O";
            box.classList.add("O");
            turnO = false;
            clickCount++;
        }
        else{
            box.innerText = "X";
            box.classList.add("X");
            turnO = true;
            clickCount++;
        }
        // we have to make after click it should not be clickable and change
        box.disabled = true;

        // someone is wine or not we have to check that also
        checkWinner();

        // checking for draw
        if(clickCount == 9 && !winner){
            draw();
        }
    })
})

// reseting the game
const reset_game = () => {
    turnO = true;
    msg_container.classList.add("hide");
    reset_btn.classList.remove("hide");
    enableBoxes();
}

new_btn.addEventListener("click", reset_game);
reset_btn.addEventListener("click", reset_game);