import { FC, SVGProps } from 'react'

const Logo: FC<SVGProps<SVGSVGElement>> = ({ fill, ...props }) => {
    return (
        <svg {...props} viewBox="0 0 64 22" className="duration-300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                className="duration-300"
                d="M32.9687 22H27.2187L16.5625 5.25L5.6875 22H0L14.6562 0H18.4062L32.9687 22Z"
                fill={fill}
            />
            <path
                className="duration-300"
                d="M63.9634 22H57.3696L48.4009 13.7187L39.4946 22H32.8384L45.1821 11L32.8384 0H39.4634L48.4009 8.3125L57.3384 0H63.9009L51.6509 10.7812L63.9634 22Z"
                fill={fill}
            />
        </svg>
    )
}

export default Logo
