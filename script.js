$(document).ready(function() {
    // displays current time
    moment().format("LLL")
    let currentDate= moment().format("LLL");
    console.log(currentDate) 
    $("#DT").text(currentDate);
    //renders buttons for previously searched games
    renderGames = () => {
        let searchedGames = JSON.parse(localStorage.getItem('gameName'));
        let gameBtn = $("<button class= 'button is-primary is-focused is-mobile'>").text(searchedGames);
        $('#searches').prepend(gameBtn);
    }
    //event listener for search button
    $('#search').click(function(){
        $("#game-text").val() == "";
        //get the text value
        var user = $("#game-text").val().trim(); 
        //var userContent = $(this).siblings("input").val();
        var gameArr = [];
        gameArr.push(user);
        console.log(gameArr);
        localStorage.setItem('gameName', JSON.stringify(gameArr));
        today(user);
        console.log(user);
        renderGames();
    });
    
    //function api calls to display game data
    today = (user) => {
        $.ajax({
            method: "GET",
            url: "https://www.cheapshark.com/api/1.0/deals?title="+user
        }).then(function(data) {
            console.log(data);
            //emptys divs
            $("#display").empty();
            $("#retail").empty();
            $("#rating-text").empty();
            $("#rating-count").empty();
            //display for game review
            let ratingPercent = data[1].steamRatingPercent;
            //determines icon for rating
            if (ratingPercent <= 40) {
                var ratingIcon = $("<i class='fas fa-thumbs-down'>")
            } else if (ratingPercent >= 41) {
                var ratingIcon = $("<i class='fas fa-thumbs-up'>")
            }
            //appends rating text review
            let ratingText = data[1].steamRatingText;
            let percentDiv = $('<p>').text( ratingPercent + " % " + ratingText + " - STEAM");
            $("#rating-text").append(percentDiv);
            $("#rating-text").append(ratingIcon);
            //displays number of gamers that rate the game
            let ratingCount = data[1].steamRatingCount;
            let countDiv = $('<p>').text("Rated By : " + ratingCount + " Gamers");
            $('#rating-count').append(countDiv);
            //displays retail price
            var normalPrice = data[1].normalPrice;
            let oldP =$('<p>').text("Retail : " + normalPrice);
            $(oldP).addClass("cut");
            $("#retail").append(oldP);
            //display gameTitle & sale price with thumbnail
            let gameTitle = data[1].title;
            let pOne = $('<p>').text("Title : " + gameTitle);
            $("#display").append(pOne);
            $("#price").empty();
            let gamePrice = data[1].salePrice;
            let pTwo = $('<p>').text("Your Lucky Price! " + gamePrice);
            $("#price").append(pTwo);
            $("#image").empty();
            let gameImage = data[1].thumb;
            let pThree = $('<img>').attr('src', gameImage);
            $('#image').append(pThree);
            // link for metacritic
                $('#news').click(function(){
                    $.ajax({
                        method:"GET",
                        url: "https://api.rawg.io/api/games?dates=2019-09-01,2019-09-30&platforms=18,1,7"
                    }).then(function(response) {
                        console.log(response.results);
                        $("#newRelease").empty();
                        let releaseTitle = response.results[0].name;
                        let releaseSect = $('<p>').text("New Release :" + releaseTitle);
                        releaseSect.addClass("section");
                        $("#newRelease").append(releaseSect);
                        let releaseDay = response.results[0].released;
                        let dateSect = $('<p>').text("Date Released :" + releaseDay);
                        dateSect.addClass("section");
                        $("#newRelease").append(dateSect);
                    })
                });
            metaData = () => {
                let metaLink = data[1].metacriticLink;
                $('#meta-link').attr("href", "https://www.metacritic.com/" + metaLink);
            }
            
            steamData = () => {
            let steamLink = data[1].steamAppID;
            console.log(steamLink)
            $('#steam-link').attr("href", "https://store.steampowered.com/app/" + steamLink);
        }
        //gameNews =() => {
            //$.ajax({
               // method:"GET",
                //url:" http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=" + steamLink + "&count=3&maxlength=150&format=json"
            //})
        //}
        
        /*var gameObject= {
            normalPrice: data[1].normalPrice,
            gameTitle: data[1].title,
            gamePrice: data[1].salePrice,
            gameImage: data[1].thumb
        }
        
            
                 localStorage.setItem("storageTi2", JSON.stringify(gameObject ));
                 let storageTi= localStorage.getItem("storageTi2");
                console.log (JSON.parse(storageTi));*/ 
    });




};
});
