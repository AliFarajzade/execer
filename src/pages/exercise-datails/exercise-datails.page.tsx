import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Details from '../../components/details/details.component'
import RelatedVideos from '../../components/related-videos/related-videos.component'
import {
    exerciseRequestOptions,
    youtubeRequestOptions,
} from '../../helpers/request-options.helper'
import { TExercise } from '../../types/exercise.types'

const ExerciseDetails: React.FC = () => {
    const { id } = useParams()

    const [exerciseDetails, setExerciseDetails] = useState<TExercise | null>(
        null
    )
    const [isExerciseDetailsLoading, setIsExerciseDetailsLoading] =
        useState<boolean>(false)

    const [youtubeData, setYoutubeData] = useState<any | null>(null)
    const [isYoutubeLoading, setIsYoutubeLoading] = useState<boolean>(false)

    const [targetMuscle, setTargetMuscle] = useState<any | null>(null)
    const [targetMuscleisLoading, setTargetMuscleisLoading] =
        useState<boolean>(false)

    const [equipment, setEquipment] = useState<any | null>(null)
    const [isEquipmentLoading, setIsEquipmentLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchExercisesData = async () => {
            const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com'
            const youtubeSearchUrl =
                'https://youtube-search-and-download.p.rapidapi.com'

            //
            setIsExerciseDetailsLoading(true)
            const exerciseResponse = await fetch(
                `${exerciseDbUrl}/exercises/exercise/${id}`,
                exerciseRequestOptions
            )

            const exerciseDetailData = await exerciseResponse.json()
            setExerciseDetails(exerciseDetailData)
            setIsExerciseDetailsLoading(false)

            //
            setIsYoutubeLoading(true)
            const youtubeSearchResponse = await fetch(
                `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
                youtubeRequestOptions
            )
            const youtubeSearchData = await youtubeSearchResponse.json()
            setYoutubeData(youtubeSearchData)
            setIsYoutubeLoading(false)
            //

            setTargetMuscleisLoading(true)
            const targetMuscleResponse = await fetch(
                `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
                exerciseRequestOptions
            )
            const targetMuscleData = await targetMuscleResponse.json()
            setTargetMuscle(targetMuscleData)
            setTargetMuscleisLoading(false)
            //

            setIsEquipmentLoading(true)
            const equipmentResponse = await fetch(
                `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
                exerciseRequestOptions
            )
            const equipmentData = await equipmentResponse.json()
            setEquipment(equipmentData)
            setIsEquipmentLoading(false)
        }

        fetchExercisesData()
    }, [id])

    console.log(targetMuscle, equipment)

    return (
        <Box>
            {exerciseDetails && (
                <>
                    <Details exerciseDetails={exerciseDetails} />
                    {youtubeData && (
                        <RelatedVideos
                            youtubeData={youtubeData}
                            exerciseName={ExerciseDetails.name}
                        />
                    )}
                </>
            )}
        </Box>
    )
}

export default ExerciseDetails
