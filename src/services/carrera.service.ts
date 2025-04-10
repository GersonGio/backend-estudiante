
import { AppDataSource } from "../config/db";
import { Carrera } from "../entities/Carrera.entities";

// Crear el repositorio
const carreraRepository = AppDataSource.getRepository(Carrera);

// C = Create, R = Read, = U = Update, D = Delete

// Leer todas las carreras
export const srvGetCarreras = async () => {
    // select * from carreras order by id_carrera desc;
    const carreras = await carreraRepository.find({
        order: {nombreCarrera: 'ASC'}
    });

    return carreras;
}

// Obtener una carrera
export const srvGetCarreraByID = async (pIdCCarrera: number) => {
    const carrera = await carreraRepository.findOne({
        where: { idCarrera: pIdCCarrera}
    });

    return carrera;
}

// Crear una nueva carrera
export const srvCreateCarrera = async (pNombreCarrera: string) => {
    const nuevaCarrera = new Carrera();

    nuevaCarrera.nombreCarrera = pNombreCarrera;

    return await carreraRepository.save(nuevaCarrera);

}

// Actualizar carrera
export const srvUpdateCarrera = async (pIdCarrera: number, pNombreCarrera: string) => {
    // Buscar carrera
    const carrera = await carreraRepository.findOne({
        where: {idCarrera: pIdCarrera}
    });

    //validacion
    if(!carrera) return null;

    carrera.nombreCarrera = pNombreCarrera;

    return await carreraRepository.save(carrera);
}

// Eliminar Carrera
export const srvDeleteCarrera = async (pIdCarrera: number) => {
    // Buscar carrera
    const carrera = await carreraRepository.findOne({
        where: {idCarrera: pIdCarrera}
    });

    //validacion
    if(!carrera) return null;

    return await carreraRepository.remove(carrera);
}