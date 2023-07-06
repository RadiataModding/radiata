let schedule = [];
let scheduleAmt = 1;

function add(){
    scheduleElements = document.getElementById("scheduleOption");
    amt = scheduleElements.getElementsByTagName('select').length/3;
    if (amt >= 50){
        return alert("Too many schedule");
    }
    amt++;
    scheduleHTML = "<label id=\"labeltime"+amt+"\">Time</label><select id=\"hour"+amt+"\">";
    for (let i = 0; i < hours.length; i++){
        scheduleHTML += "<option>";
        scheduleHTML += hours[i];
        scheduleHTML += "</option>";
    }
    scheduleHTML += "</select><select id=\"min"+amt+"\">";
    for (let i = 0; i < minutes.length; i++){
        scheduleHTML += "<option>";
        scheduleHTML += minutes[i];
        scheduleHTML += "</option>";
    }
    scheduleHTML += "</select><label id=\"labelloc"+amt+"\">Location</label><select id=\"location"+amt+"\">";
    for (let i = 0; i < locations.length; i++){
        scheduleHTML += "<option>";
        scheduleHTML += locations[i];
        scheduleHTML += "</option>";
    }
    scheduleHTML += "</select><br id=\"lb"+amt+"\">";
    scheduleAmt++;
    scheduleElements.insertAdjacentHTML("beforeend", scheduleHTML);

    previousValue = amt - 1;
    previousValue1 = document.getElementById("hour"+previousValue).value;
    previousValue2 = document.getElementById("min"+previousValue).value;
    previousValue3 = document.getElementById("location"+previousValue).value;
    document.getElementById("hour"+amt).value = previousValue1
    document.getElementById("min"+amt).value = previousValue2
    document.getElementById("location"+amt).value = previousValue3
    //scheduleElements.innerHTML += scheduleHTML;
}

function remove(){
    scheduleElements = document.getElementById("scheduleOption");
    amt = scheduleElements.getElementsByTagName('select').length/3;
    if (amt <= 1){
        return alert("Must have at least one.");
    }
    id1 = "min" + amt;
    id2 = "hour" + amt;
    id3 = "location" + amt;
    id4 = "labeltime" + amt;
    id5 = "labelloc" + amt;
    id6 = "lb" + amt;
    removeElement(id1);
    removeElement(id2);
    removeElement(id3);
    removeElement(id4);
    removeElement(id5);
    removeElement(id6);
    scheduleAmt--;
}

function removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}

function createData(){
   let id = document.getElementById("char1").value;
   let name = characterIds[parseInt(document.getElementById("char1").value, 16)];
   let imageFile = name+"_Front.png";
   let sch = "";
   //* **00:00** `Path of the Spider Charnel`\n
   if (scheduleAmt == 1){
        sch += "* **";
        sch += "All Day";
        sch += "** `";
        sch += document.getElementById("location1").value;
        sch += "`\n";
   } else {
        for(let i = 1; i <= scheduleAmt; i++){
            sch += "* **";
            sch += document.getElementById("hour"+i).value;
            sch += ":";
            sch += document.getElementById("min"+i).value;
            sch += "** `";
            sch += document.getElementById("location"+i).value;
            sch += "`\n";
        }
 
   }
   
   let char = {name: name, id: id, img: imageFile, schedule: sch};


   downloadObjectAsJson(char, name+"-Schedule");

}

function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

let locations = ["Abandoned Building","Abandoned Building 1st Floor","Abandoned Building 2nd Floor","Abandoned Building Basement","Achilles & Eugene's Place","Adele's Residence","Adien Region","Aldo's Place","Algandars Castle","Alicia's Place","Alkaico General Store","Alvin's Place","Anastasia's Place","Anastasia's Room","Audience Chamber","Ballroom","Bandit Town Alley","Banquet Hall","Barn 1st Floor","Barn 2nd Floor","Basement","Beast Pit","Bedroom","Begin Eatery","Begin Eatery 2nd Floor","Belflower's Bedroom","Belflower's Room","Belmont General Store","Belmont General Store Bedroom","Black Rose General Store","BLACK SCREEN","Black Town of Night and Lust","Blacksmith Brockle","Blacksmith Dyvad","Blacksmith Gehrmann","Blade Pharmacy","Blade Pharmacy Vault Room","Bligh","Blood Orc","Blue Town of Water and Wisdom","Borgandiazo","Boulder Frog Inn","Boulder Frog Inn Hall","Boulder Frog Inn Room 101","Boulder Frog Inn Room 102","Bran & Wal","Brewery","Bruce's Place","Cache Apartments 1st Floor","Cache Apartments 2nd Floor","Caesar's Place","Cafeteria","Carl's Pub","Castle Gate","Cecil's Place","Cell","Cellar","Cherie's Place","Chic Records","Chief's Room","City of Flowers","City of Flowers Meeting Area","City of White Nights","Clive's Place","Club Vampire","Club Vampire 2nd Floor","Coliseum","Coliseum Locker Room","Coliseum Passage","Conference Hall","Confessional","Corridor of Delusions","Corridor of Peril","Cosmo's Room","Cross's Room","Cuatour Region","Curtis's Place","Daniel's Place","Dan's Place","David's Place","Dawnbay Diner","Dead End Armory","Desneuf Region","Desneuf Region-Ocho Region","Dichett Region","Dichett Region-Dorse Region","Distortion Corridor","Dormitory","Dormitory Room 101","Dormitory Room 102","Dorse Region","Dorse Region-Adien Region","Dova Region","Dova Region-Adien Region","Dragon Lair Cave","Dungeon Passage","Dungeon Stairs","Dwarf Tunnel","DwarFun General Store","Dwight's Place","Dwight's Room","Dynas's Room","Dysett Region","Dysett Region-Septem Region","Earth Valley","Echidna Gate Guard Post","Edgar & Cosmo's Place","Eisenhower Pharmacy","Elder's Residence","Elder's Residence 1st Floor","Elder's Residence 2nd Floor","Elder's Residence 3rd Floor","Elder's Residence Bedroom","Elder's Residence Entrance","Elder's Residence Kitchen","Elder's Residence Livingroom","Elder's Room","Elena & Adina's Place","Elevator","Elf Region","Elf Region-Cuatour Region","Employee's Room","Eon's Place","Event Checking Room","Faid General Store","Faid General Store Vault Room","Fernando's Place","Fernando's Room","Fire Mountain","Fire Mountain Crater","Flau's Place","Flora & Synelia's Place","Flying","Forest Metropolis 1st Floor","Forest Metropolis 2nd Floor","Forest Metropolis 3rd Floor","Fort Helencia Accessories","Fort Helencia Anteroom","Fort Helencia Courtyard","Fort Helencia Entrance","Fort Helencia Entrance (Outside)","Fort Helencia Jack's Room","Fort Helencia Passage","Fort Helencia Pharmacy","Fort Helencia Shelter","Ganz's Home","Ganz's Room","Garcia","Gareth & Rolec's Place","Gepald Apartments 1st Floor","Gepald Apartments 2nd Floor","Gerald's Place","Goblin Cemetery","Goblin Haven","Goblin Trio","Godwin's Place","Godwin's Room","Gold Dragon Castle","Gordon's Place","Grant's Place","Gregory's Place","Guards' Room","Heliforde Gate Guard Post","Howard & Stefan","Infirmary","Information","Installation Center","Interview Room","Jack's Place","Jared's Place","Jarvis's Place","Jasne's Room","Jiorus's Bedroom","Jiorus's Closet","Jiorus's Room","Junzaburo's Room","Kitchen","Knight Meeting Room","Lantana's Place","Larks's Bedroom","Larks's Room","Leopearl Apartments 1st Floor","Leopearl Apartments 2nd Floor","Leopearl Apartments 3rd Floor","Levante General Store","Library","Lockup","Lounge","Lucian's Room","Lunbar's Place","Lupus Gate Guard Post","Lyle's Mansion","Mage Town Alley","Marke's Place","Men's Toilet","Mook","Moon Tower","Moon Tower Interior","Moon Tower Laboratory","Moon Tower Research Lab","Morfinn's Clinic","Morfinn's Clinic 2nd Floor","Morfinn's Clinic Examination Room","Morfinn's Clinic Med Storeroom","Mortal Tree Hallway","Mysterious Creatures Inn","Mysterious Creatures Inn 2nd Floor","Natalie's Room","Nocturne's Place","Nowem Region","Nowem Region-Cuatour Region","Nowem Region-Tria Region","Nuevo Village","Observatory","Ocho Region","Ocho Region-Adien Region","OK Hand Accessories","Olacion Order Chapel","Olacion Order Shrine","Orso Apartments 1st Floor","Orso Apartments 2nd Floor","Ortoroz & Silvia's Place","Outside Mage Guild","Parsec's Chamber","Path of Insanity and Fanaticism","Path of Swords and Wisdom","Path of the Spider","Path of the Spider Charnel","Path of the Spider Hidden Passage","Path of the Spider Hidden Room","Path to the Beast Pit","Path to the Sun","Paul's Place","Peaceful Pony Inn","Peaceful Pony Inn 2nd Floor","Peaceful Pony Inn Diner","Peaceful Pony Inn Room 201","Peaceful Pony Inn Room 202","Peaceful Pony Inn Room 203","President's Office","President's Office - Moon Tower","Priest Guild Center","Priest Town Alley","Private House","Radiata Castle 1st Floor Hall","Radiata Castle 2nd Floor Hall","Radiata Castle 3rd Floor Hall","Radiata Castle 4th Floor Hall","Radiata Castle 5th Floor","Radiata Castle 5th Floor Hall","Radiata Castle Arena","Radiata Castle Basement","Radiata Castle Basement Hall","Radiata Castle Big Tower","Radiata Castle near Alcon Gate","Radiata Castle near Echidna Gate","Radiata Castle near Heliforde Gate","Radiata Castle near Lupus Gate","Radiata Castle North Gate","Radiata Castle Outskirts","Radiata Castle Small Tower","Radiata Castle South Gate","Radiata Castle Supply Store","Radiata Echidna Gate Entrance","Radiata Faucon Gate Entrance","Radiata Heliforde Gate Entrance","Radiata Lupus Gate Entrance","Reception","Red Lotus Metropolis","Red Lotus Metropolis 2nd Floor","Red Lotus Metropolis Party Room","Ridley's Room","Rocky's Place","Room","Room 101","Room 102","Room 103","Room 201","Room 202","Room 203","Room 301","Room 302","Room 303","Royal Elevator Lobby","Royal Family Exclusive Elevator","Rynka's Place","Sakurazaki's Room","San Patty Accessories","San Patty Accessories 2nd Floor","Sarasenia's Bedroom","Sarasenia's Room","Sarval","Sediche Region","Sediche Region-Nowem Region","Septem Cave","Septem Region","Septem Region-Adien Region","Sergei's Place","Servia's Place","Sewer","Shangri La","Shed","Shrine of Fray","Sleep","Solieu Village","Solo's Place","Space of Chaos","Space of Imperium","Star Tower","Star Tower - President's Office","Star Tower Interior","Star Tower Research Lab","Star's Room","Startis & Butch's Place","Storeroom","Study","Summoning Room","Swords and Silver Coins Inn","Swords and Silver Coins Inn 2nd Floor","Swords and Silver Coins Inn Room 101","Swords and Silver Coins Inn Room 201","Swords and Silver Coins Inn Room 203","Tarkin's Residence Bedroom","Tarkin's Residence Livingroom","Teagle Apartments 1st Floor","Teagle Apartments 2nd Floor","Teagle Apartments 3rd Floor","The Hecton Squad Locker Room","The Last Word Book Store","The Last Word Book Store Vault Room","The Quarto Squad Locker Room","The Quintom Squad Locker Room","The Survivor Armory","The Survivor Room","The Triton Squad Locker Room","The Vampire Casino","The Zweit Squad Locker Room","Theater Vancoor 1st Floor","Theater Vancoor 2nd Floor","Theater Vancoor 3rd Floor","Theater Vancoor 4th Floor","Theater Vancoor Basement 1st Floor","Theater Vancoor Basement 2nd Floor","Tigers Apartments 1st Floor","Tigers Apartments 2nd Floor","Toilet","Trainee's Room","Training Facility","Treasury","Tria Region","Tria Region-Dova Region","Tria Village","Triston Armory","Universal Tree Hallway","Vacant House","Vancoor Square","Vareth Magic Institute","Vareth Magic Institute 2nd Floor","Vashtel Liquor Store","Vault","Vaultroom","Verontier Armory","Verontier Armory Bedroom","Verontier Armory Storeroom","Vitas & Miranda's Place","Vitas's Room","Void Community Basement","Void Community Hall","Void Community Office","Void Community The Abyss","Void Community Torture Room","Void Community Vault Room","Waiting Room","Wakes Up","Waldo General Store","Walter & Sheila's Place","Warrior Guild Facade","Warrior Guild Training Facility","Warrior Town Alley","Watchman's Room","White Town of Stars and Faith","Wind Powered Elevator","Wind Valley","Yellow Town of the Sun and Glory","Yuri's Place","Zeranium's Place"];
let hours = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
let minutes = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"];

let characterIds = {
    "0": "Unknown/Blank",
    "1": "Jack",
    "2": "Ganz",
    "3": "Ridley",
    "4": "Rynka",
    "5": "Flau",
    "6": "Star",
    "7": "Sebastian",
    "8": "Genius",
    "9": "Rocky",
    "10": "Gawain",
    "11": "Light Guardsman",
    "12": "Elwen",
    "13": "Gerald",
    "14": "Caesar",
    "15": "Alicia",
    "16": "Dennis",
    "17": "Gareth",
    "18": "Gregory",
    "19": "Walter",
    "20": "Jarvis",
    "21": "Light Guardsman",
    "22": "Aldo",
    "23": "Gordon",
    "24": "Bruce",
    "25": "David",
    "26": "Conrad",
    "27": "Rolec",
    "28": "Daniel",
    "29": "Carlos",
    "30": "Gene",
    "31": "Light Guardsman",
    "32": "Thanos",
    "33": "Curtis",
    "34": "Cecil",
    "35": "Morgan",
    "36": "Felix",
    "37": "Jill",
    "38": "Ursula",
    "39": "Derek",
    "40": "Christoph",
    "41": "Claudia",
    "42": "Ardoph",
    "43": "Dimitri",
    "44": "Aidan",
    "45": "Cornelia",
    "46": "Faraus",
    "47": "Marietta",
    "48": "Ernest",
    "49": "Franklin",
    "50": "Johan",
    "51": "Roche",
    "52": "Light Guardsman",
    "53": "Kain",
    "54": "Fernando",
    "55": "Anastasia",
    "56": "Dwight",
    "57": "Godwin",
    "58": "Achilles",
    "59": "Flora",
    "60": "Elena",
    "61": "Alvin",
    "62": "Vitas",
    "63": "Cosmo",
    "64": "Grant",
    "65": "Adina",
    "66": "Miranda",
    "67": "Edgar",
    "68": "Clive",
    "69": "Lulu",
    "70": "Eugene",
    "71": "Nyx",
    "72": "Ortoroz",
    "73": "Sonata",
    "74": "Iris",
    "75": "Nocturne",
    "76": "Herz",
    "77": "Alba",
    "78": "Lily",
    "79": "Jared",
    "80": "Pinky",
    "81": "Interlude",
    "82": "Solo",
    "83": "Joaquel",
    "84": "Eon",
    "85": "Elmo",
    "86": "Jiorus",
    "87": "Sarasenia",
    "88": "Belflower",
    "89": "Jasne",
    "90": "Larks",
    "91": "Sakurazaki",
    "92": "Junzaburo",
    "93": "Natalie",
    "94": "Nina",
    "95": "Charlie",
    "96": "Leonard",
    "97": "Light Guardsman",
    "98": "Heavy Guardsman",
    "99": "Raymond",
    "100": "Al",
    "101": "Margaret",
    "102": "Zion",
    "103": "Paul",
    "104": "Toma",
    "105": "Torenia",
    "106": "Testa",
    "107": "Nuse",
    "108": "Jorn",
    "109": "Barbena",
    "110": "Giske",
    "111": "Yuri",
    "112": "Warc",
    "113": "Robin",
    "114": "Sheila",
    "115": "Jasmine",
    "116": "Camuse",
    "117": "Lantana",
    "118": "Lyle",
    "119": "Rose",
    "120": "Josef",
    "121": "Virginia",
    "122": "Morfinn",
    "123": "Bligh",
    "124": "Freija",
    "125": "Nask",
    "126": "Cherie",
    "127": "Zeke",
    "128": "Dan",
    "129": "Servia",
    "130": "Lunbar",
    "131": "Sonia",
    "132": "Startis",
    "133": "Brood",
    "134": "Garbella",
    "135": "Silvia",
    "136": "Thyme",
    "137": "Elef",
    "138": "Ryan",
    "139": "Hip",
    "140": "Nick",
    "141": "Kira",
    "142": "Rabi",
    "143": "Golye",
    "144": "Butch",
    "145": "Sarval",
    "146": "Sunset",
    "147": "Sora",
    "148": "Keaton",
    "149": "Tarkin",
    "150": "Gonber",
    "151": "Leban",
    "152": "Mook",
    "153": "Wal",
    "154": "Wyze",
    "155": "Zeranium",
    "156": "Glitch",
    "157": "Pomemelie",
    "158": "Saron",
    "159": "Cepheid",
    "160": "Baade",
    "161": "Quasar",
    "162": "Aphelion",
    "163": "Gonovitch",
    "164": "Albert",
    "165": "Vladimir",
    "166": "Yevgeni",
    "167": "Oleg",
    "168": "Grigory",
    "169": "Brockle",
    "170": "Dyvad",
    "171": "Gehrman",
    "172": "Sergei",
    "173": "Naom",
    "174": "Aegenhart",
    "175": "Marke",
    "176": "Donovitch",
    "177": "Zane",
    "178": "Hap",
    "179": "Gil",
    "180": "Shin",
    "181": "Fan",
    "182": "Row",
    "183": "Pitt",
    "184": "Few",
    "185": "Alan",
    "186": "Keane",
    "187": "Nogueira",
    "188": "Clarence",
    "189": "Serva",
    "190": "Hyann",
    "191": "Chatt",
    "192": "Zida",
    "193": "Franz",
    "194": "Romaria",
    "195": "Marsha",
    "196": "Lufa",
    "197": "Coco",
    "198": "Martinez",
    "199": "Santos",
    "200": "Rika",
    "201": "Mikey",
    "202": "Gob",
    "203": "Lin",
    "204": "Brie",
    "205": "Gonn",
    "206": "Golly",
    "207": "Gobrey",
    "208": "Den",
    "209": "Ben",
    "210": "Aesop",
    "211": "Monki",
    "212": "Gabe",
    "213": "Mason",
    "214": "Goo",
    "215": "Donkey",
    "216": "Ricky",
    "217": "Drew",
    "218": "Gruel",
    "219": "Doppio",
    "220": "Pietro",
    "221": "Jan",
    "222": "Marco",
    "223": "Niko",
    "224": "Danny",
    "225": "Dominic",
    "226": "Bosso",
    "227": "Georgio",
    "228": "Luka",
    "229": "Sonny",
    "230": "Giovanni",
    "231": "Polpo",
    "232": "J.J.",
    "233": "Leona",
    "234": "Leann",
    "235": "Ray C Ross",
    "236": "Pinta",
    "237": "Buta",
    "238": "Valkyrie",
    "239": "Lezard",
    "240": "Radian",
    "241": "Ethereal Queen",
    "242": "Cairn",
    "243": "Kelvin",
    "244": "Gabriel Celesta",
    "245": "Glitch",
    "246": "Glitch",
    "247": "Galvados",
    "248": "FC Glitch",
    "253": "Drago",
    "254": "Bull",
    "255": "Glitch",
    "256": "Null",
    "257": "Null",
    "258": "Null",
    "259": "Library",
    "260": "Phonograph",
    "261": "Jack Bookshelf",
    "262": "Cross",
    "263": "Stein",
    "264": "Blackjack",
    "265": "Event Watcher",
    "266": "Parsec",
    "267": "Light Guardsman",
    "268": "Light Guardsman",
    "269": "Light Guardsman",
    "270": "Heavy Guardsman",
    "271": "Heavy Guardsman",
    "272": "Heavy Guardsman",
    "273": "Heavy Guardsman",
    "274": "Heavy Guardsman",
    "275": "Heavy Guardsman",
    "276": "Heavy Guardsman",
    "277": "Heavy Guardsman",
    "278": "Heavy Guardsman",
    "279": "Cody",
    "280": "Adele",
    "281": "Howard",
    "282": "Ravil",
    "283": "Astor",
    "284": "Maddock",
    "285": "Synelia",
    "286": "Tony",
    "287": "Patrick",
    "288": "Putt",
    "289": "Reynos",
    "290": "Gobblehope IX",
    "291": "Nalshay",
    "292": "Sayna",
    "293": "Bran",
    "294": "Stefan",
    "295": "Mint",
    "296": "Daria",
    "297": "Yack",
    "298": "Lauren",
    "299": "Theresa",
    "300": "Garcia",
    "301": "Dynas",
    "302": "Epoch",
    "303": "Roy",
    "304": "Louis",
    "9900": "Jack",
    "9901": "Jack"
};