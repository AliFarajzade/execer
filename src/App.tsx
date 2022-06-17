import { Box } from '@mui/material'
import Footer from './components/footer/footer.component'
import Navbar from './components/navbar/navbar.component'
import './global.scss'
import Router from './router/router'

const App: React.FC = () => {
    return (
        <>
            <Box width="400px" sx={{ width: { xl: '1440px' } }} m="auto">
                <Navbar />
                <Router />
            </Box>
            <Footer />
        </>
    )
}

export default App
