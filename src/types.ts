interface Receipt {
    retailer: string;
    purchaseDate: string;
    purchaseTime: string;
    items: Item[];
    total: string;
}

interface Item {
    shortDescription: string;
    price: string;
}

export { Receipt, Item };