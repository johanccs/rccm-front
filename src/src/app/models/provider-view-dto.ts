export class ProviderViewDto {

    id: number;
    name: string;
    delimiter: number;
    nrOfDigits: number;

    constructor(id: number, name: string, delim: number, nrOfDigits: number){
        this.id = id;
        this.name = name;
        this.delimiter = delim;
        this.nrOfDigits = nrOfDigits;
    }
}