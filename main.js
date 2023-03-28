

document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelector(".questions")
    const container = document.querySelector(".answers")
    const nextButton = document.querySelector(".next")
    const prevButton = document.querySelector(".prev")
    const itemCount = document.querySelectorAll(".group").length
    const progressBar = document.querySelector(".progress-bar_inner")
    const surveyFooter = document.querySelector(".survey-footer")
    const surveyForm = document.querySelector(".survey-form")
    const btnFinish = document.querySelector(".btn-finish")
    const radioBtns = document.querySelectorAll(".survey-form input[type ='radio']")
    const preloader = document.querySelector(".load")
    const resultsDetached = document.querySelector(".detached")
    const resultsCircumspect = document.querySelector(".circumspect")
    const resultsInitiative = document.querySelector(".initiative")
    const resultsHyperactive = document.querySelector(".hyperactive")
    const itemWidth = container.clientWidth
    let position = 0
    let percentOneStep = 100 / itemCount
    let percentStep = percentOneStep
    let countQuestionsOneStep = 2
    let countQuestions = countQuestionsOneStep
    let totalQuestions = countQuestions * itemCount
    let arrayVariant_A = [1, 4, 5, 7, 10, 12, 13, 15, 18, 19, 21, 24, 25, 27, 29, 32, 33, 36, 37, 40, 41, 44, 45, 48, 50]
    let arrayVariant_B = [2, 3, 6, 8, 9, 11, 14, 16, 17, 20, 22, 23, 26, 28, 30, 31, 34, 35, 38, 39, 42, 43, 46, 47, 49]
    let result_A = 0
    let result_B = 0

    progressBar.style.width = "" + percentStep + "%"
    progressBar.innerHTML = "" + percentStep + "% (" + countQuestions + "/" + totalQuestions + ")"



    var docDefinition = {
        content: [
            // if you don't need styles, you can use a simple string to define a paragraph
            'This is a standard paragraph, using default style',

            // using a { text: '...' } object lets you set styling properties
            {text: 'This paragraph will have a bigger font', fontSize: 15},

            // if you set the value of text to an array instead of a string, you'll be able
            // to style any part individually
            {
                text: [
                    'This paragraph is defined as an array of elements to make it possible to ',
                    {text: 'restyle part of it and make it bigger ', fontSize: 15},
                    'than the rest.'
                ]
            }
        ]
    };
    pdfMake.createPdf(docDefinition).download();

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

        progressBar.style.width = "" + percentStep + "%"
        progressBar.innerHTML = "" + percentStep + "% (" + countQuestions + "/" + totalQuestions + ")"


    }

    function prevStep() {
        percentStep -= percentOneStep
        countQuestions -= countQuestionsOneStep

        progressBar.style.width = "" + percentStep + "%"
        progressBar.innerHTML = "" + percentStep + "% (" + countQuestions + "/" + totalQuestions + ")"
    }

    surveyForm.addEventListener("submit", function (event) {
        event.preventDefault()

        for (let i = 1; i <= 25; i++) {

            if (!document.querySelectorAll("input[name='group" + i + "']")[0].checked && !document.querySelectorAll("input[name='group" + i + "']")[1].checked) {
                document.querySelectorAll("input[name='group" + i + "']").forEach(function (item) {
                    alert("Не выбраны варианты " + document.querySelector("label[for='" + item.id + "']").innerHTML)
                    return
                })
            } else {
                preloader.style.display = "block"
                surveyForm.style.display = "none"
                questions.style.display = "none"
                setTimeout(showResults, 5000)
            }

        }


        function showResults() {
            preloader.style.display = "none"

            radioBtns.forEach(function (item, index) {
                if (item.checked) {
                    if (arrayVariant_A.includes(index + 1)) {
                        result_A += 1
                    } else {
                        result_B += 1
                    }
                }
            })

            if (result_B > result_A && result_B - result_A >= 15) {
                resultsDetached.style.display = "block"
            }

            if (result_B > result_A && result_B - result_A <= 14) {
                resultsCircumspect.style.display = "block"
            }

            if (result_A > result_B && result_A - result_B <= 14) {
                resultsInitiative.style.display = "block"
            }

            if (result_A > result_B && result_A - result_B >= 15) {
                resultsHyperactive.style.display = "block"
            }


        }


    })


});