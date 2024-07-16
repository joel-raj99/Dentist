"use client"
import Link from 'next/link'
import Styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'
export default function menuLink({item}) {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <Link href={item.path} className={`${Styles.container} ${pathname === item.path && Styles.active}`}>
            {item.icon}
            {item.title}

        </Link>
    )

}