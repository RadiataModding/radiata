// JavaScript Document

let navBar;

const navStart = "<a class=\"navbar-brand\" href=\"\/\">Radiata<\/a> <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavAltMarkup\" aria-controls=\"navbarNavAltMarkup\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"> <span class=\"navbar-toggler-icon\"><\/span> <\/button> <div class=\"collapse navbar-collapse\" id=\"navbarNavAltMarkup\">\r\n <div class=\"navbar-nav\">";

//let navGen = "<a class=\"nav-item nav-link\" href=\"..\/decoder\">Text Decoder\/Generator<\/a> ";

let navTools = "<li class=\"nav-item dropdown\">\r\n        <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n          Tools\r\n        <\/a>\r\n        <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\r\n    <a class=\"dropdown-item\" href=\"https:\/\/docs.google.com\/spreadsheets\/d\/e\/2PACX-1vQWpyn9KDQue1sPgsJqFvM6yAw3J8H-Fwz0DiGyWq6F4FEAZtnwktWz6nezOjaj5uBnzcM-G-2Zzv84\/pubhtml\">IDs/Values<\/a>       <a class=\"dropdown-item\" href=\"..\/decoder\">Text Decoder\/Generator<\/a>\r\n          <a class=\"dropdown-item\" href=\"..\/textbuilder\">Text Builder<\/a>\r\n          <a class=\"dropdown-item\" href=\"..\/battle\">Battle (PNACH)<\/a>\r\n          <a class=\"dropdown-item\" href=\"..\/eventbattle\">Battle<\/a>\r\n        <a class=\"dropdown-item\" href=\"..\/initcharacter\">Initialise Character<\/a>\r\n        <a class=\"dropdown-item\" href=\"..\/camera\">Camera<\/a>\r\n<a class=\"dropdown-item\" href=\"..\/cutscene\">Cutscene Skip<\/a>\r\n        <\/div>\r\n      <\/li>"


//let navText = "<a class=\"nav-item nav-link\" href=\"..\/textbuilder\">Text Builder<\/a> ";

//let navName = "<a class=\"nav-item nav-link\" href=\"..\/name\">Name<\/a> ";

let navYouTube = "<a class=\"nav-item nav-link\" href=\"https:\/\/www.youtube.com\/@Radiata\">YouTube<\/a> ";

let navReddit = "<a class=\"nav-item nav-link\" href=\"https:\/\/www.reddit.com\/r\/RadiataStories\/\">Reddit<\/a> ";

let navRevive = "<a class=\"nav-item nav-link\" href=\"https:\/\/www.change.org\/ReviveRadiata\/\">#ReviveRadiata<\/a>"

const navEnd = "</div> </div>";

function createNav(){
/*  switch(document.title){
        case "Name | Radiata":
            navName = "<a class=\"nav-item nav-link active\" href=\"..\/name\">Name<\/a> "
            break;  
    }*/

    navBar = navStart + navTools + navYouTube + navReddit + navRevive + navEnd;
    
    document.getElementById("navbar").innerHTML = navBar;
    

}





$(function() {
    createNav();
});
