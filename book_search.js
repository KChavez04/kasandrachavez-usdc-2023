/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    try{
        // base case - search term is empty
        if (searchTerm == null || searchTerm.length <= 0){
            return result;
        }

        // base case - object is empty
        if (scannedTextObj == null || scannedTextObj.length <= 0){
            return result;  
        }

        // iterate through nested objects to find a match to the search term
        scannedTextObj.forEach(book => {
            book.Content.forEach(function (item, i){
                let text = item.Text;

                if(text.includes(searchTerm)){
                    result.Results.push({"ISBN": book.ISBN, "Page": item.Page, "Line": item.Line})      // add details to the result array
                }

                // if a word has a hyphen
                else if(text.slice(-1) === '-' && book.Content[i + 1]){
                    let firstHalf = text.split(" ").pop().slice(0, -1);            // save the last word of the string and cut off the last char (the hyphen)
                    let secondHalf = book.Content[i + 1].Text.split(" ")[0];        // save the first word of the next line's string
                    let hyphenatedWord = firstHalf + secondHalf;

                    if(hyphenatedWord.includes(searchTerm)){
                        result.Results.push({"ISBN": book.ISBN, "Page": item.Page, "Line": item.Line})      // add details to the result array
                    }
                }
            })
        });

    } catch(ex){
        console.error(ex);
    }
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
console.log("Test 1 - Given known input, get known output")
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
console.log("Test 2 - Correct number of results")
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/* ------------------------------------------------------------------- */

/** If the object is completely blank. */
console.log("Test 3 - Object is blank")
const test3result = findSearchTermInBooks("hello", ""); 
if (test3result.Results.length == 0) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", 0);
    console.log("Received:", test3result.Results.length);
}

/** If the search term is blank. */
console.log("Test 4 - Search term is blank")
const test4result = findSearchTermInBooks("", twentyLeaguesIn); 
if (test4result.Results.length == 0) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", 0);
    console.log("Received:", test4result.Results.length);
}

/** If the object has nothing in the content attriute. */
console.log("Test 5 - Content attr in object is empty")
const emptyContent = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [] 
    }
]
const test5result = findSearchTermInBooks("hello", emptyContent); 
if (test5result.Results.length == 0) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", 0);
    console.log("Received:", test5result.Results.length);
}

/** If no matches were found. */
console.log("Test 6 - No match found")
const test6result = findSearchTermInBooks("Hippopotomonstrosesquipedaliophobia", twentyLeaguesIn); // fear of large words
if (test6result.Results.length == 0) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", 0);
    console.log("Received:", test6result.Results.length);
}

/** If the search term was hyphenated. */
console.log("Test 7 - Hyphenated search term")
const test7result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (test7result.Results.length == 1) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", 1);
    console.log("Received:", test7result.Results.length);
}

/** If the search was case-sensitive. (The vs the) */
console.log("Test 8 - Case-sensitive search")
const test8result = findSearchTermInBooks("The", twentyLeaguesIn);
if (test8result.Results.length == 1) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", 1);
    console.log("Received:", test8result.Results.length);
}

/** If the search term has multiple results. */
console.log("Test 9 - Multiple results")
const test9result = findSearchTermInBooks("and", twentyLeaguesIn);
if (test9result.Results.length == 2) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", 2);
    console.log("Received:", test9result.Results.length);
}

/** If the search term has multiple results in multiple books. */
console.log("Test 10 - Multiple books, multiple results")
const multipleBooks = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "The Hobbit",
        "ISBN": "9780547928227",
        "Content": [
            {
                "Page": 25,
                "Line": 16,
                "Text": "There's some good in this world, Mr. Frodo,",
            },
            {
                "Page": 25,
                "Line": 17,
                "Text": "and it's worth fighting for.",
            },
        ] 
    }
]
const test10result = findSearchTermInBooks("and", multipleBooks); 
if (test10result.Results.length == 3) {
    console.log("PASS: Test 10");
} else {
    console.log("FAIL: Test 10");
    console.log("Expected:", 3);
    console.log("Received:", test10result.Results.length);
}