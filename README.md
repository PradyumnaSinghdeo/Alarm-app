# Alarm-app
HTML::
->A basic form to input hours, minutes, and seconds, along with a Start New Timer button.
->A section to display active timers.

CSS::
->Basic styling to ensure the UI looks clean and organized.
->Flexbox is used to ensure proper alignment and spacing.

JS::
->startNewTimer(): This function collects the user input, validates it, and starts a new timer.
->renderTimers(): Updates the display of active timers.
->startTimerInterval(): Uses `setInterval` to update the timer every second.
->stopTimer(): Stops a specific timer.
->endTimer(): Handles the end of a timer, including playing an audio alert and changing the timer's appearance.