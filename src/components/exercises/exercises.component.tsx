import { Box, Pagination, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { exerciseRequestOptions } from '../../helpers/request-options.helper'
import { TExercise } from '../../types/exercise.types'
import ExerciseCard from '../exercise-card/exercise-card.component'
import Loader from '../loader/loader.component'

const EXERCISES_PER_PAGE = 9

interface IProps {
    bodypart: string
    exercises: TExercise[]
    setExercises: (exercises: TExercise[]) => void
}

const Exercises: React.FC<IProps> = ({ bodypart, exercises, setExercises }) => {
    const [page, setPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const paginate = (_event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page)

        window.scrollTo({ top: 1800, behavior: 'smooth' })
    }

    const indexOfLastExercise = EXERCISES_PER_PAGE * page
    const indexOfFirstExercise = indexOfLastExercise - EXERCISES_PER_PAGE
    const currentExercises = exercises.slice(
        indexOfFirstExercise,
        indexOfLastExercise
    )

    useEffect(() => {
        const fetchExercisesData = async () => {
            setIsLoading(true)
            let exercisesData: TExercise[] = []

            if (bodypart === 'all') {
                const response = await fetch(
                    'https://exercisedb.p.rapidapi.com/exercises',
                    exerciseRequestOptions
                )
                exercisesData = await response.json()
            } else {
                const response = await fetch(
                    `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodypart}`,
                    exerciseRequestOptions
                )
                exercisesData = await response.json()
            }

            setExercises(exercisesData)
            setIsLoading(false)
        }

        fetchExercisesData()
    }, [bodypart, setExercises])

    console.log({ isLoading })

    return (
        <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ fontSize: { lg: '44px', xs: '30px' } }}
                mb="46px"
            >
                Showing Results
            </Typography>
            <Stack
                direction="row"
                sx={{ gap: { lg: '80px', xs: '50px' } }}
                flexWrap="wrap"
                justifyContent="center"
            >
                {currentExercises.map(exercise => (
                    <ExerciseCard key={exercise.name} exercise={exercise} />
                ))}
            </Stack>
            {isLoading ? (
                <Loader />
            ) : (
                <Stack
                    sx={{ mt: { lg: '114px', xs: '70px' } }}
                    alignItems="center"
                >
                    {exercises.length > EXERCISES_PER_PAGE && (
                        <Pagination
                            color="standard"
                            shape="rounded"
                            defaultPage={1}
                            count={Math.ceil(
                                exercises.length / EXERCISES_PER_PAGE
                            )}
                            page={page}
                            onChange={paginate}
                            size="large"
                        />
                    )}
                </Stack>
            )}
        </Box>
    )
}

export default Exercises
