const collectedItems = document.querySelector("input[name=items]");

function populaUFs(){
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( states => {
            for( const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
            }
        } );
};

populaUFs();

function getCidades(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"

    citySelect.disabled = false

    fetch(url)
        .then( res => res.json() )
        .then( cities => {
            for( const city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false;
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCidades);

// Ítens de Coleta
const itemsToCollect = document.querySelectorAll(".items-grid li");

for(const item of itemsToCollect){
    item.addEventListener("click", handleItemClick);
}

let selectedItems = [];

function handleItemClick(event) {
    const itemLi = event.target;

    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    console.log('Item ID: ', itemId);

    const alreadySelected = selectedItems.findIndex(item => {
        return item == itemId;
    });

    if(alreadySelected >= 0){
        const filterItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });

        selectedItems = filterItems;
    }else{
        selectedItems.push(itemId);
    }

    console.log('selected items: ', selectedItems);
    collectedItems.value = selectedItems;

}