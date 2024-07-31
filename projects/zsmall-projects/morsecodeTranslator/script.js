
// checkers for string, morsecode or sentence
String.prototype.isString = function () {
    let regex = /[a-zA-Z0-9 ]/;
    return regex.test(this);
}
      
String.prototype.isMorse = function () {
    let regex = /[\.\/\- ]/;
    return regex.test(this);
}
      
String.prototype.isSentence = function (letter, dot, space) {
    let regexLetter = /[a-zA-Z]/;
    let regexDot = /[\.]/;
    let regexSpace = /[ ]/;
          
    let letterTrue = regexLetter.test(letter);
    let dotTrue = regexDot.test(dot);
    let spaceTrue = regexSpace.test(space);

    return letterTrue && dotTrue && spaceTrue;
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
        console.log(`i: ${i}, c: ${text[i]}`);
          
        // if normal char
        if (text[i].isString()) {
            splittedArray[x] = ['s']
            i++;
            for (let y = 1; text[i].isString(); y++) {
                // add all words into blocks
                splittedArray[x][y] = [];
                for (let z = 0; text[i] != ' '; z++) {
                    splittedArray[x][y][z] = text[i];
                    i++;
                }
                splittedArray[x][y].join('');
            }
            // if sentence ends with '.' skip it
            if (text[i].isSentence(text[i-1], text[i], text[i+1])) {
                x++
                i++;
            }
        }
          
        // if morse char
        else if (text[i].isMorse()) {
            splittedArray[x] = ['m']
            i++;
            for (let y = 1; text[i].isMorse(); y++) {
                // add all morse into string blocks
                splittedArray[x][y] = [];
                for (let z = 0; text[i] != ' '; z++) {
                    splittedArray[x][y][z] = text[i];
                    i++;
                }
                splittedArray[x][y].join('');
            }
        }
          
        // if unknown char
        else {
            splittedArray[i] = ['u']
            i++;
            for (let y = 1; !text[i].isString && !text[i].isMorse; y++) {
                // add all morse into string blocks
                splittedArray[x][y] = [];
                for (let z = 0; text[i] != ' '; z++) {
                    splittedArray[x][y][z] = text[i];
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