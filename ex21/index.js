coinArray = []
favCoinArr = []

const mainDiv = document.getElementById("testDiv");
const SearchButton = document.getElementById("chearchBtn");

function printcoins() {

    api.getCoins().then(res => {
        sliceCoin = res.slice(0, 100)
        for (let index = 0; index < sliceCoin.length; index++) {
            coinArray.push(new CoinConstractor(sliceCoin[index].id, sliceCoin[index].symbol, sliceCoin[index].name))
        }
        draw(coinArray, mainDiv)
    })
    liveReportFunc(favCoinArr)
    backHome()
    about()
}

function CoinConstractor(_id, _symbol, _name) {
    this.id = _id;
    this.symbol = _symbol;
    this.name = _name;
    this.isSelected = false;

}

function draw(sliceCoin, div) {

    for (let i = 0; i < sliceCoin.length; i++) {

        const card = drawCoins(sliceCoin[i])
        div.append(card)
    }
}

function drawCoins(sliceCoin) {

    const { id, symbol, name } = sliceCoin;

    const cardMain = document.createElement("div");
    cardMain.className = "card ";
    cardMain.style.backgroundColor = "rgba(255, 255, 255, 0)"
    cardMain.style.width = "18rem"
    cardMain.style.border = "2px black solid"
    cardMain.id = id

    const cardBody1 = document.createElement("div");
    cardBody1.className = "card-body";

    const cardList = document.createElement("ul");
    cardList.className = "list-group list-group-flush ulClass";

    const li1 = document.createElement("li");
    li1.innerHTML = name;
    li1.className = "list-group-item";

    const li2 = document.createElement("li");
    li2.innerHTML = symbol;
    li2.className = "list-group-item";

    cardList.append(li1, li2);

    const moreInfo = document.createElement("Button")
    moreInfo.className = "btn btn-danger ";
    moreInfo.addEventListener("click", CreateMoreInfo)
    moreInfo.innerHTML = "more info"



    const checkLable = document.createElement("label")
    checkLable.className = "switch"

    const checkButton = document.createElement("input")
    checkButton.setAttribute("type", "checkbox");
    if (sliceCoin.isSelected) {

        checkButton.checked = true
        console.log(checkButton.checked);

    } else {
        checkButton.checked = false
        console.log(checkButton.checked);
    }
    checkButton.addEventListener("click", checkHandler)

    const checkSpan = document.createElement("span")
    checkSpan.className = "slider round"

    checkLable.append(checkButton, checkSpan)

    cardMain.append(checkLable, cardList, moreInfo, cardBody1);

    return cardMain
}

function CreateMoreInfo() {

    const id = this.parentElement.id
    const loading = document.getElementById(`${id}`)
    const loaderDiv = document.createElement("div");
    loaderDiv.className = "loader"

    loading.append(loaderDiv)

    api.geMoreCoinInfo(id).then(res => {
        loaderDiv.remove()
        const { market_data, image } = res
        const { current_price } = market_data
        const { usd, ils, eur } = current_price
        const { large } = image


        const moreInfoMain = document.createElement("div")


        const moreInfoDiv = document.createElement("p")

        moreInfoDiv.style.padding = "5%"
        moreInfoDiv.innerHTML = `${id} value compared to usd is: ${usd}$ 
        ${id} value compared to ils is:  ${ils}₪ 
        ${id} value compared to eur is:  ${eur}€ `

        const cardimg = document.createElement("img");
        cardimg.src = large;
        cardimg.className = "card-img-top"
        cardimg.style.height = '100px';
        cardimg.style.width = '200px';
        moreInfoMain.append(cardimg, moreInfoDiv)
        loading.append(moreInfoMain)


    })
}


function checkHandler() {
    const checkBox = this
    const tragetId = this.parentElement.parentElement.id

    if (checkBox.checked) {
        if (favCoinArr.length >= 5) {
            checkBox.checked = false
            return popUpFunc(favCoinArr)
        }
        for (let index = 0; index < coinArray.length; index++) {
            if (tragetId === coinArray[index].id) {
                coinArray[index].isSelected = true
                favCoinArr.push(coinArray[index])
            }
        }
    } else {

        for (let index = 0; index < coinArray.length; index++) {
            if (tragetId === coinArray[index].id) {
                coinArray[index].isSelected = false
                favCoinArr.splice(index, 1)
            }

        }
    }
}
function backHome() {
    homeBtn = document.getElementById("home")
    homeBtn.addEventListener("click", function () {
        clear(mainDiv)
        draw(coinArray, mainDiv)
    })
}

function popUpFunc(arrayOfData) {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const inModal = document.getElementById("inModay")

    modal.style.display = "block";
    modal.className = "row p-5"

    draw(arrayOfData, inModal)

    span.onclick = function () {
        modal.style.display = "none";
        clear(inModal)
        clear(mainDiv)
        draw(coinArray, mainDiv)
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            clear(inModal)
            clear(mainDiv)
            draw(coinArray, mainDiv)
        }
    }
}

function search() {
    inputValue = document.getElementById("searchValue")
    clear(mainDiv)
    for (let index = 0; index < coinArray.length; index++) {
        if (coinArray[index].symbol.includes(inputValue.value)) {
            let tempArr = []
            tempArr.push(coinArray[index])
            draw(tempArr, mainDiv)
        }
    }
}
function about() {
    const aboutBtn = document.getElementById("about_page")
    aboutBtn.addEventListener("click", function () {
        clear(mainDiv)
        const displayDiv = document.createElement("div")
        displayDiv.style.backgroundColor = "black"
        displayDiv.style.width = "100%"
        displayDiv.style.height = "800px"
        displayDiv.className = "container"
        aboutPic = document.createElement("img")
        aboutPic.src = ""
        aboutPic.style.width = "50%"
        aboutPic.style.height = "200px"

        const ProjectText = document.createElement("p")
        ProjectText.style.width = "100%"
        ProjectText.style.height = "300px"
        ProjectText.innerHTML = "roman barshay,this is my crypto project hope you liked it"
        ProjectText.style.color = "text-white"
        ProjectText.style.fontSize = "20px"

        displayDiv.append(aboutPic, ProjectText)
        mainDiv.append(displayDiv)
    })
}
function clear(div) {

    div.innerHTML = ""
}
printcoins()
