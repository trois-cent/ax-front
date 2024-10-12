import t from '../../lang/eng'
import { Field } from '@/components/commons/FieldCard/FieldCard'
import p from '../../fakes/profile'
import { age, displayDate } from './dates'
import { displayHeight } from './metrics'

export const toOverviewBasics = (u: typeof p.user, o: typeof p.overview): Array<Field> => [
    { label: t.labels.fullname, value: `${u.firstname} ${u.lastname}` },
    {
        label: `${t.labels.dob} / ${t.labels.age}`,
        value: `${displayDate(new Date(o.dob), t)} (${age(new Date(o.dob))})`,
    },
    { label: t.labels.height, value: displayHeight(o.height) },
    { label: t.labels.weight, value: `${o.weight} lbs` },
    { label: t.labels.hometown, value: o.hometown },
    { label: t.labels.residency, value: o.residency },
]

export const toOverviewSports = (_s: typeof p.sportsHistory): Array<Field> => {
    const s = _s[_s.length - 1].sports[0]

    return [
        {
            label: t.labels.sport,
            value: t.sports[s.sport].name,
        },
        {
            label: t.sports[s.sport].positions.label,
            value: t.sports[s.sport].positions.values[s.positions[0]],
        },
        {
            label: t.labels.team,
            value: s.team,
        },
        {
            label: t.sports[s.sport].categories.label,
            value: t.sports[s.sport].categories[s.country][s.category],
        },
        {
            label: t.labels.league,
            value: s.league,
        },
    ]
}

export const toOverviewAcademics = (a: typeof p.academics): Array<Field> => [
    {
        label: t.labels.school,
        value: a.school,
    },
    {
        label: t.labels.schoolType,
        value: t.academics.schools[a.schoolType].type,
    },
    {
        label: t.labels.year,
        value: t.academics.schools[a.schoolType].years[a.schoolYear],
    },
    {
        label: t.labels.sats,
        value: a.sats || t.kw.dna,
    },
    {
        label: t.labels.fieldsOfInterests,
        value: a.fields.map(f => t.academics.fields[f]).join(', '),
    },
]
