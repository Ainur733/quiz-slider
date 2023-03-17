document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector(".answers")
    const nextButton = document.querySelector(".next")
    const prevButton = document.querySelector(".prev")
    const itemCount = document.querySelectorAll(".group").length
    const progressBar = document.querySelector(".progress-bar_inner")
    const surveyFooter = document.querySelector(".survey-footer")
    const surveyForm = document.querySelector(".survey-form")
    const btnFinish = document.querySelector(".btn-finish")
    const itemWidth = container.clientWidth
    let position = 0
    let percentOneStep = 100 / itemCount
    let percentStep = percentOneStep
    let countQuestionsOneStep = 2
    let countQuestions = countQuestionsOneStep
    let totalQuestions = countQuestions * itemCount



    progressBar.style.width = ""+ percentStep + "%"
    progressBar.innerHTML = ""+ percentStep + "% ("+ countQuestions +"/" + totalQuestions + ")"


    nextButton.addEventListener('click', function () {
        if ((itemWidth * itemCount) - itemWidth - itemWidth <= position) {
            nextButton.style.display = "none"
            btnFinish.style.display = "block"
            surveyFooter.style.justifyContent = "space-between"
        }
        prevButton.style.display = "flex"
        position += itemWidth
        container.style.transform += ("translateX(-" + itemWidth + "px")
        nextStep()

    })

    prevButton.addEventListener('click', function () {
        nextButton.style.display = "flex"
        if (position - itemWidth === 0) {
            prevButton.style.display = "none"
        }
        btnFinish.style.display = "none"
        position -= itemWidth
        container.style.transform += ("translateX(" + itemWidth + "px")
        prevStep()
    })

    function nextStep() {
        percentStep += percentOneStep
        countQuestions += countQuestionsOneStep

        progressBar.style.width = ""+ percentStep + "%"
        progressBar.innerHTML = ""+ percentStep + "% ("+ countQuestions +"/" + totalQuestions + ")"
    }

    function prevStep() {
        percentStep -= percentOneStep
        countQuestions -= countQuestionsOneStep

        progressBar.style.width = ""+ percentStep + "%"
        progressBar.innerHTML = ""+ percentStep + "% ("+ countQuestions +"/" + totalQuestions + ")"
    }

    surveyForm.addEventListener("submit", function (event) {
        event.preventDefault()
        console.log(surveyForm.elements)


       let result =  Array.from(surveyForm.elements)

            result.forEach(function (element) {
                console.log(element)
            })


    })


});