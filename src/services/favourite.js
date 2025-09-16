export function addToFavourites(id) {
	let favs = JSON.parse(localStorage.getItem("Favourites")) || [];
	if (!favs.includes(id)) {
		favs.push(id);
		console.log(favs);
		localStorage.setItem("Favourites", JSON.stringify(favs));
	} else {
		favs = favs.filter((favId) => favId !== id);
		localStorage.setItem("Favourites", JSON.stringify(favs));
	}
}
