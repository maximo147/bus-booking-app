
interface Metadata {
    id_response: string;
    datetime: string;
    status: string;
    message: string;    
}

export class GenericResponse<T> {
    private metadata: Metadata;
    private data: T;

    constructor(metadata: Metadata, data: T){
        this.metadata = metadata;
        this.data = data;
    }


    setMetadata(metadata: Metadata){
        this.metadata = metadata;
    }

    setData(data: T){
        this.data = data;
    }

    getMetadata(): Metadata{
        return this.metadata;
    }

    getData(): T{
        return this.data;
    }

    toString(){
        return [this.metadata, this.data]
    }



}