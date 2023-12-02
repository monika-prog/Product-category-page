let productData;

const loadData = () => {
    var xhr = new XMLHttpRequest();
    xhr.onload = reqListener;
    xhr.onerror = reqError;
    xhr.open('get', '/data.json', true);
    xhr.send();
}
window.onload = loadData();

function reqListener() {
    productData = JSON.parse(this.responseText).products;

    let data;

    let product = document.getElementById('products');
    displayData(productData);

    var brandcheckboxes = document.querySelectorAll("input[type=checkbox][name=brand]");

    let brands = [];
    brandcheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            brands =
                Array.from(brandcheckboxes) // Convert checkboxes to an array to use filter and map.
                    .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                    .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.

            filterByCategory()
        })
    });

    var colourcheckboxes = document.querySelectorAll("input[type=checkbox][name=color]");

    let colours = [];
    colourcheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            colours =
                Array.from(colourcheckboxes) // Convert checkboxes to an array to use filter and map.
                    .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                    .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.

            filterByCategory()
        })
    });

    var discountCheckboxes = document.querySelectorAll("input[type=checkbox][name=Discount]");

    let discounts = [];
    discountCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            discounts =
                Array.from(discountCheckboxes) // Convert checkboxes to an array to use filter and map.
                    .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                    .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.

            filterByCategory()
        })
    });

    function filterData(data) {
        filteredData = data;
        if (brands.length !== 0) filteredData = filteredData.filter(val => brands.includes(val.brand));
        if (discounts.length !== 0) filteredData = filteredData.filter(val => discounts.includes(val.Discount));
        if (colours.length !== 0) filteredData = filteredData.filter(val => colours.includes(val.color));
        return filteredData;
    }


    function filterByCategory() {
        $("#products").html("");
        data = filterData(productData);
        displayData(data);
    }

    document.getElementById('popularity').addEventListener('click', displayByPopularity);
    document.getElementById('lowToHigh').addEventListener('click', displayByLowToHigh);
    document.getElementById('highToLow').addEventListener('click', displayByHighToLow);

    function displayByPopularity() {
        $("#products").html("");
        data = filterData(productData);
        data.sort((a, b) => {
            return b.popularity - a.popularity;
        });
        displayData(data);
    }

    function displayByLowToHigh() {
        $("#products").html("");
        data = filterData(productData);
        data.sort((a, b) => {
            return parseInt(a.Price.slice(1, a.Price.length - 1)) - parseInt(b.Price.slice(1, b.Price.length - 1));
        });
        displayData(data);
    }

    function displayByHighToLow() {
        $("#products").html("");
        data = filterData(productData);
        data.sort((a, b) => {
            return parseInt(b.Price.slice(1, b.Price.length - 1)) - parseInt(a.Price.slice(1, a.Price.length - 1));
        });
        displayData(data);
    }

    function displayData(data) {
        if (data.length !== 0) {
            for (const { brand, Price, image, Discount, name } of data) {
                var productCard = document.createElement("div");
                productCard.innerHTML = `<div class="card m-3">
                                         <img src="${image}" alt="${brand}" class="productImage">
                                         <h4 class="cardh4">${brand}</h4>
                                         <p class="name">${name}</p>
                                         <p>${Price}</p>
                                         <p>${Discount}</p>
                                         
                                        </div>`;
                product.appendChild(productCard);
            }
        } else {
            var productCard = document.createElement("div");
            productCard.innerHTML = `<div>
                                         <p class="err">No Data Found</p>                                         
                                        </div>`;
            product.appendChild(productCard);


        }

    }


}

function reqError(err) {
    console.log('Fetch Error :-S', err);
}