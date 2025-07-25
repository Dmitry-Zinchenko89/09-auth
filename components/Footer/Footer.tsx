import css from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
                <div className={css.wrap}>
                    <p>Developer: Dmitry-Zinchenko89 </p>
                    <p>
                        Contact us:
                        <a href="zinchenko89d@gmail.com"> Dmitry Zinchenko</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
