import { useRef } from 'react'

import Line from '@/components/tools/Line'
import moi_a_brasse from '@/lib/media/moi_a_brasse.png'

const Preview = () => {
    const preview = useRef<HTMLDivElement>(null)

    return (
        <div id="preview-profile" className="relative w-full bg-black pb-[200px]" ref={preview}>
            <section id="hero" className="px-gutter pt-[160px]">
                <h1 className="impact-text">
                    Hi coach! <br />
                    i'm étienne
                </h1>
                <div className="grid grid-cols-2 pt-[96px] gap-6">
                    <div>
                        <p className="big-p pr-[20%]">
                            I’m a 21 years old freestyle swimmer from Trois-Rivières, Quebec.
                        </p>
                    </div>
                    <div className="media-frame w-full">
                        <img src={moi_a_brasse} alt="photo de profile - Étienne Courchesne" />
                    </div>
                </div>
            </section>

            <section id="overview" className="px-gutter pt-[96px] pb-96">
                <Line />
            </section>
        </div>
    )
}

export default Preview
