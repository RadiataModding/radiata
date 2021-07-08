// JavaScript Document
let result = "";

let firstPass = true;

let fileD = "";

let charArr = [];

let lineArr = [];

let pointerArr = [];

$("#myfile").on("change", function (changeEvent) {
  for (var i = 0; i < changeEvent.target.files.length; ++i) {
    (function (file) {               // Wrap current file in a closure.
      var loader = new FileReader();
      loader.onload = function (loadEvent) {
        if (loadEvent.target.readyState != 2)
          return;
        if (loadEvent.target.error) {
          alert("Error while reading file " + file.name + ": " + loadEvent.target.error);
          return;
        }
        console.log(loadEvent.target.result.length); // Your text is in loadEvent.target.result
      };
      loader.readAsBinaryString(file);
    })(changeEvent.target.files[i]);
  }
});

function startConvert(){
	if (document.getElementById('stringSelect').value == "Encode"){
		document.getElementById("results").innerHTML = stringEncoder(document.getElementById('text').value);
	} else if (document.getElementById('stringSelect').value == "Trim") {
		if (document.getElementById("clipboard").checked){
			navigator.clipboard.readText()
  				.then(text => {
  					hexTrim(text);
  					if (document.getElementById("download").checked){
						let a = document.createElement('a');
						a.href = "data:application/octet-stream,"+encodeURIComponent(result);
						a.download = 'result.txt';
						a.click();
					}
					if (document.getElementById("display").checked){
						document.getElementById("results").innerHTML = result;
					}	
  				})
  				.catch(err => {
    				console.error('Failed to read clipboard contents: ', err);
  				});
  	} else {
			hexTrim(document.getElementById('text').value);
			if (document.getElementById("download").checked){
			let a = document.createElement('a');
			a.href = "data:application/octet-stream,"+encodeURIComponent(result);
			a.download = 'result.txt';
			a.click();
			}
			if (document.getElementById("display").checked){
				document.getElementById("results").innerHTML = result;
			}
		}	

	} else if (document.getElementById('stringSelect').value == "Line Build"){
			document.getElementById("results").innerHTML = lineBuild(document.getElementById('text').value, document.getElementById('char').value, document.getElementById('lineNum').value); 
	} else {
		if (document.getElementById("clipboard").checked){
			navigator.clipboard.readText()
  				.then(text => {
  					stringDecoder(text);
  					if (document.getElementById("download").checked){
						let a = document.createElement('a');
						a.href = "data:application/octet-stream,"+encodeURIComponent(result);
						a.download = 'result.txt';
						a.click();
					}
					if (document.getElementById("display").checked){
						document.getElementById("results").innerHTML = result;
					}	
  				})
  				.catch(err => {
    				console.error('Failed to read clipboard contents: ', err);
  				});

		} else {
			stringDecoder(document.getElementById('text').value);
			if (document.getElementById("download").checked){
			let a = document.createElement('a');
			a.href = "data:application/octet-stream,"+encodeURIComponent(result);
			a.download = 'result.txt';
			a.click();
			}
			if (document.getElementById("display").checked){
				document.getElementById("results").innerHTML = result;
			}	
		}
	
	}
}

function generateName(){
	let name = "";
	name = document.getElementById('text').value;
	if (name.length > 16) {
		alert("Name too long!");
		return;
	} else if (name == "") {
		alert("Nothing entered!");
		return;
	}

	let text = stringEncoder(name);

	if (text.indexOf('�') != -1){
		alert("Invalid character detected! Please only use letters, numbers, spaces, and basic punctuation.");
		return;
	}


	let charID = document.getElementById('charID').value;

	charID = charID.replace(/\s/g,'');

	charID = parseInt(charID, 16);

	if (isNaN(charID)){
		alert("Error in character ID! Please make sure you've entered a proper ID.");
		return;
	}
	

	for (let i = 0; i < charArr.length; i++){
		if (charID == charArr[i]){
			alert("ID already has name changed");
			return;
		}
	}

	charArr.push(charID);

	let jackOffset = 0xD1C8;

	let ganzBase = 0xD538;

	let offset = ((charID - 0x2) * 0x370);

	if (charID == 1){
		offset = jackOffset;
	} else {
		offset = ganzBase + offset;
	}

	let offset1, offset2, offest3, offest4, offest5, offest6, offest7, offest8;



	if (text.length % 8 != 0){
		text += "0000";
	}

	let add1, add2, add3, add4, add5, add6, add7, add8;

	for (let i = 0; i < 8; i++){
		switch(i){
			case 0:
				let temp = text.substring(0,8);
				text = text.substring(8);
				add1 = temp.substring(6,8) + temp.substring(4,6) + temp.substring(2,4) + temp.substring(0,2);
				offset1 = offset.toString(16).toUpperCase();
				offset1 = String("00000000" + offset1).slice(-8);
				break;
			case 1:
				if (text.length == 0){
					add2 = "00000000";
				} else {
					let temp = text.substring(0,8);
					text = text.substring(8);
					add2 = temp.substring(6,8) + temp.substring(4,6) + temp.substring(2,4) + temp.substring(0,2);
				}
				offset2 = parseInt(offset1, 16) + 0x4;
				offset2 = offset2.toString(16).toUpperCase();
				offset2 = String("00000000" + offset2).slice(-8);
				break;
			case 2:
				if (text.length == 0){
					add3 = "00000000";
				} else {
					let temp = text.substring(0,8);
					text = text.substring(8);
					add3 = temp.substring(6,8) + temp.substring(4,6) + temp.substring(2,4) + temp.substring(0,2);
				}
				offset3 = parseInt(offset2, 16) + 0x4;
				offset3 = offset3.toString(16).toUpperCase();
				offset3 = String("00000000" + offset3).slice(-8);
				break;
			case 3:
				if (text.length == 0){
					add4 = "00000000";
				} else {
					let temp = text.substring(0,8);
					text = text.substring(8);
					add4 = temp.substring(6,8) + temp.substring(4,6) + temp.substring(2,4) + temp.substring(0,2);
				}
				offset4 = parseInt(offset3, 16) + 0x4;
				offset4 = offset4.toString(16).toUpperCase();
				offset4 = String("00000000" + offset4).slice(-8);
				break;
			case 4:
				if (text.length == 0){
					add5 = "00000000";
				} else {
					let temp = text.substring(0,8);
					text = text.substring(8);
					add5 = temp.substring(6,8) + temp.substring(4,6) + temp.substring(2,4) + temp.substring(0,2);
				}
				offset5 = parseInt(offset4, 16) + 0x4;
				offset5 = offset5.toString(16).toUpperCase();
				offset5 = String("00000000" + offset5).slice(-8);
				break;
			case 5:
				if (text.length == 0){
					add6 = "00000000";
				} else {
					let temp = text.substring(0,8);
					text = text.substring(8);
					add6 = temp.substring(6,8) + temp.substring(4,6) + temp.substring(2,4) + temp.substring(0,2);
				}
				offset6 = parseInt(offset5, 16) + 0x4;
				offset6 = offset6.toString(16).toUpperCase();
				offset6 = String("00000000" + offset6).slice(-8);
				break;
			case 6:
				if (text.length == 0){
					add7 = "00000000";
				} else {
					let temp = text.substring(0,8);
					text = text.substring(8);
					add7 = temp.substring(6,8) + temp.substring(4,6) + temp.substring(2,4) + temp.substring(0,2);
				}
				offset7 = parseInt(offset6, 16) + 0x4;
				offset7 = offset7.toString(16).toUpperCase();
				offset7 = String("00000000" + offset7).slice(-8);
				break;
			case 7:
				if (text.length == 0){
					add8 = "00000000";
				} else {
					let temp = text.substring(0,8);
					text = text.substring(8);
					add8 = temp.substring(6,8) + temp.substring(4,6) + temp.substring(2,4) + temp.substring(0,2);
				}
				offset8 = parseInt(offset7, 16) + 0x4;
				offset8 = offset8.toString(16).toUpperCase();
				offset8 = String("00000000" + offset8).slice(-8);
				break;
		}
	}

	//console.log(offset1);
	//console.log(offset2);
	//console.log(offset7);
	//console.log(offset8);

	let pnach;
	if (firstPass){
		pnach = "gametitle=Radiata Stories\n";
		pnach += "comment=Character Name Changer" + "\n\n";
		firstPass = false;
	} else {
		pnach = "";
	}
	pnach += "//Character ID: " + charID.toString(16).toUpperCase() + " changed name to: " + name + "\n";
	pnach += "patch=1,EE,60328CE0,extended," + add1 + "\n";
	pnach += "patch=1,EE,00020000,extended," + offset1 + "\n";
	pnach += "patch=1,EE,60328CE0,extended," + add2 + "\n";
	pnach += "patch=1,EE,00020000,extended," + offset2 + "\n";
	pnach += "patch=1,EE,60328CE0,extended," + add3 + "\n";
	pnach += "patch=1,EE,00020000,extended," + offset3 + "\n";
	pnach += "patch=1,EE,60328CE0,extended," + add4 + "\n";
	pnach += "patch=1,EE,00020000,extended," + offset4 + "\n";
	pnach += "patch=1,EE,60328CE0,extended," + add5 + "\n";
	pnach += "patch=1,EE,00020000,extended," + offset5 + "\n";
	pnach += "patch=1,EE,60328CE0,extended," + add6 + "\n";
	pnach += "patch=1,EE,00020000,extended," + offset6 + "\n";
	pnach += "patch=1,EE,60328CE0,extended," + add7 + "\n";
	pnach += "patch=1,EE,00020000,extended," + offset7 + "\n";
	pnach += "patch=1,EE,60328CE0,extended," + add8 + "\n";
	pnach += "patch=1,EE,00020000,extended," + offset8 + "\n\n";

	//console.log(pnach);
	document.getElementById("results").innerHTML = "Added."
	fileD += pnach;
}

function download(){
	if (firstPass){
		alert("Nothing added.");
		return;
	}
	let a = document.createElement('a');
	a.href = "data:application/octet-stream,"+encodeURIComponent(fileD);
	a.download = '47B9B2FD.pnach';
	a.click();
	document.getElementById("results").innerHTML = "Downloaded. List has been cleared.";
	fileD = "";
	charArr = [];
	firstPass = true;
}

function stringEncoder(text) {
	result = "";
	for (let i = 0; i < text.length; i++){
		switch(text.charAt(i)){
			case " ":
				result += "0100";
				break;
			case "A":
				result += "6300";
				break;
			case "B":
				result += "6400";
				break;
			case "C":
				result += "6500";
				break;
			case "D":
				result += "6600";
				break;
			case "E":
				result += "6700";
				break;
			case "F":
				result += "6800";
				break;
			case "G":
				result += "6900";
				break;
			case "H":
				result += "6A00";
				break;
			case "I":
				result += "6B00";
				break;
			case "J":
				result += "6C00";
				break;
			case "K":
				result += "6D00";
				break;
			case "L":
				result += "6E00";
				break;
			case "M":
				result += "6F00";
				break;
			case "N":
				result += "7000";
				break;
			case "O":
				result += "7100";
				break;
			case "P":
				result += "7200";
				break;
			case "Q":
				result += "7300";
				break;
			case "R":
				result += "7400";
				break;
			case "S":
				result += "7500";
				break;
			case "T":
				result += "7600";
				break;
			case "U":
				result += "7700";
				break;
			case "V":
				result += "7800";
				break;
			case "W":
				result += "7900";
				break;
			case "X":
				result += "7A00";
				break;
			case "Y":
				result += "7B00";
				break;
			case "Z":
				result += "7C00";
				break;
			case "a":
				result += "7D00";
				break;
			case "b":
				result += "7E00";
				break;
			case "c":
				result += "7F00";
				break;
			case "d":
				result += "8000";
				break;
			case "e":
				result += "8100";
				break;
			case "f":
				result += "8200";
				break;
			case "g":
				result += "8300";
				break;
			case "h":
				result += "8400";
				break;
			case "i":
				result += "8500";
				break;
			case "j":
				result += "8600";
				break;
			case "k":
				result += "8700";
				break;
			case "l":
				result += "8800";
				break;
			case "m":
				result += "8900";
				break;
			case "n":
				result += "8A00";
				break;
			case "o":
				result += "8B00";
				break;
			case "p":
				result += "8C00";
				break;
			case "q":
				result += "8D00";
				break;
			case "r":
				result += "8E00";
				break;
			case "s":
				result += "8F00";
				break;
			case "t":
				result += "9000";
				break;
			case "u":
				result += "9100";
				break;
			case "v":
				result += "9200";
				break;
			case "w":
				result += "9300";
				break;
			case "x":
				result += "9400";
				break;
			case "y":
				result += "9500";
				break;
			case "z":
				result += "9600";
				break;
			case "9":
				result += "6200";
				break;
			case "8":
				result += "6100";
				break;
			case "7":
				result += "6000";
				break;
			case "6":
				result += "5F00";
				break;
			case "5":
				result += "5E00";
				break;
			case "4":
				result += "5D00";
				break;
			case "3":
				result += "5C00";
				break;
			case "2":
				result += "5B00";
				break;
			case "1":
				result += "5A00";
				break;
			case "0":
				result += "5900";
				break;
			case "/":
				result += "1C00";
				break;
			case "!":
				result += "1800";
				break;
			case "?":
				result += "1700";
				break;
			case ":":
				result += "1500";
				break;
			case ".":
				result += "1300";
				break;
			case ",":
				result += "1200";
				break;
			case "~":
				result += "1E00";
				break;
			case "'":
				result += "2100";
				break;
			case ";":
				result += "1600";
				break;
			case "‘":
				result += "2000";
				break;
			case "’":
				result += "2100";
				break;
			case "“":
				result += "2200";
				break;
			case "”":
				result += "2300";
				break;
			case "(":
				result += "2400";
				break;
			case ")":
				result += "2500";
				break;
			case "[":
				result += "2800";
				break;
			case "]":
				result += "2900";
				break;
			/*case "3000":
				result += "「";
				break;
			case "3100":
				result += "」";
				break;
			case "3200":
				result += "『";
				break;
			case "3300":
				result += "』";
				break;
			case "3400":
				result += "【";
				break;
			case "3500":
				result += "】";
				break;*/
			case "+":
				result += "3600";
				break;
			case "-":
				result += "3700";
				break;
			case "±":
				result += "3800";
				break;
			case "×":
				result += "3900";
				break;
			case "÷":
				result += "3A00";
				break;
			case "=":
				result += "3B00";
				break;
			case "≠":
				result += "3C00";
				break;
			case "<":
				result += "3D00";
				break;
			case ">":
				result += "3E00";
				break;
			case "≤":
				result += "3F00";
				break;
			case "≥":
				result += "4000";
				break;
			case "￥":
				result += "4100";
				break;
			case "$":
				result += "4200";
				break;
			case "%":
				result += "4300";
				break;
			case "#":
				result += "4400";
				break;
			case "&":
				result += "4500";
				break;
			case "*":
				result += "4600";
				break;
			case "@":
				result += "4700";
				break;
			case "☆":
				result += "4800";
				break;
			case "★":
				result += "4900";
				break;
			case "○":
				result += "4A00";
				break;
			case "●":
				result += "4B00";
				break;
			case "◎":
				result += "4C00";
				break;
			/*case "4D00":
				result += "◇";
				break;
			case "4E00":
				result += "◆";
				break;
			case "4F00":
				result += "□";
				break;
			case "5000":
				result += "⬛";
				break;
			case "5100":
				result += "△";
				break;
			case "5200":
				result += "▲";
				break;
			case "5300":
				result += "▽";
				break;
			case "5400":
				result += "▼";
				break;
			case "5500":
				result += "→";
				break;
			case "5600":
				result += "←";
				break;
			case "5700":
				result += "↑";
				break;
			case "5800":
				result += "↓";
				break;*/
			default:
				result += "����";
		}

	}
	return result;
}

const changeEndianness = (string) => {
        const result = [];
        let len = string.length - 2;
        while (len >= 0) {
          result.push(string.substr(len, 2));
          len -= 2;
        }
        return result.join('');
}

function posCalculator(text) {
	let decimal = 18;
	decimal += -text.length*7
	for (let i = 0; i < text.length; i++){
			if (text.charAt(i) == "." || text.charAt(i) == "," || text.charAt(i) == "?" || text.charAt(i) == "!"){
        decimal += 5;            
			}
	}
  var size = 8;

  if (decimal >= 0) {
    var hexadecimal = decimal.toString(16);

    while ((hexadecimal.length % size) != 0) {
      hexadecimal = "" + 0 + hexadecimal;
    }

    return hexadecimal;
  } else {
    var hexadecimal = Math.abs(decimal).toString(16);
    while ((hexadecimal.length % size) != 0) {
      hexadecimal = "" + 0 + hexadecimal;
    }

    var output = '';
    for (i = 0; i < hexadecimal.length; i++) {
      output += (0x0F - parseInt(hexadecimal[i], 16)).toString(16);
    }

    output = (0x01 + parseInt(output, 16)).toString(16);
    return changeEndianness(output.substring(4, 8).toUpperCase());
  }
}


function lineBuild(){
	let text = document.getElementById('text').value;
	if (text.length < 3){
		alert("Text must be at least 3 characters long.")
		return;
	}
	let bustup = document.getElementById("bustup").checked
	let char = document.getElementById('char').value;
	char = parseInt(char, 16);
	char = char.toString(16).padStart(4, '0').toUpperCase();
	let lineNum = document.getElementById('lineNum').value;
	lineNum = parseInt(lineNum);
	lineNum = lineNum.toString(16).padStart(4, '0').toUpperCase();
	result = "";
	let textArr = text.split("|");
	if (textArr.length == 1){
		let textLength = text.length;
		textLength = Math.round(textLength /= 2) + 4;
		result += textLength.toString(16).padStart(2, '0').toUpperCase();
		result += "00 00 00 01 00 00 00";
		result += changeEndianness(char);
		result += "00 00 0F 25 00 00";
		result += textLength.toString(16).padStart(2, '0').toUpperCase();
		result += "00 0E 20 01 00";
		if (bustup) {
			result += "00";
		} else {
			result += "01";
		}
		result += "00 02 20 6A 69 5F 80 02 21 00 00 00 00 03 20 33 0B 66 16 05 01 07 10 00 03 04 20";
		result += posCalculator(textArr[0]);
		result += "BE 00 0F 28 1F 00";
		result += changeEndianness(lineNum);
		result += "0E 4E 01 00 01 00 76 00 00 00";
		result += stringEncoder(textArr[0]);
		result += "0F 20 78 00 03 00 00 00";
		result = result.replace(/\s/g,''); 
		lineArr.push(result);
		document.getElementById("results").innerHTML += "\n\n\"" + textArr[0] + "\"\n\nhas been added.";
	} else if (textArr.length == 2){
		let textLength = text.length - textArr.length;
		textLength = Math.round(textLength /= 2) + 4;
		result += textLength.toString(16).padStart(2, '0').toUpperCase();
		result += "00 00 00 01 00 00 00";
		result += changeEndianness(char);
		result += "00 00 0F 25 00 00";
		result += textLength.toString(16).padStart(2, '0').toUpperCase();
		result += "00 0E 20 01 00";
		if (bustup) {
			result += "00";
		} else {
			result += "01";
		}
		result += "00 02 20 6A 69 5F 80 02 21 00 00 00 00 03 20 33 0B 66 16 05 01 07 10 00 03 04 20";
		result += posCalculator(textArr[0]);
		result += "A8 00 0F 28 1F 00";
		result += changeEndianness(lineNum);
		result += "0E 4E 01 00 01 00 60 00 00 00";
		result += stringEncoder(textArr[0]);
		result += "0A 00 04 20";
		result += posCalculator(textArr[1]);
		result += "D0 00";
		result += stringEncoder(textArr[1]);
		result += "0F 20 78 00 03 00 00 00";
		result = result.replace(/\s/g,''); 
		lineArr.push(result);
		document.getElementById("results").innerHTML += "\n\n\"" + textArr[0] + "\n" + textArr[1] + "\"\n\nhas been added.";
	} else if (textArr.length == 3){
		let textLength = text.length - textArr.length;
		textLength = Math.round(textLength /= 2) + 4;
		result += textLength.toString(16).padStart(2, '0').toUpperCase();
		result += "00 00 00 01 00 00 00";
		result += changeEndianness(char);
		result += "00 00 0F 25 00 00";
		result += textLength.toString(16).padStart(2, '0').toUpperCase();
		result += "00 0E 20 01 00";
		if (bustup) {
			result += "00";
		} else {
			result += "01";
		}
		result += "00 02 20 6A 69 5F 80 02 21 00 00 00 00 03 20 33 0B 66 16 05 01 07 10 00 03 04 20";
		result += posCalculator(textArr[0]);
		result += "88 00 0F 28 1F 00";
		result += changeEndianness(lineNum);
		result += "0E 4E 01 00 01 00 40 00 00 00";
		result += stringEncoder(textArr[0]);
		result += "0A 00 04 20";
		result += posCalculator(textArr[1]);
		result += "B0 00";
		result += stringEncoder(textArr[1]);
		result += "0A 00 04 20";
		result += posCalculator(textArr[2]);
		result += "D8 00";
		result += stringEncoder(textArr[2]);
		result += "0F 20 78 00 03 00 00 00";
		result = result.replace(/\s/g,''); 
		lineArr.push(result);
		document.getElementById("results").innerHTML += "\n\n\"" + textArr[0] + "\n" + textArr[1] + "\n" + textArr[2] + "\"\n\nhas been added.";
	} else {
		return "Too many lines.";
	}
}

function download2(){
	if (lineArr.length == 0){
		alert("Nothing added.");
		return;
	}
	if (document.getElementById("null").checked){
		lineArr.unshift("0000000001000000010000000F25000000000E200100010002206A695F800221000000000320330B661605010710000304200000BE000E4E01000100760000000E24010002010000");
	}
	let totalSize = 0;
	let currentLength = 0;
	let baseLength = 48;
	baseLength += 8*lineArr.length;
	for (let i = 0; i < lineArr.length; i++){
		if(i == 0){
			currentLength = baseLength/2;
			totalSize += currentLength + (lineArr[0].length / 2);
			let temp = currentLength.toString(16).padStart(8, '0').toUpperCase()
			temp = changeEndianness(temp);
			pointerArr.push(temp);
		} else {
			currentLength += (lineArr[i-1].length / 2);
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
	for (let i = 0; i < pointerArr.length; i++){
		output += pointerArr[i];
	}
	for (let i = 0; i < lineArr.length; i++){
		output += lineArr[i];
	}
	output = output.replace(/\s/g,'');
	navigator.clipboard.writeText(output)
  .then(() => {
  	if (document.getElementById("null").checked){
  		lineArr.shift();
  	}
  	pointerArr = [];
    alert("Data copied to clipboard.");
  })
  .catch(err => {
  	if (document.getElementById("null").checked){
  		lineArr.shift();
  	}
  	pointerArr = [];
    console.log('Error: ', err);
  });
	//document.getElementById("results").innerHTML = output;
}

function hexTrim(text){
	result = "";
	rmf = false;
	text = text.replace(/\s/g,''); 
	while (text.length > 0) {
		if (!rmf) {
			id = text.substring(0, 8);
			if (id == "524D4631") {
				rmf = true;
				result += text.substring(0,2);
			}
			text = text.substring(2);
		} else if (rmf) {
			id = text.substring(0,8);
			if (id == "4B6F6473"){
				rmf = false;
			} else {
				result += text.substring(0,2);
			}
			text = text.substring(2);
		}
	}
	return result;
}

function stringDecoder(text) {
	result = "";
	text = text.replace(/\s/g,''); 
	while (text.length > 0){
		temp = text.substring(0, 4);
		text = text.substring(4);

		if (temp != ""){
			switch(temp){
				case "0100":
					result += " ";
					break;
				case "6300":
					result += "A";
					break;
				case "6400":
					result += "B";
					break;
				case "6500":
					result += "C";
					break;
				case "6600":
					result += "D";
					break;
				case "6700":
					result += "E";
					break;
				case "6800":
					result += "F";
					break;
				case "6900":
					result += "G";
					break;
				case "6A00":
					result += "H";
					break;
				case "6B00":
					result += "I";
					break;
				case "6C00":
					result += "J";
					break;
				case "6D00":
					result += "K";
					break;
				case "6E00":
					result += "L";
					break;
				case "6F00":
					result += "M";
					break;
				case "7000":
					result += "N";
					break;
				case "7100":
					result += "O";
					break;
				case "7200":
					result += "P";
					break;
				case "7300":
					result += "Q";
					break;
				case "7400":
					result += "R";
					break;
				case "7500":
					result += "S";
					break;
				case "7600":
					result += "T";
					break;
				case "7700":
					result += "U";
					break;
				case "7800":
					result += "V";
					break;
				case "7900":
					result += "W";
					break;
				case "7A00":
					result += "X";
					break;
				case "7B00":
					result += "Y";
					break;
				case "7C00":
					result += "Z";
					break;
				case "7D00":
					result += "a";
					break;
				case "7E00":
					result += "b";
					break;
				case "7F00":
					result += "c";
					break;
				case "8000":
					result += "d";
					break;
				case "8100":
					result += "e";
					break;
				case "8200":
					result += "f";
					break;
				case "8300":
					result += "g";
					break;
				case "8400":
					result += "h";
					break;
				case "8500":
					result += "i";
					break;
				case "8600":
					result += "j";
					break;
				case "8700":
					result += "k";
					break;
				case "8800":
					result += "l";
					break;
				case "8900":
					result += "m";
					break;
				case "8A00":
					result += "n";
					break;
				case "8B00":
					result += "o";
					break;
				case "8C00":
					result += "p";
					break;
				case "8D00":
					result += "q";
					break;
				case "8E00":
					result += "r";
					break;
				case "8F00":
					result += "s";
					break;
				case "9000":
					result += "t";
					break;
				case "9100":
					result += "u";
					break;
				case "9200":
					result += "v";
					break;
				case "9300":
					result += "w";
					break;
				case "9400":
					result += "x";
					break;
				case "9500":
					result += "y";
					break;
				case "9600":
					result += "z";
					break;
				case "6200":
					result += "9";
					break;
				case "6100":
					result += "8";
					break;
				case "6000":
					result += "7";
					break;
				case "5F00":
					result += "6";
					break;
				case "5E00":
					result += "5";
					break;
				case "5D00":
					result += "4";
					break;
				case "5C00":
					result += "3";
					break;
				case "5B00":
					result += "2";
					break;
				case "5A00":
					result += "1";
					break;
				case "5900":
					result += "0";
					break;
				/*case "1C00":
					result += "/";
					break;
				case "1A00":
					result += "々";
					break;*/
				case "1B00":
					result += "ー";
					break;
				case "1D00":
					result += "\\";
					break;
				case "1F00":
					result += "...";
					break;
				case "1800":
					result += "!";
					break;
				case "1700":
					result += "?";
					break;
				/*case "1900":
					result += "_";
					break;*/
				case "1300":
					result += ".";
					break;
				case "1200":
					result += ",";
					break;
				/*case "1000":
					result += "、";
					break;
				case "1100":
					result += "。";
					break;*/
				/*case "1400":
					result += "・";
					break;*/
				case "1500":
					result += ":";
					break;
				/*case "1600":
					result += ";";
					break;*/
				/*case "1E00":
					result += "~";
					break;*/
				case "2000":
					result += "‘";
					break;
				case "2100":
					result += "’";
					break;
				case "2200":
					result += "“";
					break;
				case "2300":
					result += "”";
					break;
				case "2400":
					result += "(";
					break;
				case "2500":
					result += ")";
					break;
				/*case "2800":
					result += "[";
					break;
				case "2900":
					result += "]";
					break;
				case "3000":
					result += "「";
					break;
				case "3100":
					result += "」";
					break;
				case "3200":
					result += "『";
					break;
				case "3300":
					result += "』";
					break;
				case "3400":
					result += "【";
					break;
				case "3500":
					result += "】";
					break;
				case "3600":
					result += "+";
					break;
				case "3700":
					result += "-";
					break;
				case "3800":
					result += "±";
					break;
				case "3900":
					result += "×";
					break;
				case "3A00":
					result += "÷";
					break;
				case "3B00":
					result += "=";
					break;
				case "3C00":
					result += "≠";
					break;
				case "3D00":
					result += "<";
					break;
				case "3E00":
					result += ">";
					break;
				case "3F00":
					result += "≤";
					break;
				case "4000":
					result += "≥";
					break;
				case "4100":
					result += "￥";
					break;
				case "4200":
					result += "$";
					break;
				case "4300":
					result += "%";
					break;
				case "4400":
					result += "#";
					break;
				case "4500":
					result += "&";
					break;
				case "4600":
					result += "*";
					break;
				case "4700":
					result += "@";
					break;
				case "4800":
					result += "☆";
					break;
				case "4900":
					result += "★";
					break;
				case "4A00":
					result += "○";
					break;
				case "4B00":
					result += "●";
					break;
				case "4C00":
					result += "◎";
					break;
				case "4D00":
					result += "◇";
					break;
				case "4E00":
					result += "◆";
					break;
				case "4F00":
					result += "□";
					break;
				case "5000":
					result += "⬛";
					break;
				case "5100":
					result += "△";
					break;
				case "5200":
					result += "▲";
					break;
				case "5300":
					result += "▽";
					break;
				case "5400":
					result += "▼";
					break;
				case "5500":
					result += "→";
					break;
				case "5600":
					result += "←";
					break;
				case "5700":
					result += "↑";
					break;
				case "5800":
					result += "↓";
					break;*/
				case "0F20":
					result += "\n\n";
					break;
				case "0A00":
					result += "\n";
					break;
				default:
					//result += "�";
			}
		} else {
			break;
		}
	}
	return result;
}