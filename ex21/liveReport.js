const liveReportArr = []

function liveReportFunc(arrayOfData) {
    const liveReport = document.getElementById("live_reports");
    // const liveReportsChart = document.createElement("div")
    // liveReportsChart.id = "chartContainer"
    // liveReportsChart.style.height = "370px"
    // liveReportsChart.style.width = "100%"


    liveReport.addEventListener("click", function () {
        // const liveRepo = arrayOfData.map(liveCoin => {
        //     return (liveCoin.symbol.toUpperCase());
        // })
        // api.multiCoins(liveRepo.join(',')).then(res => {
        //     console.log(res);


        // });


        clear(mainDiv)

        draw(arrayOfData, mainDiv)

    })

}
liveReportFunc()