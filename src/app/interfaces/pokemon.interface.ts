export interface ParamsGet {
    start: number,
    end: number
}

export interface Pokemon {
    id: number;
    name: string;
    image: string;
    attack: number;
    defense: number;
    description: string;
}

export interface RequestAPI {
    data: Pokemon[];
    info: string;
}

