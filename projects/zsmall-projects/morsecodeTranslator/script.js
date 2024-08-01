
// checkers for string, morsecode or sentence
String.prototype.isString = function () {
    let regex = /[a-zA-Z0-9 ]/;
    return regex.test(this);
}
      
String.prototype.isMorse = function () {
    let regex = /[\.\/\- ]/;
    return regex.test(this);
}

String.prototype.isMorseNoBs = function () {
    let regex = /[\.\-]/;
    return regex.test(this);
}


document.addEventListener("DOMContentLoaded", function() {

let usrInputElement = document.getElementById("usrInputElement");
let usrOutputElement = document.getElementById("usrOutputElement");

    
  
// splitter for morse or string or unknown
// adds 'm' 's' 'u' to the start and puts them into arrays.
function splitToArray(text) {
        
    // initialise the array
    let splittedArray = [];
        
    // check where the string or morse ends, endings are a letter, .-/ or null
    let i = 0, x = 0; // i is for text, x is for arrays
    while (i < text.length) {
          
        // if normal char
        if (text[i].isString()) {
            splittedArray[x] = ['s'];
            for (let y = 1; i < text.length && text[i].isString(); y++) {
                // add all words into blocks
                splittedArray[x][y] = [];
                for (let z = 0; i < text.length && text[i].isString() && text[i] != ' '; z++) {
                    splittedArray[x][y][z] = text[i];
                    i++;
                }
                if (text[i] == ' ') {
                    i++;
                }
                splittedArray[x][y] = splittedArray[x][y].join('');
            }
        }
          
        // if morse char
        else if (text[i].isMorse()) {
            splittedArray[x] = ['m'];
            let y = 0;
            while (i < text.length && text[i].isMorse()) {
                // add all morse into string blocks
                if (text[i].isMorseNoBs()) {
                    splittedArray[x][y] = [];
                    for (let z = 0; i < text.length && text[i].isMorseNoBs() && text[i] != ' '; z++) {
                        splittedArray[x][y][z] = text[i];
                        i++;
                    }
                    splittedArray[x][y] = splittedArray[x][y].join('');
                    y++;
                }
                else if (text[i] == '/') {
                    splittedArray[x][y] = [];
                    for (let z = 0; i < text.length && !text[i].isMorseNoBs() && text[i] != ' '; z++) {
                        splittedArray[x][y][z] = text[i];
                        i++;
                    }
                    splittedArray[x][y] = splittedArray[x][y].join('');
                    y++;
                }
                else if (text[i] == ' ') {
                    i++;
                }
                
            }
        }
          
        // if unknown char
        else {
            splittedArray[x] = ['u'];
            for (let y = 1; i < text.length && !text[i].isString() && !text[i].isMorse(); y++) {
                // add all morse into string blocks
                splittedArray[x][y] = [];
                for (let z = 0; i < text.length && !text[i].isString() && !text[i].isMorse() && text[i] != ' '; z++) {
                    splittedArray[x][y][z] = text[i];
                    i++;
                }
                if (text[i] == ' ') {
                    i++;
                }
                splittedArray[x][y] = splittedArray[x][y].join('');
            }
        }
        x++;  // switch to next array
    
    }
    return splittedArray;
}

// text to morsecode
function textToMorse(text) {
    let morsecodeDict = {
        'E': ".", 'T': "-", 'A': ".-", 'O': "---",
        'I': "..", 'N': "-.", 'S': "...", 'H': "....",
        'R': ".-.", 'D': "-..", 'L': ".-..", 'C': "-.-.",
        'U': "..-", 'M': "--", 'W': ".--", 'F': "..-.",
        'G': "--.", 'Y': "-.--", 'P': ".--.", 'B': "-...",
        'V': "...-", 'K': "-.-", 'J': ".---", 'X': "-..-",
        'Q': "--.-", 'Z': "--..", '1': ".----", '2': "..---",
        '3': "...--", '4': "....-", '5': ".....", '6': "-....",
        '7': "--...", '8': "---..", '9': "----.", '0': "-----",
        ' ': "/",
    };
  
    let morseCode = [];
    for (let i = 0, j = 0; i < text.length; i++, j += 2) {
    morseCode[j] = morsecodeDict[text[i]];
        if (text[i + 1] != null) {
            morseCode[j + 1] = ' ';
        };
    };

    return morseCode = morseCode.join('');
};
    

// Event listener
usrInputElement.addEventListener("input", function() {
    let usrInput = usrInputElement.value;
    let splittedArray = splitToArray(usrInput);
    console.log(splittedArray);
        
    // usrOutputElement.textContent = morseCode;
});
    
});

// start -> splits into arrays -> translate arrays -> join arrays into a string.