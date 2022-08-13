document.getElementById('search-btn').addEventListener('click', function () {
    const searchFieldText = document.getElementById('search-field')

    const searchField = searchFieldText.value;
    // searchFieldText.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data))




})

const displayData = mobiles => {
    const cards = document.getElementById('cards')
    // cards.textContent = '';

    mobiles.forEach(mobile => {
        console.log(mobile)
        const { brand, image, phone_name, slug } = mobile;

        const divCol = document.createElement('div');
        divCol.classList.add('col-lg-4')
        divCol.innerHTML = `
        <div class="card p-4" >
            <img src="${image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone_name}</h5>
                <h6 class="card-title">${brand}</h6>
            </div>
            <input type="button" onclick="loadMobileDetail(${mobile?.slug})"  value="details">
        </div>
    `;
        cards.appendChild(divCol)
    })


}


const loadMobileDetail = phoneName => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneName}`
    console.log(url)
}