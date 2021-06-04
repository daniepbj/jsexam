// get people from jsnon


/* 
fetch( 'list.json' )
  .then( response => response.json() )
  .then( data => {
    const div = document.createElement( 'div' );
    const h1 = document.createElement( 'h1' );
    let count = 1;

    data.forEach( ( person ) => {
      h1.innerHTML = `Total persons: ${ count }`;
      div.innerHTML += `
      <tr>  
      <th>Person: ${ count }</th>
        <th>Name: ${ person.name }</th>
        <th>Age: ${ person.age }</th>
        <th>City: ${ person.city }</th>
      </tr>`;
      count++;
    } );
    output.appendChild( h1 );
    output.appendChild( div );
  } );
// match with category
// print in table
*/



//sourceURL = getStudents ( studenter.json)
async function getPeople(sourceURL) {
    try {
        const result = await fetch(sourceURL)
        //Oppdaterer global variabel studenlist med innehåll i studenter.json
        return await result.json()
        //Vis det inte går att fetch, log error
    } catch (e) {
        console.log("failed to fetch people", e)
    }
}

function tableCol(content, tagName) {
    const tableCol = document.createElement(tagName);
    tableCol.innerHTML = content;
    return tableCol
}

function renderPerson(person) {
    const tableRow = document.createElement('tr');
    tableRow.appendChild(tableCol(person.name, 'td'))
    tableRow.appendChild(tableCol(person.age, 'td'))
    tableRow.appendChild(tableCol(person.city, 'td'))

    return tableRow
}

function renderTableHeaders(fields) {
    const headerRow = document.createElement('tr');
    fields.map((field) => headerRow.appendChild(tableCol(field, 'th')))
    return headerRow
}

function renderPeopleList(element, peopleList) {
    element.appendChild(renderTableHeaders(['name', 'age', 'city']))
    peopleList.map((person) => element.appendChild(renderPerson(person)));
}

const familyListElement = document.querySelector('.familyOutput');
const friendListElement = document.querySelector('.friendOutput');

getPeople('../list.json').then((l) => {
    renderPeopleList(familyListElement, l.filter((person) => (person.category === "family")))
    renderPeopleList(friendListElement, l.filter((person) => (person.category === "friend")))
});

const quizData = [
    {
        question: "What is the capitol of Norway?",
        answers: [
            { value: "Oslo", correct: true },
            { value: "Stockholm" },
            { value: "Ulan Batuur" }
        ]
    },
    {
        question: "What is the capitol of Sweden?",
        answers: [
            { value: "Oslo" },
            { value: "Stockholm", correct: true },
            { value: "Ulan Batuur" }
        ]
    },
    {
        question: "What genre of music is Michael Jackson known for?",
        answers: [
            { value: "Oslo" },
            { value: "Pop music", correct: true },
            { value: "Ulan Batuur" }
        ]
    },
    {
        question: "Who is the current president of the United States?",
        answers: [
            { value: "Michael Jackson" },
            { value: "Joe Biden", correct: true },
            { value: "Ulan Batuur" }
        ]
    },
    {
        question: "Which of these Pokemon are electric type?",
        answers: [
            { value: "Pikachu", correct: true },
            { value: "Joe Biden" },
            { value: "Michael Jackson" }
        ]
    },
]

function renderAlternative(questionName, index, answerString) {
    const alternativeDiv = document.createElement('div')
    const radioButton = document.createElement('input')
    radioButton.type = "radio"
    radioButton.value = index
    radioButton.name = questionName
    const label = document.createElement('label')
    label.textContent = answerString
    alternativeDiv.appendChild(radioButton);
    alternativeDiv.appendChild(label);
    return alternativeDiv
}

function renderQuestion(question) {
    const questionDiv = document.createElement('div')
    questionDiv.className = "quiz-question"
    const questionHeading = document.createElement('h3')
    questionHeading.textContent = question.question
    questionDiv.appendChild(questionHeading)
    const answersDiv = document.createElement('div')
    answersDiv.className = "quiz-answers"
    question.answers.map((answer, index) => answersDiv.appendChild(renderAlternative(question.question, index, answer.value)))
    questionDiv.appendChild(answersDiv)

    return questionDiv
}

function scoreQuiz(element, quizData) {
    var correctAnswers = 0;

    quizData.forEach(question => {
        var radios = document.getElementsByName(question.question);

        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked)
                if (question.answers[(parseInt(radios[i].value))].correct)
                    correctAnswers += 1
        }
    })
    alert(`You got ${correctAnswers} points!`)
}

function renderQuiz(element, quizData) {
    quizData.map(question => element.appendChild(renderQuestion(question)))
    const checkButton = document.createElement('button')
    checkButton.textContent = "Check score"
    checkButton.addEventListener('click', () => scoreQuiz(element, quizData))
    element.appendChild(checkButton)
}

function saveLocal() {
    alert('hi')
}

renderQuiz(document.querySelector('#quiz'), quizData)
document.querySelector('#localStorageForm > input[type=submit]').addEventListener('click', (e) => {
    e.preventDefault()
    const formData = {
        firstName: document.querySelector('#localStorageForm > input#fName').value,
        lastName: document.querySelector('#localStorageForm > input#LName').value,
        age: document.querySelector('#localStorageForm > input#yourAge').value,
        phoneNumber: document.querySelector('#localStorageForm > input#num').value,
    }
    window.localStorage.setItem('formData', JSON.stringify(formData))
}
)