export const displayHeight = (h: number) => {
    const totalInches = h / 2.54
    const feet = Math.floor(totalInches / 12)
    const inches = Math.round(totalInches % 12)
    return `${feet}'${inches}`
}
