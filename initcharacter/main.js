function charCreate(){
	let temp = '20 03 01 80 AF 26 00 00 01 00 00 00 01 01 01 00 02 01 00 80 0A 00 00 00 20 03 01 80 AF 26 00 00 01 00 00 00 03 01 01 00 02 01 00 80 04 00 00 00 20 03 01 80 AF 26 00 00 01 00 00 00 FF 01 01 00 0F 00 00 00 58 44 58 44 58 44 58 44 58 44 58 44 50 41 52 54 20 32 58 44 58 44 58 44 58 44 58 44 39 01 01 80 AF 26 00 00 22 01 81 80 AF 26 00 00 2B 02 41 80 AF 26 00 00 00 00 00 00 2D 06 01 80 AF 26 00 00 C8 02 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 34 03 01 80 AF 26 00 00 00 07 16 00 FF FF 00 00 32 07 01 80 AF 26 00 00 4A 01 00 60 00 00 00 00 00 00 80 3F 00 00 80 3F 00 00 80 3F 00 00 80 3F 33 03 05 80 AF 26 00 00 00 03 00 00 00 00 00 00 33 02 05 80 AF 26 00 00 00 05 00 00 29 01 05 80 AF 26 00 00 25 01 01 80 AF 26 00 00 32 08 03 80 AF 26 00 00 00 00 02 A0 00 00 00 00 53 48 41 44 4F 57 00 00 00 00 00 00 00 00 00 00 00 00 80 3F 27 01 01 80 AF 26 00 00 0F 00 00 80 22 01 41 80 AF 26 00 00 3B 02 01 80 AF 26 00 00 00 00 00 41 30 05 81 80 AF 26 00 00 00 00 01 00 00 00 6F C3 00 00 00 00 00 20 C9 44 2D 08 01 80 AF 26 00 00 C8 01 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 CC 74 00 C0 00 00 00 00 23 03 01 80 AF 26 00 00 07 00 00 00 01 00 00 00 02 03 00 80 05 00 00 87 AF 26 1A 00 CF 00 00 00 32 04 01 80 AF 26 00 00 48 01 00 00 1E 00 00 00 9A 99 19 3F';
	let char1 = document.getElementById('char1').value;
	char1 = parseInt(char1, 16);
	char1 = char1.toString(16).padStart(4, '0').toUpperCase();
	char1 = hexSwap(char1);
	temp = temp.replaceAll(' AF 26 ', char1);
	temp2 = temp.substring(0,918);

	temp2 += hexSwap(floatHex(document.getElementById('eventx').value));
	temp2 += hexSwap(floatHex(document.getElementById('eventy').value));
	temp2 += hexSwap(floatHex(document.getElementById('eventz').value));

	temp2 += temp.substring(954);

	temp2 = temp2.replaceAll(' ','');

	part1 = temp2.substring(0,136);

	part2 = temp2.substring(192);

	document.getElementById("results").innerHTML = part1;

	document.getElementById("results2").innerHTML = part2;



	console.log(temp2);

}

function printcoords(){
	temp2 = hexSwap(floatHex(document.getElementById('eventx').value));
	temp2 += hexSwap(floatHex(document.getElementById('eventy').value));
	temp2 += hexSwap(floatHex(document.getElementById('eventz').value));
	console.log(temp2);
}


function hexSwap(string) {
    const result = [];
    let len = string.length - 2;
    while (len >= 0) {
        result.push(string.substr(len, 2));
        len -= 2;
    }
    return result.join('');
}

function floatHex(input) {
	const getHex = i => ('00' + i.toString(16)).slice(-2);

	var view = new DataView(new ArrayBuffer(4)),
	    result;

	view.setFloat32(0, input);

	result = Array
	    .apply(null, { length: 4 })
	    .map((_, i) => getHex(view.getUint8(i)))
	    .join('');

	return result
}
