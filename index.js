document.addEventListener("DOMContentLoaded",function(){
    fetchMovie()
})
function fetchMovie(){
fetch("http://localhost:3000/films")
.then(res => res.json())
.then(data => {
    displayTitle(data)
})
}
function displayTitle(movies){
    let names = document.getElementById("films")
    movies.forEach(movies =>{
        let list = document.createElement("li")
        list.classList = "movie"
        list.innerText = movies.title
        names.appendChild(list)
        list.addEventListener('click', function(){
            fetchDetails(movies)
        })
    } )
}
function fetchDetails(movies){
    fetch(`http://localhost:3000/films/${movies.id}`)
    .then(res => res.json())
    .then(data => {
        allDetails(data)
    })
}
function allDetails(movies){
    document.querySelector('#title').innerText = movies.title
    document.querySelector('#description').innerText = `Description: ${movies.description}`
    document.querySelector('#runtime span').innerText = `Runtime: ${movies.runtime}`
    document.querySelector('#capacity span').innerText = `Capacity: ${movies.capacity}`
    document.querySelector('#showtime span').innerText = `Showtime: ${movies.showtime}`
    document.querySelector('#tickets span').innerText = `Tickets: ${movies.tickets_sold}`
    document.querySelector('#images').setAttribute('src', movies.poster)
    let btn = document.getElementById('purchase_ticket')
    btn.addEventListener('click', purchaseTicket)
}
function purchaseTicket(){
    let tickets= document.getElementById('available');
    let availableTickets = parseInt(tickets.textContent.split(' ')[2]);
    if (availableTickets > 0) {
        availableTickets--;
        tickets.textContent = `Available Tickets: ${availableTickets}`;
      } else {
        alert('Sorry, the showing is sold out!')
      }
    }