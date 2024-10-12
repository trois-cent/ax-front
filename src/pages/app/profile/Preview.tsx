import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Line from '@/components/tools/Line'
import p from '@/lib/fakes/profile'
import t from '@/lib/lang/eng'
import SplitText from '@/components/tools/SplitText/SplitText'
import { bigPIn, impactTextIn } from '@/lib/animations/textAnimations'
import MediaFrame from '@/components/commons/MediaFrame/MediaFrame'
import SectionTitle from '@/components/commons/SectionTitle'
import FieldCard from '@/components/commons/FieldCard/FieldCard'
import { toOverviewAcademics, toOverviewBasics, toOverviewSports } from '@/lib/utils/functions/fieldCardsMappers'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Preview = () => {
    const preview = useRef<HTMLDivElement>(null)

    useGSAP(
        () => {
            gsap.from('#overview .field-card', {
                opacity: 0,
                duration: 0.5,
                ease: 'power3.inOut',
                stagger: 0.15,
                scrollTrigger: {
                    trigger: '#overview .field-card',
                    scroller: document.querySelector('main .inner'),
                    start: 'top 85%',
                },
            })
        },
        { scope: preview }
    )

    return (
        <div id="preview-profile" className="relative w-full bg-black pb-[200px]" ref={preview}>
            <section id="hero" className="px-gutter pt-[160px]">
                <h1 className="impact-text flex flex-col items-center">
                    <SplitText animation={() => impactTextIn(0.3)}>
                        {t.profile.greetings[p.overview.greetings]}
                    </SplitText>
                    <SplitText
                        animation={() => impactTextIn(t.profile.greetings[p.overview.greetings].length * 0.03 + 0.3)}
                    >
                        i'm {p.overview.nickname}
                    </SplitText>
                </h1>
                <p className="big-p w-[min(600px,_var(--cont))] text-center mx-auto py-16">
                    <SplitText animation={() => bigPIn(1)}>{p.overview.shortDescription}</SplitText>
                </p>
                <MediaFrame
                    frameClass="w-[min(1020px,_90%)] mx-auto"
                    src={p.profilePicture}
                    alt={`${p.user.firstname} ${p.user.lastname}`}
                    delay={1.5}
                />
            </section>

            <section id="overview" className="px-gutter pt-[96px] pb-96">
                <Line />
                <SectionTitle title={t.profile.sections.overview} />
                <p className="big-p py-[96px] max-w-[1020px]">
                    <SplitText animation={() => bigPIn(0, true)}>{p.overview.introParagraph}</SplitText>
                </p>
                <div className="space-y-6 xl:space-y-0 xl:grid xl:grid-cols-3 gap-6">
                    <FieldCard fields={toOverviewBasics(p.user, p.overview)} color="white" />
                    <FieldCard fields={toOverviewSports(p.sportsHistory)} color="white" />
                    <FieldCard fields={toOverviewAcademics(p.academics)} color="white" />
                </div>
            </section>

            <section id="sports-history"></section>
        </div>
    )
}

export default Preview
