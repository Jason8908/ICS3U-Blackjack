/*
	Jason, Elben, Lily, Fahad
	11/15/2019
	Black Jack Code
	This is our game code.
*/

"use strict";
//Variables
let cardVar;
let cardValue;
let dealerCardTotal;
//Deck array
let deck = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
	11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
	21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
	31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
	41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 
	51, 52
];
//Name Variable
let name = "Player";
//Vars for absolute values
let userCard = [];
let dealerCard = [];
//Vars for deck values
let user = [];
let dealer= []; 
//Vars for total values
let dealerHandValue = 0;
let userHandValue = 0;
//Vars for Bet Button
let betMoney;
let amountMoney;
let pot;
//Arrs for getting values
let moneyArr = [];
let betMoneyArr = [];
let allowedKeys = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down',
	65: 'a',
	66: 'b'
};
// the 'official' Konami Code sequence
let konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
// a variable to remember the 'position' the user has reached so far.
let konamiCodePosition = 0;
//Music toggle variable
let muted = true;
//Theme variable
let winter = false;
//counter Var for Scare
let doubleCount = 0;

$(document).ready(function() {
	$("#btnPlayAgain").click(function(event) {
		/* Act on the event */
		$("#divOverlay").css('display','none');
		$("#divPlayAgain").css('display', 'none');
		
		//Resetting variables
		dealerHandValue = 0;
		userHandValue = 0;
		dealerCard = [];
		userCard = [];
		deck = resetDeck();
		dealer = [];
		user = [];

		$("#betMoney").val(0);
		$("#money").text("$100.00");
	}); //End of btnPlayAgain click

	$("#btnDeal").click(function(event) {
		/* Act on the event */
		//Resetting variables
		dealerHandValue = 0;
		userHandValue = 0;
		dealerCard = [];
		userCard = [];
		deck = resetDeck();
		dealer = [];
		user = [];
	
		//Checking if there are less than 2 cards left in the deck.
		if(deck.length<4) {
			$("#btnDeal").prop('disabled', true);
			$("#btnDeal").css('cursor', 'not-allowed');
			return false;
		};

		//Dealing two cards for the dealer
		for (let i = 1; i <= 2; i++) {
			cardVar = Math.round(Math.random()*(deck.length-1));
			cardVar = deck[cardVar];
			cardValue = cardVar%13;

			//Checking if the card is a face card, if so set value to 10
			if(cardValue == 0 || cardValue == 11 || cardValue == 12) {
				cardValue = 10;
			};
			//Adding the absolute value of the card to the dealer's hand.
			dealerCard.push(cardValue);
			dealer.push(cardVar);

			//Changing the src attribute of the image to match the card chosen.
			
			//Removing the delt card from the deck array.
			deck.splice(cardVar, 1);
		};
		cardVar = getLargest(dealerCard);
		$("#lblDealerTotal").text(dealerCard[cardVar]);
		cardVar = dealer[cardVar];
		$(`#imgDealerCard1`).prop("src",`../assets/images/cards/card${cardVar}.JPG`);

		//Getting total value of dealer's hand.
		dealerHandValue = 0;
		for(let i = 0; i < dealerCard.length; i++) {			
			dealerHandValue += dealerCard[i];
		};

		//Displaying dealer hand total value...

		//Dealing two cards for the player
		for (let i = 1; i <= 2; i++) {
			cardVar = Math.round(Math.random()*(deck.length-1));
			cardVar = deck[cardVar];
			cardValue = cardVar%13;

			//Checking if the card is a face card, if so set value to 10
			if(cardValue == 0 || cardValue == 11 || cardValue == 12) {
				cardValue = 10;
			};
			//Adding the absolute value of the card to the dealer's hand.
			userCard.push(cardValue);
			user.push(cardValue);

			//Changing the src attribute of the image to match the card chosen.
			$(`#imgPlayerCard${i}`).prop("src",`../assets/images/cards/card${cardVar}.JPG`);
			//Removing the delt card from the deck array.
			deck.splice(cardVar, 1);
		};

		//Getting total value of players's hand.
		userHandValue = 0;
		for(let i = 0; i < userCard.length; i++) {			
			userHandValue += userCard[i];
		};

		//Displaying dealer hand total value...
		$("#lblPlayerTotal").text(userHandValue);

		//Toggling buttons
		$("#btnHit").toggleClass(`buttonA`);
		$("#btnHit").toggleClass(`buttonD`);
		$("#btnStay").toggleClass(`buttonA`);
		$("#btnStay").toggleClass(`buttonD`);
		$("#btnDouble").toggleClass(`buttonA`);
		$("#btnDouble").toggleClass(`buttonD`);
		$("#btnDeal").toggleClass(`buttonA`);
		$("#btnDeal").toggleClass(`buttonD`);
		$("#betMoney").prop('disabled', true);

		//Toggling disabled
		$(`.buttonD`).prop('disabled', true);
		$(`.buttonA`).prop('disabled', false);

	});//End of btnDeal click.


	//Code for btnBet
	$("#btnBet").click(function(event) {
		/* Act on the event */
		//Getting inputs from text boxes
		//Putting into array and removing dollar sign
		betMoneyArr = $("#betMoney").val();
		moneyArr = $("#money").text();
		moneyArr = moneyArr.split("$");

		//Getting value of money
		betMoney=$("#betMoney").val();
		betMoney =+ betMoney.replace(/\D/g,'');
		amountMoney=+moneyArr[1];

		if (betMoney>amountMoney) {
			$("#btnBet").fadeOut('fast');
			return false;
		}
		else if (betMoney<1) {
			$("#btnBet").fadeOut('fast');
			return false;	
		};

		pot=betMoney*2;

		amountMoney=amountMoney-betMoney;
		$("#money").text("$"+amountMoney);
		//Toggling buttons
		$("#btnBet").toggleClass(`buttonA`);
		$("#btnBet").toggleClass(`buttonD`);
		$("#btnDeal").toggleClass(`buttonA`);
		$("#btnDeal").toggleClass(`buttonD`);
		$("#betMoney").prop('disabled', true);

		//Toggling disabled
		$(`.buttonD`).prop('disabled', true);
		$(`.buttonA`).prop('disabled', false);
	}); //End of btnBet click


	//Code for btnHit
	$("#btnHit").click(function(event) {                                               
		/* Act on the event */                                                         
		//Getting random number for drawing
		
		cardVar = Math.round(Math.random()*(deck.length-1));
		cardVar = deck[cardVar];
		cardValue = cardVar%13;

		//Checking if the card is a face card, if so set value to 10
		if(cardValue == 0 || cardValue == 11 || cardValue == 12) {
			cardValue = 10;
		};
		//Adding the absolute value of the card to the dealer's hand.
		userCard.push(cardValue);
		user.push(cardValue);

		//Changing the src attribute of the image to match the card chosen.
		$("#userContainer").append(`<img id="imgPlayerCard${userCard.indexOf(cardValue)}" src="../assets/images/cards/card${cardVar}.JPG" class="card">`);
		//Removing the delt card from the deck array.
		deck.splice(cardVar, 1);

		//Getting total value of players's hand.
		userHandValue = 0;
		for(let i = 0; i < userCard.length; i++) {			
			userHandValue += userCard[i];
		};

		//Displaying player hand total value...
		$("#lblPlayerTotal").text(userHandValue);
		console.log(deck);

		if(userHandValue > 21) {
			$("#lblResult").text("BUST!");
			$("#loseSound")[0].play();
			$("#lblResult").css('color', '#bf2424');
			$("#lblResult").css('display', 'block');
			//Getting inputs from text boxes
			//Putting into array and removing dollar sign
			moneyArr = $("#money").text();
			moneyArr = moneyArr.split("$");
			$("#btnHit").removeClass(`buttonA`);
			$("#btnHit").addClass(`buttonD`);
			$("#btnStay").removeClass(`buttonA`);
			$("#btnStay").addClass(`buttonD`);
			$("#btnDouble").removeClass(`buttonA`);
			$("#btnDouble").addClass(`buttonD`);

			//Toggling disabled
			$("#betMoney").prop('disabled', false);
			$(`.buttonD`).prop('disabled', true);
			$(`.buttonA`).prop('disabled', false);

			//Getting value of money
			amountMoney=+moneyArr[1];

			setTimeout(function(){ 
				//Resetting variables
				dealerHandValue = 0;
				userHandValue = 0;
				dealerCard = [];
				userCard = [];
				deck = resetDeck();
				dealer = [];
				user = [];

				//Removing all cards and resetting screen
				$("#dealerContainer").empty();
				$("#userContainer").empty();
				for (let i = 1; i <= 2; i++) {
					$("#dealerContainer").append(`<img id="imgDealerCard${i}" src="../assets/images/cards/card55.JPG" class="card">`);
					$("#userContainer").append(`<img id="imgPlayerCard${i}" src="../assets/images/cards/card55.JPG" class="card">`);
				};
				
				//Toggling buttons
				$("#btnHit").removeClass(`buttonA`);
				$("#btnHit").addClass(`buttonD`);
				$("#btnStay").removeClass(`buttonA`);
				$("#btnStay").addClass(`buttonD`);
				$("#btnDouble").removeClass(`buttonA`);
				$("#btnDouble").addClass(`buttonD`);
				$("#btnBet").toggleClass(`buttonA`);
				$("#btnBet").toggleClass(`buttonD`);

				//Toggling disabled
				$("#betMoney").prop('disabled', false);
				$(`.buttonD`).prop('disabled', true);
				$(`.buttonA`).prop('disabled', false);

				//Resetting totals on labels
				$("#lblDealerTotal").text(0);
				$("#lblPlayerTotal").text(0);
				$("#lblResult").css('display', 'none');

				//Checking to see if money is 0
				if(amountMoney < 1) {
					$("#divOverlay").css('display', 'block');
					$("#divPlayAgain").css('display', 'block');
					$("#wahSound")[0].play();
				};
			}, 2000);

		};
	}); //End of btnHit click


	//Code for betMoney change detect
	$("#betMoney").on('input', function() {
		//Act on the event.
		betMoneyArr = $("#betMoney").val();
		moneyArr = $("#money").text();
		moneyArr = moneyArr.split("$");

		//Getting value of money
		betMoney=$("#betMoney").val();
		betMoney =+ betMoney.replace(/\D/g,'');
		console.log(betMoney);
		amountMoney=+moneyArr[1];

		if (betMoney>amountMoney) {
			$("#btnBet").fadeOut('fast');
			return false;
		}
		else if (betMoney<1) {
			$("#btnBet").fadeOut('fast');
			return false;	
		};
		$("#btnBet").fadeIn('fast');

	}); //End of betMoney change detect.


	//Code for btnDouble click
	$("#btnDouble").click(function(event) {
		/* Act on the event */

		if (betMoney<=amountMoney) {
			amountMoney=amountMoney-betMoney;
			betMoney=betMoney*2
			pot = betMoney*2;
			$("#betMoney").val(betMoney);
			$("#money").text("$"+amountMoney);
			//Disabling the double button
			
			//Toggling buttons 
			$("#btnDouble").removeClass(`buttonA`);
			$("#btnDouble").addClass(`buttonD`);

			//Toggling disabled property
			$(`.buttonD`).prop('disabled', true);
			$(`.buttonA`).prop('disabled', false);
		}
		//code for the jumpscare warnings
		else if (doubleCount == 2) {
			$("#lblResult").text("You can't double, stop trying!");
			$("#lblResult").css('display', 'block');
			$("#lblResult").css('color', 'red');
			$("#noMoneySound")[0].play();
			setTimeout(function() {
				$("#lblResult").fadeOut('fast');
			}, 1500);
			doubleCount++;
		}
		else if (doubleCount == 3) {
			$("#lblResult").text("You have been warned...");
			$("#lblResult").css('display', 'block');
			$("#lblResult").css('color', 'red');
			$("#noMoneySound")[0].play();
			setTimeout(function() {
				$("#lblResult").fadeOut('fast');
			}, 1500);
			doubleCount++;
		} //end of jumpscare warnings
		//code for jumpscare
		else if (doubleCount == 4) {
			$("#lblResult").text("STOP!");
			$("#lblResult").css('color', 'red');
			$("#lblResult").css('display', 'block');
			$("#imgScare").css('display', 'block');
			$("#lblResult").css('font-size', '4em');
			$("#scareSound")[0].play();
			$("#noMoneySound")[0].play();
			setTimeout(function() {
				$("#lblResult").fadeOut('fast');
				$("#imgScare").fadeOut('fast');
				doubleCount=0;
			}, 1500);
		} //end of code for jumpscare
		else {
			$("#lblResult").text("Ooops, you're not that rich, you poor child.");
			$("#lblResult").css('display', 'block');
			$("#lblResult").css('color', 'yellow');
			$("#noMoneySound")[0].play();
			setTimeout(function() {
				$("#lblResult").fadeOut('fast');
			}, 2000);
			doubleCount++;
		}
		console.log(doubleCount);
	});// End of btnDouble click


	//Code for btnStay click
	$("#btnStay").click(function(event) {
		/* Act on the event */
		//Checking if the dealer's total is above 16
		while(dealerHandValue < 16) {
			cardVar = Math.round(Math.random()*(deck.length-1));
			cardVar = deck[cardVar];
			cardValue = cardVar%13;

			//Checking if the card is a face card, if so set value to 10
			if(cardValue == 0 || cardValue == 11 || cardValue == 12) {
				cardValue = 10;
			};
			//Adding the absolute value of the card to the dealer's hand.
			dealerCard.push(cardValue);
			dealer.push(cardVar);

			//Changing the src attribute of the image to match the card chosen.
			
			//Removing the delt card from the deck array.
			deck.splice(cardVar, 1);

			//Getting total value of dealer's hand.
			dealerHandValue = 0;
			for(let i = 0; i < dealerCard.length; i++) {			
				dealerHandValue += dealerCard[i];
			};
		}; //End of drawing cards for dealer

		//Displaying dealer hand total value...
		$("#lblDealerTotal").text(dealerHandValue);

		//Resetting and showing all dealer cards
		$("#dealerContainer").empty();
		for(let i = 1; i <= dealerCard.length; i++) {
			$("#dealerContainer").append(`<img id="imgDealerCard${i}" src="../assets/images/cards/card${dealer[i-1]}.JPG" class="card">`);
		};

		if(dealerHandValue > 21) {
			$("#lblResult").text("DEALER BUST!");

			$("#lblResult").css('color', 'green');
			$("#lblResult").css('display', 'block');
			amountMoney += pot;
			$("#winSound")[0].play();
		}
		else if (dealerHandValue > userHandValue) {
			$("#lblResult").text("YOU LOST...");
			$("#loseSound")[0].play();
			$("#lblResult").css('color', '#bf2424');
			$("#lblResult").css('display', 'block');
			//Getting inputs from text boxes
			//Putting into array and removing dollar sign
			moneyArr = $("#money").text();
			moneyArr = moneyArr.split("$");

			//Getting value of money
			amountMoney=+moneyArr[1];
			//Checking to see if money is 0
			if(amountMoney < 1) {
				setTimeout(function() {
					$("#divOverlay").css('display', 'block');
					$("#divPlayAgain").css('display', 'block');
					$("#wahSound")[0].play();
				}, 1500);
			};

		}
		else if (userHandValue > dealerHandValue) {
			$("#lblResult").text("YOU WON!");
			$("#lblResult").css('color', 'green');
			$("#lblResult").css('display', 'block');
			amountMoney += pot;
			$("#winSound")[0].play();
		}
		else if (userHandValue == dealerHandValue) {
			$("#lblResult").text("TIE!");
			$("#lblResult").css('color', 'yellow');
			$("#lblResult").css('display', 'block');
			amountMoney += betMoney;
		};
		$("#money").text("$"+amountMoney);
		//Toggling buttons 
		$("#btnHit").toggleClass(`buttonA`);
		$("#btnHit").toggleClass(`buttonD`);
		$("#btnStay").toggleClass(`buttonA`);
		$("#btnStay").toggleClass(`buttonD`);
		$("#btnDouble").removeClass(`buttonA`);
		$("#btnDouble").addClass(`buttonD`);
		$("#btnBet").toggleClass(`buttonA`);
		$("#btnBet").toggleClass(`buttonD`);

		//Toggling disabled
		$("#betMoney").prop('disabled', false);
		$(`.buttonD`).prop('disabled', true);
		$(`.buttonA`).prop('disabled', false);

		setTimeout(function() {
			//Resetting variables
			dealerHandValue = 0;
			userHandValue = 0;
			dealerCard = [];
			userCard = [];
			deck = resetDeck();
			dealer = [];
			user = [];

			//Removing all cards and resetting screen
			$("#dealerContainer").empty();
			$("#userContainer").empty();
			for (let i = 1; i <= 2; i++) {
				$("#dealerContainer").append(`<img id="imgDealerCard${i}" src="../assets/images/cards/card55.JPG" class="card">`);
				$("#userContainer").append(`<img id="imgPlayerCard${i}" src="../assets/images/cards/card55.JPG" class="card">`);
			};
			//Resetting totals on labels
			$("#lblDealerTotal").text(0);
			$("#lblPlayerTotal").text(0);
			$("#lblResult").css('display', 'none');
		}, 1500);

	}); //End of btnStay click


	//Code for Background Music
	$("#btnMusic").click(function(event) {
		/* Act on the event */
		$("#backgroundMusic")[0].loop = true;
		if(!winter) {
			if(muted) {
				$("#backgroundMusic")[0].play();
				muted = false;
				$("#imgMusic").attr('src', '../assets/images/soundImage.png');
			}
			else {
				$("#backgroundMusic")[0].pause();
				muted = true;
				$("#imgMusic").attr('src', '../assets/images/muteImage.png');
			};
		}
		else if(winter) {
			if(muted) {
				$("#backgroundMusicWin")[0].play();
				muted = false;
				$("#imgMusic").attr('src', '../assets/images/soundImage.png');
			}
			else {
				$("#backgroundMusicWin")[0].pause();
				muted = true;
				$("#imgMusic").attr('src', '../assets/images/muteImage.png');
			};
		};
	}); //End of btnMusic click


	//Extra:
	//Konami Code Reference 
	//https://stackoverflow.com/questions/31626852/how-to-add-konami-code-in-a-website-based-on-html
	//Variables are listed on top

	// add keydown event listener
	document.addEventListener('keydown', function(e) {
		// get the value of the key code from the key map
		var key = allowedKeys[e.keyCode];
		// get the value of the required key from the konami code
		var requiredKey = konamiCode[konamiCodePosition];

		// compare the key with the required key
		if (key == requiredKey) {

			// move to the next key in the konami code sequence
			konamiCodePosition++;

		 // if the last key is reached, change theme
			if (konamiCodePosition == konamiCode.length) {
				winterTheme();
				if(!muted) {
					$("#backgroundMusic")[0].pause();
					$("#backgroundMusicWin")[0].play();
				};
				konamiCodePosition = 0;
			}
		} 
		else {
			konamiCodePosition = 0;
		}
	}); //End of Konami Code check

	$("#btnSetting").click(function(event) {
		/* Act on the event */
		$("#divOverlay").css('display', 'block');
		$("#divSettings").css('display', 'block');
	}); //End of btnName click

	$("#btnNameEnt").click(function(event) {
		/* Act on the event */
		name = $("#txtName").val();
		$("#lblName").text(name);
		$("#divOverlay").css('display', 'none');
		$("#divSettings").css('display', 'none');
	}); //End of btnNameEnt click
});//End of document ready.

//winter theme code
function winterTheme() {
	winter = true;
	//Code to change winter theme
	//Adding styles to head tag to overwrite current styles.
	$("head").append('<style type="text/css">');
	$("head").append('<style type="text/css">.buttonA {background-color:#039dfc; box-shadow: 0 6px #05589C} .buttonD {background-color: #05589C; box-shadow: 0 6px #05589C;}</style>')
	$("head").append('<style type="text/css">.button:active {box-shadow: 0 0 #05589C;top: 6px;outline: none;} .button:hover {box-shadow: 0 4px #05589C;top: 2px;}</style>');
	$("head").append('<style type="text/css">.Points {background-color: skyblue; border-color: blue;}</style>');
	$("head").append('<style type="text/css">#dealer, #player {background-color: rgba(135,206,235, 0.5); border-color: rgba(0, 0, 255, 0.5);}</style>');

	//Background
	$("body").css("background-image", "url('../assets/images/winterTheme.png')");
	$("#mainGame").css('background-image', "url('../assets/images/snowing.gif')");
	
};

//reset deck
function resetDeck() {
	let deckArr = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
		11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
		21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
		31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
		41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 
		51, 52
	];
	return deckArr;
};

//returns the largest 
function getLargest(array) {
	let greatest = array[0];
	for(let i = 0; i < array.length; i++) {
		if(array[i] > greatest) {
			greatest = array[i];
		};
	};
	return array.indexOf(greatest);
};

//Checks if inputed bet is a non-numeric digit
function isNumber(eve) {
	let char = eve.key;
	if(char == 0 || char == 1 || char == 2 || char == 3 || char == 4 || char == 5 || char == 6 || char == 7 || char == 8 || char == 9) {
		return true;
	}
	else {
		return false;
	}
}
