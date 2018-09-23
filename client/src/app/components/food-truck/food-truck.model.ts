export class FoodTruck {
    address: string;
    city: string;
    created_at: string;
    description: string;
    featured_image: string;
    food_trucks_menus: Array<FoodTruckMenuItem>;
    food_trucks_reviews: Array<any>;
    id: number;
    name: string;
    phone: string;
    state: string;
    updated_at: string;
    zipcode: string;
}

export class FoodTruckMenuItem {
    created_at: string;
    description: string;
    feature_image: string;
    food_truck_id: number;
    food_trucks_menu_category: any;
    food_trucks_menu_category_id: number;
    id: number;
    name: string;
    price: string;
    updated_at: string;
}
