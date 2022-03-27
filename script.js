let games = [
    { id: 1, game: "Call of Duty", genre: ["shooters", "action", "battle royale"], state: "maintenance" },
    { id: 2, game: "Football Manager", genre: ["strategy", "sports", "moba"], state: "patching" },
    { id: 3, game: "Lorem ipsum dolor sit", genre: ["rpg", "kids", "demo"], state: "maintenance" },
    { id: 4, game: "Consectetur lorem adipiscing", genre: ["open world", "adventure", "platformer"], state: "available" },
    { id: 5, game: "Adipiscing consectetur dolor", genre: ["casual", "kids", "simulation"], state: "available" },
    { id: 6, game: "Adipiscing world edition", genre: ["simulation", "open world"], state: "available" },
    { id: 7, game: "Age of Empires", genre: ["strategy", "action", "battle royale", "simulation"], state: "available" },
    { id: 8, game: "Total War", genre: ["strategy", "battle royale", "simulation"], state: "available" },
    { id: 9, game: "Warhammer", genre: ["strategy", "battle royale", "simulation", "horror"], state: "available" },
    { id: 10, game: "Warrrr", genre: ["strategy", "battle royale", "simulation", "horror"], state: "maintenance" },
    { id: 11, game: "2042", genre: ["simulation", "demo", "moba"], state: "available" },
    { id: 12, game: "Warcraft", genre: ["rpg", "strategy"], state: "available" },
    { id: 13, game: "Anno", genre: ["simulation", "platformer"], state: "available" },
    { id: 14, game: "Age of Empires 2", genre: ["strategy", "action", "battle royale", "simulation"], state: "patching" },
    { id: 15, game: "Conquer the World", genre: ["open world", "adventure"], state: "maintenance" },
    { id: 16, game: "Fifa 2021", genre: ["sports"], state: "patching" },
    { id: 17, game: "Fifa 2022", genre: ["sports"], state: "patching" },
    { id: 18, game: "Fifa 2019", genre: ["sports"], state: "available" },
    { id: 19, game: "Fifa 2018", genre: ["sports"], state: "available" },
    { id: 20, game: "Fifa 2027", genre: ["sports"], state: "maintenance" },
    { id: 21, game: "Fighters arena", genre: ["sports", "horror", "simulation"], state: "available" },
    { id: 22, game: "Counter strike", genre: ["shooters", "action", "battle royale"], state: "available" },
    { id: 23, game: "Zounter", genre: ["sports"], state: "available" },
    { id: 24, game: "Zoo", genre: ["shooters", "action", "battle royale"], state: "available" },
    { id: 25, game: "NBA21", genre: ["sports"], state: "available" },
    { id: 26, game: "KBA21", genre: ["sports"], state: "available" },
    { id: 27, game: "NBA22", genre: ["sports"], state: "maintenance" }];



const searchBox = document.querySelector("#searchInput")
const stateInputs = document.querySelectorAll("#stateInput");
const genreInputs = document.querySelectorAll("#genreInput");
const togleButton = document.querySelector(".togleButton");
const listLayout = document.querySelector(".listLayout");

let queryFilteredArr = [];
let statesArr = [];
let genresArr = [];
let genreFilteredArr = [];
let stateFilteredArr = [];
let commonFilteredArr = [];
let isQuerySearched = false;
let chosedQueryArray = [];

searchBox.addEventListener("keyup", () => {
   
    queryFilteredArr = [];
    
    if(statesArr.length > 0 && genresArr.length > 0){
        chosedQueryArray=commonFilteredArr
        commonFilteredArr = [];
    }else if(statesArr.length > 0){
        chosedQueryArray=stateFilteredArr
        commonFilteredArr = [];
    }else if(genresArr.length > 0){
        chosedQueryArray=genreFilteredArr
        commonFilteredArr = [];
    }else{ 
        chosedQueryArray=games
    }
    query = searchBox.value

    for (let each of chosedQueryArray) {
        if (each.game.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            queryFilteredArr.push(each);
            commonFilteredArr.push(each);
        }
    }

    if (query === "") {
        isQuerySearched = false;
        
        if(statesArr.length > 0 && genresArr.length > 0){
            if(stateFilteredArr.length<genreFilteredArr.length){
                commonFilteredArr=stateFilteredArr
            }
            else{ 
                commonFilteredArr=genreFilteredArr}
        }   
        
    } else {
        isQuerySearched = true
    }
    sortAndList();
})




for (let genreInput of genreInputs) {
    genreInput.addEventListener("change", () => {
        genresArr = Array.from(genreInputs).filter(i => i.checked).map(i => i.value)
       
        genreFilter();
        sortAndList();
    })
}




for (let stateInput of stateInputs) {
    stateInput.addEventListener("change", () => {
        statesArr = Array.from(stateInputs).filter(i => i.checked).map(i => i.value)
       
        stateFilter();
        sortAndList();
    })
}




let chosedGenreArr = [];

const genreFilter = () => {
    genreFilteredArr = [];

    if (genresArr.length !== 0) {

        if (statesArr.length > 0 && isQuerySearched) {
            chosedGenreArr = commonFilteredArr;
            commonFilteredArr = [];
        }
        else if (isQuerySearched) {
            chosedGenreArr = queryFilteredArr
            commonFilteredArr = [];
        }
        else if (statesArr.length > 0) {
            chosedGenreArr = stateFilteredArr
            commonFilteredArr = [];
        } else {
            chosedGenreArr = games
            commonFilteredArr = [];
        }

        for (let each of chosedGenreArr) {
            for (let per of genresArr) {
                if (each.genre.indexOf(per) !== -1) {
                    if (genreFilteredArr.indexOf(each) === -1) {
                        genreFilteredArr.push(each)
                        commonFilteredArr.push(each);
                    }
                }
            }
        }
    }else{
        if(isQuerySearched && statesArr.length > 0) {   
            commonFilteredArr = stateFilteredArr
            stateFilter();
        }
        if(isQuerySearched) {   
            commonFilteredArr = stateFilteredArr
        }
        else if(statesArr.length > 0){
            stateFilter();
        }
    }
}


let chosedStateArr = [];

const stateFilter = () => {
    stateFilteredArr = [];

    if (statesArr.length !== 0) {

        if (genresArr.length > 0 && isQuerySearched) {
            chosedStateArr = commonFilteredArr;
            commonFilteredArr = [];
        }
        else if (isQuerySearched) {
            chosedStateArr = queryFilteredArr
            commonFilteredArr = [];
        }
        else if (genresArr.length > 0) {
            chosedStateArr = genreFilteredArr
            commonFilteredArr = [];
        } else {
            chosedStateArr = games
            commonFilteredArr = [];
        }

        for (let each of chosedStateArr) {
            for (let per of statesArr) {
                if (each.state.indexOf(per) !== -1) {
                    if (stateFilteredArr.indexOf(each) === -1) {
                        stateFilteredArr.push(each);
                        commonFilteredArr.push(each);
                    }
                }
            }
        }
    }else{
        if(isQuerySearched && genresArr.length > 0) {   
            commonFilteredArr = genreFilteredArr
            genreFilter();
        }
        else if(isQuerySearched) {   
            commonFilteredArr = queryFilteredArr
        }
        else if(genresArr.length > 0){
            genreFilter();
        }
    }
}



let groupsObj = {};
let click = true;
let groupsNameArr = [];
let gamesArr = [];


togleButton.addEventListener("click", () => {
    click = !click;
    if (click) {
        togleButton.id = "togleSorting";
        togleButton.innerHTML = "Z-A";
    }
    else {
        togleButton.id = "togleSortingReverse";
        togleButton.innerHTML = "A-Z";
    }
    sortAndList();
    return click
})


const sortAndList = () => {

    while (listLayout.hasChildNodes()) {
        listLayout.removeChild(listLayout.firstChild);
    }

    if (genresArr.length > 0 && isQuerySearched && statesArr.length > 0) {
        gamesArr = commonFilteredArr;
    } else if (statesArr.length > 0 && genresArr.length > 0) {
        gamesArr = commonFilteredArr;
    }
    else if (isQuerySearched && genresArr.length > 0) {
        gamesArr = commonFilteredArr;

        
    }
    else if (isQuerySearched && statesArr.length > 0) {
        gamesArr = commonFilteredArr;
    }
    else if (statesArr.length > 0) {
        stateFilter();
        gamesArr = stateFilteredArr
    } else if (genresArr.length > 0) {
        gamesArr = genreFilteredArr
        genreFilter();
    } else if (isQuerySearched) {
        gamesArr = queryFilteredArr
      
    }else{
        gamesArr = games
    }



    groupsObj = {};

    for (let i = 0; i < gamesArr.length; i++) {
        let groupName = gamesArr[i].game[0];
        if (!groupsObj[groupName]) {
            groupsObj[groupName] = [];
        }
        groupsObj[groupName].push(gamesArr[i]);
    }

    if (click) {
        groupsNameArr = Object.keys(groupsObj).sort();
    }
    else {
        groupsNameArr = Object.keys(groupsObj).sort().reverse();
    }

    for (let groupsName of groupsNameArr) {
        const groupDiv = document.createElement("div");
        groupDiv.className = "group";
        listLayout.appendChild(groupDiv);
        const groupNameBoxDiv = document.createElement("div");
        groupNameBoxDiv.className = "groupNameBox";
        groupDiv.appendChild(groupNameBoxDiv);
        const groupNameSpan = document.createElement("span");
        groupNameSpan.className = "groupName";
        groupNameSpan.innerText = groupsName;              
        groupNameBoxDiv.appendChild(groupNameSpan);
        const printListAreaDiv = document.createElement("div");
        printListAreaDiv.className = "printListArea";
        groupDiv.appendChild(printListAreaDiv);

        let gameGroupNamesArr = [];                        
        let sortedGroupedGameNamesArr = [];


        for (let group of groupsObj[groupsName]) {
            gameGroupNamesArr.push(group.game);
        }

        sortedGroupedGameNamesArr = gameGroupNamesArr.sort();

        for (let eachGame of sortedGroupedGameNamesArr) {
            const printRowDiv = document.createElement("div");
            printRowDiv.className = "printRow";

            printRowDiv.innerText = eachGame;
            printListAreaDiv.appendChild(printRowDiv);
        }


    }

}


sortAndList();

