import { Project } from "../types";

export const PROJECTS: Project[] = [
    {
        id: 1,
        nombre:'Proyecto',
        estado: 'Activo',
        codigo: 'PRY201999',
        deploymentState: 'No Desplegado',
        ultimoDespliegue: '02/02/2019',
        primerDespliegue:'',
        tecnologia:'',
        tipo:'',
        managers: ['Jefe de Proyecto 1', 'Jefe de Proyecto 2'],
        repositorio: 'https://git.com',
        servicesCost: [
            {
                service: 'Code Deploy',
                unitCost: '1$/despliegue',
                dailyCost: 2,
                previousMonthCost: 0
            },
            {
                service: 'EC2',
                unitCost: '0.8$/día',
                dailyCost: 5,
                previousMonthCost: 18
            },
        ]
    },
    {
        id: 2,
        nombre:'Proyecto',
        estado: 'Activo',
        codigo: 'PRY201999',
        deploymentState: 'No Desplegado',
        ultimoDespliegue: '02/02/2019',
        primerDespliegue:'',
        tecnologia:'',
        tipo:'',
        managers: ['Jefe de Proyecto 1', 'Jefe de Proyecto 2'],
        repositorio: 'https://git.com',
        servicesCost: [
            {
                service: 'Code Deploy',
                unitCost: '1$/despliegue',
                dailyCost: 2,
                previousMonthCost: 0
            },
            {
                service: 'EC2',
                unitCost: '0.8$/día',
                dailyCost: 5,
                previousMonthCost: 18
            },
        ]
    },
    {
        id: 3,
        nombre:'Proyecto',
        estado: 'Activo',
        codigo: 'PRY201999',
        deploymentState: 'No Desplegado',
        ultimoDespliegue: '02/02/2019',
        primerDespliegue:'',
        tecnologia:'',
        tipo:'',
        managers: ['Jefe de Proyecto 1', 'Jefe de Proyecto 2'],
        repositorio: 'https://git.com',
        servicesCost: [
            {
                service: 'Code Deploy',
                unitCost: '1$/despliegue',
                dailyCost: 2,
                previousMonthCost: 0
            },
            {
                service: 'EC2',
                unitCost: '0.8$/día',
                dailyCost: 5,
                previousMonthCost: 18
            },
        ]
    }
]