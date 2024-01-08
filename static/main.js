/**
 * Returns the current datetime for the message creation.
 */
function getCurrentTimestamp() {
	return new Date();
}

/**
 * Renders a message on the chat screen based on the given arguments.
 * This is called from the `showUserMessage` and `showBotMessage`.
 */
function renderMessageToScreen(args) {
	// local variables
	let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
	let messagesContainer = $('.messages');

	// init element
	let message = $(`
	<li class="message ${args.message_side}">
		<div class="avatar"></div>
		<div class="text_wrapper">
			<div class="text">${args.text}</div>
			<div class="timestamp">${displayDate}</div>
		</div>
	</li>
	`);

	// add to parent
	messagesContainer.append(message);

	// animations
	setTimeout(function () {
		message.addClass('appeared');
	}, 0);
	messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}


/**
 * Displays the user message on the chat screen. This is the right side message.
 */
function showUserMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'right',
	});
}

/**
 * Displays the chatbot message on the chat screen. This is the left side message.
 */
function showBotMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'left',
	});
}

/**
 * Get input from user and show it on screen on button click.
 */
$('#send_button').on('click', function (e) {
	// get and show message and reset input
	if($('#exampleFormControlTextarea1').val()!== '' && $('#exampleFormControlTextarea2').val()!== '' ){
		showUserMessage( "<h3> Your Problem: </h3> " + $('#exampleFormControlTextarea1').val() + "<h3> Your Solution: </h3> " + $('#exampleFormControlTextarea2').val());
		// Make api call in order to handle the users input
		makeApiCall($('#exampleFormControlTextarea1').val(), $('#exampleFormControlTextarea2').val())
		$('#exampleFormControlTextarea1').val('');
		$('#exampleFormControlTextarea2').val('');

	}else{
		showAlert("You are trying to send an empty input for the AI! Please input something.", 'alert-danger')
	}
});

/**
 * Set initial bot message to the screen for the user.
 */
$(window).on('load', function () {
	showBotMessage('Hello there! Type in your problem and your solution.');
});

/**
 *  Creates an alert to the screen for the user.
 */

function showAlert(message, alertType) {
    // Create Bootstrap alert dynamically
	if (!isAlertDisplayed()) {
		let alertDiv = document.createElement('div');
		alertDiv.classList.add('alert', alertType, 'mt-3');
		alertDiv.setAttribute('role', 'alert');
		alertDiv.textContent = message;

		// Append the alert to the document body
		document.body.insertBefore(alertDiv, document.body.firstChild);
		

		// Auto-dismiss the alert after 3 seconds (adjust as needed)
		setTimeout(function() {
			alertDiv.remove();
		}, 3000);
	}
}

/**
 * Check if the alert is present in the DOM
 */
function isAlertDisplayed() {
    return !!document.querySelector('.alert');
}

/**
 * Makes an api call to the AI to receive the result
 */
function makeApiCall(problem, solution) {
	// Public api to test ui
    fetch('/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // You can add other headers as needed
        },
        body: JSON.stringify({
            problem: problem,
            solution: solution
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the data from the API response
			showBotMessage(data.answer)
            console.log('API Response:', data);
        })
        .catch(error => {
            // Handle errors during the API call
            console.error('Error during API call:', error);
        });
}