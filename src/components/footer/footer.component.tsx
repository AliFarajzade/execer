import './footer.styles.scss'

const Footer = () => (
    <footer className="footer">
        <h1>
            <a
                href="https://github.com/alifarajzade/execer"
                className="footer__link"
            >
                Execer
            </a>{' '}
            | Built by ❤{' '}
            <a href="https://github.com/alifarajzade" className="footer__link">
                &copy; 2022 Ali Farajzade
            </a>
        </h1>
    </footer>
)

export default Footer
