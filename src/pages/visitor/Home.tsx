import SplitText from '@/components/tools/SplitText/SplitText'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

const Home = () => {
    const pRef = useRef<HTMLDivElement>(null)

    return (
        <div className="relative w-full h-full bg-black flex items-center justify-center">
            <p className="w-[min(600px,80%)] big-p" ref={pRef}>
                <SplitText
                    animation={() =>
                        gsap.from('.line-wrap', {
                            duration: 0.3,
                            y: 30,
                            opacity: 0,
                            stagger: 0.1,
                            ease: 'circ.out',
                            delay: 0.5,
                        })
                    }
                >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt quae laborum asperiores. Itaque
                    reprehenderit ex, possimus, libero at culpa esse dicta sunt, sapiente illo praesentium eum unde
                    cupiditate aut amet accusamus numquam quo ad? Nobis nam deleniti, dicta expedita mollitia est
                </SplitText>
            </p>
        </div>
    )
}

export default Home
