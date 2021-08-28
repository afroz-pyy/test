// get Dom Elements:
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const searchHeading = document.getElementById('search-heading');
const meals = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

// functions:
function searchFood(e){
        e.preventDefault();

        const searchText = search.value;
        
        if(searchText.trim()){
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}
            `)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                searchHeading.innerHTML = `<div class="search-result">Search result for ${searchText}</div>`
                if(data.meals === null){
                    searchHeading.innerHTML = `<div class="search-result">Search not found for ${searchText}</div>`

                }else{
                    meals.innerHTML = data.meals.map(meal => `

                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <div class="meal-info" data-mealId = ${meal.idMeal}>
                            <h4>${meal.strMeal}</h4>
                            </div>
                        </div>

                    `

                    )
                    .join('');
                }
            })
        }
        else{
            alert('Please enter a value');
        }
}










//Event Listners:
// 1.Event for submit:
submit.addEventListener('submit',searchFood);