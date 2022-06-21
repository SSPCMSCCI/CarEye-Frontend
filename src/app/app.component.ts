import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AWSWebApp';
  currentUrl = '/estadisticas';

  showNav = true;

  links = [
    { title: 'Estadísticas', url: '/estadisticas' },
    { title: 'Resumen', url: '/proyectos' }
  ];

  constructor(public route: ActivatedRoute, private router: Router, location: Location,) {
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.currentUrl = location.path();
        if (location.path().includes('/proyectos/')) {
          this.showNav = false;
        } else {
          this.showNav = true;
        }
      } else {
        this.currentUrl = '/estadisticas'
      }
    });
  }

  ngOnInit(): void {
    console.log('asd')
  }

}
