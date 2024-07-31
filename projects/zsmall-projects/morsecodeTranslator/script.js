document.addEventListener("DOMContentLoaded", function() {
    let usrInputElement = document.getElementById("usrInputElement");
    let usrOutputElement = document.getElementById("usrOutputElement");


    // cleans the input
    function cleanText(usrInput) {
        let regex = /[a-zA-Z0-9 ]/;
        return usrInput.toUpperCase().split("").filter(char => regex.test(char));
    }


    // text to morsecode
    function textToMorse(cleanArray) {
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
         for (let i = 0, j = 0; i < cleanArray.length; i++, j += 2) {
              morseCode[j] = morsecodeDict[cleanArray[i]];
              if (cleanArray[i + 1] != null) {
                  morseCode[j + 1] = ' ';
              };
         };
  
         return morseCode = morseCode.join('');
     };

    // Event listener
    usrInputElement.addEventListener("input", function() {
        let usrInput = usrInputElement.value;
        let cleanedArray = cleanText(usrInput);
        let morseCode = textToMorse(cleanedArray);
        usrOutputElement.textContent = morseCode;
    });
});

// make it reversable too