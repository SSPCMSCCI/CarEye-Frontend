import { Component, OnInit } from '@angular/core';
import { Project } from 'src/util/types';
import { ProyectoService } from '../proyecto.service';


/*var datos = [
  {
    "name": "Desplegados",
    "value": 8940000
  },
  {
    "name": "No desplegados",
    "value": 5000000
  }
];*/

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  proyectos:Project[]=[];
  datos:any[] = [];
  view:[number,number] = [700, 400];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(private proyectoService:ProyectoService) { 
    //Object.assign(this,{datos});
  }

  ngOnInit(): void {
    this.getDesplegados();
    
  }

  getDesplegados(){
    this.proyectoService.getDesplegados().subscribe(dat=>{
      this.datos = [{
          name:"Desplegados",
          value: dat.desplegados
        },{
          name:"No Desplegaods",
          value:dat.no_desplegados
        }
      ];
    });
  }

  

 

}
