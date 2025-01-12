// JavaScript Document

let navBar;

const navStart = "<a class=\"navbar-brand\" href=\"\/\">Radiata<\/a> <button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#navbarNavAltMarkup\" aria-controls=\"navbarNavAltMarkup\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"> <span class=\"navbar-toggler-icon\"><\/span> <\/button> <div class=\"collapse navbar-collapse\" id=\"navbarNavAltMarkup\">\r\n <div class=\"navbar-nav\">";
let navGame = "<a class=\"nav-item nav-link\" href=\"..\/guess\">Character Guesser<sup style=\"padding-left:5px;color:red;\" timeout=\"1738367999000\">New<\/sup><\/a>"
let navTools = "<li class=\"nav-item dropdown\">\r\n        <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-bs-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n          Tools\r\n        <\/a>\r\n        <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\r\n    <a class=\"dropdown-item\" href=\"https:\/\/docs.google.com\/spreadsheets\/d\/e\/2PACX-1vQWpyn9KDQue1sPgsJqFvM6yAw3J8H-Fwz0DiGyWq6F4FEAZtnwktWz6nezOjaj5uBnzcM-G-2Zzv84\/pubhtml\">IDs/Values<\/a>       <a class=\"dropdown-item\" href=\"..\/decoder\">Text Decoder\/Generator<\/a>\r\n          <a class=\"dropdown-item\" href=\"..\/textbuilder\">Text Builder<\/a>\r\n          <a class=\"dropdown-item\" href=\"..\/battle\">Battle (PNACH)<\/a>\r\n          <a class=\"dropdown-item\" href=\"..\/eventbattle\">Battle (Event)<\/a>\r\n        <a class=\"dropdown-item\" href=\"..\/initcharacter\">Initialise Character<\/a>\r\n        <a class=\"dropdown-item\" href=\"..\/camera\">Camera<\/a>\r\n<a class=\"dropdown-item\" href=\"..\/cutscene\">Cutscene Skip<\/a>\r\n        <\/div>\r\n      <\/li>"
let navYouTube = "<a class=\"nav-item nav-link\" href=\"https:\/\/www.youtube.com\/@Radiata\">YouTube<\/a> ";
let navReddit = "<a class=\"nav-item nav-link\" href=\"https:\/\/www.reddit.com\/r\/RadiataStories\/\">Reddit<\/a> ";
let navRevive = "<a class=\"nav-item nav-link\" href=\"https:\/\/www.change.org\/ReviveRadiata\/\">#ReviveRadiata<\/a>"
const navEnd = "</div> </div>";

function createNav() {
    navBar = navStart + navGame + navTools + navYouTube + navReddit + navRevive + navEnd;
    document.getElementById("navbar").innerHTML = navBar;
}

$(function() {
    createNav();
    let allSup = document.body.getElementsByTagName("sup");
    for (let curSup of allSup){
        let checkTime = curSup.getAttribute("timeout");
        if (Date.now() > Number(checkTime)){
            curSup.remove();
        }
    }
});