export interface ProjectApi{
    id:number|null;
    nombre: string,
    estado: string;
    codigo: string;
    ultimoDespliegue: string;
    primerDespliegue: string;
    tecnologia:string;
    tipo:string;
    managers: string[];
    repositorio: string;
}