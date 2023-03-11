let keyboard = document.getElementById("keyboard");
let wordParent = document.querySelector(".word");

// The Words
let random = {
    person : ["Ahmed", "Saleh", "Khalid", "hany"],
    animal : ["cat", "dog", "donkey", "elephant"],
    study : ["pen", "bag", "book", "ruler"],
    food : ["barger", "pizza", "egg", "tomato"],
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}
// Select Word is Random
function selectWord(){
    let category = Object.keys(random)[Math.floor(Math.random() * Object.keys(random).length)];
    document.querySelector(".word-from span").innerHTML = category
    let wordThe = random[category][Math.floor(Math.random() * random[category].length)];
    return wordThe.toUpperCase()
}
let word = selectWord()

// Keyboard Letters
function keyboardButton(){
    let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let element ="";
    for (let i = 0; i < abc.length; i++) {
        element += 
        `<div class="${abc[i]}">${abc[i]}</div>`
    }
    keyboard.innerHTML = element
}keyboardButton()

// Print Letters of the word
function words() {
    let element ="";
    for (let i = 0; i < word.length; i++) {
        element += 
        `<div></div>`
    }
    wordParent.innerHTML = element
}words()

// click on a letter and check found or no
function clickKeyboard() {
    let lettrs = document.querySelectorAll("#keyboard > div")
    let wordLettrs = document.querySelectorAll(".word > div")
    let attemptViow = document.querySelector(".attempt span");
    let attempt = 5
    
    // show number attempt
    attemptViow.innerHTML = attempt
    //
    lettrs.forEach((element) => {
        element.addEventListener("click", ()=> {
            // Check if there are attempts
            if (attempt > 1) {
                // check if char includes in word or no
                if (word.includes(element.innerHTML)) {
                    
                    // Active Letter In Keyboard
                    element.classList.add("yesThis")
                    
                    // Active Letter In Word
                    wordLettrs[word.indexOf(element.innerHTML)].innerHTML = word[word.indexOf(element.innerHTML)];
                    
                    // active sound click in clickng
                    document.getElementById("accept").play()

                    let num = word.indexOf(element.innerHTML);
                    if(word.indexOf(element.innerHTML, num+1) !== -1) {
                        wordLettrs[word.indexOf(element.innerHTML, num+1)].innerHTML = word[word.indexOf(element.innerHTML, num+1)];
                    }
                    
                    // this access Is Complated Word or No
                    let chick = 0;
                    for (let i = 0; i < word.length; i++) {
                        if (word[i] === wordLettrs[i].innerHTML) {
                            chick ++
                        };
                        // show Window Win
                        if (chick === word.length) {
                            let win = document.querySelector(".popup.win");
                            win.style.display = 'flex';
                            document.getElementById("winSound").play()
                        }
                    }
                }
                // char not included in the word
                else {
                    // attempts minus 1
                    attempt -= 1; 
                    attemptViow.innerHTML = attempt
                    document.getElementById("fail").play()
                }
            } else {
                let loser = document.querySelector(".popup.loser");
                let loserWord = document.querySelector(".popup.loser .content .the-word span");
                loser.style.display = "flex";
                loserWord.innerHTML = word ;
                document.getElementById("GameOver").play()
            }
        })
    })
}clickKeyboard()


function playAgain() {
    word = selectWord()
    keyboardButton()
    words()
    clickKeyboard()
}
let rePlay = document.querySelectorAll(".popup .content .re-play")
rePlay.forEach((element)=> {
    element.addEventListener("click", ()=>{
        let win = document.querySelectorAll(".popup");
        win[0].style.display = 'none';
        win[1].style.display = 'none';
        document.getElementById("winSound").load()
        playAgain()
        
    })
})