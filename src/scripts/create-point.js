// GET STATES UFs API
function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]')
  
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  .then(response => response.json())
  .then(states => {

    for( const state of states) {
      ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`
    }
  })
}

populateUFs()

// GET CITIES by UFs API
function getCities(event) {
  const citySelect = document.querySelector('select[name=city]')
  const stateInput = document.querySelector('input[name=state]')

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = '<option>Selecione a cidade</option>'
  citySelect.disabled = true

  fetch(url)
  .then(response => response.json())
  .then(cities => {

    for( const city of cities) {
      citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`
    }

    citySelect.disabled = false
  })
}

document
  .querySelector('select[name=uf]')
  .addEventListener('change', getCities)



// CLASS SELECTEDFROM COLLECTS ITEMS
const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target

  // Add or remove a class with javascript
  itemLi.classList.toggle('selected')

  const itemId = itemLi.dataset.id

  /**
  *  Check if there are selected items,
  *  if yes, pick the selected items
  */
  const alreadySelected = selectedItems.findIndex(item => {
    // This will be true or false
    const itemFound = item == itemId

    return itemFound
  })

  // If already selected uncheck
  if (alreadySelected >= 0) {
    // Uncheck
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    // Update let selectedItems
    selectedItems = filteredItems 

    // If not selected, add the selection
  } else {
    selectedItems.push(itemId)
  }

  // Update the hidden field with the selected items
  collectedItems.value = selectedItems
}