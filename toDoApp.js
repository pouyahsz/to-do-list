let input = document.querySelector("input");
let button = document.querySelector("button.add");
let clearButton = document.querySelector("button.clear");
let markButton = document.querySelector("button.mark");
let ul = document.querySelector("ul");
let counter = document.querySelector("div.counter span");
let filterButton = document.querySelector("button.filter-button");
let filterButtonContent = document.querySelector("button.filter-button span");
let operations = document.querySelector(".operations");
let filterBox = document.querySelector("div.options");
let filterBoxButtons = document.querySelectorAll("div.options button");
let localStorageItems = [];
let localStorageStatuses = [];
let closeBtns = [];
let checkBoxs = [];
let lis = [];
let flag = true;
let counterNumber = 0;
counter.textContent = counterNumber;


input.focus();

function getInfosFromLocalStorage() {
    if (localStorage.length !== 0) {
        localStorageItems = [...localStorage.getItem("todos").split(',')];
        localStorageStatuses = [...localStorage.getItem("done").split(',')];
        console.log(localStorageStatuses)

    }
    for (let item of localStorageItems) {
        let index = localStorageStatuses.findIndex((element) => element == item);
        let listItem = `<li done="${index !== -1 ? true : false}" class="${index !== -1 ? "done" : ''}">
            <span>${item}</span>
            <div class="check-box"></div>
            <i class="fas fa-times close"></i>
        </li>`;
        ul.innerHTML += listItem;
        counter.textContent = index == -1 ? counterNumber++ : counterNumber;

    }
    closeBtns = [...document.querySelectorAll("i.close")];
    checkBoxs = [...document.querySelectorAll("li div")];
    lis = [...document.querySelectorAll("li")];
    for (let i = 0; i < lis.length; i++) {
        closeBtns[i].addEventListener("click", removeItem)
        checkBoxs[i].addEventListener("click", done)

    }

}
getInfosFromLocalStorage();

function addItem() {
    if (input.value.trim() != "") {

        // let li = document.createElement("li");
        // let span = document.createElement("span");
        // let checkBox = document.createElement("div");
        // let closeBtn = document.createElement("i");
        // li.setAttribute("done", false);
        // closeBtn.addEventListener("click", removeItem)
        // checkBox.addEventListener("click", done)
        // checkBox.classList.add("check-box");
        // closeBtn.classList.add("fas", "fa-times", "close");
        // span.textContent = input.value.trim();
        ul.innerHTML += `<li done="false">
        <span>${input.value.trim()}</span>
        <div class="check-box"></div>
        <i class="fas fa-times close"></i>
    </li>`;
        localStorageItems.push(input.value.trim())
        localStorage.setItem("todos", localStorageItems)
        // ul.appendChild(li);
        // li.appendChild(span);
        counterNumber++;
        counter.textContent = counterNumber;
        // li.appendChild(checkBox);
        // li.appendChild(closeBtn);
        input.value = "";
        input.focus();
        closeBtns = [...document.querySelectorAll("i.close")];
        checkBoxs = [...document.querySelectorAll("li div")];
        lis = [...document.querySelectorAll("li")];
        for (let i = 0; i < lis.length; i++) {
            closeBtns[i].addEventListener("click", removeItem)
            checkBoxs[i].addEventListener("click", done)
        }
    } else {
        input.value = "";
        input.classList.toggle("warning");
        input.setAttribute("placeholder", "input is empty")
        setTimeout(function () {
            input.classList.toggle("warning");
            input.setAttribute("placeholder", "write your work...")
        }, 1000)
    }
}

function addWithEnter(event) {
    if (event.key == "Enter") {
        addItem()
    }
}

function removeItem() {
    for (let i = 0; i < closeBtns.length; i++) {
        if (this == closeBtns[i]) {
            let index = localStorageStatuses.findIndex((element) => element == localStorageItems[i])
            if (index !== -1) {
                localStorageStatuses.splice(index, 1);
                localStorage.setItem("done", localStorageStatuses);
               
            }else{
                counterNumber--;
                counter.textContent = counterNumber;
            }
            ul.removeChild(lis[i]);
            localStorageItems.splice(i, 1);

            localStorage.setItem("todos", localStorageItems);
            lis.splice(i, 1);
            closeBtns.splice(i, 1);
            checkBoxs.splice(i, 1);

        }
    }
}

function done() {
    this.classList.toggle("done");
    for (let i = 0; i < checkBoxs.length; i++) {
        if (this == checkBoxs[i]) {
            if (lis[i].getAttribute("done") == "false") {
                lis[i].classList.toggle("done");
                lis[i].setAttribute("done", true);
                localStorageStatuses.push(lis[i].firstElementChild.textContent);
                localStorage.setItem("done", localStorageStatuses);
                counterNumber--;
                counter.textContent = counterNumber;
            } else {
                lis[i].classList.toggle("done");
                lis[i].setAttribute("done", false);
                let selected = localStorage.getItem("done").split(",").findIndex((element) => element == lis[i].firstElementChild.textContent)
                localStorageStatuses.splice(selected, 1);
                localStorage.setItem("done", localStorageStatuses);
                counterNumber++;
                counter.textContent = counterNumber;
            }
        }
    }
}

function openMenu() {
    filterBox.classList.toggle("open");
    filterButton.classList.toggle("corner");
}

function corner() {
    filterButton.classList.remove("corner");
}

function closeMenu() {
    filterBox.classList.remove("open");
}

function filter() {
    filterButtonContent.textContent = this.textContent;
    if (this == filterBoxButtons[0]) {
        for (let li of lis) {
            li.classList.remove("hidden");
        }
    }
    if (this == filterBoxButtons[2]) {
        for (let li of lis) {
            li.classList.remove("hidden");
        }
        for (let li of lis) { }
        for (let li of lis) {
            if (li.getAttribute("done") == "true") {
                li.classList.add("hidden");
            }
        }
    }
    if (this == filterBoxButtons[1]) {
        for (let li of lis) {
            li.classList.remove("hidden");
        }
        for (let li of lis) {
            if (li.getAttribute("done") == "false") {
                li.classList.add("hidden");
            }
        }
    }
    counterNumber = lis.length;
    for (let li of lis) {
        if (li.classList.contains("hidden")) {
            counterNumber--;
        }
    }
    counter.textContent = counterNumber;
    openMenu();
}

function clearAll() {
    lis.forEach(element => {
        ul.removeChild(element);
    })
    localStorage.clear();
    localStorageItems = [];
    localStorageStatuses = [];
    counterNumber = 0;
    counter.textContent = counterNumber;
}

function markAll() {
    localStorage.removeItem("done");
    if (flag == true) {
        for (let checkBox of checkBoxs) {
            checkBox.classList.add("done");
            localStorageStatuses = [];
        }
        lis.forEach(element => {
            localStorageStatuses.push(element.firstElementChild.textContent);
            element.classList.add("done");
            element.setAttribute("done", "true");
        });
        localStorage.setItem("done", localStorageStatuses);
        markButton.textContent = "unmark"
        flag = false;
        counter.textContent = 0;
    } else {
        if (flag == false) {
            for (let checkBox of checkBoxs) {
                checkBox.classList.remove("done");
            }
            lis.forEach(element => {
                element.classList.remove("done");
                element.setAttribute("done", "false");
            });
        }
        markButton.textContent = "Mark all";
        flag = true;
        counterNumber = 0;
        for (let i = 0; i < checkBoxs.length; i++) {
            if (lis[i].getAttribute("done") == "false") {
                counterNumber++
            }
        }
        counter.textContent = counterNumber;
    }
}

button.addEventListener("click", addItem);
input.addEventListener("keyup", addWithEnter);
filterButton.addEventListener("click", openMenu);
operations.addEventListener("mouseleave", closeMenu);
for (let button of filterBoxButtons) {
    button.addEventListener("click", filter);
}
clearButton.addEventListener("click", clearAll);
markButton.addEventListener("click", markAll);
operations.addEventListener("mouseleave", corner);