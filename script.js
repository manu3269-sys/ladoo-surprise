const song = document.getElementById("mainSong");
// GitHub specific relative paths
const photos = ["./photo1.jpg","./photo2.jpg","./photo3.jpg","./photo4.jpg","./photo5.jpg","./photo6.jpg"];
const messages = ["My happiness is you ❤️","Your smile is my peace 😊","Every moment with you is special 💕","You are my forever 🌹","My love, my life 💖","Always yours, Ladoo ❤️"];
let pIdx = 0;

function transition(from, to) {
    document.getElementById(from).style.opacity = "0";
    setTimeout(() => {
        document.getElementById(from).classList.add("hidden");
        const next = document.getElementById(to);
        next.classList.remove("hidden");
        setTimeout(() => next.style.opacity = "1", 50);
    }, 800);
}

document.getElementById("unlockBtn").onclick = () => { song.play(); transition("scene1", "scene2"); };

document.getElementById("giftBox").onclick = function() {
    this.style.display = "none";
    document.getElementById("greeting").classList.remove("hidden");
    const photoElem = document.getElementById("photo");
    const msgElem = document.getElementById("photoMsg");
    const updateGallery = () => {
        if (pIdx < photos.length) {
            photoElem.src = photos[pIdx]; msgElem.innerText = messages[pIdx]; pIdx++;
            setTimeout(updateGallery, 3000);
        } else { setTimeout(() => transition("scene2", "scene3"), 2000); }
    };
    updateGallery();
};

function moveButton() {
    const btn = document.getElementById("no-btn");
    btn.style.position = "fixed";
    btn.style.left = Math.random() * (window.innerWidth - 100) + "px";
    btn.style.top = Math.random() * (window.innerHeight - 50) + "px";
}

function handleYes() { transition("scene3", "scene4"); }

function finishCelebration() { 
    document.getElementById("candle").style.display = "none"; 
    transition("scene4", "scene5"); 
    setTimeout(startTypingLetter, 1000); 
}

function startTypingLetter() {
    const msg = "From the moment I met you, my life changed. You are my Ladoo, my best friend, and now my forever. I promise to always make you smile and love you more every single day. Happy Birthday my love! ❤️";
    let i = 0; const box = document.getElementById("love-letter");
    function type() {
        if (i < msg.length) { box.innerHTML += msg.charAt(i); i++; setTimeout(type, 50); }
        else { 
            const btn = document.createElement("button"); btn.className = "unlock"; btn.innerHTML = "Read My Secret Diary 💌";
            btn.onclick = () => transition("scene5", "scene_envelope");
            box.appendChild(document.createElement("br")); box.appendChild(btn);
        }
    }
    type();
}

function openEnvelope() { transition("scene_envelope", "scene6"); setTimeout(startDiaryTyping, 1000); }

function startDiaryTyping() {
    const memory = "Dec 31, 2025... Looking back at 2019, when I saw you for the first time in 8th class. You were with your sisters, but my eyes couldn't look anywhere else. Then came Jan 9, 2020—the night I proposed at 8:45 PM, not knowing the storm that was coming. <br><br>The year we spent apart when your family moved was the hardest of my life, but fate brought my Ladoo back to me in 2021. You said 'No' twice, but the third time, you finally admitted you loved me more than anything. <br><br>From me sneaking into your house just to see you, to the way you made excuses to go to your sister's house just to hear my voice—your efforts have always been more than mine. Even when things got tough and you faced your father's anger, you never let go of my hand. You are stronger than me, Wifey. <br><br>Those big eyes, that small nose, and the way you look when you cook for me... I can still taste that first meal you made; it was the best thing I've ever had. You are the most beautiful wife I could ever dream of. Thank you for never leaving me. I am yours forever. ❤️";
    let j = 0; const diaryBox = document.getElementById("diary-memory"); const card = document.querySelector('.diary-card');
    function type() {
        if (j < memory.length) {
            if (memory.slice(j, j+4) === "<br>") { diaryBox.innerHTML += "<br>"; j += 4; }
            else { diaryBox.innerHTML += memory.charAt(j); j++; }
            card.scrollTop = card.scrollHeight; setTimeout(type, 45);
        } else {
            document.getElementById("final-reply").classList.remove("hidden");
            setTimeout(() => { document.getElementById("final-reply").style.opacity="1"; card.scrollTop = card.scrollHeight; }, 100);
        }
    }
    type();
}

function updateCountdown() {
    const startDate = new Date("January 9, 2020 20:45:00").getTime();
    const now = new Date().getTime(); const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerHTML = `${days}d : ${hours}h : ${mins}m : ${secs}s`;
}
setInterval(updateCountdown, 1000);

function toggleMusic() {
    const disk = document.getElementById('musicDisk');
    if (song.paused) { song.play(); disk.style.animationPlayState = 'running'; }
    else { song.pause(); disk.style.animationPlayState = 'paused'; }
}

for(let i=0; i<40; i++){
    const h = document.createElement("div"); h.className = "heart-bg";
    h.innerHTML = (i%2==0) ? "❤️" : "♡"; 
    h.style.left = Math.random()*100 + "%";
    h.style.fontSize = Math.random() * (20 - 10) + 10 + "px";
    h.style.animationDuration = 5 + Math.random()*10 + "s"; 
    h.style.animationDelay = Math.random()*5 + "s";
    document.getElementById("bg").appendChild(h);
}

function sendReply() {
    const msg = document.getElementById("wifey-msg").value;
    const myNum = "917720040992";
    window.open(`https://wa.me/${myNum}?text=Swasti's Reply: ${encodeURIComponent(msg)}`, "_blank");
}