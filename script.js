const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader=document.getElementById('loader');





let apiQuotes = [];

//Loading function to Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading.  This will hide the loader. 
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote() {

    loading();

    //Pick a Random quote from apiQuotes array
    const quote =apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    /* Math.random() gives a no between 1 and 0, thus we have used math.floor to 
    bring to integer, so that it get pick a random quote from apiQuotes */

    //console.log(quote) // this gives us the random quote in console


    //Check if Author field is blank and replace it with 'Unknown'
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }


    /*Check Quote length to determine styling, i.e if quote length is long
    then make the font small to make it fit*/
    if (quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote')
    }

    //Set Quote, Hide Loader
    
    quoteText.textContent = quote.text;
  
    complete();

}

// Get quotes from API
async function getQuotes() {

    loading();


    const apiUrl='https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);   //means this const won't be populated unles it gets data
        apiQuotes = await response.json(); /*We are 
        turning the response (that we got from api above this line) into json and passing 
        that into global variable apiQuotes*/
        
        //console.log(apiQuotes[12]);

        newQuote();
    } catch (error) {
        // Catch error here
    }
}



//Tweet Quotes
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?tweet=${quoteText.textContent} - ${authorText.textContent}`;        /*backticks are being used 
    i.e this is a Template string as it aloows us to pass a variable*/
    window.open(twitterUrl, '_blank');  //_blank will allow twitter to open in new tab

}


//Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote)
//On Load


getQuotes();

