//ok to use with one city submission only



$(".search-button").on("click", function (event) {
    event.preventDefault();
    var input = $(this).siblings(".form-control");
    var name = input.val();
    localStorage.setItem("city", name);
    console.log(name);
  });

// USE DATA ATTRIBUTES for buttons

// Get city input

// document.querySelector("input").value();

// store input in local storage
// attachh city input to first api call
// get lon and lat from first api call
// attach lon and lat to second api call
// 

// Part A:
// DISPLAY ONE CITY FORECAST

// THINK OF THE CONCEPTUAL FUNCTIONALITY

// Look at TODOS exercisee



// Part B:

// Search for a city and display forecast

// add parameter for IMPERIAL units

// Part C:
// let array for searchHistory
//
// read array from end of array
//
// create and append element
// 
// this sorts buttons from recent
// 
// save items to end of array in localStorage
// 
// bonus: clear history button