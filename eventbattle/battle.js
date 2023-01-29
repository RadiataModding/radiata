let battles = [];

let allyPos = 0x96;
let enemyPos = 0xA0;

function changeEndianness(string) {
    const result = [];
    let len = string.length - 2;
    while (len >= 0) {
        result.push(string.substr(len, 2));
        len -= 2;
    }
    return result.join('');
}

function charAdd(){
   
   if (document.getElementById('char1').value == ''){
      return alert("Character ID is blank.");
   }
   if (document.getElementById('char3').value == ''){
      return alert("Visual Apperance is blank.");
   }
   if (document.getElementById('char4').value == ''){
      return alert("Vulnerability is blank.");
   }
   if (document.getElementById('char5').value == ''){
      return alert("Ally/Enemy is blank.");
   }

   let char1 = document.getElementById('char1').value;
   char1 = parseInt(char1, 16);
   char1 = char1.toString(16).padStart(8, '0').toUpperCase();
   char1 = changeEndianness(char1);


   let char3 = document.getElementById('char3').value;
   char3 = parseInt(char3, 16);
   char3 = char3.toString(16).padStart(4, '0').toUpperCase();
   char3 = changeEndianness(char3);

   let char4 = document.getElementById('char4').value;
   char4 = parseInt(char4, 16);
   char4 = char4.toString(16).padStart(2, '0').toUpperCase();

   let char5 = document.getElementById('char5').value;
   char5 = parseInt(char5, 16);
   char5 = char5.toString(16).padStart(4, '0').toUpperCase();
   char5 = changeEndianness(char5);

   if (char5 == "1100"){
      char2 = enemyPos.toString(16).padStart(8, '0').toUpperCase();
      char2 = changeEndianness(char2);
      enemyPos++;
   } else {
      char2 = allyPos.toString(16).padStart(8, '0').toUpperCase();
      char2 = changeEndianness(char2);
      allyPos++;
   }

   let code = '17040180';
   code += char1;
   code += char2;
   code += "1400";
   code += char3;
   code += char5;
   code += char4;
   code += "01";


/*   let code = 'patch=1,EE,' + charAddress.toString(16).toUpperCase() + ',extended,0000';
   code += char1 + '\n';

   code += 'patch=1,EE,' + charPos.toString(16).toUpperCase() + ',extended,0000';
   code += char2 + '\n';

   code += 'patch=1,EE,' + charApp.toString(16).toUpperCase() + ',extended,0000';
   code += char3 + '\n';

   code += 'patch=1,EE,' + charVuln.toString(16).toUpperCase() + ',extended,0000';
   code += char4 + '\n';

   code += 'patch=1,EE,' + charEnem.toString(16).toUpperCase() + ',extended,0000';
   code += char5 + '\n';*/

   code = code.replace(/\s/g, '');
   battles.push(code);
   
   document.getElementById("results").innerHTML = "Added. Currently at " + battles.length + " characters."

}

function addDefault(){
   let code1 = '17 04 01 80 AD 26 00 00 96 00 00 00 14 00 00 00 00 00 00 00';
   code1 = code1.replace(/\s/g, '');
   let code2 = '17 04 01 80 AE 26 00 00 97 00 00 00 14 00 00 00 00 00 00 00';
   code2 = code2.replace(/\s/g, '');
   let code3 = '17 04 01 80 AF 26 00 00 98 00 00 00 14 00 00 00 00 00 00 00';
   code3 = code3.replace(/\s/g, '');
   let code4 = '17 04 01 80 B0 26 00 00 99 00 00 00 14 00 00 00 00 00 00 00';
   code4 = code4.replace(/\s/g, '');
   battles.push(code1);
   battles.push(code2);
   battles.push(code3);
   battles.push(code4);
   allyPos = 0x9A;

   document.getElementById("results").innerHTML = "Defaults added. Currently at " + battles.length + " characters."
}

function download(){
   if (battles.length == 0){
      alert("Nothing added.");
      return;
   }

   event1 = parseInt(document.getElementById('event1').value);
   event1 = changeEndianness(event1.toString(16).padStart(4, '0').toUpperCase());
   event2 = parseInt(document.getElementById('event2').value);
   event2 = changeEndianness(event2.toString(16).padStart(4, '0').toUpperCase());

   let code = "16 07 00 80";
   code += changeEndianness(document.getElementById('arena').value.padStart(4, '0').toUpperCase());
   code += changeEndianness(document.getElementById('bgm').value.padStart(4, '0').toUpperCase());
   code += "00 00 00 00 0C 00 00 00 00 00 00 00 01 00 00 00"; //Default Win Condition
   code += event1;
   code += event2;
   code += '88 04 00 00';

   for (let i = 0; i < battles.length; i++){
      code += battles[i];
   }

   if (document.getElementById('cont').checked){
      code += "0A 00 02 80 00 00 00 00";
   } else {
      code += "72 01 02 80 0F 00 00 00";
      code += "0A 00 02 80 00 00 00 00";
   }

   code = code.replace(/\s/g, '');

   navigator.clipboard.writeText(code)
        .then(() => {
            alert("Data copied to clipboard.");
        })
        .catch(err => {
            console.log('Error: ', err);
        });

   document.getElementById("results").innerHTML = "Copied. Data has been cleared.";
   battles = [];
   allyPos = 0x96;
   enemyPos = 0xA0;
}