document.getElementById('search-btn').addEventListener('click', function () {
    const searchFieldText = document.getElementById('search-field')

    const searchField = searchFieldText.value;


    const emptySearch = document.getElementById('emtry-search');
    const notFound = document.getElementById('not-found');
    if (searchFieldText.value == '') {

        emptySearch.style.display = 'block'
    } else {
        emptySearch.style.display = 'none'
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if(data.data == false){
                    notFound.style.display = 'block'
                }else{
                    displayData(data.data);
                    notFound.style.display = 'none'
                }
                
            })
    }

    searchFieldText.value = '';





})



const displayData = mobiles => {
    const cards = document.getElementById('cards')
    cards.textContent = '';
  
    mobiles.slice(0, 20).forEach(mobile => {
        console.log(mobile)
        const { brand, image, phone_name} = mobile;

        const divCol = document.createElement('div');
        divCol.classList.add('col-lg-4')
        divCol.innerHTML = `
        <div class="card p-4" >
            <img src="${image}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone_name}</h5>
                <h6 class="card-title">${brand}</h6>
            </div>
            <input type="button" class="btn btn-success" onclick="loadMobileDetail('${mobile?.slug}')"  value="details">
        </div>
    `;
        cards.appendChild(divCol)
    })


}

const loadMobileDetail = phoneName => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneName}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayMobileDetail(data.data))
}


const displayMobileDetail = mobile => {
    const mobileDetails = document.getElementById('mobile-details');
    mobileDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card')
    div.classList.add('mb-3')
    div.classList.add('text-center')
    div.classList.add('w-50')
    div.classList.add('mx-auto')
    div.innerHTML = `
            <div class="row g-0 p-4">
                <div class="col-md-4">
                    <img src="${mobile?.image}" class="img-fluid w-100 rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${mobile?.name}</h5>
                        <p class="card-text"><b>Main Features</b>: 
                            <span class="card-text">${mobile?.mainFeatures?.chipSet}</span>
                            <span class="card-text">${mobile?.mainFeatures?.displaySize}</span>
                            <span class="card-text">${mobile?.mainFeatures?.memory}</span>
                        </p>
                        
                        <p class="card-text"><b>Sensors:</b> 
                            <span class="card-text">${mobile?.mainFeatures?.sensors[0]}</span>,
                            <span class="card-text">${mobile?.mainFeatures?.sensors[1]}</span>,
                            <span class="card-text">${mobile?.mainFeatures?.sensors[2]}</span>,
                            <span class="card-text">${mobile?.mainFeatures?.sensors[3]}</span>,
                            <span class="card-text">${mobile?.mainFeatures?.sensors[4]}</span>,
                            <span class="card-text">${mobile?.mainFeatures?.sensors[5]}</span>,
                            <span class="card-text">${mobile?.mainFeatures?.sensors[6]}</span>,
                        </p>
                        <p class="card-text"><b>Storage:</b> 
                            <span class="card-text">${mobile?.mainFeatures?.storage}</span>,
                        </p>
                        <p class="card-text"><b>Others:</b> 
                            <span class="card-text">${mobile?.others?.Bluetooth}</span>,
                            <span class="card-text">${mobile?.others?.GPS}</span>,
                            <span class="card-text">${mobile?.others?.NFC}</span>,
                            <span class="card-text">${mobile?.others?.Radio}</span>,
                            <span class="card-text">${mobile?.others?.USB}</span>,
                            <span class="card-text">${mobile?.others?.WLAN}</span>
                        </p>
                    </div>
                </div>
            </div>
    `;

    mobileDetails.appendChild(div);
}

