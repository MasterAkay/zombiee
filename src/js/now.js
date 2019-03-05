const favourites = JSON.parse(localStorage.getItem("favourites"));
const favoriteList = document.querySelector('.favourite-list');
let checkArr = JSON.parse(localStorage.getItem("favourites")) || [];
let checkSet = new Set(checkArr);

console.log(favourites);


const displayFavourite = (array, parent) => {
    parent.innerHTML = '';

    array.length === 0 ? "" : array.map((item, i) => {
        parent.innerHTML +=
            `
    <div class="favoruite-restrurantCard" draggable="true">
    <h1 class="fav-head" Name - <span>${item.restaurant.name}</span></h1>
    <a class="link" href="${item.restaurant.url}"> website </a>
    <h2 class="fav-head2" Address <span>${item.restaurant.location.city}</span></h2>
    <h2 class="fav-vote" Votes <span>${item.restaurant.user_rating.aggregate_rating}</span></h2>
    <button class="delete-favourite"  data-id=${i}>Delete Favourite<g/button>
  </div>
    `
    }).join('');
}

const deleteFavourite = e => {
    e.preventDefault();
    if (e.target.classList.contains('delete-favourite')) {
        const itemIndex = e.target.dataset.id;
        checkSet.delete(favourites[itemIndex].restaurant.id);
        favourites.splice(itemIndex, 1);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        let array = Array.from(checkSet);
        localStorage.setItem("favcount", JSON.stringify(array));


        let favouritesArray = JSON.parse(localStorage.getItem('favourites'));
        displayFavourite(favouritesArray, favoriteList);
    }
}

favoriteList.addEventListener('click', deleteFavourite);
let favouritesArray = JSON.parse(localStorage.getItem('favourites'));
displayFavourite(favouritesArray, favoriteList);