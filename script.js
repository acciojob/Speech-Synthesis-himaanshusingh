const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

// Get the rate and pitch inputs
const rateInput = document.querySelector('[name="rate"]');
const pitchInput = document.querySelector('[name="pitch"]');
const textInput = document.querySelector('[name="text"]');

// Initialize the speech synthesis
msg.text = textInput.value;

// Populate voices dropdown
function populateVoices() {
  voices = speechSynthesis.getVoices();

  // Clear existing options (except the first one)
  voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';

  // Add available voices to dropdown
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    if (voice.default) {
      option.textContent += " — DEFAULT";
    }
    voicesDropdown.appendChild(option);
  });
}

// Set the selected voice
function setVoice() {
  const selectedVoice = voices.find((voice) => voice.name === this.value);
  msg.voice = selectedVoice;
  if (speechSynthesis.speaking) {
    toggleSpeak();
    setTimeout(toggleSpeak, 100);
  }
}

// Toggle speak/stop
function toggleSpeak() {
  speechSynthesis.cancel();
  if (!textInput.value.trim()) {
    alert("Please enter some text to speak!");
    return;
  }
  speechSynthesis.speak(msg);
}

// Stop speech immediately
function stopSpeak() {
  speechSynthesis.cancel();
}

// Update utterance options when sliders change
function setOption() {
  msg[this.name] = this.value;
  if (
    speechSynthesis.speaking &&
    (this.name === "rate" || this.name === "pitch")
  )
    toggleSpeak();
}

// Update text when textarea changes
function setText() {
  msg.text = this.value;
}

// Event Listeners
speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
speakButton.addEventListener("click", toggleSpeak);
stopButton.addEventListener("click", stopSpeak);

// Add event listeners for rate and pitch sliders
rateInput.addEventListener("change", setOption);
pitchInput.addEventListener("change", setOption);
textInput.addEventListener("input", setText);

// Initialize voices on page load
populateVoices();
