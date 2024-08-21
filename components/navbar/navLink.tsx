import Link from 'next/link'
import {LinkType} from './navLinkType'

function NavLink(props:LinkType) {
    return (
        <Link href={props.href}>
            {props.title}
        </Link>)
}

export default NavLink