import { GenericResponse } from "../response/generic.response";


export interface ModelInterface<T,ID> {
    getAll(): Promise<GenericResponse<T[]>>;
    getById(id: ID): Promise<GenericResponse<T[]>>;
    create(t: T): Promise<GenericResponse<T[]>>;
    update(t: T, id: ID ): Promise<GenericResponse<T[]>>;
    delete(id: ID): Promise<GenericResponse<T[]>>;
    
}