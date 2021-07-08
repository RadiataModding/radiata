// JavaScript Document

let navBar;

const navStart = "<a class=\"navbar-brand\" href=\"\/\">Radiata<\/a> <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavAltMarkup\" aria-controls=\"navbarNavAltMarkup\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"> <span class=\"navbar-toggler-icon\"><\/span> <\/button> <div class=\"collapse navbar-collapse\" id=\"navbarNavAltMarkup\">\r\n <div class=\"navbar-nav\">";

let navGen = "<a class=\"nav-item nav-link\" href=\"..\/decoder\">Text Decoder\/Generator<\/a> ";

let navId = "<a class=\"nav-item nav-link\" href=\"..\/id\">IDs/Values<\/a> ";

let navText = "<a class=\"nav-item nav-link\" href=\"..\/textbuilder\">Text Builder<\/a> ";

let navName = "<a class=\"nav-item nav-link\" href=\"..\/name\">Name<\/a> ";

let navYouTube = "<a class=\"nav-item nav-link\" href=\"https:\/\/www.youtube.com\/c\/Radiata\">YouTube<\/a> ";

let navReddit = "<a class=\"nav-item nav-link\" href=\"https:\/\/www.reddit.com\/r\/RadiataStories\/\">Subreddit<\/a> ";

let navRevive = "<a class=\"nav-item nav-link\" href=\"https:\/\/www.change.org\/ReviveRadiata\/\">#ReviveRadiata<\/a>"

const navEnd = "</div> </div>";

function createNav(){
/*	switch(document.title){
		case "Name | Radiata":
			navName = "<a class=\"nav-item nav-link active\" href=\"..\/name\">Name<\/a> "
			break;	
	}*/

	navBar = navStart + navGen + navId + navText + navName + navYouTube + navReddit + navRevive + navEnd;
	
	document.getElementById("navbar").innerHTML = navBar;
	
	
}

$(function() {
    createNav();
});


/*
<a class="navbar-brand" href="#">2KRN</a>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
               <a class="nav-item nav-link" href="../search">Search</a>
               <a class="nav-item nav-link" href="../wholesome">Wholesome Animu </a>
               <a class="nav-item nav-link" href="../read">Read </a>
               <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          OP/ED
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="../mikakunin">Engaged to the Unidentified</a>
          <a class="dropdown-item" href="../dropkick">Gabriel Dropout</a>
          <a class="dropdown-item" href="../chuchuyeah">Miss Kobayashi's Dragon Maid</a>
          <a class="dropdown-item" href="../kyutie">Ms. vampire who lives in my neighborhood.</a>
        </div>
      </li>
            </div>
         </div>
*/

/*
<a class=\"navbar-brand\" href=\"#\">2KRN</a> <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavAltMarkup\" aria-controls=\"navbarNavAltMarkup\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"> <span class=\"navbar-toggler-icon\"></span> </button> <div class=\"collapse navbar-collapse\" id=\"navbarNavAltMarkup\"> <div class=\"navbar-nav\"> <a class=\"nav-item nav-link\" href=\"../search\">Search</a> <a class=\"nav-item nav-link\" href=\"../wholesome\">Wholesome Animu </a> <a class=\"nav-item nav-link\" href=\"../read\">Read </a> <li class=\"nav-item dropdown\"> <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> OP/ED </a> <div class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\"> <a class=\"dropdown-item\" href=\"../mikakunin\">Engaged to the Unidentified</a> <a class=\"dropdown-item\" href=\"../dropkick\">Gabriel Dropout</a> <a class=\"dropdown-item\" href=\"../chuchuyeah\">Miss Kobayashi\'s Dragon Maid</a> <a class=\"dropdown-item\" href=\"../kyutie\">Ms. vampire who lives in my neighborhood.</a> </div> </li> </div> </div>
*/
