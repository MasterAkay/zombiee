(function($) {
    "use strict";
    // Auto-scroll
    $('#myCarousel').carousel({
        interval: 5000
    });

    // Control buttons
    $('.next').click(function() {
        $('.carousel').carousel('next');
        return false;
    });
    $('.prev').click(function() {
        $('.carousel').carousel('prev');
        return false;
    });

    // On carousel scroll
    $("#myCarousel").on("slide.bs.carousel", function(e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 3;
        var totalItems = $(".carousel-item").length;
        if (idx >= totalItems - (itemsPerSlide - 1)) {
            var it = itemsPerSlide -
                (totalItems - idx);
            for (var i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $(
                        ".carousel-item").eq(i).appendTo(".carousel-inner");
                } else {
                    $(".carousel-item").eq(0).appendTo(".carousel-inner");
                }
            }
        }
    });
})
(jQuery);

const searchBtn = document.getElementById('search-btn');
const searchForm = document.getElementById('search-form');
const list = document.querySelector('.list');
const favoriteList = document.querySelector('.favourite-list');
const caro = document.querySelector('.caro');

let restrurants = [];
let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
let collection = [];
let checkArr = JSON.parse(localStorage.getItem('favcount')) || [];
console.log("eeeeeee", checkArr);
let checkSet = new Set(checkArr);


const displayCaro = (array, parent) => {
    var count = 0;
    console.log("heyyy", array);
    parent.innerHTML = '';

    array.length === 0 ? "" : array.map((item, i) => {
        count += 1;
        if (count == 1) {
            parent.innerHTML +=
                `
      <div class="carousel-item col-md-4 active ">
        <div class="card carditem">
            <img src="${item.collection.image_url}" alt="collections" style="width:90%;height:50%;" class="card-image-top mx-auto">
          <div class="card-body">
            <h4 class="card-title"><a href="${item.collection.title}">${item.collection.title}</a></h4>
            <p class="card-text">${item.collection.description}</p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
    </div>
      `
        } else {
            parent.innerHTML +=
                `
      <div class="carousel-item col-md-4  align-items-stretch  ">
        <div class="card carditem">
            <img src="${item.collection.image_url}" alt="collections" style="width:90%;height:50%;" class="card-image-top mx-auto">
          <div class="card-body">
            <h4 class="card-title"><a href="${item.collection.title}">${item.collection.title}</a></h4>
            <p class="card-text">${item.collection.description}</p>
            <p class="card-text">

              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
    </div>
      `
            console.log("$$$$$$$$$$$$$$$$$");
        }

    }).join('');


}

const display = (array, parent) => {
    parent.innerHTML = '';

    array.length === 0 ? "" : array.map((item, i) => {
        if (item.restaurant.featured_image) {
            parent.innerHTML +=
                `

    <div class="card carditem1 " id=${i}>
          <img src="${item.restaurant.featured_image}" alt="restaurants" style="width:50%;height:40%;" class="card-image-top mx-auto">
          <div class="card-block">
          <h1 class="card-title"><a href="${item.restaurant.url}"><span>${item.restaurant.name}</span></a></h1>
          <div class="ratings">
          <div class="rate"><span>${item.restaurant.user_rating.votes}</span></div>
           <span class="vote">${item.restaurant.user_rating.aggregate_rating} votes</span>
          </div>

          <p>Address :${item.restaurant.location.address}</p>
           <p>Cost for Two :
          ${item.restaurant.average_cost_for_two}</p>
        <button id="add${i}" class="add-favourite fas fa-plus fa-2x mx-auto" data-id=${i}></button>
    </div>
    </div>
    </div>
          `
        } else {
            parent.innerHTML +=
                `

          <div class="card carditem1 " id=${i}>
                <img src="./src/images/zomato-fact-sheet_660_051817020539.jpg" alt="restaurants" style="width:50%;height:40%;" class="card-image-top mx-auto">
                <div class="card-block">
                <h1 class="card-title"><a href="${item.restaurant.url}"><span>${item.restaurant.name}</span></a></h1>
                <div class="ratings">
                <div class="rate"><span>${item.restaurant.user_rating.votes}</span></div>
                 <span class="vote">${item.restaurant.user_rating.aggregate_rating} votes</span>
                </div>

                <p>Address :${item.restaurant.location.address}</p>
                 <p>Cost for Two :
                ${item.restaurant.average_cost_for_two}</p>
              <button id="add${i}" class="add-favourite fas fa-plus fa-2x mx-auto" data-id=${i}></button>
          </div>
          </div>
          </div>
                `
        }

    }).join('');
}

// const displayFavourite = (array, parent) => {
//   parent.innerHTML = '';
//
//   array.length === 0 ? "" : array.map((item,i) => {
//     parent.innerHTML +=
//     `
//     <div class="favoruite-restrurantCard" draggable="true">
//     <h1 class="fav-head" Name - <span>${item.restaurant.name}</span></h1>
//     <a class="link" href="${item.restaurant.url}"> website </a>
//     <h2 class="fav-head2" Address <span>${item.restaurant.location.city}</span></h2>
//     <h2 class="fav-vote" Votes <span>${item.restaurant.user_rating.aggregate_rating}</span></h2>
//     <button class="delete-favourite"  data-id=${i}>Delete Favourite<g/button>
//   </div>
//     `
//   }).join('');
// }

const searchRestrurants = e => {
    e.preventDefault();
    const searchValue = document.getElementById("search-value");

    const url = `https://developers.zomato.com/api/v2.1/search?q=${searchValue.value.toLowerCase()}&count=15`;

    fetch(url, {
        method: 'GET',
        headers: {
            "user-key": "b52f7ba7b23e1fbb7f337b1fd39ae8f5"
        }
    }).then(res => { console.log(res.status); return res.json() }).then(data => {
        restrurants = data.restaurants;
        console.log(restrurants[0]);
        console.log("hello boys");
        display(restrurants, list);
    })

    console.log('form submitted');
}

const addToFavourite = e => {
    e.preventDefault();
    if (e.target.classList.contains('add-favourite')) {
        const itemIndex = e.target.dataset.id;
        const butn = "add" + itemIndex;
        document.getElementById(butn).disabled = true;
        console.log(itemIndex);
        if (checkSet.has(restrurants[itemIndex].restaurant.id)) {
            console.log("already added to Favourites");
        } else {
            checkSet.add(restrurants[itemIndex].restaurant.id);
            console.log("##########################", checkSet);
            favourites.push(restrurants[itemIndex]);
            console.log("$$$$$$$$$$", restrurants[itemIndex].restaurant.id);
            // fetch('http://localhost:3000/favourites', {
            //         method: 'POST',
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify(restaurants[itemIndex].restaurant)
            //     }).then(res => { console.log(res.status); return res.json() })
            //  .then(data => {
            //   restrurants = data.restaurants;
            //   console.log(restrurants[0]);
            //   console.log("hello boys");
            //   display(restrurants, list);
            // })
            let array = Array.from(checkSet);
            localStorage.setItem("favcount", JSON.stringify(array));
            localStorage.setItem("favourites", JSON.stringify(favourites));

            // let favouritesArray = JSON.parse(localStorage.getItem('favourites'));
            // displayFavourite(favouritesArray, favoriteList);
        }
    }
}



searchForm.addEventListener("submit", searchRestrurants);
list.addEventListener('click', addToFavourite);

if (favourites.length > 0) {
    // displayFavourite(favourites, favoriteList);
    const favItems = document.querySelectorAll('.favoruite-restrurantCard');



    console.log(favItems)
}

const url = `https://developers.zomato.com/api/v2.1/collections?city_id=1&count=7`

fetch(url, {
    method: 'GET',
    headers: {
        "user-key": "b52f7ba7b23e1fbb7f337b1fd39ae8f5"
    }
}).then(res => { console.log(res.status); return res.json() }).then(data => {
    collection = data.collections;
    console.log("helloo", collection);

    displayCaro(collection, caro);
})