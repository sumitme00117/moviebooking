const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

let ticketPrice = +movieSelect.value

populateUI()
// Save selected movie index and price
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}
//update total and count
function updateSelectedCount(){
const selectedSeat = document.querySelectorAll('.row .seat.selected')

const seatsIndex = [...selectedSeat].map((seat)=>{
    return [...seats].indexOf(seat)
})
localStorage.setItem('selectedSeat',JSON.stringify(seatsIndex))
const selectSeatsCount = selectedSeat.length
count.innerText = selectSeatsCount
total.innerText = selectSeatsCount * ticketPrice
}

// Get data from local storage and populate in the UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeat'))
    if(selectedSeats !== null && selectedSeats.length>0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected')
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }
}
//Movie select event
movieSelect.addEventListener('change',(e)=>{
ticketPrice = e.target.value
setMovieData(e.target.selectedIndex, e.target.value)
updateSelectedCount()
})
// Seat click event
container.addEventListener('click',(e)=>{
if(e.target.classList.contains('seat') && !(e.target.classList.contains('occupied')))
{
    e.target.classList.toggle('selected')
    updateSelectedCount();
}
})

// Initital Count and total set
updateSelectedCount()