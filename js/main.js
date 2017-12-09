//Arrow function to be used when the document loads
$(document).ready(() => {
//  saving the value from the search box when enter key is pressed
$('#searchForm').on('submit', (e) =>{
  let searchText = $('#searchText').val();
  getMovies(searchText);
  e.preventDefault();
});
});
//calling the omdb api using apikey
function getMovies(searchText){
  //apikey pulls out the data from the movie site
  axios.get('http://www.omdbapi.com?apikey=199ec0b9&s='+searchText)
  //
  .then((response) => {
    //logging the response received from the server
  console.log(response);
  //setting a variable for the the data we will be pulling out from the server's response
  let movies = response.data.Search;
  //assigning a variable for displaying the data
  let output ='';
  //running a each loop to loop through the movie list
  $.each(movies, (index, movie) =>{
    //the backquotes is used to write multiple lines of codes in jQuery
    output += `
    <div class="col-md-4">
     <div class="well text-center">
     <img src ="${movie.Poster}">
     <h5>${movie.Title}</h5>
     <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
     </div>
     </div>
    `;
  });
  //displaying out in the webpage
  $("#movies").html(output);
  })
  //to catch the error and log them
  .catch((err) =>{
console.log(err);
});
}
function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}
function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get('http://www.omdbapi.com?apikey=199ec0b9&i='+movieId)
  .then((response) => {
  console.log(response);
  let movie = response.data;

  let output = `
<div class="row">
<div class="col-md-4">
<img src="${movie.Poster}" class="thumbnail">
</div>
<div class="col-md-8">
  <h2>${movie.Title}</h2>
  <ul class="list-group">
  <li class="list-group-item"><strong>Genre</strong> ${movie.Genre}</li>
    <li class="list-group-item"><strong>Released</strong> ${movie.Released}</li>
      <li class="list-group-item"><strong>Rated</strong> ${movie.Rated}</li>
        <li class="list-group-item"><strong>IMDB Rating</strong> ${movie.imdbRating}</li>
          <li class="list-group-item"><strong>Director</strong> ${movie.Director}</li>
            <li class="list-group-item"><strong>Writer</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors</strong> ${movie.Actors}</li>
    </ul>
    </div>
    <div class="row">
     <div class="well">
      <h3>Plot</h3>
      ${movie.Plot}
      <hr>
      <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
      <a href="index.html" type="button" class="btn btn-success">Go Back TO Search</a>
      </div>
</div>
  `;
  $("#movie").html(output);
})
.catch((err) => {
  console.log(err);
});
}
