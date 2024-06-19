
// Load the CSV file and parse its content
fetch('gemini-1-5-pro-1-paragraph.csv')
    .then(response => response.text())
    .then(data => {
        let wordInfo = parseCSV(data);
        addDoubleClickEvent(wordInfo);
    });

// Function to parse CSV data
function parseCSV(data) {
    let lines = data.split('\n');
    let result = {};
    lines.forEach(line => {
        let [id, word, Word_Class,Vietnamese_Meaning,IPA,Verb_Structure_Collocation,Example,Vietnamese_Explanation, no1,no2,no3] = line.split(',');
        result[word] = { Word_Class,Vietnamese_Meaning,IPA,Vietnamese_Explanation,Verb_Structure_Collocation,Example,no1,no2,no3 };
    });
    return result;
}

// Function to add double click event to each word in the paragraph
function addDoubleClickEvent(wordInfo) {
    let textElement = document.getElementById('text');
    let popup = document.getElementById('popup');
    let closeBtn = document.getElementsByClassName('close')[0];
    let infoElement = document.getElementById('info');

    textElement.addEventListener('dblclick', (event) => {
        let selectedWord = getSelectedWord(event);
        if (selectedWord && wordInfo[selectedWord]) {
            displayWordInfo(selectedWord, wordInfo[selectedWord]);
            popup.style.display = "block";
        }
    });

    closeBtn.onclick = function() {
        popup.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }

    function getSelectedWord(event) {
        let selection = window.getSelection();
        return selection.toString().trim();
    }

    function displayWordInfo(word, info) {
        let additionalInfo = '';
        if (info.no1) {
            additionalInfo = `<p><strong>Vietnamese Explanation:</strong> ${info.Vietnamese_Explanation}${info.no1}</p>`;
        }
        if (info.no2) {
            additionalInfo = `<p><strong>Vietnamese Explanation:</strong> ${info.Vietnamese_Explanation}${info.no1}${info.no2}</p>`;
        }
        if (info.no3) {
            additionalInfo = `<p><strong>Vietnamese Explanation:</strong> ${info.Vietnamese_Explanation}${info.no1}${info.no2}${info.no3}</p>`;
        }
    
        infoElement.innerHTML = `
            <p><strong>Word:</strong> ${word}</p>
            <p><strong>Class:</strong> ${info.Word_Class}</p>
            <p><strong>IPA:</strong> ${info.IPA}</p>
            <p><strong>Vietnamese Meaning:</strong>${info.Vietnamese_Meaning}</p>
            ${additionalInfo}
            <p><strong>Verb Structure / Collocation:</strong> ${info.Verb_Structure_Collocation}</p>
            <p><strong>Example:</strong> ${info.Example}</p>

        `;
    }
    
}
