let battles = [];

let allyPos = 0x96;
let enemyPos = 0xA0;


function charAdd(){
   if (battles.length >= 10) {
      return alert("Too many characters in battle already.");
   }
   
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

   let charAddress = 0x1037FB80 + (battles.length * 0x14);
   let charPos = 0x1037FB88 + (battles.length * 0x14);
   let charApp = 0x1037FB8E + (battles.length * 0x14);
   let charVuln = 0x1037FB92 + (battles.length * 0x14);
   let charEnem = 0x1037FB90 + (battles.length * 0x14);

   let char1 = document.getElementById('char1').value;
   char1 = parseInt(char1, 16);
   char1 = char1.toString(16).padStart(4, '0').toUpperCase();


   let char3 = document.getElementById('char3').value;
   char3 = parseInt(char3, 16);
   char3 = char3.toString(16).padStart(4, '0').toUpperCase();

   let char4 = document.getElementById('char4').value;
   char4 = parseInt(char4, 16);
   char4 = char4.toString(16).padStart(4, '0').toUpperCase();

   let char5 = document.getElementById('char5').value;
   char5 = parseInt(char5, 16);
   char5 = char5.toString(16).padStart(4, '0').toUpperCase();

   if (char5 == "0011"){
      char2 = enemyPos.toString(16).padStart(4, '0').toUpperCase();
      enemyPos++;
   } else {
      char2 = allyPos.toString(16).padStart(4, '0').toUpperCase();
      allyPos++;
   }

   let code = 'patch=1,EE,' + charAddress.toString(16).toUpperCase() + ',extended,0000';
   code += char1 + '\n';

   code += 'patch=1,EE,' + charPos.toString(16).toUpperCase() + ',extended,0000';
   code += char2 + '\n';

   code += 'patch=1,EE,' + charApp.toString(16).toUpperCase() + ',extended,0000';
   code += char3 + '\n';

   code += 'patch=1,EE,' + charVuln.toString(16).toUpperCase() + ',extended,0000';
   code += char4 + '\n';

   code += 'patch=1,EE,' + charEnem.toString(16).toUpperCase() + ',extended,0000';
   code += char5 + '\n';

   battles.push(code);
   
   document.getElementById("results").innerHTML = "Added. Currently at " + battles.length + "/10 characters."

}

function download(){
   if (battles.length == 0){
      alert("Nothing added.");
      return;
   }

   let count = 8 + (battles.length * 5);

   let arenaCheck = false;
   let bgmCheck = false;


   if (document.getElementById('bgm').value != '00'){
      bgmCheck = true;
      count++;
   }

   if (document.getElementById('arena').value != '00'){
      arenaCheck = true;
      count++;
   }

   let pnach = 'comment=Radiata Stories Battle Creator by: Radiata - https://www.youtube.com/c/Radiata\n\n';
   pnach += 'patch=1,EE,E0' + count.toString(16).padStart(2, '0').toUpperCase() + '0473,extended,0037FB94\n';
   count--;
   pnach += 'patch=1,EE,E0' + count.toString(16).padStart(2, '0').toUpperCase() + '00A0,extended,0037FB9C\n';
   count--;
   pnach += 'patch=1,EE,E0' + count.toString(16).padStart(2, '0').toUpperCase() + '0000,extended,0037FBA2\n';
   count--;
   pnach += 'patch=1,EE,E0' + count.toString(16).padStart(2, '0').toUpperCase() + '0000,extended,0037FBA6\n';
   count--;
   pnach += 'patch=1,EE,E0' + count.toString(16).padStart(2, '0').toUpperCase() + '0011,extended,0037FBA4\n';
   count--;
   pnach += 'patch=1,EE,E0' + count.toString(16).padStart(2, '0').toUpperCase() + '0E09,extended,0037FB5C\n';
   count--;
   pnach += 'patch=1,EE,E0' + count.toString(16).padStart(2, '0').toUpperCase() + '001D,extended,0037FB56\n';
   count--;

   for (let i = 0; i < battles.length; i++){
      pnach += battles[i];
   }

   let battleSize = battles.length.toString(16).padStart(2, '0').toUpperCase();

   pnach += 'patch=1,EE,0037FB50,extended,000000';
   pnach += battleSize + '\n';

   pnach += 'patch=1,EE,1037FB5C,extended,0000050C\n';
   

   if (bgmCheck){
      let bgm = document.getElementById('bgm').value;
      bgm = parseInt(bgm, 16);
      bgm = bgm.toString(16).padStart(4, '0').toUpperCase();

      pnach += 'patch=1,EE,1037FB56,extended,0000';
      pnach += bgm + '\n';
   }

   if (arenaCheck){
      let arena = document.getElementById('arena').value;
      arena = parseInt(arena, 16);
      arena = arena.toString(16).padStart(4, '0').toUpperCase();

      pnach += 'patch=1,EE,1037FB54,extended,0000';
      pnach += arena + '\n';
   }

   let a = document.createElement('a');
   a.href = "data:application/octet-stream,"+encodeURIComponent(pnach);
   a.download = '47B9B2FD.pnach';
   a.click();
   document.getElementById("results").innerHTML = "Downloaded. Data has been cleared.";
   battles = [];
   allyPos = 0x96;
   enemyPos = 0xA0;
}