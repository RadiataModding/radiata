$(document).ready(function(){


toggleChanges()


});

function toggleChanges(){
  let option = "<textarea id=\"text\" style=\"width: 200px; height: 50px;\" placeholder=\"Skip Length (Hex)\"><\/textarea>";
  let option2 = "<textarea id=\"text\" style=\"width: 200px; height: 50px;\" placeholder=\"Skip Code\"><\/textarea>";
  let option3 = "<textarea id=\"text\" style=\"width: 200px; height: 50px;\" placeholder=\"Skip Length (Hex)\"><\/textarea><br><textarea id=\"text2\" style=\"width: 200px; height: 50px;\" placeholder=\"Code to run before skip\"><\/textarea>";
  let option4 = "<textarea id=\"text\" style=\"width: 200px; height: 50px;\" placeholder=\"Skip Length (Hex)\"><\/textarea><br><select id = \"locid\">\r\n<\/select>\r\n";
$("#currentMode").change(function () {
  if ($(this).val() == 2) {
    document.getElementById('skipinsert').innerHTML = option2;
  } else if ($(this).val() == 3) {
   document.getElementById('skipinsert').innerHTML = option3;
  } else if ($(this).val() == 4) {
   document.getElementById('skipinsert').innerHTML = option4;
   select = document.getElementById('locid');

   for (var i = 1; i<=999; i++){
       var opt = document.createElement('option');
       opt.value = i;
       opt.innerHTML = i + " - " + locations[i-1];
       select.appendChild(opt);
   }
  }
  else {
   document.getElementById('skipinsert').innerHTML = option;
   toggleChanges()
  }
});
}



let talk = 0;

function loadRMF() {
    //load = confirm("This will override any lines made. Continue?");
    if (true) {
        navigator.clipboard.readText()
            .then(text => {
                lineArr = rmf1splitter(text);
                buildrmf(lineArr)
            })
            .catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            });
    } else {
        return alert("Confirm loading by ticking the checkbox beside the button. Loading RMF will override any lines you have already made.")
    }
}
function changeEndianness(string) {
    const result = [];
    let len = string.length - 2;
    while (len >= 0) {
        result.push(string.substr(len, 2));
        len -= 2;
    }
    return result.join('');
}

function hexTrim(text) {
    result = "";
    rmf = false;
    text = text.replace(/\s/g, '');
    while (text.length > 0) {
        if (!rmf) {
            id = text.substring(0, 8);
            if (id == "524D4631") {
                rmf = true;
                result += text.substring(0, 2);
            }
            text = text.substring(2);
        } else if (rmf) {
            id = text.substring(0, 8);
            if (id == "4B6F6473") {
                rmf = false;
            } else {
                result += text.substring(0, 2);
            }
            text = text.substring(2);
        }
    }
    return result;
}

function rmf1splitter(text) {
    rmf1Array = [];
    rmf1Pointers = [];
    rmf = hexTrim(text);
    if (rmf.length == 0) {
        return alert("RMF not found!");
    }

    rmfSize = parseInt(changeEndianness(rmf.substring(24, 32)), 16);
    lines = parseInt(changeEndianness(rmf.substring(32, 40)), 16);

    if (lines <= 0) {
        return alert("RMF is empty!");
    }

    for (let i = 0; i < lines; i++) {
        rmf1Pointers.push(parseInt(changeEndianness(rmf.substring(0x30 + (i * 8), 0x38 + (i * 8))), 16));
    }

    for (let i = 0; i < lines; i++) {
        if (i == lines - 1) {
            rmf1Array.push(rmf.substring(rmf1Pointers[i] * 2, rmfSize * 2));
        } else {
            rmf1Array.push(rmf.substring(rmf1Pointers[i] * 2, (rmf1Pointers[i + 1] * 2 - 2)));
        }
    }
    return rmf1Array;
}

function buildrmf() {
    cutsceneSkip = '26 00 00 00 01 00 00 00 00 00 00 00 0F 25 00 00 26 00 0E 20 01 00 02 00 02 20 6A 69 5F 80 02 21 00 00 00 00 03 20 33 0B 66 16 05 01 07 10 00 03 04 20 00 00 88 00 0E 4E 01 00 00 00 40 00 00 00 0F 24 00 00 02 00 79 00 7D 00 90 00 7F 00 84 00 01 00 75 00 7F 00 81 00 8A 00 81 00 00 00 75 00 87 00 85 00 8C 00 01 00 75 00 7F 00 81 00 8A 00 81 00 00 00';
    cutsceneSkip = cutsceneSkip.replace(/\s/g, '');
    check = '79007D0090007F008400010075007F0081008A00810000007500870085008C00010075007F0081008A008100';
    if (lineArr.length == 0) {
        alert("Nothing added.");
        return;
    }
    for (let x in lineArr){
      if (lineArr[x].includes(check)){
         alert("Cutscene skip text already in RMF file! Found at : 0x" + parseInt(x, 10).toString(16).padStart(2, 0).toUpperCase());
         talk = parseInt(x, 10)
         document.getElementById('talkid').innerHTML = "Talk line: 0x" + talk.toString(16).padStart(2, 0).toUpperCase();
         document.getElementById('rmf').innerHTML = "Cutscene skip already in RMF!";
         return
      }
    }
    lineArr.push(cutsceneSkip);
    let totalSize = 0;
    let currentLength = 0;
    let baseLength = 48;
    pointerArr = [];
    baseLength += 8 * lineArr.length;
    for (let i = 0; i < lineArr.length; i++) {
        lineArr[i] = lineArr[i].replace(/\s/g, '');
        if (i == 0) {
            while (((lineArr[i].length / 2) % 4) != 0) {
                lineArr[i] += "00";
            }
            currentLength = baseLength / 2;
            totalSize += currentLength + (lineArr[0].length / 2);
            let temp = currentLength.toString(16).padStart(8, '0').toUpperCase()
            temp = changeEndianness(temp);
            pointerArr.push(temp);
        } else {
            while (((lineArr[i].length / 2) % 4) != 0) {
                lineArr[i] += "00";
            }
            currentLength += (lineArr[i - 1].length / 2);
            totalSize += lineArr[i].length / 2;
            let temp = currentLength.toString(16).padStart(8, '0').toUpperCase();
            temp = changeEndianness(temp);
            pointerArr.push(temp);
        }
    }
    totalSize = totalSize.toString(16).padStart(8, '0').toUpperCase();
    totalSize = changeEndianness(totalSize);
    let lineCount = lineArr.length;
    lineCount = lineCount.toString(16).padStart(8, '0').toUpperCase();
    lineCount = changeEndianness(lineCount);
    let output = "52 4D 46 31 CE 00 00 00 00 00 00 00";
    output += totalSize;
    output += lineCount;
    output += totalSize;
    for (let i = 0; i < pointerArr.length; i++) {
        output += pointerArr[i];
    }
    for (let i = 0; i < lineArr.length; i++) {
        output += lineArr[i];
    }
    output = output.replace(/\s/g, '');
    talk = lineArr.length - 1;
    document.getElementById('talkid').innerHTML = "Talk line: 0x" + talk.toString(16).padStart(2, 0).toUpperCase();
    document.getElementById('rmf').innerHTML = "New RMF file: \n" + output;
    /*navigator.clipboard.writeText(output)
        .then(() => {
            pointerArr = [];
            alert("Data copied to clipboard.");
        })
        .catch(err => {
            pointerArr = [];
            console.log('Error: ', err);
        });*/
    //document.getElementById("results").innerHTML = output;
}


function build(){
   if (document.getElementById("currentMode").value == 2){
      return build2()
   } else if (document.getElementById("currentMode").value == 3) {
      return build3()
   } else if (document.getElementById("currentMode").value == 4) {
      return build4()
   }
   let offset = 0;
   if(document.getElementById("slz").checked){
      offset += 0x10;
   }
   if(document.getElementById("kods").checked){
      offset += 0x24
   }
   let fade = '6701008078001310670100801E001000';
   let freeze = '230301800100000006000000010000008A000100';
   // check if want fade and/or freeze
   let item1 = '0203008002000010ACA69D4001000000';
   let item2 = '02010000';
   let item3 = '0000';
   let talk1 = '89010480';
   let talk2 = talk.toString(16).padStart(2, 0).toUpperCase();
   let talk3 = '0000000301000004000000';
   let watch1 = '02030080040000050000000001000000';
   let skip1 = '02030080';


   let skipLength = (parseInt(document.getElementById("text").value, 16) - offset) >> 2;
   skipLength = skipLength.toString(16).padStart(4, '0').toUpperCase();
   skipLength = changeEndianness(skipLength);

   let skip2 = skipLength
   let skip3 = '00050000000002000000';

   let buildString = '';

   if(document.getElementById("freeze").checked){
      buildString += freeze;
   }
   if(document.getElementById("fade").checked){
      buildString += fade;
   }
   buildString += talk1 + talk2 + talk3;
   buildString += watch1;
   buildString += skip1 + skip2 + skip3;
   let itemSkip = buildString.length / 2;
   itemSkip = itemSkip >> 2;
   itemSkip = itemSkip.toString(16).padStart(4, '0').toUpperCase();
   itemSkip = changeEndianness(itemSkip);
   let finalString = item1 + item2 + itemSkip + item3 + buildString;
   document.getElementById("code1").innerHTML = "Paste somewhere at start of event...\n" + finalString;
   return
}

function build2(){
   let fade = '6701008078001310670100801E001000';
   let freeze = '230301800100000006000000010000008A000100';
   // check if want fade and/or freeze
   let item1 = '0203008002000010ACA69D4001000000';
   let item2 = '02010000';
   let item3 = '0000';
   let talk1 = '89010480';
   let talk2 = talk.toString(16).padStart(2, 0).toUpperCase();
   let talk3 = '0000000301000004000000';
   let watch1 = '02030080';
   let watch3 = '00050000000001000000';


   let skipCode = document.getElementById("text").value;
   skipCode = skipCode.replace(/\s/g, '');

   while (((skipCode.length / 2) % 4) != 0) {
       skipCode += "00";
   }

   let skipLength = skipCode.length / 2;
   skipLength = skipLength >> 2;
   skipLength = skipLength.toString(16).padStart(4, '0').toUpperCase();
   skipLength = changeEndianness(skipLength);

   let watch2 = skipLength;



   let buildString = '';

   if(document.getElementById("freeze").checked){
      buildString += freeze;
   }
   if(document.getElementById("fade").checked){
      buildString += fade;
   }
   buildString += talk1 + talk2 + talk3;
   buildString += watch1 + watch2 + watch3;
   let itemSkip = (buildString.length) / 2 + (skipCode.length / 2);
   itemSkip = itemSkip >> 2;
   itemSkip = itemSkip.toString(16).padStart(4, '0').toUpperCase();
   itemSkip = changeEndianness(itemSkip);
   let finalString = item1 + item2 + itemSkip + item3 + buildString + skipCode;
   document.getElementById("code1").innerHTML = "Paste somewhere at start of event...\n" + finalString;
   return
}

function build3(){
   let offset = 0;
   if(document.getElementById("slz").checked){
      offset += 0x10;
   }
   if(document.getElementById("kods").checked){
      offset += 0x24
   }
   let fade = '6701008078001310670100801E001000';
   let freeze = '230301800100000006000000010000008A000100';
   // check if want fade and/or freeze
   let item1 = '0203008002000010ACA69D4001000000';
   let item2 = '02010000';
   let item3 = '0000';
   let talk1 = '89010480';
   let talk2 = talk.toString(16).padStart(2, 0).toUpperCase();
   let talk3 = '0000000301000004000000';
   let watch1 = '02030080';
   let watch2 = '00050000000001000000';
   let skip1 = '02030080';

   let skipCode = document.getElementById("text2").value;
   skipCode = skipCode.replace(/\s/g, '');

   while (((skipCode.length / 2) % 4) != 0) {
       skipCode += "00";
   }

   let skipCodeLength = skipCode.length / 2;
   skipCodeLength += 0x10;
   skipCodeLength = skipCodeLength >> 2;
   skipCodeLength = skipCodeLength.toString(16).padStart(4, '0').toUpperCase();
   skipCodeLength = changeEndianness(skipCodeLength);


   let skipLength = (parseInt(document.getElementById("text").value, 16) - offset) >> 2;
   skipLength = skipLength.toString(16).padStart(4, '0').toUpperCase();
   skipLength = changeEndianness(skipLength);

   let skip2 = skipLength
   let skip3 = '00050000000002000000';

   let buildString = '';

   if(document.getElementById("freeze").checked){
      buildString += freeze;
   }
   if(document.getElementById("fade").checked){
      buildString += fade;
   }
   buildString += talk1 + talk2 + talk3;
   buildString += watch1;
   buildString += skipCodeLength;
   buildString += watch2;
   buildString += skipCode;
   buildString += skip1 + skip2 + skip3;
   let itemSkip = buildString.length / 2;
   itemSkip = itemSkip >> 2;
   itemSkip = itemSkip.toString(16).padStart(4, '0').toUpperCase();
   itemSkip = changeEndianness(itemSkip);
   let finalString = item1 + item2 + itemSkip + item3 + buildString;
   document.getElementById("code1").innerHTML = "Paste somewhere at start of event...\n" + finalString;
   return
}

function build4(){
   let offset = 0;
   if(document.getElementById("slz").checked){
      offset += 0x10;
   }
   if(document.getElementById("kods").checked){
      offset += 0x24
   }
   let fade = '6701008078001310670100801E001000';
   let freeze = '230301800100000006000000010000008A000100';
   // check if want fade and/or freeze
   let item1 = '0203008002000010ACA69D4001000000';
   let item2 = '02010000';
   let item3 = '0000';
   let talk1 = '89010480';
   let talk2 = talk.toString(16).padStart(2, 0).toUpperCase();
   let talk3 = '0000000301000004000000';
   let watch1 = '02030080';
   let watch2 = '00050000000001000000';
   let skip1 = '02030080';
   let loc = parseInt(document.getElementById("locid").value, 10);
   loc = loc.toString(16).padStart(4, '0').toUpperCase();
   loc = changeEndianness(loc);
   let skipCode = "67 01 00 80 3C 00 13 00 03 01 00 00 03 00 00 00 40 01 01 80";
   skipCode += loc;
   skipCode += "00 00 03 01 00 00 02 00 20 00 03 01 00 00 02 00 20 00 10 01 00 80 0E 01 01 00 02 03 00 80 02 00 00 01 84 12 01 00 00 00 00 00 10 01 00 80 58 12 01 00 1C 01 02 80 00 00 01 00 44 00 33 00 03 01 00 80 02 00 DA 04 03 02 00 80 07 00 00 00 00 00 0B 00 03 02 00 80 07 00 00 00 00 00 0F 00 03 02 00 00 07 00 00 00 00 00 03 00 39 00 80 80 C1 02 03 00 AC 26 00 00";
   skipCode += loc;
   skipCode += "00 00 67 01 00 80 3C 00 10 00 03 01 00 00 03 00 00 00";


   skipCode = skipCode.replace(/\s/g, '');


   let skipCodeLength = skipCode.length / 2;
   skipCodeLength += 0x10;
   skipCodeLength = skipCodeLength >> 2;
   skipCodeLength = skipCodeLength.toString(16).padStart(4, '0').toUpperCase();
   skipCodeLength = changeEndianness(skipCodeLength);


   let skipLength = (parseInt(document.getElementById("text").value, 16) - offset) >> 2;
   skipLength = skipLength.toString(16).padStart(4, '0').toUpperCase();
   skipLength = changeEndianness(skipLength);

   let skip2 = skipLength
   let skip3 = '00050000000002000000';

   let buildString = '';

   if(document.getElementById("freeze").checked){
      buildString += freeze;
   }
   if(document.getElementById("fade").checked){
      buildString += fade;
   }
   buildString += talk1 + talk2 + talk3;
   buildString += watch1;
   buildString += skipCodeLength;
   buildString += watch2;
   buildString += skipCode;
   buildString += skip1 + skip2 + skip3;
   let itemSkip = buildString.length / 2;
   itemSkip = itemSkip >> 2;
   itemSkip = itemSkip.toString(16).padStart(4, '0').toUpperCase();
   itemSkip = changeEndianness(itemSkip);
   let finalString = item1 + item2 + itemSkip + item3 + buildString;
   document.getElementById("code1").innerHTML = "Paste somewhere at start of event...\n" + finalString;
   return
}

let locations = ["Nuevo Village", "Septem Region-Adien Region", "Dova Region-Adien Region", "Dorse Region-Adien Region", "Ocho Region-Adien Region", "Adele's Residence", "Dorse Region-Adien Region", "Adien Region", "Area 01 Plains", "Adien Region", "Adien Region", "Dwarf Tunnel", "Dova Region", "Dova Region", "Area 02 Tunnel Worm", "Area 02 Tunnel Resting Spot", "Area 02 Singed Plains", "Area 02 Tunnel", "Area 02 Dwarf Village Square", "Earth Valley", "Elder's Residence 1st Floor", "Elder's Residence 2nd Floor", "Elder's Residence 3rd Floor", "DwarFun General Store", "Triston Armory", "Boulder Frog Inn", "Boulder Frog Inn Hall", "Boulder Frog Inn Room 101", "Boulder Frog Inn Room 102", "Vashtel Liquor Store", "Dawnbay Diner", "Treasury", "Blacksmith Dyvad", "Blacksmith Brockle", "Blacksmith Gehrmann", "Sergei's Place", "Dormitory Room 101", "Dormitory", "Dormitory Room 102", "Marke's Place", "Map Name", "ERROR", "ERROR", "ERROR", "ERROR", "Dova Region", "Dova Region", "Dova Region", "Dova Region", "ERROR", "ERROR", "ERROR", "ERROR", "Cuatour Region", "Cuatour Region", "Area 02 Plains", "Area 02 Cliff", "Area 02 Mountain Path", "Area 04 Village Square", "Cuatour Region", "Tria Village", "Tria Village", "Cuatour Region", "Tria Village", "MAP 065", "Nowem Region-Cuatour Region", "Elf Region-Cuatour Region", "Radiata Faucon Gate Entrance", "Area 04 Plains", "Elder's Residence Entrance", "Elder's Residence Kitchen", "Elder's Residence Livingroom", "Elder's Residence Bedroom", "Tarkin's Residence Livingroom", "Tarkin's Residence Bedroom", "Barn 1st Floor", "Barn 2nd Floor", "ERROR", "Dysett Region-Septem Region", "Septem Region", "Septem Cave", "Septem Cave", "Septem Cave", "Septem Cave", "Septem Cave", "Septem Region", "Septem Cave", "Septem Cave", "Septem Region", "Area 07 Cave (With water)", "Area 07 Cave (No water)", "Area 07 Cave Lake Bottom", "Area 07 Savanna", "Area 07 Cliff", "ERROR", "Septem Region", "Area 07 Castle Summoning Room", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Area 16 Cliff", "Desneuf Region", "Borgandiazo", "Borgandiazo", "Borgandiazo", "Borgandiazo", "Borgandiazo", "Borgandiazo", "Dorse Region", "Dorse Region", "Shangri La", "Shangri La", "Shangri La", "Shangri La", "Algandars Castle", "Shed", "Area 07 Castle Room", "Area 12 Jungle", "Dungeon Passage", "Dungeon Passage", "Dungeon Stairs", "Dungeon Passage", "Radiata Castle Big Tower", "Coliseum", "Radiata Castle Basement", "Guards' Room", "Guards' Room", "Guards' Room", "Radiata Castle 1st Floor Hall", "Lounge", "Radiata Castle 1st Floor Hall", "Wind Powered Elevator", "Radiata Castle 1st Floor Hall", "Information", "Men's Toilet", "Mook", "Radiata Castle 1st Floor Hall", "Radiata Castle North Gate", "Radiata Castle 2nd Floor Hall", "Employee's Room", "Employee's Room", "Kitchen", "Banquet Hall", "Library", "Radiata Castle 2nd Floor Hall", "Radiata Castle 2nd Floor Hall", "Radiata Castle 3rd Floor Hall", "Employee's Room", "Radiata Castle Exterior", "MAP 161", "Radiata Castle 3rd Floor Hall", "Trainee's Room", "Trainee's Room", "Radiata Castle Basement Hall", "Radiata Castle Small Tower", "MAP 167", "Radiata Castle 3rd Floor Hall", "Radiata Castle 4th Floor Hall", "Radiata Castle Supply Store", "Ridley's Room", "Radiata Castle 2nd Floor Hall", "Radiata Castle South Gate", "Larks's Room", "Larks's Bedroom", "Private House", "Study", "Cross's Room", "Lucian's Room", "Radiata Castle 3rd Floor Hall", "Ganz's Room", "Knight Meeting Room", "Dynas's Room", "Radiata Castle 4th Floor Hall", "Radiata Castle 4th Floor Hall", "Radiata Castle 4th Floor Hall", "Jasne's Room", "Royal Elevator Lobby", "Royal Family Exclusive Elevator", "Radiata Castle 5th Floor", "Radiata Castle 5th Floor", "Conference Hall", "Jiorus's Room", "Jiorus's Bedroom", "Jiorus's Closet", "Sarasenia's Room", "Sarasenia's Bedroom", "Belflower's Room", "Belflower's Bedroom", "Audience Chamber", "Radiata Castle 5th Floor Hall", "MAP 202", "Radiata Castle Basement Hall", "Radiata Castle Basement Hall", "Radiata Castle Basement Hall", "Radiata Castle Basement", "Radiata Castle Basement Hall", "Training Facility", "Storeroom", "Radiata Castle Basement Hall", "Waiting Room", "Waiting Room", "Waiting Room", "Waiting Room", "Sakurazaki's Room", "Junzaburo's Room", "Coliseum Passage", "Radiata Castle Basement Hall", "Storeroom", "Dichett Region", "Fire Mountain", "Parsec's Chamber", "Fire Mountain Crater", "Vaultroom", "Ballroom", "Lockup", "Lockup", "Lockup", "Area 34 Fire Mountain", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Algandars Castle", "Summoning Room", "Area 03 Boulder Plains", "Desneuf Region-Ocho Region", "Ocho Region", "Ocho Region", "Ocho Region", "City of Flowers", "Area 11 Light Elf Village", "Private House", "Private House", "City of Flowers Meeting Area", "Private House", "Elder's Residence", "Private House", "Elf Region", "Elf Region", "Elf Region", "Area 16 Orc Village Interior", "Area 16 Orc Village Outer Walls", "Area 16 Orc Village Bottom Floor Hall", "Dichett Region-Dorse Region", "Map Name", "Area 11 Forest", "Area 11 Shallow Lake", "Area 34 Cave Parsec's Room", "Area 34 Fire Mountain Cave", "Cellar", "Forest Metropolis 1st Floor", "Forest Metropolis 1st Floor", "Forest Metropolis 1st Floor", "Kitchen", "Brewery", "Forest Metropolis 2nd Floor", "Room", "Room", "Forest Metropolis 2nd Floor", "Room", "Room", "Forest Metropolis 3rd Floor", "Elder's Room", "Storeroom", "Nowem Region", "Nowem Region", "Nowem Region", "Nowem Region", "Nowem Region", "Area 09D Elf Village", "Area 09 Valley", "Area 09 Forest", "Sediche Region-Nowem Region", "Wind Valley", "Wind Valley", "Wind Valley", "Wind Valley", "Nowem Region", "Map Name", "Goblin Haven", "Sediche Region", "Sediche Region", "Sediche Region", "Sediche Region", "Sediche Region", "Sediche Region", "Goblin Haven", "Area 22B Goblin Village Square", "Area 22 Mushroom Forest (Upper Path)", "Area 22 Mushroom Forest (Path)", "Goblin Haven", "Room", "Map Name", "Fort Helencia Anteroom", "Nowem Region-Tria Region", "Tria Region", "Fort Helencia Courtyard", "Fort Helencia Accessories", "Fort Helencia Pharmacy", "Tria Region", "Tria Region", "Solieu Village", "Tria Region", "Fort Helencia Entrance", "Fort Helencia Courtyard", "Fort Helencia Anteroom", "Fort Helencia Entrance", "Fort Helencia Anteroom", "Fort Helencia Anteroom", "Fort Helencia Passage", "Fort Helencia Shelter", "Area 03 Plains", "Area 03 Village", "Area 03 In from of Boulder", "Area 03 Boulder Plains", "Area 03 Boulder Interior", "Fort Helencia Anteroom", "Fort Helencia Jack's Room", "Area 03 Grapevine", "Dorse Region", "Dorse Region", "Dorse Region", "Dorse Region", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "Goblin Cemetery", "Goblin Cemetery", "Goblin Cemetery", "Goblin Cemetery", "Goblin Cemetery", "Goblin Cemetery", "Goblin Cemetery", "Goblin Cemetery", "Goblin Cemetery", "Goblin Cemetery", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "Area 12 Goblin Cemetery Room", "Area 12 Goblin Village Square", "Area 12 Goblin Cemetery Main Room", "Area 12 Tunnel", "Area 12 Savanna (No Fort)", "---", "Watchman's Room", "Cell", "Garcia", "Cell", "Cell", "Bran & Wal", "Cell", "Cell", "Sarval", "Bligh", "Howard & Stefan", "Cell", "Natalie's Room", "Infirmary", "Coliseum Locker Room", "Radiata Castle 2nd Floor Hall", "Radiata Castle 3rd Floor Hall", "Radiata Castle 3rd Floor Hall", "Radiata Castle Arena", "Radiata Castle Outskirts", "Dysett Region", "Dysett Region", "Gold Dragon Castle", "Gold Dragon Castle", "City of White Nights", "Area 36 Desert", "Dysett Region", "Area 13 Spiral Corridor", "City of White Nights", "Map Name", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider Charnel", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider", "Path of the Spider Hidden Room", "Path of the Spider Hidden Passage", "Path of the Spider", "Map Name", "---", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Tria Region-Dova Region", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Dwarf Tunnel", "Ganz's Home", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "ERROR", "Map Name", "Warrior Guild Training Facility", "Radiata Castle near Alcon Gate", "Radiata Castle near Echidna Gate", "Radiata Castle near Heliforde Gate", "Radiata Castle near Lupus Gate", "Sewer (1st Floor: With water)", "Sewer (1st Floor: No water)", "Sewer (2nd Floor: With water)", "Sewer (2nd Floor: No water)", "Map Name", "Radiata Lupus Gate Entrance", "Yellow Town of the Sun and Glory", "Warrior Guild facade", "Warrior Town Alley", "Theater Vancoor 1st Floor", "Interview Room", "Toilet", "Theater Vancoor 2nd Floor", "Training Facility", "The Triton Squad Locker Room", "The Quarto Squad Locker Room", "Theater Vancoor 3rd Floor", "The Zweit Squad Locker Room", "Theater Vancoor 4th Floor", "Chief's Room", "Treasury", "Theater Vancoor Basement 1st Floor", "Infirmary", "The Hecton Squad Locker Room", "The Quintom Squad Locker Room", "Theater Vancoor Basement 2nd Floor", "Cell", "Storeroom", "Star's Room", "Yellow Town of the Sun and Glory", "Swords and Silver Coins Inn", "Swords and Silver Coins Inn 2nd Floor", "Swords and Silver Coins Inn Room 201", "Swords and Silver Coins Inn Room 101", "Swords and Silver Coins Inn Room 203", "Begin Eatery", "Begin Eatery 2nd Floor", "The Survivor Armory", "San Patty Accessories", "San Patty Accessories 2nd Floor", "Lupus Gate Guard Post", "Jarvis's Place", "Tigers Apartments 1st Floor", "Yuri's Place", "Vacant House", "Tigers Apartments 2nd Floor", "Room 102", "Room 103", "Room 202", "Room 203", "The Survivor Room", "Radiata Heliforde Gate Entrance", "Radiata Heliforde Gate Entrance", "Radiata Echidna Gate Entrance", "---", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "White Town of Stars and Faith", "Morfinn's Clinic Med Storeroom", "Morfinn's Clinic", "Morfinn's Clinic Examination Room", "Morfinn's Clinic 2nd Floor", "Eisenhower Pharmacy", "Room", "The Last Word Book Store", "The Last Word Book Store Vault Room", "Waldo General Store", "Storeroom", "Peaceful Pony Inn", "Peaceful Pony Inn Diner", "MAP 573", "Peaceful Pony Inn Room 201", "Peaceful Pony Inn Room 202", "Peaceful Pony Inn Room 203", "Peaceful Pony Inn 2nd Floor", "Heliforde Gate Guard Post", "Elena & Adina's Place", "Private House", "Grant's Place", "Edgar & Cosmo's Place", "Flora & Synelia's Place", "Rocky's Place", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Olacion Order Shrine", "Olacion Order Chapel", "Anastasia's Place", "Dwight's Place", "Godwin's Place", "Fernando's Place", "Anastasia's Room", "Fernando's Room", "Dwight's Room", "Godwin's Room", "Vitas's Room", "Cosmo's Room", "Treasury", "Confessional", "Olacion Order Mortal Tree Hallway", "Olacion Order Hallway", "Confessional", "Priest Guild Center", "Reception", "Basement", "Treasury", "Priest Town Alley", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Distortion Corridor", "Path of Insanity and Fanaticism", "Distortion Corridor", "MAP 622", "Cherie's Place", "Cecil's Place", "Alvin's Place", "Abandoned Building", "Clive's Place", "Clive's Place", "Abandoned Building 1st Floor", "Abandoned Building 2nd Floor", "Abandoned Building Basement", "Distortion Corridor", "Distortion Corridor", "Shrine of Fray", "Shrine of Fray", "Shrine of Fray", "Shrine of Fray", "Shrine of Fray", "Shrine of Fray", "Path to the Beast Pit", "Olacion Order Shrine", "Shrine of Fray", "Shrine of Fray", "Shrine of Fray", "Shrine of Fray", "Shrine of Fray", "Shrine of Fray", "Shrine of Fray", "Shrine of Fray", "Vareth Magic Institute 2nd Floor", "Star Tower Research Lab", "Star Tower Research Lab", "Star Tower Research Lab", "Moon Tower Research Lab", "Moon Tower Research Lab", "Moon Tower Research Lab", "President's Office", "Observatory", "Cafeteria", "Infirmary", "Storeroom", "Elevator", "Star Tower", "Moon Tower", "Room 201", "Star Tower Interior", "Moon Tower Interior", "Library", "Star Tower - President's Office", "President's Office - Moon Tower", "MAP 671", "Shrine of Fray", "Shrine of Fray", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Vancoor Square", "ERROR", "Belmont General Store", "Belmont General Store Bedroom", "Verontier Armory", "Verontier Armory Bedroom", "Verontier Armory Storeroom", "Walter & Sheila's Place", "Daniel's Place", "Carl's Pub", "Dragon Lair Cave", "Dragon Lair Cave", "Distortion Corridor", "Map Name", "Map Name", "Map Name", "Map Name", "Map Name", "Map Name", "Map Name", "Map Name", "Map Name", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Path to the Sun", "---", "Gregory's Place", "Alicia's Place", "Gerald's Place", "Caesar's Place", "Dragon Lair Cave", "Space of Imperium", "Corridor of Peril", "Corridor of Peril", "Beast Pit", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Space of Chaos", "Corridor of Delusions", "Corridor of Delusions", "Map Name", "Map Name", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Lyle's Mansion", "Lyle's Mansion", "Path of Swords and Wisdom", "ERROR", "Blade Pharmacy", "Blade Pharmacy Vault Room", "Blade Pharmacy Vault Room", "Lantana's Place", "Gordon's Place", "Gareth & Rolec's Place", "David's Place", "Vitas & Miranda's Place", "Achilles & Eugene's Place", "Aldo's Place", "Paul's Place", "Bruce's Place", "Jack's Place", "Dragon Lair Cave", "Dragon Lair Cave", "Map Name", "Map Name", "Map Name", "Map Name", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "Dragon Lair Cave", "---", "---", "---", "Beast Pit", "---", "Alkaico General Store", "Storeroom", "Storeroom", "Club Vampire", "MAP 776", "Club Vampire 2nd Floor", "The Vampire Casino", "Void Community Basement", "Void Community Vault Room", "Void Community Office", "Void Community The Abyss", "MAP 783", "Void Community Torture Room", "Void Community Hall", "Servia's Place", "Bedroom", "Ortoroz & Silvia's Place", "Dan's Place", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "Faid General Store", "Faid General Store Vault Room", "Vault", "Private House", "Red Lotus Metropolis Party Room", "Room", "Room", "Room", "Red Lotus Metropolis", "Red Lotus Metropolis 2nd Floor", "Room 101", "Room 102", "Room 201", "Room 202", "Gepald Apartments 1st Floor", "Gepald Apartments 2nd Floor", "Startis & Butch's Place", "Startis & Butch's Place", "Zeranium's Place", "Black Town of Night and Lust", "Bandit Town Alley", "---", "---", "---", "---", "---", "---", "---", "---", "---", "Nocturne's Place", "Nocturne's Place", "Beast Pit", "---", "---", "---", "---", "---", "---", "---", "Beast Pit", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "Beast Pit", "---", "Mysterious Creatures Inn", "Room 201", "Room 202", "Room 203", "Mysterious Creatures Inn 2nd Floor", "---", "---", "Levante General Store", "Storeroom", "Dead End Armory", "---", "---", "---", "---", "---", "---", "---", "---", "Chic Records", "---", "Beast Pit", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "Beast Pit", "---", "Flau's Place", "Flau's Place", "Rynka's Place", "Rynka's Place", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "Beast Pit", "---", "Lunbar's Place", "Solo's Place", "Eon's Place", "Jared's Place", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "---", "Blue Town of Water and Wisdom", "Mage Town Alley", "Blue Town of Water and Wisdom", "Outside Mage Guild", "Black Rose General Store", "Storeroom", "OK Hand Accessories", "Vault", "Teagle Apartments 1st Floor", "Room 101", "Room 102", "Room 103", "Teagle Apartments 2nd Floor", "Room 201", "Room 202", "Room 203", "Teagle Apartments 3rd Floor", "Room 301", "Room 302", "Room 303", "Leopearl Apartments 1st Floor", "Room 101", "Room 102", "Room 103", "Leopearl Apartments 2nd Floor", "Room 201", "Room 202", "Room 203", "Leopearl Apartments 3rd Floor", "Room 301", "Room 302", "Room 303", "Orso Apartments 1st Floor", "Room 103", "Room 102", "Room 101", "Orso Apartments 2nd Floor", "Room 203", "Room 202", "Room 201", "Curtis's Place", "Cache Apartments 1st Floor", "Room 101", "Room 102", "Room 103", "Cache Apartments 2nd Floor", "Room 203", "Room 202", "Moon Tower Laboratory", "Vareth Magic Institute", "Echidna Gate Guard Post", "---", "MAP 990", "Installation Center", "---", "---", "Event Checking Room", "Black Screen/Scenery", "ERROR", "ERROR", "ERROR", "ERROR"];
