document.querySelector("#submitBtn").addEventListener("click", function(event) {
    event.preventDefault();
    gradeQuiz();
  });
  
  document.querySelector("#resetBtn").addEventListener("click", function() {
    resetQuiz();
  });
  
  // global vars
  var score = 0;
  var attempts = localStorage.getItem("total_attempts");
  if (!attempts) attempts = 0;
  attempts = Number(attempts);
  
  // randomize q4 choices
  displayQ4Choices();
  
  function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i = 0; i < q4ChoicesArray.length; i++) {
      document.querySelector("#q4Choices").innerHTML += 
        `<input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}" aria-label="${q4ChoicesArray[i]}">
         <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
    }
  }
  
  function gradeQuiz() {
    score = 0;
    if (!isFormValid()) return;
  
    // Q1
    let q1 = document.querySelector("#q1").value.trim().toLowerCase();
    q1 === "sacramento" ? rightAnswer(1) : wrongAnswer(1);
  
    // Q2
    let q2 = document.querySelector("#q2").value;
    q2 === "Florida" ? rightAnswer(2) : wrongAnswer(2);
  
    // Q3
    let q3Right = document.querySelector("#Jefferson").checked &&
                  document.querySelector("#Roosevelt").checked &&
                  document.querySelector("#Lincoln").checked &&
                  document.querySelector("#Washington").checked &&
                  !document.querySelector("#Jackson").checked;
    q3Right ? rightAnswer(3) : wrongAnswer(3);
  
    // Q4
    let q4 = document.querySelector("input[name=q4]:checked");
    if (q4 && q4.value === "Rhode Island") rightAnswer(4);
    else wrongAnswer(4);
  
    // Q5
    let q5 = document.querySelector("#q5").value;
    q5 === "Pacific" ? rightAnswer(5) : wrongAnswer(5);
  
    // Q6
    let q6 = document.querySelector("input[name=q6]:checked");
    if (q6 && q6.value === "Alaska") rightAnswer(6);
    else wrongAnswer(6);
  
    // Q7
    let q7 = document.querySelector("#q7").value.trim().toLowerCase();
    q7 === "new york" ? rightAnswer(7) : wrongAnswer(7);
  
    // Q8
    let q8Right = document.querySelector("#Alaska").checked &&
                  document.querySelector("#Hawaii").checked &&
                  !document.querySelector("#Maine").checked &&
                  !document.querySelector("#Florida").checked;
    q8Right ? rightAnswer(8) : wrongAnswer(8);
  
    // Q9
    let q9 = document.querySelector("#q9").value;
    q9 === "Chicago" ? rightAnswer(9) : wrongAnswer(9);
  
    // Q10
    let q10 = document.querySelector("#q10").value.trim().toLowerCase();
    q10 === "rio grande" ? rightAnswer(10) : wrongAnswer(10);
  
    // total score
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    document.querySelector("#totalScore").className = score >= 80 ? "text-success fw-bold" : "text-danger fw-bold";
    if (score >= 80) document.querySelector("#totalScore").innerHTML += " - Great job!";
  
    attempts++;
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${attempts}`;
    localStorage.setItem("total_attempts", attempts);
  }
  
  function isFormValid() {
    if (document.querySelector("#q1").value.trim() === "" ||
        document.querySelector("#q2").value === "" ||
        !document.querySelector("input[name=q4]:checked") ||
        document.querySelector("#q5").value === "" ||
        !document.querySelector("input[name=q6]:checked") ||
        document.querySelector("#q7").value.trim() === "" ||
        document.querySelector("#q9").value === "" ||
        document.querySelector("#q10").value.trim() === "") {
      alert("Please answer all questions before submitting.");
      return false;
    }
    return true;
  }
  
  function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white p-2";
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#markImg${index}`).innerHTML = `<img src="img/checkmark.png" alt="correct">`;
    score += 10;
  }
  
  function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).className = "bg-danger text-white p-2";
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#markImg${index}`).innerHTML = `<img src="img/xmark.png" alt="incorrect">`;
  }
  
  function resetQuiz() {
    document.querySelector("#quizForm").reset();
    for (let i = 1; i <= 10; i++) {
      document.querySelector(`#markImg${i}`).innerHTML = "";
      document.querySelector(`#q${i}Feedback`).innerHTML = "";
      document.querySelector(`#q${i}Feedback`).className = "feedback-box";
    }
    document.querySelector("#totalScore").innerHTML = "";
  }
  