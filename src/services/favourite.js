export function addToFavourites(id) {
	let favs = JSON.parse(localStorage.getItem("favourites")) || [];
	if (!favs.includes(id)) {
		favs.push(id);
		console.log(favs);
		localStorage.setItem("favourites", JSON.stringify(favs));
	} else {
		favs = favs.filter((favId) => favId !== id);
		localStorage.setItem("favourites", JSON.stringify(favs));
	}
}
