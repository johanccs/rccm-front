export class ProviderCreateDto {

    name: string;
    delimiter: number;
    nrOfDigits: number;

    constructor(name: string, delim: number, nrOfDigits: number){   
        this.name = name;
        this.delimiter = delim;
        this.nrOfDigits = nrOfDigits;
    }
}