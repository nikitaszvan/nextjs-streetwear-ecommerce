export const categoriesRef: Record<string, string> = {
    "shirts-top-men": "Tops",
    "outerwear-top-men": "Outerwear",
    "pants-bottom-men": "Bottoms",
    "shoes-men": "Shoes",
    "all-products": "All"
} as const;

export const sizesRef: Record<string, string> = {
    "XS": "Extra Small",
    "S": "Small",
    "M": "Medium",
    "L": "Large",
    "XL": "Extra Large",
    "2XL": "Extra Extra Large"
} as const;

export const categories = [
    "shirts-top-men",
    "outerwear-top-men",
    "pants-bottom-men",
    "shoes-men"
] as const;

export const colorChoices = [
    {
        name: "Crimson Whisper",
        rgba: "rgba(153, 76, 76, 0.7)"
    },
    {
        name: "Forest Haze",
        rgba: "rgba(76, 102, 76, 0.7)"
    },
    {
        name: "Twilight Indigo",
        rgba: "rgba(76, 76, 153, 0.7)"
    },
    {
        name: "Golden Dusk",
        rgba: "rgba(153, 153, 76, 0.7)"
    },
    {
        name: "Aqua Mist",
        rgba: "rgba(76, 153, 153, 0.7)"
    }
];

export const sizeChoices = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

export const menuCategories: { title: string; href: string; description: string }[] = [
    {
        title: "Tops",
        href: "/shirts-top-men",
        description:
            "Oversized tees and hoodies with bold graphics and boxy fits.",
    },
    {
        title: "Outerwear",
        href: "/outerwear-top-men",
        description:
            "Bombers and puffers in bold colors and collabs.",
    },
    {
        title: "Bottoms",
        href: "/pants-bottom-men",
        description:
            "Cargo pants and baggy jeans with utility features.",
    },
    {
        title: "Footwear",
        href: "/shoes-men",
        description: "Limited sneakers and chunky trainers in rare colorways.",
    },
    {
        title: "All",
        href: "/all-products",
        description:
            "Urban comfort with bold graphics and loose fits.",
    },
];