import { Categories } from "./routes.enum";

export const isValidCategory = (category: string): boolean => Object.values(Categories).includes(category as Categories)