const pBar = document.querySelector('.progress');
let currentProgress = 0;

function updateProgressBar (progressBar, value) {
    value = Math.round(value);
    progressBar.querySelector('.progress-fill').style.width = `${value}%`;
    progressBar.querySelector('.progress-text').textContent = `${value}%`;
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

updateProgressBar(pBar, 0);

document.addEventListener('DOMContentLoaded', () => {
    const questionWrapper = document.querySelector('.question-wrapper');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const h1Element = document.querySelector('.container h1');
    const navigation = document.querySelector('.navigation');
    let currentSlideIndex = 0;
    const totalSlides = document.querySelectorAll('.slide').length;
    const submitBtn = document.querySelector('#submit');

    function updateSlide() {
        const offset = -currentSlideIndex * 10; // 100% dibagi 10 slide
        questionWrapper.style.transform = `translateX(${offset}%)`;
        
        // Show/hide the h1 element based on the current slide index
        /*
        if (currentSlideIndex > 0 && currentSlideIndex <= 10) {
            h1Element.style.display = 'block';
        } else {
            h1Element.style.display = 'none';
        }
            */
        if(currentSlideIndex==9){
            nextBtn.style.display = "none";
            submitBtn.style.display = "block";
        } else{
            nextBtn.style.display = "block";
            submitBtn.style.display = "none";
        }

        if(currentSlideIndex==0){
            prevBtn.style.display="none";
            navigation.style.float = "right";
        } else{
            prevBtn.style.display="block";
            navigation.style.float = "none";
        }

    }

    nextBtn.addEventListener('click', () => { // Tombol kanan
        let filled = document.getElementsByClassName("on").length;
        if (currentSlideIndex < totalSlides - 1) { 
            if(filled < 7*(currentSlideIndex+1)){
                alert("Isi semua pertanyaan terlebih dahulu");
            } else{
                currentSlideIndex++;
                updateSlide();
                //scroll to top
                topFunction();
                //progress update
                currentProgress=(filled/7)*10;
                updateProgressBar(pBar, currentProgress);
            }
        }
    });

    prevBtn.addEventListener('click', () => { // Tombol kiri
        if (currentSlideIndex > 0) { 
            currentSlideIndex--;
            updateSlide();
        }
    });

    // Initial update to handle the first slide
    updateSlide();
});

//HASNAAAA
let visual = 0, verbal = 0, social=0, physical=0, aural=0, solitary=0, logical=0;

function jawaban(choice){
    let status = choice.name;
    //ambil semua button di pertanyaan yang sama
    let btns = document.getElementsByName(status);
    console.log(btns.length);
    for(i=0; i<3; i++){
        btns[i].classList.remove("off")
        btns[i].classList.remove("on")
        btns[i].classList.add("off");
    }

    choice.classList.remove("off");
    choice.classList.add("on");
    for(i=0; i<3; i++){
        console.log(btns[i]);
    }
    btns = [];
}

function submit(){
    let masukan = document.getElementsByClassName("on");
    console.log(masukan.length)

    if(masukan.length < 70){
        alert("Belum semua pernyataan terisi");
    } else{
        let jumlah = masukan.length
        for(i=0; i<jumlah; i++){
            let el = masukan[i];
            let tipe = el.parentElement.parentElement.parentElement.classList[1];
            let val = parseInt(el.value);
            console.log(val);

            switch(tipe){
                case "visual":
                    visual+=val;
                    break;
                case "verbal":
                    verbal+=val;
                    break;
                case "social":
                    social+=val;
                    break;
                case "physical":
                    physical+=val;
                    break;
                case "aural":
                    aural+=val;
                    break;
                case "solitary":
                    solitary+=val;
                    break;
                case "logical":
                    logical+=val;
                    break;
            }

        }

    replace();
    buildChart();
    }
    
}

function buildChart(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type:'radar',

        data:{
            labels: ["Visual", "Social", "Physical", "Aural", "Verbal", "Solitary", "Logical"],
            datasets:[{
                label: "Gaya Belajar",
                backgroundColor: 'rgb(28, 46, 133, 0.5)',
                borderColor: 'black',
                borderWidth: '0.4',
                pointBackgroundColor: 'grey',
                pointRadius: '0.7',
                data: [visual, social, physical, aural, verbal, solitary, logical],
            }]
        },
        options:{
            responsive: true,
            maintainAspectRatio: false,
            scale:{
                ticks:{
                    min: 0,
                    max: 20,
                    stepSize: 5
                }
            }
        }

    })

    sortStyle();
}

function refresh(){
    window.location.reload();
    window.scrollTo(top);
}

function replace(){
    //let questions = document.getElementsByClassName("questions");
    /*for(i=0; i<21; i++){
        questions[i].style.display = "none";
    }*/

    document.getElementById("question-wrapper").style.display = "none";
    document.getElementById("navigation").style.display = "none";

    updateProgressBar(pBar, 100);
    document.getElementById("chart-container").style.display = "block";
    document.getElementById("refresh-container").style.display="flex";
    document.getElementById("score").style.display="flex";

    document.getElementById("h1-element").innerText = "Berikut Tipe Belajar Anda:"
    topFunction();
}

function sortStyle(){
    let urutan = [
        {
            value: visual,
            text: "Visual: ",
            description: "Anda menggunakan gambar, gambar, visualisasi, dan pengaturan spasial."
        },
        {
            value: social,
            text: "Social: ",
            description: "Anda lebih suka belajar dengan kelompok atau orang lain."
        },
        {
            value: physical,
            text: "Physical: ",
            description: "Anda menggunakan tubuh, tangan, dan indra peraba Anda."
        },
        {
            value: aural,
            text: "Aural: ",
            description: "Anda menggunakan suara dan musik."
        },
        {
            value: verbal,
            text: "Verbal: ",
            description: "Anda menggunakan kata-kata dan tulisan."
        },
        {
            value: solitary,
            text: "Solitary: ",
            description: "Anda lebih suka bekerja sendiri dan belajar mandiri."
        },
        {
            value: logical,
            text: "Logical: ",
            description: "Anda menggunakan logika, penalaran, dan sistem."
        },
    ]

    //sort
    urutan.sort((a,b)=> {
        const valA = a.value;
        const valB = b.value;
        if(valA < valB){
            return 1;
        }
        if(valA > valB){
            return -1;
        }
        return 0;
    })

    console.log(urutan);

    const styles = document.getElementsByClassName("style");
    const desc = document.getElementsByClassName("desc");
    let scoreBox = document.getElementById("score");

    for(i=0; i<7; i++){

        styles[i].innerText = urutan[i].text + urutan[i].value.toString() + "/20";
        desc[i].innerText = urutan[i].description;
    }
}

function showDesc(box){
    let desc = box.parentElement.parentElement.childNodes;
    if(desc[3].style.display=="none"){
        desc[3].style.display = "block";
    } else{
        desc[3].style.display = "none";
    }
    
}





