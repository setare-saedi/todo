import { title } from "process"
import NavLink from "./navLink"
import { link } from "fs"
import { LinkType } from "./navLinkType"

const links: LinkType[]=[
    {id:1, title:'خانه', href:'/'},
    {id:2, title:'لیست برنامه ها', href:'/'},
    {id:3, title:'درباره ما', href:'/'},
]
export default function Nav() {

    return (
        <nav className=' flex justify-between items-center px-6 py-3 bg-violet-100 border-b-2 border-violet-300 shadow-md'>
            <div>
                Logo
            </div>
            <div>
                <ul className=' flex gap-4 text-sm '>
                   {
                    links.map((link)=>(<li key={link.id}>
                        <NavLink {...link} />
                    </li>))
                   }
                </ul>
            </div>
            <div>
                Date
            </div>
        </nav>
    )
}
