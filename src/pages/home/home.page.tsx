import { Box } from '@mui/material'
import { useState } from 'react'
import HeroBanner from '../../components/hero-banner/hero-banner.component'
import SearchExercise from '../../components/search-exercise/search-exercies.component'
import { TExercise } from '../../types/exercise.types'

const Home: React.FC = () => {
    const [bodyPart, setBodyPart] = useState<string>('all')
    const [exercies, setExercises] = useState<TExercise[]>([])

    return (
        <Box>
            <HeroBanner />
            <SearchExercise
                bodypart={bodyPart}
                setBodyPart={setBodyPart}
                setExercises={setExercises}
            />
        </Box>
    )
}

export default Home
