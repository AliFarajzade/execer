import { Box } from '@mui/material'
import { useState } from 'react'
import Exercises from '../../components/exercises/exercises.component'
import HeroBanner from '../../components/hero-banner/hero-banner.component'
import SearchExercise from '../../components/search-exercise/search-exercies.component'
import { TExercise } from '../../types/exercise.types'

const Home: React.FC = () => {
    const [bodyPart, setBodyPart] = useState<string>('all')
    const [exercises, setExercises] = useState<TExercise[]>([])

    return (
        <Box>
            <HeroBanner />
            <SearchExercise
                bodypart={bodyPart}
                setBodyPart={setBodyPart}
                setExercises={setExercises}
            />
            <Exercises
                bodypart={bodyPart}
                setExercises={setExercises}
                exercises={exercises}
            />
        </Box>
    )
}

export default Home
