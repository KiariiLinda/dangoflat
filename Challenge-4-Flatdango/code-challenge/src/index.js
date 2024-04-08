initialize();

const filmTitle = document.querySelector('#title');
const runTime = document.querySelector('#runtime');
const filmInfo = document.querySelector('#film-info');
const showTime = document.querySelector('#showtime');
const ticketNum = document.querySelector('#ticket-num');
const button = document.querySelector('#buy-ticket');
const poster = document.querySelector('#poster');
const filmList = document.querySelector('#films');
filmList.replaceChildren();

function getAllfilms(id = 1){
    fetch("http://localhost:3000/films{id}")
    .then(res => res.json())
    .then(data => {
        putPosterDetails(data);
    })
}
// poster details
function putPosterDetails(data){
    filmTitle.innerHTML = data.title;
    runTime.innerHTML = '$ {data.runtime} minutes';
    filmInfo.innerHTML = data.description;
    showTime.innerHTML = data.showtime;
    poster.src = data.poster;
    ticketNum.innerHTML = (data.capacity - data.tickets_sold);
    let remainingTickets = (data.capacity - data.tickets_sold);
    ticketNumber(remainingTickets);
}
//film items
function listFilms(){
    fetch("http://localhost:3000/films")
    .then(res => res.json())
    .then(data => {
        data.forEach(film => {
            let filmItem = document.createElement('li');
            filmItem.textContent = film.title.toUpperCase();
            filmList.append(filmItem);
            filmItem.addEventListener('click', (e) => {
                e.preventDefault();
                putPosterDetails(film);
            })
        })

    });

}
function ticketNumber(remainingTickets){
    button.addEventListener('click',(e) => {
        e.preventDefault();
            if (remainingTickets > 0){
                remainingTickets -= 1;
            ticketNum.textContent = remainingTickets;
            }
            else if (remainingTickets <= 0){
                button.textContent = ("Sold Out")
            }
        });

    }

function initialize(){
    getAllfilms();
    listFilms()

}
