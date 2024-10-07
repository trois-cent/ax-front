import { FC } from 'react'

type FakePageProps = {
    name: string
}

const FakePage: FC<FakePageProps> = ({ name }) => {
    return (
        <div className="w-full h-[150vh] bg-black">
            <h1 className="impact-text pt-56 text-center">{name}</h1>
        </div>
    )
}

export default FakePage
