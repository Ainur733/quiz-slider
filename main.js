document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector(".answers")
    const nextButton = document.querySelector(".next")
    const prevButton = document.querySelector(".prev")
    const itemCount = document.querySelectorAll(".group").length
    const progressBar = document.querySelector(".progress-bar_inner")
    const itemWidth = container.clientWidth
    let position = 0
    let percentOneStep = 100 / itemCount
    let percentStep = percentOneStep
    let stepCount = 1
    let countQuestionsOneStep = 2
    let countQuestions = countQuestionsOneStep
    let totalQuestions = countQuestions * itemCount


    prevButton.style.display = "none"
    progressBar.style.width = ""+ percentStep + "%"
    progressBar.innerHTML = ""+ percentStep + "% ("+ countQuestions +"/" + totalQuestions + ")"


    nextButton.addEventListener('click', function () {
        if ((itemWidth * itemCount) - itemWidth - itemWidth <= position) {
            nextButton.style.display = "none"
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


});