export class Beer {
    beer: BeerSub;
    id: number;
    location_id: number;
    Alchohol_content: string;
    beer_description: string;
    beer_logo: string;
    price: number;
    beer_categories: Array<BeerCategory>;
    name: string;
}

export class BeerSub {
    id: number;
    location_id: number;
    Alchohol_content: string;
    beer_description: string;
    beer_logo: string;
    price: number;
    beer_categories: Array<BeerCategory>;
    name: string;
}

export class BeerCategory {
    id: number;
    beer_style_id: number;
    beer_id: number;
    beer_style: BeerStyle;
}

export class BeerStyle {
    id: number;
    type: string;
}
