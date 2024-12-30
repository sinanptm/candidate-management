export const isValidString = (str?: string): boolean => {
    return str !== undefined && str !== null && str.trim() !== '';
}