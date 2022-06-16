import { Route, Routes } from 'react-router-dom'
import ExerciseDetails from '../pages/exercise-datails/exercise-datails.page'
import Home from '../pages/home/home.page'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<ExerciseDetails />} />
        </Routes>
    )
}

export default Router
