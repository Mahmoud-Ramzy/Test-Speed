let paragraphs = [
  "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
  "It is during our darkest moments that we must focus to see the light.",
  "Do not go where the path may lead, go instead where there is no path and leave a trail.",
  "You will face many defeats in life, but never let yourself be defeated.",
  "Life is a succession of lessons which must be lived to be understood.",
  "In the end, it's not the years in your life that count. It's the life in your years.",
  "Never let the fear of striking out keep you from playing the game.",
  "The only impossible journey is the one you never begin.",
  "In this life we cannot do great things. We can only do small things with great love.",
  "Life is what happens when you're busy making other plans.",
  "Go confidently in the direction of your dreams! Live the life you've imagined.",
  "Life is really simple, but we insist on making it complicated.",
  "Many of life's failures are people who did not realize how close they were to success when they gave up.",
  "Keep smiling, because life is a beautiful thing and there's so much to smile about.",
  "In three words I can sum up everything I've learned about life: it goes on.",
  "Success is not final; failure is not fatal: It is the courage to continue that counts.",
  "The secret of success is to do the common thing uncommonly well.",
  "Don't be distracted by criticism. Remember : the only taste of success some people get is to take a bite out of you.",
  "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.",
  "The real test is not whether you avoid this failure, because you won't. It's whether you let it harden or shame you into inaction, or whether you learn from it; whether you choose to persevere.",
  "The road to success and the road to failure are almost exactly the same.",
  "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
  "Success is walking from failure to failure with no loss of enthusiasm.",
  "People who succeed have momentum. The more they succeed, the more they want to succeed and the more they find a way to succeed. Similarly, when someone is failing, the tendency is to get on a downward spiral that can even become a self-fulfilling prophecy",
  "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
];
let inputField = document.querySelector(".inp");
const displayText = document.querySelector(".Display p");
const accuracy = document.querySelector(".acc p");
const time = document.querySelector(".time p");
const WPM = document.querySelector(".WPM p");
const CPM = document.querySelector(".CPM p");

let charIndx = 0,
  mistakes = 0,
  timer,
  maxTime = 60,
  timeLeft = 60,
  isFirstChar = true,
  AllIndex = 0;

randomParagraph();
function randomParagraph() {
  let rand = Math.floor(Math.random() * paragraphs.length);
  //   make each character as a span in the random paragraph
  paragraphs[rand].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    displayText.innerHTML += spanTag;
  });
  document.addEventListener("keydown", () => inputField.focus());
  displayText.addEventListener("click", () => inputField.focus());
  displayText.querySelector("span").classList.add("active");
}

function initTyping() {
  const chars = displayText.querySelectorAll("span");
  let TypedChar = inputField.value.split("")[charIndx];
  if (timeLeft > 0) {
    if (isFirstChar) {
      //to call it only after first char typed
      timer = setInterval(initTimer, 1000);
      isFirstChar = false;
    }
    console.log(TypedChar);
    if (TypedChar == null) {
      chars[charIndx].classList.remove("active");
      charIndx--;
      AllIndex--;
      if (chars[charIndx].classList.contains("incorrect")) {
        mistakes--;
      }
      chars[charIndx].classList.remove("correct", "incorrect");
    } else {
      if (chars[charIndx].innerHTML === TypedChar) {
        chars[charIndx].classList.add("correct");
        chars[charIndx].classList.remove("active");
      } else {
        mistakes++;
        chars[charIndx].classList.add("incorrect");
        chars[charIndx].classList.remove("active");
      }
      charIndx++;
      AllIndex++;
    }
    let wpm = Math.round(
      ((AllIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    CPM.innerHTML = AllIndex - mistakes;
    WPM.innerHTML = wpm;
    if (AllIndex !== 0) {
      accuracy.innerHTML = Math.round(((AllIndex - mistakes) / AllIndex) * 100);
    }
    if (charIndx === chars.length) {
      inputField.value = "";
      displayText.innerHTML = "";
      randomParagraph();
      charIndx = 0;
    }
    chars[charIndx].classList.add("active");
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
}

inputField.addEventListener("input", initTyping);

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerHTML = timeLeft;
  } else {
    clearInterval(timer);
    let wpm = Math.round(
      ((charIndx - mistakes) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    CPM.innerHTML = charIndx - mistakes;
    WPM.innerHTML = wpm;
  }
}
