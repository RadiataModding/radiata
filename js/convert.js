// JavaScript Document
let result = "";

let firstPass = true;

let fileD = "";

let charArr = [];

let lineArr = [];

let textLineArr = []

let pointerArr = [];

let currentVoice = 0;

$("#myfile").on("change", function(changeEvent) {
    for (var i = 0; i < changeEvent.target.files.length; ++i) {
        (function(file) { // Wrap current file in a closure.
            var loader = new FileReader();
            loader.onload = function(loadEvent) {
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

function startConvert() {
    if (document.getElementById('stringSelect').value == "Encode") {
        if (document.getElementById("count").checked) {
            count = document.getElementById('text').value.length;
            res = changeEndianness2(count.toString(16).padStart(4, '0')) + "000000000000";
            res += stringEncoder(document.getElementById('text').value);
            res += "0000"
            document.getElementById("results").innerHTML = res;
        } else {
            document.getElementById("results").innerHTML = stringEncoder(document.getElementById('text').value);
        }

        if (document.getElementById("calcu").checked) {
            curtext = document.getElementById('text').value;
            let textArr = curtext.split(/\n/);
            for (let i = 0; i < textArr.length; i++) {
                document.getElementById("results").innerHTML += "\n";
                document.getElementById("results").innerHTML += "Line " + (i + 1) + ":";
                document.getElementById("results").innerHTML += "\n";
                document.getElementById("results").innerHTML += posCalculator(textArr[i]);
                document.getElementById("results").innerHTML += "\n";
            }
        }
    } else if (document.getElementById('stringSelect').value == "Trim") {
        if (document.getElementById("clipboard").checked) {
            navigator.clipboard.readText()
                .then(text => {
                    hexTrim(text);
                    if (document.getElementById("download").checked) {
                        let a = document.createElement('a');
                        a.href = "data:application/octet-stream," + encodeURIComponent(result);
                        a.download = 'result.txt';
                        a.click();
                    }
                    if (document.getElementById("display").checked) {
                        document.getElementById("results").innerHTML = result;
                    }
                })
                .catch(err => {
                    console.error('Failed to read clipboard contents: ', err);
                });
        } else {
            hexTrim(document.getElementById('text').value);
            if (document.getElementById("download").checked) {
                let a = document.createElement('a');
                a.href = "data:application/octet-stream," + encodeURIComponent(result);
                a.download = 'result.txt';
                a.click();
            }
            if (document.getElementById("display").checked) {
                document.getElementById("results").innerHTML = result;
            }
        }

    } else if (document.getElementById('stringSelect').value == "Line Build") {
        document.getElementById("results").innerHTML = lineBuild(document.getElementById('text').value, document.getElementById('char').value, document.getElementById('lineNum').value);
    } else {
        if (document.getElementById("clipboard").checked) {
            navigator.clipboard.readText()
                .then(text => {
                    if (document.getElementById("experimental").checked) {
                        result = linesProcess(text);
                    } else {
                        stringDecoder(text);
                    }

                    if (document.getElementById("download").checked) {
                        let a = document.createElement('a');
                        a.href = "data:application/octet-stream," + encodeURIComponent(result);
                        a.download = 'result.txt';
                        a.click();
                    }
                    if (document.getElementById("display").checked) {
                        document.getElementById("results").innerHTML = result;
                    }
                })
                .catch(err => {
                    console.error('Failed to read clipboard contents: ', err);
                });

        } else {
            if (document.getElementById("experimental").checked) {
                result = linesProcess(document.getElementById('text').value);
            } else {
                stringDecoder(document.getElementById('text').value);
            }
            if (document.getElementById("download").checked) {
                let a = document.createElement('a');
                a.href = "data:application/octet-stream," + encodeURIComponent(result);
                a.download = 'result.txt';
                a.click();
            }
            if (document.getElementById("display").checked) {
                document.getElementById("results").innerHTML = result;
            }
        }

    }
}

function generateName() {
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

    if (text.indexOf('�') != -1) {
        alert("Invalid character detected! Please only use letters, numbers, spaces, and basic punctuation.");
        return;
    }


    let charID = document.getElementById('charID').value;

    charID = charID.replace(/\s/g, '');

    charID = parseInt(charID, 16);

    if (isNaN(charID)) {
        alert("Error in character ID! Please make sure you've entered a proper ID.");
        return;
    }


    for (let i = 0; i < charArr.length; i++) {
        if (charID == charArr[i]) {
            alert("ID already has name changed");
            return;
        }
    }

    charArr.push(charID);

    let jackOffset = 0xD1C8;

    let ganzBase = 0xD538;

    let offset = ((charID - 0x2) * 0x370);

    if (charID == 1) {
        offset = jackOffset;
    } else {
        offset = ganzBase + offset;
    }

    let offset1, offset2, offest3, offest4, offest5, offest6, offest7, offest8;



    if (text.length % 8 != 0) {
        text += "0000";
    }

    let add1, add2, add3, add4, add5, add6, add7, add8;

    for (let i = 0; i < 8; i++) {
        switch (i) {
            case 0:
                let temp = text.substring(0, 8);
                text = text.substring(8);
                add1 = temp.substring(6, 8) + temp.substring(4, 6) + temp.substring(2, 4) + temp.substring(0, 2);
                offset1 = offset.toString(16).toUpperCase();
                offset1 = String("00000000" + offset1).slice(-8);
                break;
            case 1:
                if (text.length == 0) {
                    add2 = "00000000";
                } else {
                    let temp = text.substring(0, 8);
                    text = text.substring(8);
                    add2 = temp.substring(6, 8) + temp.substring(4, 6) + temp.substring(2, 4) + temp.substring(0, 2);
                }
                offset2 = parseInt(offset1, 16) + 0x4;
                offset2 = offset2.toString(16).toUpperCase();
                offset2 = String("00000000" + offset2).slice(-8);
                break;
            case 2:
                if (text.length == 0) {
                    add3 = "00000000";
                } else {
                    let temp = text.substring(0, 8);
                    text = text.substring(8);
                    add3 = temp.substring(6, 8) + temp.substring(4, 6) + temp.substring(2, 4) + temp.substring(0, 2);
                }
                offset3 = parseInt(offset2, 16) + 0x4;
                offset3 = offset3.toString(16).toUpperCase();
                offset3 = String("00000000" + offset3).slice(-8);
                break;
            case 3:
                if (text.length == 0) {
                    add4 = "00000000";
                } else {
                    let temp = text.substring(0, 8);
                    text = text.substring(8);
                    add4 = temp.substring(6, 8) + temp.substring(4, 6) + temp.substring(2, 4) + temp.substring(0, 2);
                }
                offset4 = parseInt(offset3, 16) + 0x4;
                offset4 = offset4.toString(16).toUpperCase();
                offset4 = String("00000000" + offset4).slice(-8);
                break;
            case 4:
                if (text.length == 0) {
                    add5 = "00000000";
                } else {
                    let temp = text.substring(0, 8);
                    text = text.substring(8);
                    add5 = temp.substring(6, 8) + temp.substring(4, 6) + temp.substring(2, 4) + temp.substring(0, 2);
                }
                offset5 = parseInt(offset4, 16) + 0x4;
                offset5 = offset5.toString(16).toUpperCase();
                offset5 = String("00000000" + offset5).slice(-8);
                break;
            case 5:
                if (text.length == 0) {
                    add6 = "00000000";
                } else {
                    let temp = text.substring(0, 8);
                    text = text.substring(8);
                    add6 = temp.substring(6, 8) + temp.substring(4, 6) + temp.substring(2, 4) + temp.substring(0, 2);
                }
                offset6 = parseInt(offset5, 16) + 0x4;
                offset6 = offset6.toString(16).toUpperCase();
                offset6 = String("00000000" + offset6).slice(-8);
                break;
            case 6:
                if (text.length == 0) {
                    add7 = "00000000";
                } else {
                    let temp = text.substring(0, 8);
                    text = text.substring(8);
                    add7 = temp.substring(6, 8) + temp.substring(4, 6) + temp.substring(2, 4) + temp.substring(0, 2);
                }
                offset7 = parseInt(offset6, 16) + 0x4;
                offset7 = offset7.toString(16).toUpperCase();
                offset7 = String("00000000" + offset7).slice(-8);
                break;
            case 7:
                if (text.length == 0) {
                    add8 = "00000000";
                } else {
                    let temp = text.substring(0, 8);
                    text = text.substring(8);
                    add8 = temp.substring(6, 8) + temp.substring(4, 6) + temp.substring(2, 4) + temp.substring(0, 2);
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
    if (firstPass) {
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

function download() {
    if (firstPass) {
        alert("Nothing added.");
        return;
    }
    let a = document.createElement('a');
    a.href = "data:application/octet-stream," + encodeURIComponent(fileD);
    a.download = '47B9B2FD.pnach';
    a.click();
    document.getElementById("results").innerHTML = "Downloaded. List has been cleared.";
    fileD = "";
    charArr = [];
    firstPass = true;
}

function stringEncoder(text) {
    result = "";
    for (let i = 0; i < text.length; i++) {
        if (!(text.charAt(i) in charEncoding)) {
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

function recruitChar(id) {
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
    for (let i = 0; i < text.length; i++) {
        decimal += parseInt(charSpacing[text.charAt(i)]);
        if (isNaN(decimal)) {
            alert("Position Calculator error, unknown spacing for: " + text.charAt(i));
            return false;
        }
        /*console.log(text.charAt(i) + " is " + charSpacing[text.charAt(i)]);*/
    }
    decimal = decimal / 3;
    /*console.log(decimal)*/
    decimal = Math.round(decimal);
    /*console.log(decimal)*/
    decimal = -decimal;
    /*console.log(decimal)*/
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


function lineBuild() {
    let text = document.getElementById('text').value;

    if (document.getElementById("currentMode").value == 2) {
        if (document.getElementById("lineReplace").value == 2) {
            linereplace = document.getElementById("lineToReplace").value - 1
            if (linereplace > lineArr.length) {
                return alert("Invalid line to replace");
            }
            textLineArr[linereplace] = text;
            count = document.getElementById('text').value.length;
            res = changeEndianness2(count.toString(16).padStart(4, '0')) + "000000000000";
            res += stringEncoder(document.getElementById('text').value);
            res += "00"
            lineArr[linereplace] = res;

        } else {
            textLineArr.push(text);
            count = document.getElementById('text').value.length;
            res = changeEndianness2(count.toString(16).padStart(4, '0')) + "000000000000";
            res += stringEncoder(document.getElementById('text').value);
            res += "00"
            lineArr.push(res);
        }




    } else {

        if (document.getElementById("lineReplace").value == 2) {
            linereplace = document.getElementById("lineToReplace").value - 1
            if (linereplace == null) {
                return alert("Invalid line to replace");
            }

            if (isNaN(linereplace)) {
                return alert("Invalid line to replace");
            }

            if (linereplace > lineArr.length) {
                return alert("Invalid line to replace");
            }

        }
        if (text.length < 3) {
            alert("Text must be at least 3 characters long.")
            return;
        }
        let custom = document.getElementById("customName").value;
        if (custom == 2){
            custom = true;
        } else{
            custom = false;
        }
        let bustup = document.getElementById("bustup").checked
        let char = document.getElementById('char').value;
        char = parseInt(char, 16);
        char = char.toString(16).padStart(4, '0').toUpperCase();
        let lineOpt = document.getElementById('lineOpt').value;
        let lineNum;
        if (lineOpt == 1) {
            //lineNum = ++currentVoice;
            autoOff = parseInt(document.getElementById("autoOffset").value);
            if (document.getElementById("lineReplace").value == 2) {
                lineNum = parseInt(document.getElementById("lineToReplace").value) + autoOff;
            } else {
                lineNum = lineArr.length + 1 + autoOff;
            }
            lineNum = lineNum.toString(16).padStart(4, '0').toUpperCase();
        } else {
            lineNum = document.getElementById('lineNum').value;
            lineNum = parseInt(lineNum);
            lineNum = lineNum.toString(16).padStart(4, '0').toUpperCase();
        }

        result = "";
        let textArr = text.split(/\n/);
        if (textArr.length > 3) {
            return alert("Too many line breaks!");
        }
        for (let i = 0; i < textArr.length; i++) {
            for (let x = 0; x < textArr[i].length; x++) {
                if (!(textArr[i].charAt(x) in charEncoding)) {
                    return alert(textArr[i].charAt(x) + " is an invalid character!");
                }
            }
            if (!(posCalculator(textArr[i]))) {
                return;
            }
        }
        if (document.getElementById("lineReplace").value == 2) {
            linetoreplace = document.getElementById("lineToReplace").value - 1;
            textLineArr[linetoreplace] = text;
        } else {
            textLineArr.push(text);
        }

        if (textArr.length == 1) {
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
            result += "0E 4E 01 00 ";
            if (custom){
                result += "0200";
            } else {
                result += "0100";
            }
            result += "76 00";
            if (custom){
                cusLine = parseInt(document.getElementById("customNamelineNum").value) - 1;
                cusLine = changeEndianness2(cusLine.toString(16).padStart(4, '0').toUpperCase());
                result += cusLine;
            } else {
                result += " 00 00"
            }
            result += stringEncoder(textArr[0]);
            result += "0F 20 78 00 03 00 00 00";
            result = result.replace(/\s/g, '');
            if (document.getElementById("lineReplace").value == 2) {
                linetoreplace = document.getElementById("lineToReplace").value - 1;
                lineArr[linetoreplace] = result;
            } else {
                lineArr.push(result);
            }

            //document.getElementById("results").innerHTML += "\n\n\"" + textArr[0] + "\"\n\nhas been added.";
        } else if (textArr.length == 2) {
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
            result += "0E 4E 01 00 ";
            if (custom){
                result += "0200";
            } else {
                result += "0100";
            }
            result += "60 00";
            if (custom){
                cusLine = parseInt(document.getElementById("customNamelineNum").value) - 1;
                cusLine = changeEndianness2(cusLine.toString(16).padStart(4, '0').toUpperCase());
                result += cusLine;
            } else {
                result += " 00 00"
            }
            result += stringEncoder(textArr[0]);
            result += "0A 00 04 20";
            result += posCalculator(textArr[1]);
            result += "D0 00";
            result += stringEncoder(textArr[1]);
            result += "0F 20 78 00 03 00 00 00";
            result = result.replace(/\s/g, '');
            if (document.getElementById("lineReplace").value == 2) {
                linetoreplace = document.getElementById("lineToReplace").value - 1;
                lineArr[linetoreplace] = result;
            } else {
                lineArr.push(result);
            }
            //document.getElementById("results").innerHTML += "\n\n\"" + textArr[0] + "\n" + textArr[1] + "\"\n\nhas been added.";
        } else if (textArr.length == 3) {
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
            result += "0E 4E 01 00 ";
            if (custom){
                result += "0200";
            } else {
                result += "0100";
            }
            result += "40 00";
            if (custom){
                cusLine = parseInt(document.getElementById("customNamelineNum").value) - 1;
                cusLine = changeEndianness2(cusLine.toString(16).padStart(4, '0').toUpperCase());
                result += cusLine;
            } else {
                result += " 00 00"
            }
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
            result = result.replace(/\s/g, '');
            if (document.getElementById("lineReplace").value == 2) {
                linetoreplace = document.getElementById("lineToReplace").value - 1;
                lineArr[linetoreplace] = result;
            } else {
                lineArr.push(result);
            }
            //document.getElementById("results").innerHTML += "\n\n\"" + textArr[0] + "\n" + textArr[1] + "\n" + textArr[2] + "\"\n\nhas been added.";
        } else {
            return alert("Too many line breaks, three max per line.");
        }

    }
    //document.getElementById("results").innerHTML = ""
    allLine = buildRMF(lineArr);
    document.getElementById("results").innerHTML = linesProcess(allLine);
    /*for (let i = 0; i < textLineArr.length; i++) {
        document.getElementById("results").innerHTML += "<font color=red>Line " + (i + 1) + ":</font>\n";
        document.getElementById("results").innerHTML += textLineArr[i];
        document.getElementById("results").innerHTML += "\n\n"
    }*/

}

function download2() {
    if (lineArr.length == 0) {
        alert("Nothing added.");
        return;
    }
    if (document.getElementById("null").checked) {
        lineArr.unshift("0000000001000000010000000F25000000000E200100010002206A695F800221000000000320330B661605010710000304200000BE000E4E01000100760000000E24010002010000");
    }
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
    navigator.clipboard.writeText(output)
        .then(() => {
            if (document.getElementById("null").checked) {
                lineArr.shift();
            }
            pointerArr = [];
            alert("Data copied to clipboard.");
        })
        .catch(err => {
            if (document.getElementById("null").checked) {
                lineArr.shift();
            }
            pointerArr = [];
            console.log('Error: ', err);
        });
    //document.getElementById("results").innerHTML = output;
}

function buildRMF(rmfArrrrr){
    if (rmfArrrrr.length == 0) {
        alert("Nothing added.");
        return;
    }
    let curRMF = rmfArrrrr.slice();
    let totalSize = 0;
    let currentLength = 0;
    let baseLength = 48;
    pointerArr = [];
    baseLength += 8 * curRMF.length;
    for (let i = 0; i < curRMF.length; i++) {
        curRMF[i] = curRMF[i].replace(/\s/g, '');
        if (i == 0) {
            while (((curRMF[i].length / 2) % 4) != 0) {
                curRMF[i] += "00";
            }
            currentLength = baseLength / 2;
            totalSize += currentLength + (curRMF[0].length / 2);
            let temp = currentLength.toString(16).padStart(8, '0').toUpperCase()
            temp = changeEndianness(temp);
            pointerArr.push(temp);
        } else {
            while (((curRMF[i].length / 2) % 4) != 0) {
                curRMF[i] += "00";
            }
            currentLength += (curRMF[i - 1].length / 2);
            totalSize += curRMF[i].length / 2;
            let temp = currentLength.toString(16).padStart(8, '0').toUpperCase();
            temp = changeEndianness(temp);
            pointerArr.push(temp);
        }
    }
    totalSize = totalSize.toString(16).padStart(8, '0').toUpperCase();
    totalSize = changeEndianness(totalSize);
    let lineCount = curRMF.length;
    lineCount = lineCount.toString(16).padStart(8, '0').toUpperCase();
    lineCount = changeEndianness(lineCount);
    let output = "52 4D 46 31 CE 00 00 00 00 00 00 00";
    output += totalSize;
    output += lineCount;
    output += totalSize;
    for (let i = 0; i < pointerArr.length; i++) {
        output += pointerArr[i];
    }
    for (let i = 0; i < curRMF.length; i++) {
        output += curRMF[i];
    }
    output = output.replace(/\s/g, '');
    return output;
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

    rmfSize = parseInt(changeEndianness2(rmf.substring(24, 32)), 16);
    lines = parseInt(changeEndianness2(rmf.substring(32, 40)), 16);

    if (lines <= 0) {
        return alert("RMF is empty!");
    }

    for (let i = 0; i < lines; i++) {
        rmf1Pointers.push(parseInt(changeEndianness2(rmf.substring(0x30 + (i * 8), 0x38 + (i * 8))), 16));
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

function loadRMF() {
    //load = confirm("This will override any lines made. Continue?");
    if (document.getElementById("loadRMF").checked) {
        navigator.clipboard.readText()
            .then(text => {
                lineArr = rmf1splitter(text);
                textLineArr = [];
                for (let i = 0; i < lineArr.length; i++) {
                    textLineArr.push(stringDecoder2(lineArr[i]));
                }
                document.getElementById("results").innerHTML = ""
/*                for (let i = 0; i < textLineArr.length; i++) {
                    document.getElementById("results").innerHTML += "<font color=red>Line " + (i + 1) + ":</font>\n";
                    document.getElementById("results").innerHTML += textLineArr[i];
                    document.getElementById("results").innerHTML += "\n\n"
                }*/
                document.getElementById("results").innerHTML = linesProcess(text);
            })
            .catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            });
    } else {
        return alert("Confirm loading by ticking the checkbox beside the button. Loading RMF will override any lines you have already made.")
    }
}

function linesProcess(text) {
    rmfArray = rmf1splitter(text);
    customName = [];
    result = ""
    for (let i = 0; i < rmfArray.length; i++){
        if (rmfArray[i].includes('0E4E')){
            customName.push("");
        } else {
            customName.push(stringDecoder2(rmfArray[i].substring(0x8*2)));
        }
    }

    for (let i = 0; i < rmfArray.length; i++) {
        result += "<font color =red>Line " + (i+1) + ":</font>\n\n";

        if (rmfArray[i].includes('0E4E')){
            textAmt = parseInt(changeEndianness2(rmfArray[i].substring(0, 8)), 16);
            charAmt = parseInt(changeEndianness2(rmfArray[i].substring(8, 16)), 16);
            rmfArray[i] = rmfArray[i].substring(16);
            character = [0]
            for (let j = 0; j < charAmt; j++) {
                character.push(parseInt(changeEndianness2(rmfArray[i].substring(0, 4)), 16));
                rmfArray[i] = rmfArray[i].substring(8);
            }

            //rmfArray[i] = rmfArray[i].substring(0x54);

            while(rmfArray[i].length > 1){
                while(rmfArray[i].substring(0, 4) != '0E4E'){
                    rmfArray[i] = rmfArray[i].substring(0x2);
                }

                rmfArray[i] = rmfArray[i].substring(0x4);

                charSpeakId = character[parseInt(rmfArray[i].substring(0, 2))];

                charCheck = characterIds[character[parseInt(rmfArray[i].substring(0, 2))]];

                if (charCheck != null) {
                    charSpeak = charCheck;
                } else {
                    charSpeak = "";
                }

                //charSpeak = characterIds[character[parseInt(rmfArray[i].substring(0,2))]];

                rmfArray[i] = rmfArray[i].substring(0x4);

                nameMode = parseInt(changeEndianness2(rmfArray[i].substring(0, 4)), 16);

                rmfArray[i] = rmfArray[i].substring(0x4);

                lineAmt = rmfArray[i].substring(0, 2);
                rmfArray[i] = rmfArray[i].substring(0x4);

                nameCheck = parseInt(changeEndianness2(rmfArray[i].substring(0, 4)), 16);

                rmfArray[i] = rmfArray[i].substring(0x4);

                //rmfArray[i] = rmfArray[i].substring(0, rmfArray[i].length - 10)

                if (nameMode == 1 && charSpeakId != 0) {
                    speakName = charSpeak + ":\n\n";
                    //speakName = speakName.toUpperCase();
                    result += "<font color=blue>" + speakName + "</font>";
                } else if (nameMode == 2 && charSpeakId != 0){
                    speakName = "(" + charSpeak + ") " + customName[nameCheck] + ":\n\n";
                    //speakName = speakName.toUpperCase();
                    result += "<font color=blue>" + speakName + "</font>";
                } else if ((nameMode == 5 && charSpeakId != 0) || (nameMode == 6 && charSpeakId != 0)){
                    speakName = "(" + charSpeak + ") ???:\n\n";
                    //speakName = speakName.toUpperCase();
                    result += "<font color=blue>" + speakName + "</font>";
                }

                currentText = '';

                while(rmfArray[i].substring(0, 2) != '0F' || rmfArray[i].substring(0,6) == '0F1301'){
                    //Unknown??
                    if(rmfArray[i].substring(0,8) == '0E240100'){
                        rmfArray[i] = rmfArray[i].substring(8);
                    } else if(rmfArray[i].substring(0,8) == '0E240200'){
                        rmfArray[i] = rmfArray[i].substring(12);
                    } else if(rmfArray[i].substring(0,4) == '0610'){
                        rmfArray[i] = rmfArray[i].substring(8);
                    } else if(rmfArray[i].substring(0,4) == '0A00'){
                        currentText += rmfArray[i].substring(0,4);
                        rmfArray[i] = rmfArray[i].substring(16);
                    } else {
                        currentText += rmfArray[i].substring(0,2);
                        rmfArray[i] = rmfArray[i].substring(0x2); 
                    }
                    //console.log(rmfArray[i].substring(0,6))
                    // if(rmfArray[i].substring(0,6) == '0F1301'){
                    //     rmfArray[i] = rmfArray[i].substring(6);
                    //     console.log('here');
                    // }
                    if(rmfArray[i].length == 0){
                        break;
                    }

                }
                tempRes = stringDecoder2(currentText);

                result += tempRes.trim();

                result += "\n\n";

                if(rmfArray[i].length <= 0x15*2){
                    rmfArray[i] = "";
                }

                while(rmfArray[i].substring(0, 4) != '0E4E'){
                    rmfArray[i] = rmfArray[i].substring(0x2);
                    if(rmfArray[i].length == 0){
                        break;
                    }
                }

            }
            result += "\n";
            
            //customName.push("");
        } else {
            result += "<font color=olive>"+stringDecoder2(rmfArray[i].substring(0x8*2));
            result += "</font>\n\n";
            //customName.push(stringDecoder(rmfArray[i].substring(0x8*2)));
        }
        

    }
    return result;
}

function stringDecoder2(text) {
    res = "";
    text = text.replace(/\s/g, '');
    while (text.length > 0) {
        temp = text.substring(0, 4);
        text = text.substring(4);
        if (temp != "") {
            if (temp == "0F20") {
                res += "\n\n";
            } else {
                temp = parseInt(changeEndianness2(temp), 16);
                //temp > 0 && temp < 457 && 
                if (temp in charDecoding) {
                    curchar = charDecoding[temp];
                    if (curchar != null) {
                        res += curchar;
                        //result += charDecoding[temp];
                    }
                } else if (temp == 32784){
                    res += charDecoding[temp];
                }

            }
        }
    }
    return res;
}

function stringDecoder(text) {
    result = "";
    text = text.replace(/\s/g, '');
    while (text.length > 0) {
        temp = text.substring(0, 4);
        text = text.substring(4);
        if (document.getElementById("ptbr").checked) {
            if (temp != "") {
                if (temp == "0F20") {
                    result += "\n\n";
                } else {
                    temp = parseInt(changeEndianness2(temp), 16);
                    if (document.getElementById("enbjp").checked) {
                        if (temp > 0 && temp < 457 && temp in charDecoding2) {
                            result += charDecoding2[temp];
                        }
                    } else {
                        if (temp > 0 && temp < 177 && temp in charDecoding3) {
                            result += charDecoding3[temp];
                        }
                    }

                }


            }
        } else if (temp != "") {
            if (temp == "0F20") {
                result += "\n\n";
            } else {
                temp = parseInt(changeEndianness2(temp), 16);
                if (document.getElementById("enbjp").checked) {
                    if (temp > 0 && temp < 457 && temp in charDecoding2) {
                        result += charDecoding2[temp];
                    }
                } else {
                    if (temp > 0 && temp < 177 && temp in charDecoding) {
                        curchar = charDecoding[temp];
                        if (curchar != null) {
                            result += curchar;
                        }
                        //result += charDecoding[temp];
                    }
                }

            }
        }
        //  else if (temp != "") {
        //     switch (temp) {
        //         case "0100":
        //             result += " ";
        //             break;
        //         case "6300":
        //             result += "A";
        //             break;
        //         case "6400":
        //             result += "B";
        //             break;
        //         case "6500":
        //             result += "C";
        //             break;
        //         case "6600":
        //             result += "D";
        //             break;
        //         case "6700":
        //             result += "E";
        //             break;
        //         case "6800":
        //             result += "F";
        //             break;
        //         case "6900":
        //             result += "G";
        //             break;
        //         case "6A00":
        //             result += "H";
        //             break;
        //         case "6B00":
        //             result += "I";
        //             break;
        //         case "6C00":
        //             result += "J";
        //             break;
        //         case "6D00":
        //             result += "K";
        //             break;
        //         case "6E00":
        //             result += "L";
        //             break;
        //         case "6F00":
        //             result += "M";
        //             break;
        //         case "7000":
        //             result += "N";
        //             break;
        //         case "7100":
        //             result += "O";
        //             break;
        //         case "7200":
        //             result += "P";
        //             break;
        //         case "7300":
        //             result += "Q";
        //             break;
        //         case "7400":
        //             result += "R";
        //             break;
        //         case "7500":
        //             result += "S";
        //             break;
        //         case "7600":
        //             result += "T";
        //             break;
        //         case "7700":
        //             result += "U";
        //             break;
        //         case "7800":
        //             result += "V";
        //             break;
        //         case "7900":
        //             result += "W";
        //             break;
        //         case "7A00":
        //             result += "X";
        //             break;
        //         case "7B00":
        //             result += "Y";
        //             break;
        //         case "7C00":
        //             result += "Z";
        //             break;
        //         case "7D00":
        //             result += "a";
        //             break;
        //         case "7E00":
        //             result += "b";
        //             break;
        //         case "7F00":
        //             result += "c";
        //             break;
        //         case "8000":
        //             result += "d";
        //             break;
        //         case "8100":
        //             result += "e";
        //             break;
        //         case "8200":
        //             result += "f";
        //             break;
        //         case "8300":
        //             result += "g";
        //             break;
        //         case "8400":
        //             result += "h";
        //             break;
        //         case "8500":
        //             result += "i";
        //             break;
        //         case "8600":
        //             result += "j";
        //             break;
        //         case "8700":
        //             result += "k";
        //             break;
        //         case "8800":
        //             result += "l";
        //             break;
        //         case "8900":
        //             result += "m";
        //             break;
        //         case "8A00":
        //             result += "n";
        //             break;
        //         case "8B00":
        //             result += "o";
        //             break;
        //         case "8C00":
        //             result += "p";
        //             break;
        //         case "8D00":
        //             result += "q";
        //             break;
        //         case "8E00":
        //             result += "r";
        //             break;
        //         case "8F00":
        //             result += "s";
        //             break;
        //         case "9000":
        //             result += "t";
        //             break;
        //         case "9100":
        //             result += "u";
        //             break;
        //         case "9200":
        //             result += "v";
        //             break;
        //         case "9300":
        //             result += "w";
        //             break;
        //         case "9400":
        //             result += "x";
        //             break;
        //         case "9500":
        //             result += "y";
        //             break;
        //         case "9600":
        //             result += "z";
        //             break;
        //         case "6200":
        //             result += "9";
        //             break;
        //         case "6100":
        //             result += "8";
        //             break;
        //         case "6000":
        //             result += "7";
        //             break;
        //         case "5F00":
        //             result += "6";
        //             break;
        //         case "5E00":
        //             result += "5";
        //             break;
        //         case "5D00":
        //             result += "4";
        //             break;
        //         case "5C00":
        //             result += "3";
        //             break;
        //         case "5B00":
        //             result += "2";
        //             break;
        //         case "5A00":
        //             result += "1";
        //             break;
        //         case "5900":
        //             result += "0";
        //             break;
        //             /*case "1C00":
        //              result += "/";
        //              break;
        //             case "1A00":
        //              result += "々";
        //              break;*/
        //         case "1B00":
        //             result += "ー";
        //             break;
        //         case "1D00":
        //             result += "\\";
        //             break;
        //         case "1F00":
        //             result += "...";
        //             break;
        //         case "1800":
        //             result += "!";
        //             break;
        //         case "1700":
        //             result += "?";
        //             break;
        //             /*case "1900":
        //              result += "_";
        //              break;*/
        //         case "1300":
        //             result += ".";
        //             break;
        //         case "1200":
        //             result += ",";
        //             break;
        //             /*case "1000":
        //              result += "、";
        //              break;
        //             case "1100":
        //              result += "。";
        //              break;*/
        //             /*case "1400":
        //              result += "・";
        //              break;*/
        //         case "1500":
        //             result += ":";
        //             break;
        //             /*case "1600":
        //              result += ";";
        //              break;*/
        //             /*case "1E00":
        //              result += "~";
        //              break;*/
        //         case "2000":
        //             result += "‘";
        //             break;
        //         case "2100":
        //             result += "’";
        //             break;
        //         case "2200":
        //             result += "“";
        //             break;
        //         case "2300":
        //             result += "”";
        //             break;
        //         case "2400":
        //             result += "(";
        //             break;
        //         case "2500":
        //             result += ")";
        //             break;
        //         case "2800":
        //             result += "[";
        //             break;
        //         case "2900":
        //             result += "]";
        //             break;
        //         case "3000":
        //             result += "「";
        //             break;
        //         case "3100":
        //             result += "」";
        //             break;
        //         case "3200":
        //             result += "『";
        //             break;
        //         case "3300":
        //             result += "』";
        //             break;
        //         case "3400":
        //             result += "【";
        //             break;
        //         case "3500":
        //             result += "】";
        //             break;
        //         case "3600":
        //             result += "+";
        //             break;
        //         case "3700":
        //             result += "-";
        //             break;
        //         case "3800":
        //             result += "±";
        //             break;
        //         case "3900":
        //             result += "×";
        //             break;
        //         case "3A00":
        //             result += "÷";
        //             break;
        //         case "3B00":
        //             result += "=";
        //             break;
        //         case "3C00":
        //             result += "≠";
        //             break;
        //         case "3D00":
        //             result += "<";
        //             break;
        //         case "3E00":
        //             result += ">";
        //             break;
        //         case "3F00":
        //             result += "≤";
        //             break;
        //         case "4000":
        //             result += "≥";
        //             break;
        //         case "4100":
        //             result += "￥";
        //             break;
        //         case "4200":
        //             result += "$";
        //             break;
        //         case "4300":
        //             result += "%";
        //             break;
        //         case "4400":
        //             result += "#";
        //             break;
        //         case "4500":
        //             result += "&";
        //             break;
        //         case "4600":
        //             result += "*";
        //             break;
        //         case "4700":
        //             result += "@";
        //             break;
        //         case "4800":
        //             result += "☆";
        //             break;
        //         case "4900":
        //             result += "★";
        //             break;
        //         case "4A00":
        //             result += "○";
        //             break;
        //         case "4B00":
        //             result += "●";
        //             break;
        //         case "4C00":
        //             result += "◎";
        //             break;
        //         case "4D00":
        //             result += "◇";
        //             break;
        //         case "4E00":
        //             result += "◆";
        //             break;
        //         case "4F00":
        //             result += "□";
        //             break;
        //         case "5000":
        //             result += "⬛";
        //             break;
        //         case "5100":
        //             result += "△";
        //             break;
        //         case "5200":
        //             result += "▲";
        //             break;
        //         case "5300":
        //             result += "▽";
        //             break;
        //         case "5400":
        //             result += "▼";
        //             break;
        //         case "5500":
        //             result += "→";
        //             break;
        //         case "5600":
        //             result += "←";
        //             break;
        //         case "5700":
        //             result += "↑";
        //             break;
        //         case "5800":
        //             result += "↓";
        //             break;
        //         case "0F20":
        //             result += "\n\n";
        //             break;
        //         case "0A00":
        //             result += "\n";
        //             break;
        //         default:
        //             //result += "�";
        //     }
        // } else {
        //     break;
        // }
    }
    return result;
}

function copyClip(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Data copied to clipboard.");
        })
        .catch(err => {
            console.log('Error: ', err);
        });
}

function splitRMF(){
    let rmfs = document.getElementById('text').value;
    rmfs = rmfs.replace(/\s/g, '');
    let curRMF = "";
    let curcount = 0;
    while(rmfs.length > 0){
        curcount++;
        curRMF += '<font color="#2ECC71">' + "FILE " + curcount + "</font>\n\n"; 
        let curlen = parseInt(changeEndianness2(rmfs.substring(24, 32)), 16) * 2;
        let current = rmfs.substring(0, curlen);
        curRMF += linesProcess(current);
        rmfs = rmfs.substring(curlen);
        curRMF += "\n\n";
    }
    document.getElementById("results").innerHTML = curRMF;
}

function initialiseCharacter() {
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
    "イ": "27",
    "ゥ": "26",
    "ウ": "28",
    "ェ": "29",
    "エ": "30",
    "ォ": "29",
    "オ": "30",
    "カ": "28",
    "ガ": "30",
    "キ": "30",
    "ギ": "30",
    "ク": "28",
    "グ": "30",
    "ケ": "30",
    "ゲ": "30",
    "コ": "27",
    "ゴ": "30",
    "サ": "30",
    "ザ": "30",
    "シ": "29",
    "ジ": "30",
    "ス": "30",
    "ズ": "30",
    "セ": "30",
    "ゼ": "30",
    "ソ": "28",
    "ゾ": "30",
    "タ": "28",
    "ダ": "30",
    "チ": "30",
    "ヂ": "30",
    "ッ": "27",
    "ツ": "28",
    "ヅ": "30",
    "テ": "30",
    "デ": "30",
    "ト": "29",
    "ド": "29",
    "ナ": "30",
    "ニ": "30",
    "ヌ": "29",
    "ネ": "30",
    "ノ": "25",
    "ハ": "30",
    "バ": "30",
    "パ": "30",
    "ヒ": "29",
    "ビ": "30",
    "ピ": "29",
    "フ": "29",
    "ブ": "30",
    "プ": "30",
    "ヘ": "30",
    "ベ": "30",
    "ペ": "30",
    "ホ": "30",
    "ボ": "30",
    "ポ": "30",
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
    "ヮ": "27",
    "ワ": "28",
    "ヰ": "30",
    "ヱ": "30",
    "ヲ": "28",
    "ン": "30",
    "ヴ": "30",
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
    "死": "30",
    "Ã": "1A",
    "Á": "1A",
    "À": "1A",
    "Â": "1A",
    "É": "17",
    "Ê": "17",
    "Í": "0A",
    "Õ": "1B",
    "Ó": "1B",
    "Ò": "1B",
    "Ô": "1B",
    "Ú": "18",
    "Ç": "17",
    "ã": "16",
    "á": "16",
    "à": "16",
    "â": "16",
    "é": "14",
    "ê": "14",
    "í": "0B",
    "õ": "16",
    "ó": "16",
    "ò": "16",
    "ô": "16",
    "ú": "14",
    "ç": "13"
}



let charEncoding = {
    " ": 1,
    "\n": 10,
    "￥": 49180,
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
    "ー": 27,
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
    "イ": 237,
    "ゥ": 238,
    "ウ": 239,
    "ェ": 240,
    "エ": 241,
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
    "ヮ": 327,
    "ワ": 328,
    "ヰ": 329,
    "ヱ": 330,
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
    "死": 456,
    "Ã": 151,
    "Á": 152,
    "À": 153,
    "Â": 154,
    "É": 155,
    "Ê": 156,
    "Í": 157,
    "Õ": 158,
    "Ó": 159,
    "Ò": 160,
    "Ô": 161,
    "Ú": 162,
    "Ç": 163,
    "ã": 164,
    "á": 165,
    "à": 166,
    "â": 167,
    "é": 168,
    "ê": 169,
    "í": 170,
    "õ": 171,
    "ó": 172,
    "ò": 173,
    "ô": 174,
    "ú": 175,
    "ç": 176
}


let charDecoding = {
    "32784": "—",
/*    "32816": "様",
    "32798": "嬢",
    "16481": "騎",
    "16428": "士",
    "32802": "団",
    "32805": "程",
    "32807": "度",
    "32785": "覚",
    "32792": "悟",
    "32796": "持",
	"32811": "筈",
	"32804": "長",
	"16520": "死",
	"16491": "地",
	"32818": "立",
	"16469": "軽",
	"16482": "見",
	"16483": "習",
	"32786": "監",
	"32809": "督",
	"32813": "不",
	"32793": "行",
	"32810": "届",
	"32817": "理",
	"32814": "由",
	"32784": "解",
	"32790": "雇",
	"32799": "進",
	"32789": "言",
	"32794": "今",
	"32791": "後",
	"32787": "含",
	"32801": "誰",
	"32800": "妥",
	"32808": "当",
	"32788": "決",
	"32795": "策",
	"32812": "判",
	"32803": "断",
	"32815": "預",
	"32797": "時",
	"32806": "点",*/
    "1": " ",
    "10": "\n",
    //"16": "､",
    //"17": "｡",
    "18": ",",
    "19": ".",
    //"20": "･",
    "21": ":",
    "22": ";",
    "23": "?",
    "24": "!",
    //"25": "_",
    //"26": "々",
    "27": "ー",
    "28": "/",
    //"29": "＼",
    "30": "~",
    //"31": "…",
    "32": "‘",
    "33": "'",
    "34": "“",
    "35": "\"",
    //"36": "(",
    //"37": ")",
    //"38": "〔",
    //"39": "〕",
    //"40": "[",
    //"41": "]",
    //"42": "{",
    //"43": "}",
    //"44": "〈",
    //"45": "〉",
    // "46": "《",
    // "47": "》",
    // "48": "｢",
    // "49": "｣",
    // "50": "『",
    // "51": "』",
    // "52": "【",
    // "53": "】",
    "54": "+",
    "55": "-",
    //"56": "±",
    //"57": "×",
    //"58": "÷",
    //"60": "≠",
    // "61": "<",
    // "62": ">",
    // "63": "≦",
    // "64": "≧",
    "65": "\\",
    "66": "$",
    "67": "%",
    "69": "&",
    "70": "*",
    "71": "@",
    // "73": "★",
    // "74": "○",
    // "75": "●",
    // "76": "◎",
    // "77": "◇",
    // "78": "◆",
    // "79": "□",
    // "80": "■",
    // "81": "△",
    // "82": "▲",
    // "83": "▽",
    // "84": "▼",
    "85": "→",
    "86": "←",
    "87": "↑",
    "88": "↓",
    "89": "0",
    "90": "1",
    "91": "2",
    "92": "3",
    "93": "4",
    "94": "5",
    "95": "6",
    "96": "7",
    "97": "8",
    "98": "9",
    "99": "A",
    "100": "B",
    "101": "C",
    "102": "D",
    "103": "E",
    "104": "F",
    "105": "G",
    "106": "H",
    "107": "I",
    "108": "J",
    "109": "K",
    "110": "L",
    "111": "M",
    "112": "N",
    "113": "O",
    "114": "P",
    "115": "Q",
    "116": "R",
    "117": "S",
    "118": "T",
    "119": "U",
    "120": "V",
    "121": "W",
    "122": "X",
    "123": "Y",
    "124": "Z",
    "125": "a",
    "126": "b",
    "127": "c",
    "128": "d",
    "129": "e",
    "130": "f",
    "131": "g",
    "132": "h",
    "133": "i",
    "134": "j",
    "135": "k",
    "136": "l",
    "137": "m",
    "138": "n",
    "139": "o",
    "140": "p",
    "141": "q",
    "142": "r",
    "143": "s",
    "144": "t",
    "145": "u",
    "146": "v",
    "147": "w",
    "148": "x",
    "149": "y",
    "150": "z",
    "151": "ぁ",
    "152": "あ",
    "153": "ぃ",
    "154": "い",
    "155": "ぅ",
    "156": "う",
    "157": "ぇ",
    "158": "え",
    "159": "ぉ",
    "160": "お",
    "161": "か",
    "162": "が",
    "163": "き",
    "164": "ぎ",
    "165": "く",
    "166": "ぐ",
    "167": "け",
    "168": "げ",
    "169": "こ",
    "170": "ご",
    "171": "さ",
    "172": "ざ",
    "173": "し",
    "174": "じ",
    "175": "す",
    "176": "ず",
    "177": "せ",
    "178": "ぜ",
    "179": "そ",
    "180": "ぞ",
    "181": "た",
    "182": "だ",
    "183": "ち",
    "184": "ぢ",
    "185": "っ",
    "186": "つ",
    "187": "づ",
    "188": "て",
    "189": "で",
    "190": "と",
    "191": "ど",
    "192": "な",
    "193": "に",
    "194": "ぬ",
    "195": "ね",
    "196": "の",
    "197": "は",
    "198": "ば",
    "199": "ぱ",
    "200": "ひ",
    "201": "び",
    "202": "ぴ",
    "203": "ふ",
    "204": "ぶ",
    "205": "ぷ",
    "206": "へ",
    "207": "べ",
    "208": "ぺ",
    "209": "ほ",
    "210": "ぼ",
    "211": "ぽ",
    "212": "ま",
    "213": "み",
    "214": "む",
    "215": "め",
    "216": "も",
    "217": "ゃ",
    "218": "や",
    "219": "ゅ",
    "220": "ゆ",
    "221": "ょ",
    "222": "よ",
    "223": "ら",
    "224": "り",
    "225": "る",
    "226": "れ",
    "227": "ろ",
    "228": "ゎ",
    "229": "わ",
    "230": "ゐ",
    "231": "ゑ",
    "232": "を",
    "233": "ん",
    "234": "ァ",
    "235": "ア",
    "236": "ィ",
    "237": "イ",
    "238": "ゥ",
    "239": "ウ",
    "240": "ェ",
    "241": "エ",
    "242": "ォ",
    "243": "オ",
    "244": "カ",
    "245": "ガ",
    "246": "キ",
    "247": "ギ",
    "248": "ク",
    "249": "グ",
    "250": "ケ",
    "251": "ゲ",
    "252": "コ",
    "253": "ゴ",
    "254": "サ",
    "255": "ザ",
    "272": "シ",
    "273": "ジ",
    "274": "ス",
    "275": "ズ",
    "276": "セ",
    "277": "ゼ",
    "278": "ソ",
    "279": "ゾ",
    "280": "タ",
    "281": "ダ",
    "282": "チ",
    "283": "ヂ",
    "284": "ッ",
    "285": "ツ",
    "286": "ヅ",
    "287": "テ",
    "288": "デ",
    "289": "ト",
    "290": "ド",
    "291": "ナ",
    "292": "ニ",
    "293": "ヌ",
    "294": "ネ",
    "295": "ノ",
    "296": "ハ",
    "297": "バ",
    "298": "パ",
    "299": "ヒ",
    "300": "ビ",
    "301": "ピ",
    "302": "フ",
    "303": "ブ",
    "304": "プ",
    "305": "ヘ",
    "306": "ベ",
    "307": "ペ",
    "308": "ホ",
    "309": "ボ",
    "310": "ポ",
    "311": "マ",
    "312": "ミ",
    "313": "ム",
    "314": "メ",
    "315": "モ",
    "316": "ャ",
    "317": "ヤ",
    "318": "ュ",
    "319": "ユ",
    "320": "ョ",
    "321": "ヨ",
    "322": "ラ",
    "323": "リ",
    "324": "ル",
    "325": "レ",
    "326": "ロ",
    "327": "ヮ",
    "328": "ワ",
    "329": "ヰ",
    "330": "ヱ",
    "331": "ヲ",
    "332": "ン",
    "333": "ヴ",
    "334": "ヵ",
    "335": "ヶ",
    "336": "緑",
    "337": "依",
    "338": "頼",
    "339": "書",
    "340": "村",
    "341": "雨",
    "342": "折",
    "343": "剣",
    "344": "鉄",
    "345": "槌",
    "346": "隠",
    "347": "者",
    "348": "像",
    "349": "用",
    "350": "状",
    "351": "態",
    "352": "耐",
    "353": "性",
    "354": "戦",
    "355": "闘",
    "356": "心",
    "357": "得",
    "358": "人",
    "359": "好",
    "360": "武",
    "361": "器",
    "362": "工",
    "363": "房",
    "364": "士",
    "365": "魔",
    "366": "術",
    "367": "師",
    "368": "僧",
    "369": "侶",
    "370": "盗",
    "371": "賊",
    "372": "生",
    "373": "物",
    "374": "図",
    "375": "鑑",
    "376": "伝",
    "377": "本",
    "378": "歴",
    "379": "史",
    "380": "上",
    "381": "下",
    "382": "激",
    "383": "大",
    "384": "蛇",
    "385": "壁",
    "386": "開",
    "387": "放",
    "388": "奮",
    "389": "起",
    "390": "燃",
    "391": "焼",
    "392": "読",
    "393": "込",
    "394": "保",
    "395": "存",
    "396": "差",
    "397": "空",
    "398": "他",
    "399": "容",
    "400": "量",
    "401": "出",
    "402": "入",
    "403": "番",
    "404": "円",
    "405": "軽",
    "406": "重",
    "407": "装",
    "408": "衛",
    "409": "兵",
    "410": "世",
    "411": "Ⅰ",
    "412": "Ⅱ",
    "413": "号",
    "414": "☆",
    "415": "女",
    "416": "男",
    "417": "騎",
    "418": "見",
    "419": "習",
    "420": "黒",
    "421": "部",
    "422": "木",
    "423": "野",
    "424": "火",
    "425": "事",
    "426": "水",
    "427": "地",
    "428": "風",
    "429": "無",
    "430": "毒",
    "431": "凍",
    "432": "結",
    "433": "金",
    "434": "縛",
    "435": "呪",
    "436": "混",
    "437": "乱",
    "438": "近",
    "439": "眼",
    "440": "回",
    "441": "復",
    "442": "吸",
    "443": "収",
    "444": "炎",
    "445": "石",
    "446": "化",
    "447": "♂",
    "448": "♀",
    "449": "食",
    "450": "型",
    "451": "球",
    "452": "雷",
    "453": "獣",
    "454": "神",
    "455": "殿",
    "456": "死"
}

let charDecoding2 = {
    "1": " ",
    "10": "\n",
    "3872": "\n\n",
    "16": "､",
    "17": "｡",
    "18": ",",
    "19": ".",
    "20": "･",
    "21": ":",
    "22": ";",
    "23": "?",
    "24": "!",
    "25": "_",
    "26": "々",
    "27": "ー",
    "28": "/",
    "29": "＼",
    "30": "~",
    "31": "…",
    "32": "‘",
    "33": "'",
    "34": "“",
    "35": "\"",
    "36": "(",
    "37": ")",
    "38": "〔",
    "39": "〕",
    "40": "[",
    "41": "]",
    "42": "{",
    "43": "}",
    "44": "〈",
    "45": "〉",
    "46": "《",
    "47": "》",
    "48": "｢",
    "49": "｣",
    "50": "『",
    "51": "』",
    "52": "【",
    "53": "】",
    "54": "+",
    "55": "-",
    "56": "±",
    "57": "×",
    "58": "÷",
    //"60": "≠",
    "61": "<",
    "62": ">",
    "63": "≦",
    "64": "≧",
    "65": "\\",
    "66": "$",
    "67": "%",
    "69": "&",
    "70": "*",
    "71": "@",
    "73": "★",
    "74": "○",
    "75": "●",
    "76": "◎",
    "77": "◇",
    "78": "◆",
    "79": "□",
    "80": "■",
    "81": "△",
    "82": "▲",
    "83": "▽",
    "84": "▼",
    "85": "→",
    "86": "←",
    "87": "↑",
    "88": "↓",
    "89": "0",
    "90": "1",
    "91": "2",
    "92": "3",
    "93": "4",
    "94": "5",
    "95": "6",
    "96": "7",
    "97": "8",
    "98": "9",
    "99": "A",
    "100": "B",
    "101": "C",
    "102": "D",
    "103": "E",
    "104": "F",
    "105": "G",
    "106": "H",
    "107": "I",
    "108": "J",
    "109": "K",
    "110": "L",
    "111": "M",
    "112": "N",
    "113": "O",
    "114": "P",
    "115": "Q",
    "116": "R",
    "117": "S",
    "118": "T",
    "119": "U",
    "120": "V",
    "121": "W",
    "122": "X",
    "123": "Y",
    "124": "Z",
    "125": "a",
    "126": "b",
    "127": "c",
    "128": "d",
    "129": "e",
    "130": "f",
    "131": "g",
    "132": "h",
    "133": "i",
    "134": "j",
    "135": "k",
    "136": "l",
    "137": "m",
    "138": "n",
    "139": "o",
    "140": "p",
    "141": "q",
    "142": "r",
    "143": "s",
    "144": "t",
    "145": "u",
    "146": "v",
    "147": "w",
    "148": "x",
    "149": "y",
    "150": "z",
    "151": "Ã",
    "152": "Á",
    "153": "À",
    "154": "Â",
    "155": "É",
    "156": "Ê",
    "157": "Í",
    "158": "Õ",
    "159": "Ó",
    "160": "Ò",
    "161": "Ô",
    "162": "Ú",
    "163": "Ç",
    "164": "ã",
    "165": "á",
    "166": "à",
    "167": "â",
    "168": "é",
    "169": "ê",
    "170": "í",
    "171": "õ",
    "172": "ó",
    "173": "ò",
    "174": "ô",
    "175": "ú",
    "176": "ç",
    "177": "せ",
    "178": "ぜ",
    "179": "そ",
    "180": "ぞ",
    "181": "た",
    "182": "だ",
    "183": "ち",
    "184": "ぢ",
    "185": "っ",
    "186": "つ",
    "187": "づ",
    "188": "て",
    "189": "で",
    "190": "と",
    "191": "ど",
    "192": "な",
    "193": "に",
    "194": "ぬ",
    "195": "ね",
    "196": "の",
    "197": "は",
    "198": "ば",
    "199": "ぱ",
    "200": "ひ",
    "201": "び",
    "202": "ぴ",
    "203": "ふ",
    "204": "ぶ",
    "205": "ぷ",
    "206": "へ",
    "207": "べ",
    "208": "ぺ",
    "209": "ほ",
    "210": "ぼ",
    "211": "ぽ",
    "212": "ま",
    "213": "み",
    "214": "む",
    "215": "め",
    "216": "も",
    "217": "ゃ",
    "218": "や",
    "219": "ゅ",
    "220": "ゆ",
    "221": "ょ",
    "222": "よ",
    "223": "ら",
    "224": "り",
    "225": "る",
    "226": "れ",
    "227": "ろ",
    "228": "ゎ",
    "229": "わ",
    "230": "ゐ",
    "231": "ゑ",
    "232": "を",
    "233": "ん",
    "234": "ァ",
    "235": "ア",
    "236": "ィ",
    "237": "イ",
    "238": "ゥ",
    "239": "ウ",
    "240": "ェ",
    "241": "エ",
    "242": "ォ",
    "243": "オ",
    "244": "カ",
    "245": "ガ",
    "246": "キ",
    "247": "ギ",
    "248": "ク",
    "249": "グ",
    "250": "ケ",
    "251": "ゲ",
    "252": "コ",
    "253": "ゴ",
    "254": "サ",
    "255": "ザ",
    "272": "シ",
    "273": "ジ",
    "274": "ス",
    "275": "ズ",
    "276": "セ",
    "277": "ゼ",
    "278": "ソ",
    "279": "ゾ",
    "280": "タ",
    "281": "ダ",
    "282": "チ",
    "283": "ヂ",
    "284": "ッ",
    "285": "ツ",
    "286": "ヅ",
    "287": "テ",
    "288": "デ",
    "289": "ト",
    "290": "ド",
    "291": "ナ",
    "292": "ニ",
    "293": "ヌ",
    "294": "ネ",
    "295": "ノ",
    "296": "ハ",
    "297": "バ",
    "298": "パ",
    "299": "ヒ",
    "300": "ビ",
    "301": "ピ",
    "302": "フ",
    "303": "ブ",
    "304": "プ",
    "305": "ヘ",
    "306": "ベ",
    "307": "ペ",
    "308": "ホ",
    "309": "ボ",
    "310": "ポ",
    "311": "マ",
    "312": "ミ",
    "313": "ム",
    "314": "メ",
    "315": "モ",
    "316": "ャ",
    "317": "ヤ",
    "318": "ュ",
    "319": "ユ",
    "320": "ョ",
    "321": "ヨ",
    "322": "ラ",
    "323": "リ",
    "324": "ル",
    "325": "レ",
    "326": "ロ",
    "327": "ヮ",
    "328": "ワ",
    "329": "ヰ",
    "330": "ヱ",
    "331": "ヲ",
    "332": "ン",
    "333": "ヴ",
    "334": "ヵ",
    "335": "ヶ",
    "336": "緑",
    "337": "依",
    "338": "頼",
    "339": "書",
    "340": "村",
    "341": "雨",
    "342": "折",
    "343": "剣",
    "344": "鉄",
    "345": "槌",
    "346": "隠",
    "347": "者",
    "348": "像",
    "349": "用",
    "350": "状",
    "351": "態",
    "352": "耐",
    "353": "性",
    "354": "戦",
    "355": "闘",
    "356": "心",
    "357": "得",
    "358": "人",
    "359": "好",
    "360": "武",
    "361": "器",
    "362": "工",
    "363": "房",
    "364": "士",
    "365": "魔",
    "366": "術",
    "367": "師",
    "368": "僧",
    "369": "侶",
    "370": "盗",
    "371": "賊",
    "372": "生",
    "373": "物",
    "374": "図",
    "375": "鑑",
    "376": "伝",
    "377": "本",
    "378": "歴",
    "379": "史",
    "380": "上",
    "381": "下",
    "382": "激",
    "383": "大",
    "384": "蛇",
    "385": "壁",
    "386": "開",
    "387": "放",
    "388": "奮",
    "389": "起",
    "390": "燃",
    "391": "焼",
    "392": "読",
    "393": "込",
    "394": "保",
    "395": "存",
    "396": "差",
    "397": "空",
    "398": "他",
    "399": "容",
    "400": "量",
    "401": "出",
    "402": "入",
    "403": "番",
    "404": "円",
    "405": "軽",
    "406": "重",
    "407": "装",
    "408": "衛",
    "409": "兵",
    "410": "世",
    "411": "Ⅰ",
    "412": "Ⅱ",
    "413": "号",
    "414": "☆",
    "415": "女",
    "416": "男",
    "417": "騎",
    "418": "見",
    "419": "習",
    "420": "黒",
    "421": "部",
    "422": "木",
    "423": "野",
    "424": "火",
    "425": "事",
    "426": "水",
    "427": "地",
    "428": "風",
    "429": "無",
    "430": "毒",
    "431": "凍",
    "432": "結",
    "433": "金",
    "434": "縛",
    "435": "呪",
    "436": "混",
    "437": "乱",
    "438": "近",
    "439": "眼",
    "440": "回",
    "441": "復",
    "442": "吸",
    "443": "収",
    "444": "炎",
    "445": "石",
    "446": "化",
    "447": "♂",
    "448": "♀",
    "449": "食",
    "450": "型",
    "451": "球",
    "452": "雷",
    "453": "獣",
    "454": "神",
    "455": "殿",
    "456": "死"
}

let charDecoding3 = {
    "1": " ",
    "10": "\n",
    "3872": "\n\n",
    "18": ",",
    "19": ".",
    "20": "･",
    "21": ":",
    "22": ";",
    "23": "?",
    "24": "!",
    "25": "_",
    "27": "ー",
    "28": "/",
    "29": "＼",
    "30": "~",
    "31": "…",
    "32": "‘",
    "33": "'",
    "34": "“",
    "35": "\"",
    "36": "(",
    "37": ")",
    "38": "〔",
    "39": "〕",
    "40": "[",
    "41": "]",
    "42": "{",
    "43": "}",
    "54": "+",
    "55": "-",
    "56": "±",
    "57": "×",
    "58": "÷",
    //"60": "≠",
    "61": "<",
    "62": ">",
    "63": "≦",
    "64": "≧",
    "65": "\\",
    "66": "$",
    "67": "%",
    "69": "&",
    "70": "*",
    "71": "@",
    "73": "★",
    "74": "○",
    "75": "●",
    "76": "◎",
    "77": "◇",
    "78": "◆",
    "79": "□",
    "80": "■",
    "81": "△",
    "82": "▲",
    "83": "▽",
    "84": "▼",
    "85": "→",
    "86": "←",
    "87": "↑",
    "88": "↓",
    "89": "0",
    "90": "1",
    "91": "2",
    "92": "3",
    "93": "4",
    "94": "5",
    "95": "6",
    "96": "7",
    "97": "8",
    "98": "9",
    "99": "A",
    "100": "B",
    "101": "C",
    "102": "D",
    "103": "E",
    "104": "F",
    "105": "G",
    "106": "H",
    "107": "I",
    "108": "J",
    "109": "K",
    "110": "L",
    "111": "M",
    "112": "N",
    "113": "O",
    "114": "P",
    "115": "Q",
    "116": "R",
    "117": "S",
    "118": "T",
    "119": "U",
    "120": "V",
    "121": "W",
    "122": "X",
    "123": "Y",
    "124": "Z",
    "125": "a",
    "126": "b",
    "127": "c",
    "128": "d",
    "129": "e",
    "130": "f",
    "131": "g",
    "132": "h",
    "133": "i",
    "134": "j",
    "135": "k",
    "136": "l",
    "137": "m",
    "138": "n",
    "139": "o",
    "140": "p",
    "141": "q",
    "142": "r",
    "143": "s",
    "144": "t",
    "145": "u",
    "146": "v",
    "147": "w",
    "148": "x",
    "149": "y",
    "150": "z",
    "151": "Ã",
    "152": "Á",
    "153": "À",
    "154": "Â",
    "155": "É",
    "156": "Ê",
    "157": "Í",
    "158": "Õ",
    "159": "Ó",
    "160": "Ò",
    "161": "Ô",
    "162": "Ú",
    "163": "Ç",
    "164": "ã",
    "165": "á",
    "166": "à",
    "167": "â",
    "168": "é",
    "169": "ê",
    "170": "í",
    "171": "õ",
    "172": "ó",
    "173": "ò",
    "174": "ô",
    "175": "ú",
    "176": "ç"
}

let characters = {
    "Empty": 0,
    "Jack": 1,
    "Ganz": 2,
    "Ridley": 3,
    "Rynka": 4,
    "Flau": 5,
    "Star": 6,
    "Sebastian": 7,
    "Genius": 8,
    "Rocky": 9,
    "Gawain": 10,
    "Light Guardsman": 269,
    "Elwen": 12,
    "Gerald": 13,
    "Caesar": 14,
    "Alicia": 15,
    "Dennis": 16,
    "Gareth": 17,
    "Gregory": 18,
    "Walter": 19,
    "Jarvis": 20,
    "Aldo": 22,
    "Gordon": 23,
    "Bruce": 24,
    "David": 25,
    "Conrad": 26,
    "Rolec": 27,
    "Daniel": 28,
    "Carlos": 29,
    "Gene": 30,
    "Thanos": 32,
    "Curtis": 33,
    "Cecil": 34,
    "Morgan": 35,
    "Felix": 36,
    "Jill": 37,
    "Ursula": 38,
    "Derek": 39,
    "Christoph": 40,
    "Claudia": 41,
    "Ardoph": 42,
    "Dimitri": 43,
    "Aidan": 44,
    "Cornelia": 45,
    "Faraus": 46,
    "Marietta": 47,
    "Ernest": 48,
    "Franklin": 49,
    "Johan": 50,
    "Roche": 51,
    "Kain": 53,
    "Fernando": 54,
    "Anastasia": 55,
    "Dwight": 56,
    "Godwin": 57,
    "Achilles": 58,
    "Flora": 59,
    "Elena": 60,
    "Alvin": 61,
    "Vitas": 62,
    "Cosmo": 63,
    "Grant": 64,
    "Adina": 65,
    "Miranda": 66,
    "Edgar": 67,
    "Clive": 68,
    "Lulu": 69,
    "Eugene": 70,
    "Nyx": 71,
    "Ortoroz": 72,
    "Sonata": 73,
    "Iris": 74,
    "Nocturne": 75,
    "Herz": 76,
    "Alba": 77,
    "Lily": 78,
    "Jared": 79,
    "Pinky": 80,
    "Interlude": 81,
    "Solo": 82,
    "Joaquel": 83,
    "Eon": 84,
    "Elmo": 85,
    "Jiorus": 86,
    "Sarasenia": 87,
    "Belflower": 88,
    "Jasne": 89,
    "Larks": 90,
    "Sakurazaki": 91,
    "Junzaburo": 92,
    "Natalie": 93,
    "Nina": 94,
    "Charlie": 95,
    "Leonard": 96,
    "Heavy Guardsman": 278,
    "Raymond": 99,
    "Al": 100,
    "Margaret": 101,
    "Zion": 102,
    "Paul": 103,
    "Toma": 104,
    "Torenia": 105,
    "Testa": 106,
    "Nuse": 107,
    "Jorn": 108,
    "Barbena": 109,
    "Giske": 110,
    "Yuri": 111,
    "Warc": 112,
    "Robin": 113,
    "Sheila": 114,
    "Jasmine": 115,
    "Camuse": 116,
    "Lantana": 117,
    "Lyle": 118,
    "Rose": 119,
    "Josef": 120,
    "Virginia": 121,
    "Morfinn": 122,
    "Bligh": 123,
    "Freija": 124,
    "Nask": 125,
    "Cherie": 126,
    "Zeke": 127,
    "Dan": 128,
    "Servia": 129,
    "Lunbar": 130,
    "Sonia": 131,
    "Startis": 132,
    "Brood": 133,
    "Garbella": 134,
    "Silvia": 135,
    "Thyme": 136,
    "Elef": 137,
    "Ryan": 138,
    "Hip": 139,
    "Nick": 140,
    "Kira": 141,
    "Rabi": 142,
    "Golye": 143,
    "Butch": 144,
    "Sarval": 145,
    "Sunset": 146,
    "Sora": 147,
    "Keaton": 148,
    "Tarkin": 149,
    "Gonber": 150,
    "Leban": 151,
    "Mook": 152,
    "Wal": 153,
    "Wyze": 154,
    "Zeranium": 155,
    "Glitch": 255,
    "Pomemelie": 157,
    "Saron": 158,
    "Cepheid": 159,
    "Baade": 160,
    "Quasar": 161,
    "Aphelion": 162,
    "Gonovitch": 163,
    "Albert": 164,
    "Vladimir": 165,
    "Yevgeni": 166,
    "Oleg": 167,
    "Grigory": 168,
    "Brockle": 169,
    "Dyvad": 170,
    "Gehrman": 171,
    "Sergei": 172,
    "Naom": 173,
    "Aegenhart": 174,
    "Marke": 175,
    "Donovitch": 176,
    "Zane": 177,
    "Hap": 178,
    "Gil": 179,
    "Shin": 180,
    "Fan": 181,
    "Row": 182,
    "Pitt": 183,
    "Few": 184,
    "Alan": 185,
    "Keane": 186,
    "Nogueira": 187,
    "Clarence": 188,
    "Serva": 189,
    "Hyann": 190,
    "Chatt": 191,
    "Zida": 192,
    "Franz": 193,
    "Romaria": 194,
    "Marsha": 195,
    "Lufa": 196,
    "Coco": 197,
    "Martinez": 198,
    "Santos": 199,
    "Rika": 200,
    "Mikey": 201,
    "Gob": 202,
    "Lin": 203,
    "Brie": 204,
    "Gonn": 205,
    "Golly": 206,
    "Gobrey": 207,
    "Den": 208,
    "Ben": 209,
    "Aesop": 210,
    "Monki": 211,
    "Gabe": 212,
    "Mason": 213,
    "Goo": 214,
    "Donkey": 215,
    "Ricky": 216,
    "Drew": 217,
    "Gruel": 218,
    "Doppio": 219,
    "Pietro": 220,
    "Jan": 221,
    "Marco": 222,
    "Niko": 223,
    "Danny": 224,
    "Dominic": 225,
    "Bosso": 226,
    "Georgio": 227,
    "Luka": 228,
    "Sonny": 229,
    "Giovanni": 230,
    "Polpo": 231,
    "J.J.": 232,
    "Leona": 233,
    "Leann": 234,
    "Ray C Ross": 235,
    "Pinta": 236,
    "Buta": 237,
    "Valkyrie": 238,
    "Lezard": 239,
    "Radian": 240,
    "Ethereal Queen": 241,
    "Cairn": 242,
    "Kelvin": 243,
    "Gabriel Celesta": 244,
    "Galvados": 247,
    "FC Glitch": 248,
    "Drago": 253,
    "Bull": 254,
    "Null": 258,
    "Library": 259,
    "Phonograph": 260,
    "Jack Bookshelf": 261,
    "Cross": 262,
    "Stein": 263,
    "Blackjack": 264,
    "Event Watcher": 265,
    "Parsec": 266,
    "Cody": 279,
    "Adele": 280,
    "Howard": 281,
    "Ravil": 282,
    "Astor": 283,
    "Maddock": 284,
    "Synelia": 285,
    "Tony": 286,
    "Patrick": 287,
    "Putt": 288,
    "Reynos": 289,
    "Gobblehope IX": 290,
    "Nalshay": 291,
    "Sayna": 292,
    "Bran": 293,
    "Stefan": 294,
    "Mint": 295,
    "Daria": 296,
    "Yack": 297,
    "Lauren": 298,
    "Theresa": 299,
    "Garcia": 300,
    "Dynas": 301,
    "Epoch": 302,
    "Roy": 303,
    "Louis": 304
};

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