const container = document.querySelector('.container');
const seats = document.querySelectorAll('.seat');
const movieSelect = document.getElementById('movie');
const count = document.getElementById('count');
const total = document.getElementById('total');


populateUi();

let ticketPrice = +movieSelect.value;

function updateCount(){
    const selectedSeat = document.querySelectorAll('.row .seat.selected');
    const selectedSeatIndex = [...selectedSeat].map(seat =>[...seats].indexOf(seat));
    console.log(selectedSeatIndex);
    const selectedLength = selectedSeat.length;
    count.innerText = selectedLength;
    total.innerText = selectedLength * ticketPrice;
    localStorage.setItem('selectedSeats',JSON.stringify(selectedSeatIndex))
};

function populateUi(){
    const selectedIndex = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedIndex!==null && selectedIndex.length>0){
        seats.forEach((seat,index) => {
            if(selectedIndex.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        });
    
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

};

function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

container.addEventListener('click', e=>{
   
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
    }

    updateCount();
})

movieSelect.addEventListener('change', e=>{
    ticketPrice = e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateCount();
})

updateCount();