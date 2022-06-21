import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {ProyectoService} from 'src/app/proyecto.service'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PROJECTS } from 'src/util/constants';
import { Project,ProjectApi } from 'src/util/types';

import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit{

  //projects$: Observable<Project[]>;
  projects$:Project[] = [];
  filter = new FormControl('');
  localProjects = PROJECTS;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  esValido = true;
  newProyectView = false;
  editProjectView = false;

  //NEW PROJECT
  codigo = "";
  nombre = "";
  estado = "";
  tecnologia = "";
  tipo = "";
  deploymentState = "";
  ultimoDespliegue = "";
  primerDespliegue = "";
  managers: string[] = [];
  repositorio = "";
  pmTempName = "";
  idTemp = 0;

  states = ['Activo','Inactivo','Terminado'];
  technologies = ['Node'];
  types = ['Web'];

  constructor(private router: Router,private proyectoService:ProyectoService) {
    //this.proyectoService.getProyectos().subscribe(proyectos=>this.projects$ = proyectos);
    /*this.projects$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.projectSearch(text))
    );*/
  }

  ngOnInit(){
    this.getProyectos();
    this.projectSearch('');
  }

  getProyectos(){
    this.proyectoService.getProyectos().subscribe(proyectos=>{
      this.projects$ = proyectos;
      this.projects$ = this.projects$.map((project:Project)=>{
        project.deploymentState = project.ultimoDespliegue?'Desplegado':'No Desplegado';
        project.ultimoDespliegue = project.ultimoDespliegue?project.ultimoDespliegue:'---';
        return project;
      });
      this.projects$.sort((project1,project2)=>{
        if(project1.codigo < project2.codigo){
          return -1;
        }else if(project1.codigo > project2.codigo){
          return 1;
        }else{
          return 0;
        }
      });
    });
  }

  createProyecto(newProject:ProjectApi){
    this.proyectoService.addProyecto(newProject).subscribe(project=>{
      this.projects$.push(project);
      Swal.fire({
        icon: 'success',
        title: 'Genial',
        text: 'Tu proyecto ha sido ingresado con éxito.',
      });
      this.resetProjectData();
    });
  }

  updateProyecto(updatedProject:ProjectApi){
    this.proyectoService.updateProyecto(updatedProject).subscribe(project=>{
      Swal.fire({
        icon: 'success',
        title: 'Genial',
        text: 'Tu proyecto ha sido editado con éxito.',
      })
      this.resetProjectData();
    });
  }

  deleteProyecto(project:Project){
    this.proyectoService.deleteProyecto(project.id!).subscribe(result=>{
      if(result){
        Swal.fire(
          'Proyecto eliminado!',
          'El proyecto ha sido eliminado con éxito.',
          'success'
        )
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se encontró el proyecto con código ' + project.codigo,
        });
      }
      this.getProyectos();
    });
  }

  projectSearch(text: string): Project[] {
    //var projects: Project[] = [];
    //this.proyectoService.getProyectos().subscribe(proyectos=>projects = proyectos);
    
    return this.projects$.filter(project => {
      const term = text.toLowerCase();
      return project.codigo.toLowerCase().includes(term)
        || project.estado.toLowerCase().includes(term)
        || project.deploymentState.toLowerCase().includes(term)
        || project.ultimoDespliegue!.includes(term)
    })
  }

  projectDetail(id: number) {
    this.router.navigate(['/proyectos/' + id])
  }

  newProyect() {
    if(!this.editProjectView){
      this.newProyectView = !this.newProyectView;
      this.resetProjectData();
    }
    this.editProjectView = false;
  }

  addProjectManager() {
    if (this.pmTempName == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes ingresar por lo menos el nombre de un Project Manager',
      })
    } else {
      this.managers.push(this.pmTempName);
      this.pmTempName = "";
    }
  }

  deleteProjectManager(name: string) {
    let index = this.managers.indexOf(name);
    if (index > -1) {
      this.managers.splice(index, 1);
    }
  }

  saveProject(edit?: boolean) {
    if (this.codigo == "" || this.estado == "" || this.repositorio == "" || this.managers.length == 0||this.tecnologia==""||this.tipo=="") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes llenar todos los campos en blanco',
      });
      this.esValido = false;
    } else {
      let auxProject = {
        nombre: this.nombre,
        estado: this.estado,
        codigo: this.codigo,
        tecnologia:this.tecnologia,
        tipo:this.tipo,
        managers: this.managers,
        repositorio: this.repositorio
      }
      if (edit) {
        let updatedProject = auxProject as ProjectApi;
        updatedProject.id = this.idTemp;       
        this.updateProyecto(updatedProject)
      } else {
        let newProject = auxProject as ProjectApi;
        this.createProyecto(newProject);

      }
      this.newProyectView = false;
      this.editProjectView = false;
    }

  }

  editProject(project: Project) {
    this.editProjectView = !this.editProjectView;

    this.idTemp = project.id!;
    this.nombre = project.nombre;
    this.codigo = project.codigo;
    this.estado = project.estado;
    this.tecnologia = project.tecnologia;
    this.tipo = project.tipo;
    this.deploymentState = project.deploymentState;
    this.primerDespliegue = project.primerDespliegue!;
    this.ultimoDespliegue = project.ultimoDespliegue!;
    this.repositorio = project.repositorio!;
    this.managers = project.managers;
  }

  sleep(time: any) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  resetProjectData() {
    this.codigo = "";
    this.nombre = "";
    this.estado = "";
    this.tecnologia = "";
    this.tipo = "";
    this.deploymentState = "";
    this.ultimoDespliegue = "";
    this.primerDespliegue = "";
    this.managers = [];
    this.repositorio = "";
    this.pmTempName = "";
    this.idTemp = 0;
    this.esValido = true;
    this.getProyectos();
  }

  deleteProject(project: Project) {
    Swal.fire({
      title: '¿Estás seguro que quieres eliminar el proyecto?',
      text: "Ya no podrás recuperar la información del proyecto " + project.codigo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProyecto(project);
        /*
        let indexToEdit = this.localProjects.findIndex((value) => { return value.id == project.id });
        if (indexToEdit > -1) {
          this.localProjects.splice(indexToEdit, 1);
          this.newProyectView = true;
          Swal.fire(
            'Proyecto eliminado!',
            'El proyecto ha sido eliminado con éxito.',
            'success'
          )
          this.sleep(1).then(() => {
            this.newProyectView = false;
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontró el proyecto con código ' + this.codigo,
          })
        }*/

      }
    });
    this.resetProjectData();
  }


}
