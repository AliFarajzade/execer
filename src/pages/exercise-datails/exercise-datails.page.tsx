import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Details from '../../components/details/details.component'
import { exerciseRequestOptions } from '../../helpers/request-options.helper'
import { TExercise } from '../../types/exercise.types'

const ExerciseDetails: React.FC = () => {
    const { id } = useParams()

    const [exerciseDetails, setExerciseDetails] = useState<TExercise | null>(
        null
    )
    const [isExerciseDetailsLoading, setIsExerciseDetailsLoading] =
        useState<boolean>(false)

    useEffect(() => {
        setIsExerciseDetailsLoading(true)
        const fetchExercisesData = async () => {
            const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com'
            const youtubeSearchUrl =
                'https://youtube-search-and-download.p.rapidapi.com'

            const response = await fetch(
                `${exerciseDbUrl}/exercises/exercise/${id}`,
                exerciseRequestOptions
            )

            const exerciseDetailData = await response.json()
            setExerciseDetails(exerciseDetailData)
        }
        setIsExerciseDetailsLoading(false)

        fetchExercisesData()
    }, [id])

    console.log(exerciseDetails)

    return (
        <Box>
            {exerciseDetails && <Details exerciseDetails={exerciseDetails} />}
        </Box>
    )
}

export default ExerciseDetails
