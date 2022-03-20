document.addEventListener('DOMContentLoaded', () => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const cardsBox = [
        {
            name: 'fries',
            img: './images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: './images/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: './images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: './images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: './images/milkshake.png'
        },
        {
            name: 'pizza',
            img: './images/pizza.png'
        },
        {
            name: 'fries',
            img: './images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: './images/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: './images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: './images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: './images/milkshake.png'
        },
        {
            name: 'pizza',
            img: './images/pizza.png'
        },
    ];
    
    const gridDisplay = $('#grid');
    const resultDisplay = $('#result');
    const giftDisplay = $('#gift');

    /** 
     * @param cardIdsChosen: Check the id of img tag
     * @param cardNameChosen: Check the name of card are equals when we click both cards
     * @param cardWon: Check the TRUE result when we pick right card
     */
    let cardNameChosen = [];
    let cardIdsChosen = [];
    const cardWon = [];

    const option1 = 0;
    const option2 = 1;
    
    // Random the card box (CONVENTION)
    function randomCard(cardsBox){
        cardsBox.sort(() => 0.5 - Math.random());
        console.log(cardsBox);
    }

    // Create the board game on the UI
    function createBoard(){
        /**
         * @param card: the img tag in DOM HTML
         */
        for(let i = 0 ; i < cardsBox.length; i++){
            // Create the img tag
            const card = document.createElement('img');
            // Set the attribute of the card
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            // The flipcard() will execute if we click it
            card.addEventListener('click', flipCard)
            gridDisplay.appendChild(card);
        }
    }

    function flipCard(){
        /**
         * @param cardsId: Get the index of cardId by get data-id when we click
         * @param 
         * @return 
         */
        const cardsId = this.getAttribute('data-id');
        cardNameChosen.push(cardsBox[cardsId].name);
        // Push the id of the card 
        cardIdsChosen.push(cardsId)
        // Set the image's appearance attribute 
        this.setAttribute('src', cardsBox[cardsId].img);

        // When we click two card, the checkProcessMatch() will run
        if (cardNameChosen.length === 2){
            setTimeout(checkProcessMatch, 500);
        }
    }

    function checkProcessMatch(){
        /**
         * @param cards: all the img tags
         * @param optionOneID: these ids that we push which could SELECT the card's image 
         * @param optionTwoID: these ids that we push which could SELECT the card's image 
         */
        const cards = $$('img');
        const optionOneID = cardIdsChosen[0];
        const optionTwoID = cardIdsChosen[1]; 

        // If people click only one image
        if(optionOneID == optionTwoID){
            // cards[optionOneID].setAttribute('src', `images/${cardNameChosen[cardIdsChosen[optionOneID]]}.png`);
            // cards[optionTwoID].setAttribute('src', `images/${cardNameChosen[cardIdsChosen[optionTwoID]]}.png`);
            // cardNameChosen = [];
            // cardIdsChosen = [];
            // alert('You click the same image');
            // for (let i = 0 ; i < cards.length; i++){
            //     // if (cardNameChosen[option1] !== cardNameChosen[option2]){
            //     //     cards[optionOneID].setAttribute('src', 'images/blank.png');
            //     //     cards[optionTwoID].setAttribute('src', 'images/blank.png');
            //     //     console.log('Sorry, try again bro');
            //     // }
            //     break;
            // }
            cards[optionOneID].setAttribute('src', 'images/blank.png');
            alert('Sorry, you click the same image');
            cards[optionTwoID].setAttribute('src', 'images/blank.png');
        }
    
        // If each card's name that we pick are the same.....
        else if (cardNameChosen[option1] == cardNameChosen[option2]){
            // Both card will become the white png
            cards[optionOneID].style.visibility = 'hidden';
            cards[optionTwoID].style.visibility = 'hidden';

            // Afterward, remove the click event to prevent the re-click
            cards[optionOneID].removeEventListener('click', flipCard);
            cards[optionTwoID].removeEventListener('click', flipCard);

            cardWon.push(cardNameChosen);
        }
        else{
            cards[optionOneID].setAttribute('src', 'images/blank.png');
            cards[optionTwoID].setAttribute('src', 'images/blank.png');
            console.log('Sorry, try again bro');
        }
        resultDisplay.textContent = cardWon.length;

        console.log(cardIdsChosen);
        console.log(cardNameChosen);
        console.log(optionOneID);
        console.log(optionTwoID);
        console.log(cardNameChosen[cardIdsChosen[optionOneID]]);
        console.log(cardNameChosen[cardIdsChosen[optionTwoID]]);


        // After picked, we will reset all the card
        // IMPORTANT STEP 
        cardNameChosen = [];
        cardIdsChosen = [];

        // If the card won length equals to a half of cardsBox length --> Finished the game
        if (cardWon.length === Math.floor(cardsBox.length / 2)){
            resultDisplay.textContent = 'Congratulation !!!!! You won ❤️';
            const giftImage = document.createElement('img');
            // giftImage.setAttribute('src', 'images/huy.png');
            // giftImage.classList.add('bounce');
            // giftDisplay.appendChild(giftImage);
        }
        
    }
    
    // call the random cards function
    randomCard(cardsBox);
    // Create the board game
    createBoard();
})