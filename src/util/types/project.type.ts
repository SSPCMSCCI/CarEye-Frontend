interface ServiceCost {
    service: string;
    unitCost: string;
    dailyCost: number;
    previousMonthCost: number;
}

export interface Project {
    id: number|null,
    nombre: string,
    estado: string;
    codigo: string;
    deploymentState: string;
    ultimoDespliegue: string|null;
    primerDespliegue: string|null;
    tecnologia:string;
    tipo:string;
    managers: string[];
    repositorio: string|null;
    servicesCost: ServiceCost[];
}