document.querySelector('#vienas').addEventListener('click', garsas)

function garsas() {
	const sound1 = new Audio('static/audio/vienas.m4a')
	sound1.play()
}
// challenge 1
console.log('veikia')
function ageInDays() {
	let birthYear = prompt('What is your birth year?')
	let ageInDayss = (2020 - birthYear) * 365
	console.log(ageInDayss)
	let h1 = document.createElement('h1')
	let textAnswer = document.createTextNode(
		'You are ' + ageInDayss + ' days old'
	)
	h1.setAttribute('id', 'ageInDays')
	h1.appendChild(textAnswer)
	document.getElementById('textResult').appendChild(h1)
	document.getElementById('result').textContent = ageInDayss
}

function resetResult() {
	document.getElementById('result').textContent = ''
	//document.getrElementById('ageInDays').remove()
}

// challenge 1: your age in days END

//challenge 2: cat generator START
function generateCat() {
	let image = document.createElement('img')
	let div = document.getElementById('flex-cat-gen')
	image.src = './static/images/car1.jpg'
	div.appendChild(image)
}
// Challenge 2: Cat Generator END

// Challenge 3: Rock, Paper, Scissors START
function rpsGame(yourChoise) {
	console.log(yourChoise.id, yourChoise.src)
	let humanChoise = yourChoise.id
	let botChoise = numberToChoise(randomInteger())
	results = decideWinner(humanChoise, botChoise)
	let message = finalMessage(results)
	console.log(message)
	rpsFrontEnd = rpsFrontEnd(yourChoise.id, botChoise, message)
}

function randomInteger() {
	return Math.floor(Math.random() * 3)
}
function numberToChoise(number) {
	console.log(['rock', 'paper', 'scissors'][number])
	return ['rock', 'paper', 'scissors'][number]
}
function decideWinner(yourChoise, computerChoise) {
	let rpsDatabase = {
		rock: {
			scissors: 1,
			rock: 0.5,
			paper: 0
		},
		paper: {
			rock: 1,
			paper: 0.5,
			scissors: 0
		},
		scissors: {
			paper: 1,
			rock: 0,
			scissors: 0.5
		}
	}
	let yourScore = rpsDatabase[yourChoise][computerChoise]
	let computerScore = rpsDatabase[computerChoise][yourChoise]
	console.log(yourScore, computerScore)
	return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]) {
	if (yourScore === 0) {
		return { message: 'You lost!', color: 'red' }
	} else if (yourScore === 0.5) {
		return { message: 'You tied!', color: 'yellow' }
	} else {
		return { message: 'You win!', color: 'green' }
	}
}

function rpsFrontEnd(humanImageChoise, botImageChoise, finalMessage) {
	let imagesDatabase = {
		rock: document.getElementById('rock').src,
		paper: document.getElementById('paper').src,
		scissors: document.getElementById('scissors').src
	}
	document.getElementById('rock').remove()
	document.getElementById('paper').remove()
	document.getElementById('scissors').remove()

	let humanDiv = document.createElement('div')
	let botDiv = document.createElement('div')
	let messageDiv = document.createElement('div')

	humanDiv.innerHTML =
		"<img src='" +
		imagesDatabase[humanImageChoise] +
		"' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>"
	document.getElementById('flex-box-rps-div').appendChild(humanDiv)

	messageDiv.innerHTML =
		"<h1 style='color:" +
		finalMessage['color'] +
		"'>" +
		finalMessage['message'] +
		'</h1>'
	document.getElementById('flex-box-rps-div').appendChild(messageDiv)

	botDiv.innerHTML =
		"<img src='" +
		imagesDatabase[botImageChoise] +
		"' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>"
	document.getElementById('flex-box-rps-div').appendChild(botDiv)
}
// Challenge 3: Rock, Paper, Scissors END

// Challenge 4: Change the Color of All Buttons START
let all_buttons = document.getElementsByTagName('button')

let copyAllButtons = []

for (let i = 0; i < all_buttons.length; i++) {
	copyAllButtons.push(all_buttons[i].classList[1])
}
console.log(copyAllButtons)

function buttonColorChange(buttonThingy) {
	if (buttonThingy.value === 'red') {
		buttonRed()
	} else if (buttonThingy.value === 'green') {
		buttonGreen()
	} else if (buttonThingy.value === 'reset') {
		buttonColorReset()
	} else if (buttonThingy.value === 'random') {
		randomColors()
	}a
}

function buttonRed() {
	for (let i = 0; i < all_buttons.length; i++) {
		all_buttons[i].classList.remove(all_buttons[i].classList[1])
		all_buttons[i].classList.add('btn-danger')
	}
}
function buttonGreen() {
	for (let i = 0; i < all_buttons.length; i++) {
		all_buttons[i].classList.remove(all_buttons[i].classList[1])
		all_buttons[i].classList.add('btn-success')
	}
}
function buttonColorReset() {
	for (let button in all_buttons) {
		all_buttons[button].classList.remove(all_buttons[button].classList[1])
		all_buttons[button].classList.add(copyAllButtons[button])
	}
}
function randomColors() {
	let choises = ['btn-primary', 'btn-success', 'btn-danger', 'btn-warning']
	for (let button in all_buttons) {
		all_buttons[button].classList.remove(all_buttons[button].classList[1])
		let randomCol = choises[Math.floor(Math.random() * 4)];
		all_buttons[button].classList.add(randomCol)
	}
}

// Challenge 4: Change the Color of All Buttons END

// Challenge 5:  Blackjack START
let blackjackGame = {
	'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
	'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
	'cards' : ['k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8', 'k9', 'k10', 'kb', 'kd', 'kk', 'kt'],
	'cardsMap': {'k2': 2, 'k3': 3, 'k4': 4, 'k5': 5, 'k6': 6, 'k7': 7, 'k8': 8, 'k9':9, 'k10': 10, 'kb': 10, 'kd': 10, 'kk': 10, 'kt': [1, 11]},
	'wins': 0,
	'losses': 0,
	'draws': 0,
	'isStand': false,
	'turnsOver': false,
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

// cia garsai, bet as ju neturiu ir niekur nenaudoju
// const hitSound = new Audio('static/sounds/swish.m4a')
// const winSound = new Audio('static/sounds/cash.mp3')
// const lossSound = new Audio('static/sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit)
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic)
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)

function blackjackHit() {
	if (blackjackGame['isStand'] === false) {
		let card = randomCard()
		showCard(card, YOU)
		
		//showCard(DEALER)
		updateScore(card, YOU)
		showScore(YOU)
		console.log(YOU['score'])
	}	
}

function showCard(card, activePlayer) {
	if (activePlayer['score'] <= 21) {
		let cardImage = document.createElement('img')
		cardImage.src = `/static/cardsImg/${card}.PNG`
		document.querySelector(activePlayer['div']).appendChild(cardImage)
	}
}

function randomCard() { 
	let randomIndex = Math.floor(Math.random() * 13)
	return blackjackGame['cards'][randomIndex]
}

function blackjackStand() {
	alert('deal')
}

function blackjackDeal() {
	if (blackjackGame['turnsOver'] === true) {
		blackjackGame['isStand'] = false

//	let winner = computeWinner()
//	showResult(winner)
	// showResult(computeWinner())  cia analogiskas uzrasas virsutinems dviem eilutems
	let yourImages = document.querySelector('#your-box').querySelectorAll('img')
	let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')
	for (let i = 0; i < yourImages.length; i++) {
		yourImages[i].remove()
	}
	for (let i = 0; i < dealerImages.length; i++) {
		dealerImages[i].remove()
	}
	YOU['score'] = 0
	DEALER['score'] = 0

	document.querySelector('#your-blackjack-result').textContent = 0
	document.querySelector('#dealer-blackjack-result').textContent = 0
	document.querySelector('#your-blackjack-result').style.color = 'black'
	document.querySelector('#dealer-blackjack-result').style.color = 'black'
	document.querySelector('#blackjack-result').textContent = "Let's Play!"
	document.querySelector('#blackjack-result').style.color = 'black'
	blackjackGame['turnsOver'] = false
	}
}

function updateScore(card, activePlayer) {
	if (card === "kt") {
		if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
			activePlayer['score'] += blackjackGame['cardsMap'][card][1]
		} else {
			activePlayer['score'] += blackjackGame['cardsMap'][card][0]
		}
	} else {
		activePlayer['score'] += blackjackGame['cardsMap'][card]
	}	
}

function showScore(activePlayer) {
	if (activePlayer['score'] > 21) {
		document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust!'
		document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
	} else {
		document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

async function dealerLogic() {
	blackjackGame['isStand'] = true
	while (DEALER['score'] < 16  && blackjackGame['isStand'] === true) {
		let card = randomCard()
		showCard(card, DEALER)
		updateScore(card, DEALER)
		showScore(DEALER)
		// showResult(computeWinner())
		await sleep(1000)
	}

	
		blackjackGame['turnsOver'] = true
		let winner = computeWinner()
		showResult(winner)
	
}

function computeWinner() {
	let winner;
	if (YOU['score'] <= 21) {
		if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
			blackjackGame['wins']++
			winner = YOU
		} else if (YOU['score'] < DEALER['score']) {
			blackjackGame['losses']++
			winner = DEALER
		}
		else if (YOU['score'] === DEALER['score']) {
			blackjackGame['draws']++
			
		}
	} else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
		blackjackGame['losses']++
			winner = DEALER
	} else if (YOU['score'] > 21 && DEALER['score'] > 21) {
		blackjackGame['draws']++
	}
	console.log(blackjackGame['wins'], blackjackGame['losses'], blackjackGame['draws'])
	return winner
}

function showResult(winner) {
	let message, messageColor
	if (blackjackGame['turnsOver'] === true) {
		if (winner === YOU) {
			document.querySelector('#wins').textContent = blackjackGame['wins']
			message = 'You won!'
			messageColor = 'green'
			// winSound.play()   sita eilute grotu muzika
		} else if (winner === DEALER) {
			document.querySelector('#losses').textContent = blackjackGame['losses']
			message = 'You lost!'
			messageColor = 'red'
			// lossSound.play()   grotu muzikele
		} else {
			document.querySelector('#draws').textContent = blackjackGame['draws']
			message = 'You drew!'
			messageColor = 'Yellow'
		}
		document.querySelector('#blackjack-result').textContent = message
		document.querySelector('#blackjack-result').style.color = messageColor
	}
}
// Challenge 5: Blackjack END
