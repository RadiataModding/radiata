function cameraCreate(){
	let temp = '14 03 00 80 10 03 00 00 F1 03 00 00 00 00 00 00 02 03 00 80 03 00 00 02 F1 03 00 00 01 00 00 00 59 02 20 80 CD CC 4C 3F 00 00 00 00 51 00 00 80 50 01 00 80 01 00 01 00 14 03 00 80 10 0F 00 00 F1 03 00 00 00 00 00 00 59 02 30 80 00 00 80 3F 00 00 00 00 59 02 40 80 00 00 00 00 00 00 00 00 5A 00 00 80 59 02 60 80 00 00 00 00 00 00 00 00 59 02 70 80 00 00 00 00 00 00 00 00 0F 00 00 80 52 06 05 80';

	temp += hexSwap(floatHex(document.getElementById('eventx').value));
	temp += hexSwap(floatHex(document.getElementById('eventy').value));
	temp += hexSwap(floatHex(document.getElementById('eventz').value));
	temp += hexSwap(floatHex(document.getElementById('eventx2').value));
	temp += hexSwap(floatHex(document.getElementById('eventy2').value));
	temp += hexSwap(floatHex(document.getElementById('eventz2').value));

	temp = temp.replaceAll(' ', '');
	document.getElementById("results").innerHTML = temp;

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
