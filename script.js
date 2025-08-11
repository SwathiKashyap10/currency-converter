const dropList = document.querySelectorAll(".drop-list select");
const generateBtn = document.querySelector(".generateBtn");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const exchangeRateText = document.querySelector(".exchange-rate");

const API_KEY = "";

//Populate <select> elements with currency options
for (let i = 0; i < dropList.length; i++) {
    for (let currencyCode in countrylist) {
        let selected = "";
        if (i === 0 && currencyCode === "USD") {
            selected = "selected";
        } else if (i === 1 && currencyCode === "INR") {
            selected = "selected";
        }

        let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    // Attaching change event to load flag when currency is changed
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element) {
    const currencyCode = element.value;
    const countryCode = countrylist[currencyCode]; // Geting 2-letter country code
    if (countryCode) {
        const imgTag = element.parentElement.querySelector("img");
        if (imgTag) {
            imgTag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
});

generateBtn.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    let amountVal = amount.value;

    if (amountVal === "" || amountVal === "0") {
        amount.value = "1";
        amountVal = 1;
    }

    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency.value}`;

    fetch(url)
        .then((res) => res.json())
        .then((result) => {
            const exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
            exchangeRateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        })
        .catch(() => {
            exchangeRateText.innerText = "Something went wrong. Please try again later.";
        });
}
