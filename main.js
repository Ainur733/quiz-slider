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
    const btnGetResult = document.querySelector(".btn-get-result")
    const radioBtns = document.querySelectorAll(".survey-form input[type ='radio']")
    const preloader = document.querySelector(".load")
    const itemWidth = container.clientWidth
    let position = 0
    let currentStep = 1
    let percentOneStep = 100 / itemCount
    let percentStep = percentOneStep
    let countQuestionsOneStep = 2
    let countQuestions = countQuestionsOneStep
    let totalQuestions = countQuestions * itemCount
    let arrayVariant_A = [1, 4, 5, 7, 10, 12, 13, 15, 18, 19, 21, 24, 25, 27, 29, 32, 33, 36, 37, 40, 41, 44, 45, 48, 50]
    let arrayVariant_B = [2, 3, 6, 8, 9, 11, 14, 16, 17, 20, 22, 23, 26, 28, 30, 31, 34, 35, 38, 39, 42, 43, 46, 47, 49]
    let result_A = 0
    let result_B = 0
    let docDefinition
    progressBar.style.width = "" + percentStep + "%"
    progressBar.innerHTML = "" + percentStep + "% (" + countQuestions + "/" + totalQuestions + ")"


    nextButton.addEventListener('click', function () {
        if ((itemWidth * itemCount) - itemWidth - itemWidth <= position) {
            nextButton.style.display = "none"
            btnFinish.style.display = "block"
            surveyFooter.style.justifyContent = "space-between"
        }

        if (validateFormRadio() == 1) {
            prevButton.style.display = "flex"
            position += itemWidth
            container.style.transform += ("translateX(-" + itemWidth + "px")
            nextStep()
        } else return
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
        currentStep++
        percentStep += percentOneStep
        countQuestions += countQuestionsOneStep
        progressBar.style.width = "" + percentStep + "%"
        progressBar.innerHTML = "" + percentStep + "% (" + countQuestions + "/" + totalQuestions + ")"
        console.log(currentStep)
    }

    function prevStep() {
        currentStep--
        percentStep -= percentOneStep
        countQuestions -= countQuestionsOneStep
        progressBar.style.width = "" + percentStep + "%"
        progressBar.innerHTML = "" + percentStep + "% (" + countQuestions + "/" + totalQuestions + ")"
        console.log(currentStep)
    }

    function validateFormRadio() {
        if (!document.querySelectorAll("input[name='group" + currentStep + "']")[0].checked && !document.querySelectorAll("input[name='group" + currentStep + "']")[1].checked) {
            alert('Вы не выбрали ни одного ответа')
            return 0
        } else return 1
    }

    surveyForm.addEventListener("submit", function (event) {
        event.preventDefault()
        if (validateFormRadio() == 1) {
            preloader.style.display = "block"
            surveyForm.style.display = "none"
            questions.style.display = "none"
            setTimeout(scoring, 5000)
        } else return


        function scoring() {
            preloader.style.display = "none"
            btnGetResult.style.display = "block"
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
                // resultsDetached.style.display = "block"
                docDefinition = {
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

            }
            if (result_B > result_A && result_B - result_A <= 14) {
                // resultsCircumspect.style.display = "block"
                docDefinition = {
                    content: [
                        'Ваш девиз, скорее всего, «зачем подгонять реку, если она и так течет».',
                        'Ваша воля к жизни проявляется недостаточно ярко, либо скрыта. Вас не устраивают мир и жизнь как таковые, и вы не склонны менять что-либо. В целом вас пугает все происходящее и окружающие люди. Вы предпочитаете держаться в тени, чем заявлять о себе. Вы хотите жить тихо и спокойно,вдали от суматохи. У вас нет ни ярко выраженных желаний, ни амбиций.',
                        'Окружающие воспринимают вас как человека пассивного или неподвижного, безынициативного и не склонного к активным действиям. Вас воспринимают как созерцателя, а не активного деятеля.',
                        'Ваш девиз, скорее всего, «зачем подгонять реку, если она и так течет».'
                    ]
                };
            }
            if (result_A > result_B && result_A - result_B <= 14) {
                // resultsInitiative.style.display = "block"
                docDefinition = {
                    content: [
                        'Ваш девиз, скорее всего, «зачем подгонять реку, если она и так течет».',
                        'Ваша воля к жизни проявляется недостаточно ярко, либо скрыта. Вас не устраивают мир и жизнь как таковые, и вы не склонны менять что-либо. В целом вас пугает все происходящее и окружающие люди. Вы предпочитаете держаться в тени, чем заявлять о себе. Вы хотите жить тихо и спокойно,вдали от суматохи. У вас нет ни ярко выраженных желаний, ни амбиций.',
                        'Окружающие воспринимают вас как человека пассивного или неподвижного, безынициативного и не склонного к активным действиям. Вас воспринимают как созерцателя, а не активного деятеля.',
                        'Ваш девиз, скорее всего, «зачем подгонять реку, если она и так течет».'
                    ]
                };
            }
            if (result_A > result_B && result_A - result_B >= 15) {
                // resultsHyperactive.style.display = "block"
                docDefinition = {
                    content: [
                        'Ваш девиз, скорее всего, «зачем подгонять реку, если она и так течет».',
                        'Ваша воля к жизни проявляется недостаточно ярко, либо скрыта. Вас не устраивают мир и жизнь как таковые, и вы не склонны менять что-либо. В целом вас пугает все происходящее и окружающие люди. Вы предпочитаете держаться в тени, чем заявлять о себе. Вы хотите жить тихо и спокойно,вдали от суматохи. У вас нет ни ярко выраженных желаний, ни амбиций.',
                        'Окружающие воспринимают вас как человека пассивного или неподвижного, безынициативного и не склонного к активным действиям. Вас воспринимают как созерцателя, а не активного деятеля.',
                        'Ваш девиз, скорее всего, «зачем подгонять реку, если она и так течет».'
                    ]
                }
            }
        }


    })

    btnGetResult.addEventListener('click', function () {
        pdfMake.createPdf(docDefinition).download();
    })

})


//
//     < h3 > Ваш
// тип «VQ» можно
// назвать «Отстраненным»</h3>
// <p>Ваша воля к жизни проявляется недостаточно ярко, либо скрыта. Вас не устраивают мир и жизнь как
//     таковые, и вы не склонны менять что-либо. В целом вас пугает все происходящее и окружающие
//     люди. Вы предпочитаете держаться в тени, чем заявлять о себе. Вы хотите жить тихо и спокойно,
//     вдали от суматохи. У вас нет ни ярко выраженных желаний, ни амбиций.
// </p>
// <p>Окружающие воспринимают вас как человека пассивного или неподвижного, безынициативного и не
//     склонного к активным действиям. Вас воспринимают как созерцателя, а не активного деятеля.
// </p>
// <p>Ваш девиз, скорее всего, «зачем подгонять реку, если она и так течет».</p>
// </div>
// <div className="circumspect text">
//     <h3>Ваш тип «VQ» можно назвать «Осмотрительным»</h3>
//     <p>Ваше отношение к жизни напоминает скамейку запасных. Вы внимательны, наблюдаете за
//         окружающим миром и оцениваете потенциальное воздействие событий на вашу жизнь. При
//         необходимости вы готовы среагировать быстро и оперативно, но никогда не станете брать
//         инициативу в свои руки, если этого никто не требует. Вы стараетесь избежать риска и отгородить себя
//         от всего незапланированного. Вы надежный друг и компетентный специалист до той поры, пока от
//         вас не требуется пойти на риск. Вы мыслите стандартно, что, на ваш взгляд, довольно разумно. В
//         целом вы относитесь к людям доброжелательно, но предпочитаете удостовериться, что им можно
//         доверять. Тем не менее, если человек вам искренне симпатичен, вы приложите все усилия, чтобы
//         помочь ему.
//     </p>
//     <p>Окружающие воспринимают вас скорее как рабочую лошадку, а не как человека инициативного и
//         предприимчивого. Кажется, вы предпочитаете стоять в стороне, выжидая, в какую сторону подует
//         ветер. Вы не слишком изобретательны.
//     </p>
//     <p>Ваш девиз, скорее всего, «лучше оставаться в стороне».</p>
// </div>
// <div className="initiative text">
//     <h3>Ваш тип «VQ» можно назвать «Инициативным»</h3>
//     <p>Ваша воля к жизни активирована. Вы «созидатель», вы чувствительны к побуждению действовать
//         активно, исходящему от окружающего мира. Для вас мир полон новых возможностей, исследовать
//         которые интересно и полезно. Вам нравится двигаться вперед, работать и наслаждаться жизнью. Вы
//         охотно беретесь за новые проекты, как на работе, так и в личной жизни. Вас привлекают люди, с
//         которыми, на ваш взгляд, у вас может быть общее дело; они для вас скорее партнеры, чем товарищи
//         или родственные души. Вы часто берете на себя ответственность, не боитесь заявить о себе либо пойти
//         на риск. Вы мыслите неординарно.
//     </p>
//     <p>Окружающие видят в вас лидера, человека инициативного, активного, надежного, интересного,
//         полного свежих идей. С другой стороны, вы можете казаться окружающим чрезмерно суетливым,
//         неспособным расслабиться и получить удовольствие, не заинтересованным в чувствах и проблемах
//         других людей, слишком эгоцентричным.
//     </p>
//     <p>Ваш девиз, скорее всего, «давайте сделаем это!»</p>
// </div>
// <div className="hyperactive text">
//     <h3>Ваш тип «VQ» можно назвать «Гиперактивным»</h3>
//     <p>Ваша воля к жизни всепоглощающа. Вы «Предприниматель» и «Завоеватель». Вы постоянно сами
//         себя подгоняете. Вы никогда не можете расслабиться по-настоящему, и даже когда придаетесь
//         развлечениям, все равно продолжаете думать о какой-нибудь работе, которую необходимо доделать.
//         Вам очень важно все время чем-то заниматься и постоянно подтверждать свою волю к жизни. По
//         вашему, «мы живем, чтобы завоевывать»! Вы нетерпеливы, никогда не бываете полностью
//         удовлетворены. Вам необходимо руководить, брать на себя ответственность, чтобы дело шло быстрее
//         и развивалось более эффективно, либо поступать по-своему. Другие люди задают вам темп, на
//         который вы равняетесь при работе над своими проектами. Вас вовсе не интересует их личная жизнь.
//         Вы креативны, относитесь к числу людей, из которых могут получиться отличные руководители, если
//         только вы не переусердствуете...
//     </p>
//     <p>Окружающие воспринимают вас как человека невероятно активного, творческого, все время занятого
//         работой, полного новыми идеями. Вас могут воспринимать не только положительно: вы можете
//         казаться слишком суетливым, надменным, агрессивным, надоедливым; любителем покомандовать,
//         трудоголиком, который никогда не бывает удовлетворен и не понимает истинного смысла жизни. Вас
//         также могут считать невнимательным к другим людям и недостаточно последовательным в личной
//         жизни.
//     </p>
// </div>
