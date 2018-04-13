// GEOLOCALISATION //

var x = document.getElementById("demo");
function getLocation() {
	 if (navigator.geolocation) {
			 navigator.geolocation.getCurrentPosition(showPosition);
	 } else {
			 x.innerHTML = "Geolocation is not supported by this browser.";
	 }
}
function showPosition(position) {
	 x.innerHTML = "Latitude: " + position.coords.latitude +
	 "<br>Longitude: " + position.coords.longitude;
}


// GOOGLE MAP

// <script src='//maps.google.com/maps/api/js?sensor=false'>
var infowindow = new google.maps.InfoWindow();
				var markersmap  = [];

					var sidebar_htmlmap  = '';
					var marker_htmlmap  = [];

                var to_htmlsmap  = [];
                var from_htmlsmap  = [];
            var mapmap = null;
function onLoadmap() {
var mapObjmap = document.getElementById("map");
if (mapObjmap != 'undefined' && mapObjmap != null) {

				var mapOptionsmap = {
					scaleControl: true,
					scrollwheel: false,
					zoom: 18,
					draggable: 1,
					maxZoom: null,
					minZoom: null,
					mapTypeId: google.maps.MapTypeId.SATELLITE,
					mapTypeControl: true,
					mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DEFAULT}
				};

					mapOptionsmap.center = new google.maps.LatLng(
						44.818133,
						-0.216505
					);

						var stylesmap = 1;

				mapmap = new google.maps.Map(mapObjmap,mapOptionsmap);

				mapmap.setOptions({styles: stylesmap});
			var point = new google.maps.LatLng(44.81813272,-0.21650479);
markersmap.push(createMarker(mapmap, point,"Reposoir du 17e siècle","<h3>Reposoir du 17e siècle<\/h3>", '', '', "sidebar_map", '' ));


			  }
}

    	   function createMarker(map, point, title, html, icon, icon_shadow, sidebar_id, openers){
			    var marker_options = {
			        position: point,
			        map: map,
			        title: title};
			    if(icon!=''){marker_options.icon = icon;}
			    if(icon_shadow!=''){marker_options.shadow = icon_shadow;}

			    //create marker
			    var new_marker = new google.maps.Marker(marker_options);
			    if(html!=''){


			        google.maps.event.addListener(new_marker, 'click', function() {
			          	infowindow.close();
			          	infowindow.setContent(html);
			          	infowindow.open(map,new_marker);
			        });

					if(openers != ''&&!isEmpty(openers)){
			           for(var i in openers){
			             var opener = document.getElementById(openers[i]);
			             opener.onclick = function() {

			             	infowindow.close();
			             	infowindow.setContent(html);
			             	infowindow.open(map,new_marker);

			          		return false;
			             };
			           }
			        }

			        if(sidebar_id != ''){
			            var sidebar = document.getElementById(sidebar_id);
						if(sidebar!=null && sidebar!=undefined && title!=null && title!=''){
							var newlink = document.createElement('a');

			        		newlink.onclick=function(){infowindow.open(map,new_marker); return false;};

							newlink.innerHTML = title;
							sidebar.appendChild(newlink);
						}
			        }
                }
			    return new_marker;
			}
    	function isArray(a) {return isObject(a) && a.constructor == Array;}
function isObject(a) {return (a && typeof a == 'object') || isFunction(a);}
function isFunction(a) {return typeof a == 'function';}
function isEmpty(obj) { for(var i in obj) { return false; } return true; }



	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-1869594-21']);
	  _gaq.push(['_trackPageview']);

	  (function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();


		var height = (document.documentElement && document.documentElement.clientHeight) || window.innerHeight || self.innerHeight || document.body.clientHeight ;
		var today = new Date(), expires = new Date();
		expires.setTime(today.getTime() + (365*24*60*60*1000));
		document.cookie="height="+escape(height)+"; expires="+expires.toGMTString();

		var width = (document.documentElement && document.documentElement.clientWidth) || window.innerWidth || self.innerWidth || document.body.clientWidth ;
		document.cookie="width="+escape(width)+"; expires="+expires.toGMTString();



document.write('<div id="map" style="width: 100%; height: 300px; position:relative;"><\/div>');


window.onload=onLoadmap;
