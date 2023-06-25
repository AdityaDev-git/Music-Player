console.log("welcome to music player")
//initialize the variable
let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let  masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let mSongName = document.getElementById('mSongName');
let gif = document.getElementById('gif');
//songs array
let songs = [
    {songName:"Blade runner", filePath:"/songs/1.mp3", coverPath:"/songs/c1.jpg"},
    {songName:"Legend of zelda", filePath:"/songs/2.mp3", coverPath:"/songs/c2.jpg"},
    {songName:"Dragonet", filePath:"/songs/3.mp3", coverPath:"/songs/c3.jpg"},
    {songName:"Highschool DxD", filePath:"/songs/4.mp3", coverPath:"/songs/c4.jpg"},

    {songName:"Highschool DxD", filePath:"/songs/5.mp3", coverPath:"/songs/c5.jpg"},
    {songName:"Highschool DxD", filePath:"/songs/6.mp3", coverPath:"/songs/c6.jpg"},
    {songName:"Highschool DxD", filePath:"/songs/7.mp3", coverPath:"/songs/c7.jpg"},
    {songName:"Highschool DxD", filePath:"/songs/8.mp3", coverPath:"/songs/c8.jpg"},

    {songName:"Highschool DxD", filePath:"/songs/9.mp3", coverPath:"/songs/c9.jpg"},
    {songName:"Highschool DxD", filePath:"/songs/10.mp3", coverPath:"/songs/c10.jpg"},
    {songName:"Highschool DxD", filePath:"/songs/11.mp3", coverPath:"/songs/c11.jpg"},
    {songName:"Highschool DxD", filePath:"/songs/12.mp3", coverPath:"/songs/c12.jpg"}
]
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
    if(songIndex >= 11){
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
