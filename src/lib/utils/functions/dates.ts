import eng from '../../lang/eng'

export const age = (dob: Date) => {
    const diff = Date.now() - dob.getTime()
    const ageDate = new Date(diff)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export const displayDate = (date: Date, t: typeof eng) => {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    if (t.name === 'eng') return `${t.dates.months[month]} ${day + 1}${t.dates.daySuffixes[day]}, ${year}`
    return `${day + 1}${t.dates.daySuffixes[day]} ${t.dates.months[month]} ${year}`
}
