$(document).ready(function(){


toggleChanges()


});

function toggleChanges(){
  let option = "<textarea id=\"text\" style=\"width: 200px; height: 50px;\" placeholder=\"Skip Length (Hex)\"><\/textarea>";
  let option2 = "<textarea id=\"text\" style=\"width: 200px; height: 50px;\" placeholder=\"Skip Code\"><\/textarea>";
  let option3 = "<textarea id=\"text\" style=\"width: 200px; height: 50px;\" placeholder=\"Skip Length (Hex)\"><\/textarea><br><textarea id=\"text2\" style=\"width: 200px; height: 50px;\" placeholder=\"Code to run before skip\"><\/textarea>";
$("#currentMode").change(function () {
  if ($(this).val() == 2) {
    document.getElementById('skipinsert').innerHTML = option2;
  } else if ($(this).val() == 3) {
   document.getElementById('skipinsert').innerHTML = option3;
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