console.log("welcome to music player")
//initialize the variable
let songList = document.querySelector('.wrap');
let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let  masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let mSongName = document.getElementById('mSongName');
let gif = document.getElementById('gif');
let fav = false;
let favSongs = [];


//songs array
let songs = [
    {songName:"Blade runner", filePath:"/songs/1.mp3", coverPath:"/songs/c1.jpg", id:"0"},
    {songName:"Legend of zelda", filePath:"/songs/2.mp3", coverPath:"/songs/c2.jpg", id:"1"},
    {songName:"Dragonet", filePath:"/songs/3.mp3", coverPath:"/songs/c3.jpg", id:"2"},
    {songName:"Highschool DxD", filePath:"/songs/4.mp3", coverPath:"/songs/c4.jpg", id:"3"},
    {songName:"GTA san andres", filePath:"/songs/5.mp3", coverPath:"/songs/c5.jpg", id:"4"},
    {songName:"Roll up", filePath:"/songs/6.mp3", coverPath:"/songs/c6.jpg", id:"5"},
    {songName:"JRE Podcast", filePath:"/songs/7.mp3", coverPath:"/songs/c7.jpg", id:"6"},
    {songName:"GOT Theme", filePath:"/songs/8.mp3", coverPath:"/songs/c8.jpg", id:"7"},
    {songName:"kaoma Lambda", filePath:"/songs/9.mp3", coverPath:"/songs/c9.jpg", id:"8"},
]


//  // load songs
let displaySongs = ()=>{
    if (!fav) {
        return (songList.innerHTML = songs.map((song)=>{
            return `<div class="songItem">
            <img src=${song.coverPath} alt="1" />
            <span>${song.songName}</span>
            <span class="songlistplay">
            <i class="fa-regular fa-star fav" onClick={addFav(${song.id})}></i><i id=${song.id} class="songPlay fa-solid fa-play"></i></span>
            </div>`
        }).join(""));
    } else {
        return (songList.innerHTML = favSongs.map((song)=>{
            return `<div class="songItem">
            <img src=${song.coverPath} alt="1" />
            <span>${song.songName}</span>
            <span class="songlistplay">
            <i class="fa-solid fa-star fav"></i><i id=${song.id} class="songPlay fa-solid fa-play"></i></span>
            </div>`
        }).join(""));
    }
};
displaySongs();


//handle sidebar click
let tofav =()=>{
    fav = !fav;
    displaySongs();
    console.log("sidebar click");
}

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-play')
        gif.style.opacity = 0;
    }
})

// handle fav btn
let favBtn =()=>{
    Array.from(document.getElementsByClassName('fav')).forEach((Element)=>{
        Element.addEventListener('click',(e)=>{
            e.target.classList.remove('fa-regular');
            e.target.classList.add('fa-solid');
        })
    })
}
let addFav =(i)=>{
    favBtn();
    console.log("fav added");
    if (!favSongs.includes(songs[i])) {
        favSongs.push(songs[i]);
    }
    console.log(favSongs);
}



//listen to events
audioElement.addEventListener('timeupdate',()=>{
    console.log("time update")

//update seek bar
progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
console.log(progress);
progressBar.value = progress;
})

progressBar.addEventListener('change',()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

const makeAllPlay = () =>{
    Array.from(document.getElementsByClassName('songPlay')).forEach((Element)=>{
        Element.classList.remove('fa-pause')
        Element.classList.add('fa-play')
    })
}
Array.from(document.getElementsByClassName('songPlay')).forEach((Element)=>{
    Element.addEventListener('click',(e)=>{
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        console.log(e.target);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        gif.style.opacity = 1;
        audioElement.src = `/songs/${songIndex + 1}.mp3`;
        mSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 8){
        songIndex = 0
    }else{
        songIndex += 1;
    }

    audioElement.src = `/songs/${songIndex + 1}.mp3`;
    mSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
}) 

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0
    }else{
        songIndex -= 1;
    }

    audioElement.src = `/songs/${songIndex + 1}.mp3`;
    mSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
}) 
