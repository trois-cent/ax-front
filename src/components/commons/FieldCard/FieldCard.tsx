import { FC } from 'react'
import './styles.scss'
import t from '../../../lib/lang/eng'

export type Field = {
    label: string
    value: string | 'dna'
}

type FieldCardProps = {
    fields: Array<Field>
    color: 'white' | 'accent'
}

const FieldCard: FC<FieldCardProps> = ({ fields, color }) => {
    return (
        <div className={`field-card ${color}`}>
            {fields.map((field, i) => (
                <div className="contents" key={i}>
                    {i !== 0 && <hr />}
                    <div className="field">
                        <p className="label">{field.label}</p>
                        <p className={`value ${field.value === t.kw.dna ? 'na' : ''}`}>{field.value}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FieldCard
