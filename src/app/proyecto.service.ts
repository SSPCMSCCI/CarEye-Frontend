import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Logs, Project,ProjectApi, Services } from 'src/util/types';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  proyectosUrl = "http://localhost:3000/proyectos";
  serviciosurl = "http://localhost:3000/servicios";
  repositorioUrl = "http://localhost:3000/repositorios";
  options = {
    headers: {
      'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000'
    }
  };

  constructor(private http: HttpClient) { }

  getProyectos():Observable<Project[]>{
    return this.http.get<Project[]>(this.proyectosUrl,this.options).pipe(map((resp:any)=>resp.data));
  }

  getProyecto(id:number):Observable<Project>{
    const url =`${this.proyectosUrl}/${id}`;
    return this.http.get<Project>(url).pipe(map((resp:any)=>resp.data));
  }

  addProyecto(proyecto:ProjectApi):Observable<Project>{
    return this.http.post<Project>(this.proyectosUrl,proyecto,this.options).pipe(map((resp:any)=>resp.data));
  }

  updateProyecto(proyecto:ProjectApi):Observable<Project>{
    const url =`${this.proyectosUrl}/${proyecto.id!}`;
    return this.http.put<Project>(url,proyecto,this.options).pipe(map((resp:any)=>resp.data));
  }

  deleteProyecto(id:number):Observable<boolean>{
    const url =`${this.proyectosUrl}/${id}`;
    return this.http.delete<boolean>(url,this.options).pipe(map((resp:any)=>resp.data))
  }

  getMetricas(id:number){
    const url =`${this.proyectosUrl}/${id}/metricas`;
    return this.http.get(url).pipe(map((resp:any)=>resp.data));
  }

  getMetricData(id:number,metric:string,timeframe:string){
    const url =`${this.proyectosUrl}/${id}/metricas/${metric}?timeframe=${timeframe}`;
    return this.http.get(url).pipe(map((resp:any)=>resp.data));
  }

  getLogs(id:number):Observable<Logs[]>{
    const url =`${this.proyectosUrl}/${id}/logs`;
    return this.http.get<Logs[]>(url,this.options).pipe(map((resp:any)=>resp.data));
  }

  getPrecios(id:number):Observable<Services[]>{
    const url =`${this.serviciosurl}/proyecto/${id}/costos`;
    return this.http.get<Services[]>(url,this.options).pipe(map((resp:any)=>resp.data));
  }

  getDesplegados():Observable<any>{
    const url =`${this.proyectosUrl}/desplegados`;
    return this.http.get(url,this.options).pipe(map((resp:any)=>resp.data));
  }

  desplegarProyecto(id:number){
    const url =`${this.proyectosUrl}/desplegar/${id}`;
    return this.http.put(url,this.options).pipe(map((resp:any)=>{resp.data}));
  }


}
