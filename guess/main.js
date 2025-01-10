// Made with help of ChatGPT

const images = [{'path': 'images/Achilles.png', 'answer': 'Achilles'}, {'path': 'images/Adele.png', 'answer': 'Adele'}, {'path': 'images/Adina.png', 'answer': 'Adina'}, {'path': 'images/Aegenhart.png', 'answer': 'Aegenhart'}, {'path': 'images/Aesop.png', 'answer': 'Aesop'}, {'path': 'images/Aidan.png', 'answer': 'Aidan'}, {'path': 'images/Al.png', 'answer': 'Al'}, {'path': 'images/Alan.png', 'answer': 'Alan'}, {'path': 'images/Alba.png', 'answer': 'Alba'}, {'path': 'images/Albert.png', 'answer': 'Albert'}, {'path': 'images/Aldo.png', 'answer': 'Aldo'}, {'path': 'images/Alicia.png', 'answer': 'Alicia'}, {'path': 'images/Alvin.png', 'answer': 'Alvin'}, {'path': 'images/Anastasia.png', 'answer': 'Anastasia'}, {'path': 'images/Aphelion.png', 'answer': 'Aphelion'}, {'path': 'images/Ardoph.png', 'answer': 'Ardoph'}, {'path': 'images/Astor.png', 'answer': 'Astor'}, {'path': 'images/Baade (dwarf).png', 'answer': 'Baade (Dwarf)'}, {'path': 'images/Baade.png', 'answer': 'Baade'}, {'path': 'images/Barbena.png', 'answer': 'Barbena'}, {'path': 'images/Belflower.png', 'answer': 'Belflower'}, {'path': 'images/Ben.png', 'answer': 'Ben'}, {'path': 'images/Blackjack.png', 'answer': 'Blackjack'}, {'path': 'images/Bligh.png', 'answer': 'Bligh'}, {'path': 'images/Bosso.png', 'answer': 'Bosso'}, {'path': 'images/Bran.png', 'answer': 'Bran'}, {'path': 'images/Brie.png', 'answer': 'Brie'}, {'path': 'images/Brockle.png', 'answer': 'Brockle'}, {'path': 'images/Brood.png', 'answer': 'Brood'}, {'path': 'images/Bruce.png', 'answer': 'Bruce'}, {'path': 'images/Bull.png', 'answer': 'Bull'}, {'path': 'images/Buta.png', 'answer': 'Buta'}, {'path': 'images/Butch.png', 'answer': 'Butch'}, {'path': 'images/Caesar.png', 'answer': 'Caesar'}, {'path': 'images/Cairn.png', 'answer': 'Cairn'}, {'path': 'images/Camuse.png', 'answer': 'Camuse'}, {'path': 'images/Carlos.png', 'answer': 'Carlos'}, {'path': 'images/Cecil.png', 'answer': 'Cecil'}, {'path': 'images/Cepheid (cloud).png', 'answer': 'Cepheid (Cloud)'}, {'path': 'images/Cepheid (elf).png', 'answer': 'Cepheid (Elf)'}, {'path': 'images/Cepheid.png', 'answer': 'Cepheid'}, {'path': 'images/Charlie.png', 'answer': 'Charlie'}, {'path': 'images/Chatt.png', 'answer': 'Chatt'}, {'path': 'images/Cherie.png', 'answer': 'Cherie'}, {'path': 'images/Christoph.png', 'answer': 'Christoph'}, {'path': 'images/Clarence.png', 'answer': 'Clarence'}, {'path': 'images/Clarice (quasar-human).png', 'answer': 'Clarice (Quasar-Human)'}, {'path': 'images/Claudia.png', 'answer': 'Claudia'}, {'path': 'images/Clive.png', 'answer': 'Clive'}, {'path': 'images/Coco.png', 'answer': 'Coco'}, {'path': 'images/Cody.png', 'answer': 'Cody'}, {'path': 'images/Conrad.png', 'answer': 'Conrad'}, {'path': 'images/Cornelia.png', 'answer': 'Cornelia'}, {'path': 'images/Cosmo.png', 'answer': 'Cosmo'}, {'path': 'images/Cross.png', 'answer': 'Cross'}, {'path': 'images/Curtis.png', 'answer': 'Curtis'}, {'path': 'images/Dan.png', 'answer': 'Dan'}, {'path': 'images/Daniel.png', 'answer': 'Daniel'}, {'path': 'images/Danny.png', 'answer': 'Danny'}, {'path': 'images/Daria.png', 'answer': 'Daria'}, {'path': 'images/David.png', 'answer': 'David'}, {'path': 'images/Den.png', 'answer': 'Den'}, {'path': 'images/Dennis.png', 'answer': 'Dennis'}, {'path': 'images/Derek.png', 'answer': 'Derek'}, {'path': 'images/Dimitri.png', 'answer': 'Dimitri'}, {'path': 'images/Dominic.png', 'answer': 'Dominic'}, {'path': 'images/Donkey.png', 'answer': 'Donkey'}, {'path': 'images/Donovitch.png', 'answer': 'Donovitch'}, {'path': 'images/Doppio.png', 'answer': 'Doppio'}, {'path': 'images/Drago.png', 'answer': 'Drago'}, {'path': 'images/Drew.png', 'answer': 'Drew'}, {'path': 'images/Dwight.png', 'answer': 'Dwight'}, {'path': 'images/Dynas.png', 'answer': 'Dynas'}, {'path': 'images/Dyvad.png', 'answer': 'Dyvad'}, {'path': 'images/Edgar.png', 'answer': 'Edgar'}, {'path': 'images/Elef.png', 'answer': 'Elef'}, {'path': 'images/Elena.png', 'answer': 'Elena'}, {'path': 'images/Elmo.png', 'answer': 'Elmo'}, {'path': 'images/Elwen.png', 'answer': 'Elwen'}, {'path': 'images/Eon.png', 'answer': 'Eon'}, {'path': 'images/Epoch.png', 'answer': 'Epoch'}, {'path': 'images/Ernest.png', 'answer': 'Ernest'}, {'path': 'images/Ethereal queen.png', 'answer': 'Ethereal Queen'}, {'path': 'images/Eugene.png', 'answer': 'Eugene'}, {'path': 'images/Fan.png', 'answer': 'Fan'}, {'path': 'images/Faraus.png', 'answer': 'Faraus'}, {'path': 'images/Felix.png', 'answer': 'Felix'}, {'path': 'images/Fernando.png', 'answer': 'Fernando'}, {'path': 'images/Few.png', 'answer': 'Few'}, {'path': 'images/Flau.png', 'answer': 'Flau'}, {'path': 'images/Flora.png', 'answer': 'Flora'}, {'path': 'images/Franklin.png', 'answer': 'Franklin'}, {'path': 'images/Franz.png', 'answer': 'Franz'}, {'path': 'images/Freija.png', 'answer': 'Freija'}, {'path': 'images/Gabe.png', 'answer': 'Gabe'}, {'path': 'images/Gabriel celesta.png', 'answer': 'Gabriel Celesta'}, {'path': 'images/Galvados.png', 'answer': 'Galvados'}, {'path': 'images/Ganz.png', 'answer': 'Ganz'}, {'path': 'images/Garbella.png', 'answer': 'Garbella'}, {'path': 'images/Garcia.png', 'answer': 'Garcia'}, {'path': 'images/Gareth.png', 'answer': 'Gareth'}, {'path': 'images/Gawain.png', 'answer': 'Gawain'}, {'path': 'images/Gehrman.png', 'answer': 'Gehrman'}, {'path': 'images/Gene.png', 'answer': 'Gene'}, {'path': 'images/Genius.png', 'answer': 'Genius'}, {'path': 'images/Georgio.png', 'answer': 'Georgio'}, {'path': 'images/Gerald.png', 'answer': 'Gerald'}, {'path': 'images/Gil.png', 'answer': 'Gil'}, {'path': 'images/Giovanni.png', 'answer': 'Giovanni'}, {'path': 'images/Giske.png', 'answer': 'Giske'}, {'path': 'images/Gob.png', 'answer': 'Gob'}, {'path': 'images/Gobblehope IX.png', 'answer': 'Gobblehope IX'}, {'path': 'images/Gobrey.png', 'answer': 'Gobrey'}, {'path': 'images/Godwin.png', 'answer': 'Godwin'}, {'path': 'images/Golly.png', 'answer': 'Golly'}, {'path': 'images/Golye.png', 'answer': 'Golye'}, {'path': 'images/Gonber.png', 'answer': 'Gonber'}, {'path': 'images/Gonn.png', 'answer': 'Gonn'}, {'path': 'images/Gonovitch.png', 'answer': 'Gonovitch'}, {'path': 'images/Goo.png', 'answer': 'Goo'}, {'path': 'images/Gordon.png', 'answer': 'Gordon'}, {'path': 'images/Grant.png', 'answer': 'Grant'}, {'path': 'images/Gregory.png', 'answer': 'Gregory'}, {'path': 'images/Grigory.png', 'answer': 'Grigory'}, {'path': 'images/Gruel.png', 'answer': 'Gruel'}, {'path': 'images/Hap.png', 'answer': 'Hap'}, {'path': 'images/Heavy guardsman.png', 'answer': 'Heavy Guardsman'}, {'path': 'images/Herz.png', 'answer': 'Herz'}, {'path': 'images/Hip.png', 'answer': 'Hip'}, {'path': 'images/Howard.png', 'answer': 'Howard'}, {'path': 'images/Hyann.png', 'answer': 'Hyann'}, {'path': 'images/Interlude.png', 'answer': 'Interlude'}, {'path': 'images/Iris.png', 'answer': 'Iris'}, {'path': 'images/Jack.png', 'answer': 'Jack'}, {'path': 'images/Jan.png', 'answer': 'Jan'}, {'path': 'images/Jared.png', 'answer': 'Jared'}, {'path': 'images/Jarvis.png', 'answer': 'Jarvis'}, {'path': 'images/Jasmine.png', 'answer': 'Jasmine'}, {'path': 'images/Jasne.png', 'answer': 'Jasne'}, {'path': 'images/Jill.png', 'answer': 'Jill'}, {'path': 'images/Jiorus.png', 'answer': 'Jiorus'}, {'path': 'images/Jj.png', 'answer': 'JJ'}, {'path': 'images/Joaquel.png', 'answer': 'Joaquel'}, {'path': 'images/Johan.png', 'answer': 'Johan'}, {'path': 'images/Jorn.png', 'answer': 'Jorn'}, {'path': 'images/Josef.png', 'answer': 'Josef'}, {'path': 'images/Junzaburo.png', 'answer': 'Junzaburo'}, {'path': 'images/Kain.png', 'answer': 'Kain'}, {'path': 'images/Keane.png', 'answer': 'Keane'}, {'path': 'images/Keaton.png', 'answer': 'Keaton'}, {'path': 'images/Kelvin.png', 'answer': 'Kelvin'}, {'path': 'images/Kira.png', 'answer': 'Kira'}, {'path': 'images/Lantana.png', 'answer': 'Lantana'}, {'path': 'images/Larks.png', 'answer': 'Larks'}, {'path': 'images/Lauren.png', 'answer': 'Lauren'}, {'path': 'images/Leann.png', 'answer': 'Leann'}, {'path': 'images/Leban.png', 'answer': 'Leban'}, {'path': 'images/Leona.png', 'answer': 'Leona'}, {'path': 'images/Leonard.png', 'answer': 'Leonard'}, {'path': 'images/Lezard.png', 'answer': 'Lezard'}, {'path': 'images/Light guardsman.png', 'answer': 'Light Guardsman'}, {'path': 'images/Lily.png', 'answer': 'Lily'}, {'path': 'images/Lin.png', 'answer': 'Lin'}, {'path': 'images/Louis.png', 'answer': 'Louis'}, {'path': 'images/Lucian.png', 'answer': 'Lucian'}, {'path': 'images/Lufa.png', 'answer': 'Lufa'}, {'path': 'images/Luka.png', 'answer': 'Luka'}, {'path': 'images/Lulu.png', 'answer': 'Lulu'}, {'path': 'images/Lunbar.png', 'answer': 'Lunbar'}, {'path': 'images/Lyle.png', 'answer': 'Lyle'}, {'path': 'images/Maddock.png', 'answer': 'Maddock'}, {'path': 'images/Marco.png', 'answer': 'Marco'}, {'path': 'images/Margaret.png', 'answer': 'Margaret'}, {'path': 'images/Marietta.png', 'answer': 'Marietta'}, {'path': 'images/Marke.png', 'answer': 'Marke'}, {'path': 'images/Marsha.png', 'answer': 'Marsha'}, {'path': 'images/Martinez.png', 'answer': 'Martinez'}, {'path': 'images/Mason.png', 'answer': 'Mason'}, {'path': 'images/Mikey.png', 'answer': 'Mikey'}, {'path': 'images/Mint.png', 'answer': 'Mint'}, {'path': 'images/Miranda.png', 'answer': 'Miranda'}, {'path': 'images/Monki.png', 'answer': 'Monki'}, {'path': 'images/Mook.png', 'answer': 'Mook'}, {'path': 'images/Morfinn.png', 'answer': 'Morfinn'}, {'path': 'images/Morgan.png', 'answer': 'Morgan'}, {'path': 'images/Nalshay.png', 'answer': 'Nalshay'}, {'path': 'images/Naom.png', 'answer': 'Naom'}, {'path': 'images/Nask.png', 'answer': 'Nask'}, {'path': 'images/Natalie.png', 'answer': 'Natalie'}, {'path': 'images/Nick.png', 'answer': 'Nick'}, {'path': 'images/Niko.png', 'answer': 'Niko'}, {'path': 'images/Nina.png', 'answer': 'Nina'}, {'path': 'images/Nocturne.png', 'answer': 'Nocturne'}, {'path': 'images/Nogueira.png', 'answer': 'Nogueira'}, {'path': 'images/Nuse.png', 'answer': 'Nuse'}, {'path': 'images/Nyx.png', 'answer': 'Nyx'}, {'path': 'images/Oleg.png', 'answer': 'Oleg'}, {'path': 'images/Ortoroz.png', 'answer': 'Ortoroz'}, {'path': 'images/Parsec (human).png', 'answer': 'Parsec (Human)'}, {'path': 'images/Parsec.png', 'answer': 'Parsec'}, {'path': 'images/Patrick.png', 'answer': 'Patrick'}, {'path': 'images/Paul.png', 'answer': 'Paul'}, {'path': 'images/Pietro.png', 'answer': 'Pietro'}, {'path': 'images/Pinky.png', 'answer': 'Pinky'}, {'path': 'images/Pinta.png', 'answer': 'Pinta'}, {'path': 'images/Pitt.png', 'answer': 'Pitt'}, {'path': 'images/Polpo.png', 'answer': 'Polpo'}, {'path': 'images/Pomemelie.png', 'answer': 'Pomemelie'}, {'path': 'images/Putt.png', 'answer': 'Putt'}, {'path': 'images/Quasar.png', 'answer': 'Quasar'}, {'path': 'images/Rabi.png', 'answer': 'Rabi'}, {'path': 'images/Rachel.png', 'answer': 'Rachel'}, {'path': 'images/Radian.png', 'answer': 'Radian'}, {'path': 'images/Ravil.png', 'answer': 'Ravil'}, {'path': 'images/Ray c ross.png', 'answer': 'Ray C Ross'}, {'path': 'images/Raymond.png', 'answer': 'Raymond'}, {'path': 'images/Reynos.png', 'answer': 'Reynos'}, {'path': 'images/Ricky.png', 'answer': 'Ricky'}, {'path': 'images/Ridley.png', 'answer': 'Ridley'}, {'path': 'images/Rika.png', 'answer': 'Rika'}, {'path': 'images/Robin.png', 'answer': 'Robin'}, {'path': 'images/Roche.png', 'answer': 'Roche'}, {'path': 'images/Rocky.png', 'answer': 'Rocky'}, {'path': 'images/Rolec.png', 'answer': 'Rolec'}, {'path': 'images/Romaria.png', 'answer': 'Romaria'}, {'path': 'images/Rose.png', 'answer': 'Rose'}, {'path': 'images/Row.png', 'answer': 'Row'}, {'path': 'images/Roy.png', 'answer': 'Roy'}, {'path': 'images/Ryan.png', 'answer': 'Ryan'}, {'path': 'images/Rynka.png', 'answer': 'Rynka'}, {'path': 'images/Sakurazaki.png', 'answer': 'Sakurazaki'}, {'path': 'images/Santos.png', 'answer': 'Santos'}, {'path': 'images/Sarasenia.png', 'answer': 'Sarasenia'}, {'path': 'images/Saron.png', 'answer': 'Saron'}, {'path': 'images/Sarval.png', 'answer': 'Sarval'}, {'path': 'images/Sayna.png', 'answer': 'Sayna'}, {'path': 'images/Sebastian.png', 'answer': 'Sebastian'}, {'path': 'images/Sergei.png', 'answer': 'Sergei'}, {'path': 'images/Serva.png', 'answer': 'Serva'}, {'path': 'images/Servia.png', 'answer': 'Servia'}, {'path': 'images/Sheila.png', 'answer': 'Sheila'}, {'path': 'images/Shin.png', 'answer': 'Shin'}, {'path': 'images/Silvia.png', 'answer': 'Silvia'}, {'path': 'images/Solo.png', 'answer': 'Solo'}, {'path': 'images/Sonata.png', 'answer': 'Sonata'}, {'path': 'images/Sonia.png', 'answer': 'Sonia'}, {'path': 'images/Sonny.png', 'answer': 'Sonny'}, {'path': 'images/Sora.png', 'answer': 'Sora'}, {'path': 'images/Star.png', 'answer': 'Star'}, {'path': 'images/Startis.png', 'answer': 'Startis'}, {'path': 'images/Stefan.png', 'answer': 'Stefan'}, {'path': 'images/Stein.png', 'answer': 'Stein'}, {'path': 'images/Sunset.png', 'answer': 'Sunset'}, {'path': 'images/Synelia.png', 'answer': 'Synelia'}, {'path': 'images/Tarkin.png', 'answer': 'Tarkin'}, {'path': 'images/Testa.png', 'answer': 'Testa'}, {'path': 'images/Thanos.png', 'answer': 'Thanos'}, {'path': 'images/Theresa.png', 'answer': 'Theresa'}, {'path': 'images/Thyme.png', 'answer': 'Thyme'}, {'path': 'images/Toma.png', 'answer': 'Toma'}, {'path': 'images/Tony.png', 'answer': 'Tony'}, {'path': 'images/Torenia.png', 'answer': 'Torenia'}, {'path': 'images/Ursula.png', 'answer': 'Ursula'}, {'path': 'images/Valkyrie.png', 'answer': 'Valkyrie'}, {'path': 'images/Virginia.png', 'answer': 'Virginia'}, {'path': 'images/Vitas.png', 'answer': 'Vitas'}, {'path': 'images/Vladimir.png', 'answer': 'Vladimir'}, {'path': 'images/Wal.png', 'answer': 'Wal'}, {'path': 'images/Walter.png', 'answer': 'Walter'}, {'path': 'images/Warc.png', 'answer': 'Warc'}, {'path': 'images/Wyze.png', 'answer': 'Wyze'}, {'path': 'images/Yack.png', 'answer': 'Yack'}, {'path': 'images/Yevgeni.png', 'answer': 'Yevgeni'}, {'path': 'images/Yuri.png', 'answer': 'Yuri'}, {'path': 'images/Zane.png', 'answer': 'Zane'}, {'path': 'images/Zeke.png', 'answer': 'Zeke'}, {'path': 'images/Zeranium.png', 'answer': 'Zeranium'}, {'path': 'images/Zida.png', 'answer': 'Zida'}, {'path': 'images/Zion.png', 'answer': 'Zion'}];
let currentImage = null;
let currentAnswer = null;
let skippedImages = [];
let correctCount = 0;
let incorrectCount = 0;
let remainCount = 0;
let gameOver = false;
let timeout = [];

const statsElement = document.getElementById("stats");
const remainElement = document.getElementById("remain");
const resultElement = document.getElementById("result");
const imageElement = document.getElementById("image");
const dropdownElement = document.getElementById("dropdown");
const backButton = document.getElementById("back");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById("submit");

let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

function updateDisplay() {
    document.getElementById('display').textContent = 
        (hours < 10 ? '0' + hours : hours) + ':' + 
        (minutes < 10 ? '0' + minutes : minutes) + ':' + 
        (seconds < 10 ? '0' + seconds : seconds);
}

function startStopwatch() {
    if (isRunning) {
        clearInterval(timer);
    } else {
        timer = setInterval(function() {
            seconds++;
            if (seconds == 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 1000);
    }
    isRunning = !isRunning;
}

function stopStopwatch() {
    clearInterval(timer);
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    document.getElementById('startStop').textContent = 'Start';
}

function updateStats() {
    if (!gameOver) {
        statsElement.textContent = `Correct: ${correctCount} | Incorrect: ${incorrectCount}`;
    }
}

function updateReamin() {
    if (gameOver) {
        remainElement.textContent = `0 remaining`;
    } else {
        remainElement.textContent = `${dropdownElement.length} remaining`;
    }
}

function showResult(message, color) {
    resultElement.textContent = message;
    resultElement.className = `alert ${color}`;
    timeout.push(setTimeout(() => {
        resultElement.textContent = " ";
        resultElement.className = `alert alert-dark`
    }, 10000));
}

function loadNextImage() {
    if (images.length === 0 && skippedImages.length === 0) {
        for (let i = 0; i <= timeout.length; i++) {
            clearTimeout(timeout[i]);
        }
        
        resultElement.textContent = `Game Over! You've guessed ${correctCount}/${correctCount + incorrectCount} characters correctly. Refresh to start over.`;
        if (correctCount > incorrectCount){
            resultElement.className = `alert alert-success`;
        } else {
            resultElement.className = `alert alert-danger`;
        }
        remainElement.textContent = `0 remaining`;
        gameOver = true;
        stopStopwatch();
        return;
    }

    if (images.length === 0) {
        images.push(...skippedImages);
        skippedImages = [];
    }

    // Shuffle the images array to randomize the order for the background image
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]]; // Swap elements
    }

    const nextImage = images.pop();
    currentImage = nextImage.path;
    currentAnswer = nextImage.answer;

    imageElement.style.backgroundImage = `url('${currentImage}')`;

    // Collect all options
    const options = [currentAnswer, ...images.map(img => img.answer), ...skippedImages.map(img => img.answer)];

    // Sort the options alphabetically
    const sortedOptions = [...new Set(options)].sort();

    // Update dropdown with the sorted options
    dropdownElement.innerHTML = sortedOptions.map(option => `<option value="${option}">${option}</option>`).join("");
}



function handleSubmit() {
    const selectedOption = dropdownElement.value;
    if (!selectedOption) {
        showResult("Please select an option!", "text-danger");
        return;
    }
    for (let i = 0; i <= timeout.length; i++) {
        clearTimeout(timeout[i]);
    }

    if (selectedOption === currentAnswer) {
        correctCount++;
        showResult(`Correct! The answer was ${currentAnswer}.`, "alert-success");
    } else {
        incorrectCount++;
        showResult(`Incorrect! The answer was ${currentAnswer}.`, "alert-danger");
    }
    
    updateStats();
    loadNextImage();
    updateReamin();
}

function handleSkip() {
    skippedImages.push({ path: currentImage, answer: currentAnswer });
    loadNextImage();
}

function handleBack() {
    if (skippedImages.length > 0) {
        images.push({ path: currentImage, answer: currentAnswer });
        const lastSkipped = skippedImages.pop();
        currentImage = lastSkipped.path;
        currentAnswer = lastSkipped.answer;

        imageElement.style.backgroundImage = `url(${currentImage})`;

        const options = [currentAnswer, ...images.map(img => img.answer), ...skippedImages.map(img => img.answer)];
        const uniqueOptions = [...new Set(options)].sort();
        dropdownElement.innerHTML = uniqueOptions.map(option => `<option value="${option}">${option}</option>`).join("");
    }
}

submitButton.addEventListener("click", handleSubmit);
nextButton.addEventListener("click", handleSkip);
backButton.addEventListener("click", handleBack);

loadNextImage();
updateReamin();
startStopwatch();