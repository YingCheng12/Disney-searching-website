// var firebase = require("firebase");
// define(['require', 'firebase'], function (require) {
//     var firebase = require("firebase");
// })

var config = {
    apiKey: "AIzaSyCXShiyqBV9P2WrDVsG6AwKq37O0OxH_qw",
    authDomain: "inf551-myy-project.firebaseapp.com",
    databaseURL: "https://inf551-myy-project.firebaseio.com",
    projectId: "inf551-myy-project",
    storageBucket: "inf551-myy-project.appspot.com",
    messagingSenderId: "882032800614"
};
firebase.initializeApp(config, 'inf551-myy-project');

var ref = firebase.app("inf551-myy-project").database().ref('/');



function handleSearch() {
    onSearch($('#searchContent').val(), $('#searchCategory').val())
}

function handleKeyDown(e) {
    var evt = window.event || e;
    if (evt.keyCode == 13) {
        handleSearch()
    }
}


function onSearch(content, category) {
    $("#resultCount").html('result: 0');
    var genreCounts = {"drama":0, "cartoon":0, "musical":0};
    var yearsCounts = {"1930":0, "1940":0, "1950":0,"1960":0,"1970":0,"1980":0,"1990":0,"2000":0};
    Object.keys(genreCounts).forEach(key => {
        $('#'+key).html(key);
    })
    Object.keys(yearsCounts).forEach(key => {
        $('#'+key).html(key+'s');
    })

    console.log('-----------------');
    console.log(yearsCounts );

    //build limitation
    var limitGenre = "";
    $('input:checkbox[name=genre]:checked').each(function(){
        limitGenre += ($(this).val()+" ");
        console.log(limitGenre)
    });

    var limityear= "";
    $('input:checkbox[name=album]:checked').each(function(){
        limityear += ($(this).val()+" ");
        console.log(limityear)
    });


    
    var container = document.getElementById('result');
    container.innerHTML = "";
    content = content.toLowerCase();
    var keywords = content.split(' ');
    for(var key in keywords) {
        var keyword = keywords[key];
        var idsRef = firebase.app("inf551-myy-project").database().ref('/index/'+keyword);
        idsRef.on("value",function(snapshot) {
            var ids = snapshot.val();
            var count = 0;
            
            //console.log(ids);

            for(var i=0;i<ids.length;i++) {
                var musicRef = firebase.app("inf551-myy-project").database().ref('/music/music/'+ids[i]);
                musicRef.on("value", function(snapshot){
                    var music = snapshot.val();

                    var years = parseInt(limityear);
                    var compare = parseInt(music['year']);
                    if((limitGenre ==="" || limitGenre.indexOf(music['genre'])!== -1)&&(limityear ==="" || (years<= compare&& compare<years+10))) {
                        container.innerHTML += buildCard(music); 
                        count++;
                        genreCounts[music.genre]++;
                        $('#'+music.genre).html(music.genre+"("+genreCounts[music.genre]+")");
    
                        var myyYear = (parseInt(parseInt(music['year'])/10))*10;
                        yearsCounts[myyYear]++;
                        $('#'+myyYear).html(myyYear+"s("+yearsCounts[myyYear]+")");
                        $('#resultCount').html('result number: ' + count);
                    }
                    
                })
            }
        })
    }
    return;
    
}

function downLoad(filename) {
    console.log(filename)
    var pathRef = firebase.app("inf551-myy-project").storage().ref(filename+'.mp3');
    pathRef.getDownloadURL().then(function(url){
    window.open(url);
    })
}


$(document.body).on('click', '.download' ,function(){
    console.log($(this).html())
    downLoad($(this).html());
})

function buildCard(songs) {
    return `<div class="ui piled segment" id="resultContent">
                <div class="left content">
                    <img class="default-image" src="../assets/images/music.jpg" />
                </div>
                <div class="right content">
                     <div class="item" >
                        <span class="description"><i class="iconfont">&#xe652;</i>Title:</span>
                        <span  class="content"><a  class="download">${songs['title']}</a></span>
                    </div>
                    <div class="item" >
                        <span class="description"><i class="iconfont">&#xe65d;</i>Moive:</span>
                        <span class="content">${songs['album']}</span>
                    </div>
                    <div class="item">
                        <span class="description"> <i class="iconfont">&#xe659;</i>Artist:</span>
                        <span class="content">${songs['artist']}</span>
                    </div>
                    <div class="item">
                        <span class="description"><i class="iconfont">&#xe64e;</i>Year:</span>
                        <span class="content">${songs['year']}</span>
                    </div>
                    <div class="item">
                        <span class="description"><i class="iconfont">&#xe64e;</i>Genre:</span>
                        <span class="content">${songs['genre']}</span>
                    </div>
                </div>
            </div>`

}

function showSiderbar() {
    $('.ui.sidebar')
        .sidebar('toggle')
    ;
}

$('.trigger .accordion')
  .accordion({
    selector: {
      trigger: '.title .icon'
    }
  })
;





