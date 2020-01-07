import {AfterViewInit, Component, ElementRef, ViewChild, OnInit} from '@angular/core';

@Component({
  selector: 'app-locate-us',
  templateUrl: './locate-us.component.html',
  styleUrls: ['./locate-us.component.scss']
})

export class LocateUsComponent implements OnInit {
  @ViewChild('mapRef', {static: true }) mapElement: ElementRef;
  constructor() { }

  ngOnInit() {
    this.renderMap();
  }

  renderMap() {
    
    window['initMap'] = () => {
      this.loadMap();     
    }
    console.log(!window.document.getElementById('google-map-script'))
    if(!window.document.getElementById('google-map-script')) {
      // var s = window.document.createElement("script");
      // s.id = "google-map-script";
      // s.type = "text/javascript";
      // s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAHfSMNYyJdPqRB0j68I-7Tne4i7mORy0o&amp;callback=initMap";
        
      this.loadMap();
      // window.document.body.appendChild(s);
    } else {
    }
  }

  loadMap = () => {
    console.log("this.loadMap called")
    var map = new window['google'].maps.Map(this.mapElement.nativeElement, {
      center: {lat: 24.5373, lng: 81.3042},
      zoom: 8
    });
    
    var marker = new window['google'].maps.Marker({
      position: {lat: 24.5373, lng: 81.3042},
      map: map,
      title: 'Hello World!',
      draggable: true,
      animation: window['google'].maps.Animation.DROP,
    });
    
    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h3 id="thirdHeading" class="thirdHeading">W3path.com</h3>'+
    '<div id="bodyContent">'+
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>'+
    '</div>'+
    '</div>';
    
    var infowindow = new window['google'].maps.InfoWindow({
      content: contentString
    });

    console.log(infowindow)
    
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }

}
