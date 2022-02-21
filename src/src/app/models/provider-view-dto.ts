export class ProviderViewDto {

    name: string;
    delimiter: number;

    constructor(name: string, delim: number){
        this.name = name;
        this.delimiter = delim;
    }
}