﻿/// <reference path="E:\Projects\html-templates\html-templates\tarks.js" />

function toggleNav() {
    if (document.getElementById("mySidenav").style.width == "250px") {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementsByTagName("main")[0].style.marginLeft = "0";
        document.getElementsByTagName("footer")[0].style.marginLeft = "0";
        document.getElementsByTagName("nav")[0].style.marginLeft = "0px";
    }
    else {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementsByTagName("main")[0].style.marginLeft = "250px";
        document.getElementsByTagName("footer")[0].style.marginLeft = "250px";
        document.getElementsByTagName("nav")[0].style.marginLeft = "250px";
    }

}

function myMap() {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.2), zoom: 10
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}


var btn = document.getElementById("myBtn");
btn.onclick = function(event) {
    
    Tarks.MessageBox.Show(
        "You have successfully signed in",
        "Sign In",
        Tarks.MessageBox.Icons.Success
    );
}
