import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default async function Header() {
    return (
        <header className={css.header}>
            <Link href="/" aria-label="Home">
                NoteHub
            </Link>
            <nav aria-label="Main Navigation">
                <ul className={css.navigation}>
                    <li>
                        <TagsMenu />
                    </li>
                    <li>
                        <Link href="/">Home</Link>
                    </li>

                    <AuthNavigation />
                </ul>
            </nav>
        </header>
    );
}