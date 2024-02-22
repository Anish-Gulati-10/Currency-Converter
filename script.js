const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/`;
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const selects = document.querySelectorAll(".select-container select");
const conBtn = document.querySelector("#convert");
const msg = document.querySelector(".msg p");

for (let select of selects){
    for (currCode in countryList){
        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;
        select.append(option);
        if (select.id === "from-select" && currCode === "USD"){
            option.selected = "selected";
        } else if (select.id === "to-select" && currCode === "INR"){
            option.selected = "selected";
        }
    }
    select.addEventListener("change", ()=>{
        updateflag();
    })
}

function updateflag(){
    for (let select of selects){
        let flagCode = select.value;
        flagCode = countryList[flagCode];
        let img = select.parentElement.querySelector("img");
        img.src = `https://flagsapi.com/${flagCode}/flat/64.png`;
    }
}

conBtn.addEventListener("click", async ()=>{
    let amt = document.querySelector("input").value;
    if (!amt){
        amt = "1";
    }
    let response = await fetch(`${url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmt = parseFloat(amt) * rate;
    msg.innerText = `${amt} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    
})