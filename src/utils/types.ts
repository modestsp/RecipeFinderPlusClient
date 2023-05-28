export interface IRecipe{
    id: number
    title: string
    image: string
    likes: number
}

export interface IRecipeStep{
    number: number
    step: string
}

export interface IRecipeIngredient{
    name: string
    nameClean: string
    original: string
    originalName: string
    unit: string
}