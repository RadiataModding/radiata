// JavaScript Document
let result = "";

let firstPass = true;

let fileD = "";

let charArr = [];

let lineArr = [];

let pointerArr = [];

let currentVoice = 0;

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
		if (document.getElementById("count").checked){
			count = document.getElementById('text').value.length;
			res = changeEndianness2(count.toString(16).padStart(4,'0')) + "000000000000";
			res += stringEncoder(document.getElementById('text').value);
			res += "0000"
			document.getElementById("results").innerHTML = res;
		} else {
			document.getElementById("results").innerHTML = stringEncoder(document.getElementById('text').value);
		}
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
		if (!(text.charAt(i) in charEncoding)){
			return alert(text.charAt(i) + " is an invalid character!")
		}
		result += changeEndianness2(charEncoding[text.charAt(i)].toString(16).padStart(4, 0).toUpperCase());
	}
	return result;
			/*case "è":
				result += "510101000100";
				break;
			case "é":
				result += "520101000100";
				break;
			case "ê":
				result += "530101000100";
				break;
			case "ë":
				result += "540101000100";
				break;
			case "ã":
				result += "550101000100";
				break;
			case "á":
				result += "5B0101000100";
				break;
			case "ç":
				result += "5F0101000100";
				break;
			case "…":
				result += "130013001300";
				break;
			case "µ":
				result += "1CC0";
				break;
			case "\n":
				result += "0A00";
				break;*/
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

function changeEndianness2(string) {
        const result = [];
        let len = string.length - 2;
        while (len >= 0) {
          result.push(string.substr(len, 2));
          len -= 2;
        }
        return result.join('');
}

function recruitChar(id){
    char = changeEndianness2(id.toString(16).padStart(4, '0'));
    full = "";
    full += "14 03 00 80 20 0F 00 00";
    full += char;
    full += "00 0D 01 00 00 00 14 03 00 80 27 0F 00 00 00 00 00 1D 01 00 00 00 02 03 00 80 04 00 00 87";
    full += char;
    full += "48 00 00 00 00 00 14 03 00 80 20 0F 00 00";
    full += char;
    full += "00 48 01 00 00 00 0F 00 00 80 14 03 00 80 20 02 00 00";
    full += char;
    full += "00 00";
    full += char;
    full += "00 01 D5 04 03 80 13 90 00 00";
    full += char;
    full += "00 00";
    full += char;
    full += "00 00 00 00 00 00 0F 00 00 80 1B 02 01 80 17 00 07 00";
    full += char;
    full += "00 00 0F 00 00 00 1B 01 00 80 17 00 05 00 02 03 00 80 F9 FF FF 82 12 00 00 00 01 00 00 00 1B 01 00 80 17 00 02 00 14 03 00 00 21 0F 00 00";
    full += char;
    full += "00 09 1E 00 00 00";
    return full
}

function posCalculator(text) {
	let decimal = 0;
	for (let i = 0; i < text.length; i++){
			decimal += parseInt(charSpacing[text.charAt(i)]);
			/*console.log(text.charAt(i) + " is " + charSpacing[text.charAt(i)]);*/
	}
	decimal = decimal / 3;
	console.log(decimal)
	decimal = Math.round(decimal);
	console.log(decimal)
	decimal = -decimal;
	console.log(decimal)
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
	let lineOpt = document.getElementById('lineOpt').value;
	let lineNum;
	if (lineOpt == 1){
		lineNum = ++currentVoice;
		lineNum = lineNum.toString(16).padStart(4, '0').toUpperCase();
	} else{
		lineNum = document.getElementById('lineNum').value;
		lineNum = parseInt(lineNum);
		lineNum = lineNum.toString(16).padStart(4, '0').toUpperCase();
	}
	
	result = "";
	let textArr = text.split(/\n/);
	for(let i = 0; i < textArr.length; i++){
		for(let x = 0; x < textArr[i].length; x++){
			if (!(textArr[i].charAt(x) in charEncoding)){
				return alert(textArr[i].charAt(x) + " is an invalid character!")
			}
		}
	}
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
		return alert("Too many line breaks, three max per line.");
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
		lineArr[i] = lineArr[i].replace(/\s/g,'');
		if(i == 0){
			while(((lineArr[i].length / 2) % 4) != 0){
				lineArr[i] += "00";
			}
			currentLength = baseLength/2;
			totalSize += currentLength + (lineArr[0].length / 2);
			let temp = currentLength.toString(16).padStart(8, '0').toUpperCase()
			temp = changeEndianness(temp);
			pointerArr.push(temp);
		} else {
			while(((lineArr[i].length / 2) % 4) != 0){
				lineArr[i] += "00";
			}
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

function copyClip(text){
	navigator.clipboard.writeText(text)
  .then(() => {
    alert("Data copied to clipboard.");
  })
  .catch(err => {
    console.log('Error: ', err);
  });
}

function initialiseCharacter(){
	let char1 = document.getElementById('char1').value;
	char1 = parseInt(char1, 16);
  char1 = char1.toString(16).padStart(8, '0').toUpperCase();
  char1 = changeEndianness2(char1);
  let char3 = document.getElementById('char3').value;
  char3 = parseInt(char3, 16);
  char3 = char3.toString(16).padStart(2, '0').toUpperCase();

  let string = '';
  string += '39 02 22 00 01 00 00 00';
  string += char1;
  string += 'C0 02 01 80';
  string += char1;
  string += '00 00 05 00 27 01 01 80';
  string += char1;
  string += '20 03 01 80';
  string += char1;
  string += '01 00 00 00';
  string += char3;
  string += '01 01 00';

  copyClip(string);
}

let charSpacing = {
    "0": "26",
    "1": "12",
    "2": "23",
    "3": "24",
    "4": "26",
    "5": "24",
    "6": "26",
    "7": "23",
    "8": "27",
    "9": "25",
    "、": "12",
    "。": "12",
    ",": "10",
    ".": "10",
    "・": "19",
    ":": "11",
    ";": "11",
    "?": "20",
    "!": "10",
    "_": "23",
    "ー": "30",
    "/": "16",
    "~": "23",
    "…": "29",
    "‘": "10",
    "'": "10",
    "“": "17",
    "\"": "17",
    "(": "15",
    ")": "14",
    "〔": "16",
    "〕": "15",
    "[": "16",
    "]": "15",
    "{": "18",
    "}": "18",
    "〈": "17",
    "〉": "17",
    "《": "21",
    "》": "21",
    "「": "18",
    "」": "18",
    "『": "19",
    "』": "19",
    "【": "25",
    "】": "25",
    "+": "22",
    "-": "15",
    "±": "28",
    "×": "26",
    "÷": "29",
    "≠": "28",
    "<": "21",
    ">": "21",
    "≦": "29",
    "≧": "29",
    "\\": "29",
    "$": "21",
    "%": "26",
    "&": "26",
    "*": "17",
    "@": "30",
    "☆": "30",
    "★": "30",
    "○": "30",
    "●": "30",
    "◎": "30",
    "◇": "30",
    "◆": "30",
    "□": "28",
    "■": "28",
    "△": "30",
    "▲": "30",
    "▽": "30",
    "▼": "30",
    "→": "30",
    "←": "30",
    "↑": "19",
    "↓": "19",
    "A": "26",
    "B": "25",
    "C": "23",
    "D": "25",
    "E": "23",
    "F": "21",
    "G": "29",
    "H": "26",
    "I": "10",
    "J": "22",
    "K": "24",
    "L": "20",
    "M": "30",
    "N": "26",
    "O": "27",
    "P": "23",
    "Q": "28",
    "R": "24",
    "S": "26",
    "T": "24",
    "U": "24",
    "V": "23",
    "W": "30",
    "X": "21",
    "Y": "26",
    "Z": "24",
    "a": "22",
    "b": "22",
    "c": "19",
    "d": "23",
    "e": "20",
    "f": "18",
    "g": "20",
    "h": "20",
    "i": "11",
    "j": "15",
    "k": "19",
    "l": "11",
    "m": "30",
    "n": "22",
    "o": "22",
    "p": "22",
    "q": "25",
    "r": "18",
    "s": "22",
    "t": "21",
    "u": "20",
    "v": "19",
    "w": "26",
    "x": "18",
    "y": "22",
    "z": "19",
    "ぁ": "28",
    "あ": "30",
    "ぃ": "27",
    "い": "29",
    "ぅ": "26",
    "う": "27",
    "ぇ": "29",
    "え": "30",
    "ぉ": "29",
    "お": "30",
    "か": "30",
    "が": "30",
    "き": "29",
    "ぎ": "30",
    "く": "25",
    "ぐ": "30",
    "け": "30",
    "げ": "30",
    "こ": "29",
    "ご": "30",
    "さ": "30",
    "ざ": "30",
    "し": "30",
    "じ": "30",
    "す": "30",
    "ず": "30",
    "せ": "30",
    "ぜ": "30",
    "そ": "30",
    "ぞ": "30",
    "た": "30",
    "だ": "30",
    "ち": "30",
    "ぢ": "30",
    "っ": "27",
    "つ": "29",
    "づ": "30",
    "て": "30",
    "で": "30",
    "と": "29",
    "ど": "30",
    "な": "30",
    "に": "30",
    "ぬ": "30",
    "ね": "30",
    "の": "30",
    "は": "30",
    "ば": "30",
    "ぱ": "30",
    "ひ": "30",
    "び": "30",
    "ぴ": "30",
    "ふ": "30",
    "ぶ": "30",
    "ぷ": "30",
    "へ": "30",
    "べ": "30",
    "ぺ": "30",
    "ほ": "30",
    "ぼ": "30",
    "ぽ": "30",
    "ま": "30",
    "み": "30",
    "む": "30",
    "め": "29",
    "も": "28",
    "ゃ": "28",
    "や": "30",
    "ゅ": "28",
    "ゆ": "29",
    "ょ": "28",
    "よ": "30",
    "ら": "28",
    "り": "26",
    "る": "29",
    "れ": "30",
    "ろ": "28",
    "ゎ": "28",
    "わ": "30",
    "ゐ": "29",
    "ゑ": "30",
    "を": "29",
    "ん": "30",
    "ァ": "28",
    "ア": "29",
    "ィ": "26",
    "イ": "30",
    "ゥ": "26",
    "ウ": "30",
    "ェ": "29",
    "エ": "30",
    "ォ": "29",
    "オ": "30",
    "カ": "30",
    "キ": "30",
    "ク": "30",
    "ケ": "30",
    "コ": "30",
    "サ": "30",
    "シ": "30",
    "ス": "30",
    "セ": "30",
    "ソ": "30",
    "タ": "30",
    "チ": "30",
    "ッ": "27",
    "ツ": "30",
    "テ": "30",
    "ト": "29",
    "ナ": "30",
    "ニ": "30",
    "ヌ": "29",
    "ネ": "30",
    "ノ": "25",
    "ハ": "30",
    "ヒ": "29",
    "フ": "30",
    "ヘ": "30",
    "ホ": "30",
    "マ": "29",
    "ミ": "28",
    "ム": "30",
    "メ": "28",
    "モ": "30",
    "ャ": "27",
    "ヤ": "29",
    "ュ": "29",
    "ユ": "30",
    "ョ": "26",
    "ヨ": "27",
    "ラ": "28",
    "リ": "26",
    "ル": "30",
    "レ": "30",
    "ロ": "27",
    "ワ": "28",
    "ヲ": "28",
    "ン": "30",
    "ヵ": "27",
    "ヶ": "29",
    " ": "12",
    "緑": "30",
    "依": "30",
    "頼": "30",
    "書": "30",
    "村": "30",
    "雨": "30",
    "折": "30",
    "剣": "29",
    "鉄": "30",
    "槌": "30",
    "隠": "30",
    "者": "30",
    "像": "30",
    "用": "30",
    "状": "30",
    "態": "30",
    "耐": "30",
    "性": "30",
    "戦": "30",
    "闘": "30",
    "心": "30",
    "得": "30",
    "人": "30",
    "好": "30",
    "武": "30",
    "器": "30",
    "工": "30",
    "房": "30",
    "士": "30",
    "魔": "30",
    "術": "30",
    "師": "30",
    "僧": "30",
    "侶": "30",
    "盗": "30",
    "賊": "30",
    "生": "30",
    "物": "30",
    "図": "29",
    "鑑": "30",
    "伝": "30",
    "本": "30",
    "歴": "30",
    "史": "30",
    "上": "30",
    "下": "30",
    "激": "30",
    "大": "30",
    "蛇": "30",
    "壁": "30",
    "開": "30",
    "放": "30",
    "奮": "30",
    "起": "30",
    "燃": "30",
    "焼": "30",
    "読": "30",
    "込": "30",
    "保": "30",
    "存": "30",
    "差": "30",
    "空": "30",
    "他": "30",
    "容": "30",
    "量": "30",
    "出": "29",
    "入": "30",
    "番": "30",
    "円": "29",
    "軽": "30",
    "重": "30",
    "装": "30",
    "衛": "30",
    "兵": "30",
    "世": "30",
    "Ⅰ": "23",
    "Ⅱ": "26",
    "号": "30",
    "☆": "30",
    "女": "30",
    "男": "28",
    "騎": "30",
    "見": "30",
    "習": "29",
    "黒": "30",
    "部": "30",
    "木": "30",
    "野": "30",
    "火": "30",
    "事": "30",
    "水": "30",
    "地": "30",
    "風": "30",
    "無": "30",
    "毒": "30",
    "凍": "30",
    "結": "30",
    "金": "30",
    "縛": "30",
    "呪": "30",
    "混": "30",
    "乱": "30",
    "近": "30",
    "眼": "30",
    "回": "29",
    "復": "30",
    "吸": "30",
    "収": "30",
    "炎": "30",
    "石": "30",
    "化": "30",
    "♂": "30",
    "♀": "28",
    "食": "30",
    "型": "30",
    "球": "30",
    "雷": "30",
    "獣": "30",
    "神": "30",
    "殿": "30",
    "死": "30"
}

let charEncoding = {
  " ": 1,
  "0": 89,
  "1": 90,
  "2": 91,
  "3": 92,
  "4": 93,
  "5": 94,
  "6": 95,
  "7": 96,
  "8": 97,
  "9": 98,
  "､": 16,
  "｡": 17,
  ",": 18,
  ".": 19,
  "･": 20,
  ":": 21,
  ";": 22,
  "?": 23,
  "!": 24,
  "_": 25,
  "々": 26,
  "ｰ": 27,
  "/": 28,
  "＼": 29,
  "~": 30,
  "…": 31,
  "‘": 32,
  "'": 33,
  "“": 34,
  "\"": 35,
  "(": 36,
  ")": 37,
  "〔": 38,
  "〕": 39,
  "[": 40,
  "]": 41,
  "{": 42,
  "}": 43,
  "〈": 44,
  "〉": 45,
  "《": 46,
  "》": 47,
  "｢": 48,
  "｣": 49,
  "『": 50,
  "』": 51,
  "【": 52,
  "】": 53,
  "+": 54,
  "-": 55,
  "±": 56,
  "×": 57,
  "÷": 58,
  "≠": 60,
  "<": 61,
  ">": 62,
  "≦": 63,
  "≧": 64,
  "\\": 65,
  "$": 66,
  "%": 67,
  "&": 69,
  "*": 70,
  "@": 71,
  "☆": 414,
  "★": 73,
  "○": 74,
  "●": 75,
  "◎": 76,
  "◇": 77,
  "◆": 78,
  "□": 79,
  "■": 80,
  "△": 81,
  "▲": 82,
  "▽": 83,
  "▼": 84,
  "→": 85,
  "←": 86,
  "↑": 87,
  "↓": 88,
  "A": 99,
  "B": 100,
  "C": 101,
  "D": 102,
  "E": 103,
  "F": 104,
  "G": 105,
  "H": 106,
  "I": 107,
  "J": 108,
  "K": 109,
  "L": 110,
  "M": 111,
  "N": 112,
  "O": 113,
  "P": 114,
  "Q": 115,
  "R": 116,
  "S": 117,
  "T": 118,
  "U": 119,
  "V": 120,
  "W": 121,
  "X": 122,
  "Y": 123,
  "Z": 124,
  "a": 125,
  "b": 126,
  "c": 127,
  "d": 128,
  "e": 129,
  "f": 130,
  "g": 131,
  "h": 132,
  "i": 133,
  "j": 134,
  "k": 135,
  "l": 136,
  "m": 137,
  "n": 138,
  "o": 139,
  "p": 140,
  "q": 141,
  "r": 142,
  "s": 143,
  "t": 144,
  "u": 145,
  "v": 146,
  "w": 147,
  "x": 148,
  "y": 149,
  "z": 150,
  "ぁ": 151,
  "あ": 152,
  "ぃ": 153,
  "い": 154,
  "ぅ": 155,
  "う": 156,
  "ぇ": 157,
  "え": 158,
  "ぉ": 159,
  "お": 160,
  "か": 161,
  "が": 162,
  "き": 163,
  "ぎ": 164,
  "く": 165,
  "ぐ": 166,
  "け": 167,
  "げ": 168,
  "こ": 169,
  "ご": 170,
  "さ": 171,
  "ざ": 172,
  "し": 173,
  "じ": 174,
  "す": 175,
  "ず": 176,
  "せ": 177,
  "ぜ": 178,
  "そ": 179,
  "ぞ": 180,
  "た": 181,
  "だ": 182,
  "ち": 183,
  "ぢ": 184,
  "っ": 185,
  "つ": 186,
  "づ": 187,
  "て": 188,
  "で": 189,
  "と": 190,
  "ど": 191,
  "な": 192,
  "に": 193,
  "ぬ": 194,
  "ね": 195,
  "の": 196,
  "は": 197,
  "ば": 198,
  "ぱ": 199,
  "ひ": 200,
  "び": 201,
  "ぴ": 202,
  "ふ": 203,
  "ぶ": 204,
  "ぷ": 205,
  "へ": 206,
  "べ": 207,
  "ぺ": 208,
  "ほ": 209,
  "ぼ": 210,
  "ぽ": 211,
  "ま": 212,
  "み": 213,
  "む": 214,
  "め": 215,
  "も": 216,
  "ゃ": 217,
  "や": 218,
  "ゅ": 219,
  "ゆ": 220,
  "ょ": 221,
  "よ": 222,
  "ら": 223,
  "り": 224,
  "る": 225,
  "れ": 226,
  "ろ": 227,
  "ゎ": 228,
  "わ": 229,
  "ゐ": 230,
  "ゑ": 231,
  "を": 232,
  "ん": 233,
  "ァ": 234,
  "ア": 235,
  "ィ": 236,
  "イ": 329,
  "ゥ": 238,
  "ウ": 239,
  "ェ": 240,
  "エ": 330,
  "ォ": 242,
  "オ": 243,
  "カ": 244,
  "ガ": 245,
  "キ": 246,
  "ギ": 247,
  "ク": 248,
  "グ": 249,
  "ケ": 250,
  "ゲ": 251,
  "コ": 252,
  "ゴ": 253,
  "サ": 254,
  "ザ": 255,
  "シ": 272,
  "ジ": 273,
  "ス": 274,
  "ズ": 275,
  "セ": 276,
  "ゼ": 277,
  "ソ": 278,
  "ゾ": 279,
  "タ": 280,
  "ダ": 281,
  "チ": 282,
  "ヂ": 283,
  "ッ": 284,
  "ツ": 285,
  "ヅ": 286,
  "テ": 287,
  "デ": 288,
  "ト": 289,
  "ド": 290,
  "ナ": 291,
  "ニ": 292,
  "ヌ": 293,
  "ネ": 294,
  "ノ": 295,
  "ハ": 296,
  "バ": 297,
  "パ": 298,
  "ヒ": 299,
  "ビ": 300,
  "ピ": 301,
  "フ": 302,
  "ブ": 303,
  "プ": 304,
  "ヘ": 305,
  "ベ": 306,
  "ペ": 307,
  "ホ": 308,
  "ボ": 309,
  "ポ": 310,
  "マ": 311,
  "ミ": 312,
  "ム": 313,
  "メ": 314,
  "モ": 315,
  "ャ": 316,
  "ヤ": 317,
  "ュ": 318,
  "ユ": 319,
  "ョ": 320,
  "ヨ": 321,
  "ラ": 322,
  "リ": 323,
  "ル": 324,
  "レ": 325,
  "ロ": 326,
  "ワ": 328,
  "ヲ": 331,
  "ン": 332,
  "ヴ": 333,
  "ヵ": 334,
  "ヶ": 335,
  "緑": 336,
  "依": 337,
  "頼": 338,
  "書": 339,
  "村": 340,
  "雨": 341,
  "折": 342,
  "剣": 343,
  "鉄": 344,
  "槌": 345,
  "隠": 346,
  "者": 347,
  "像": 348,
  "用": 349,
  "状": 350,
  "態": 351,
  "耐": 352,
  "性": 353,
  "戦": 354,
  "闘": 355,
  "心": 356,
  "得": 357,
  "人": 358,
  "好": 359,
  "武": 360,
  "器": 361,
  "工": 362,
  "房": 363,
  "士": 364,
  "魔": 365,
  "術": 366,
  "師": 367,
  "僧": 368,
  "侶": 369,
  "盗": 370,
  "賊": 371,
  "生": 372,
  "物": 373,
  "図": 374,
  "鑑": 375,
  "伝": 376,
  "本": 377,
  "歴": 378,
  "史": 379,
  "上": 380,
  "下": 381,
  "激": 382,
  "大": 383,
  "蛇": 384,
  "壁": 385,
  "開": 386,
  "放": 387,
  "奮": 388,
  "起": 389,
  "燃": 390,
  "焼": 391,
  "読": 392,
  "込": 393,
  "保": 394,
  "存": 395,
  "差": 396,
  "空": 397,
  "他": 398,
  "容": 399,
  "量": 400,
  "出": 401,
  "入": 402,
  "番": 403,
  "円": 404,
  "軽": 405,
  "重": 406,
  "装": 407,
  "衛": 408,
  "兵": 409,
  "世": 410,
  "Ⅰ": 411,
  "Ⅱ": 412,
  "号": 413,
  "女": 415,
  "男": 416,
  "騎": 417,
  "見": 418,
  "習": 419,
  "黒": 420,
  "部": 421,
  "木": 422,
  "野": 423,
  "火": 424,
  "事": 425,
  "水": 426,
  "地": 427,
  "風": 428,
  "無": 429,
  "毒": 430,
  "凍": 431,
  "結": 432,
  "金": 433,
  "縛": 434,
  "呪": 435,
  "混": 436,
  "乱": 437,
  "近": 438,
  "眼": 439,
  "回": 440,
  "復": 441,
  "吸": 442,
  "収": 443,
  "炎": 444,
  "石": 445,
  "化": 446,
  "♂": 447,
  "♀": 448,
  "食": 449,
  "型": 450,
  "球": 451,
  "雷": 452,
  "獣": 453,
  "神": 454,
  "殿": 455,
  "死": 456
}