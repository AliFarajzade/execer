import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { requestOptions } from '../../helpers/request-options.helper'
import { TExercise } from '../../types/exercise.types'
import HorizontalScrollbar from '../horizontal-scrollbar/horizontal-scrollbar.component'

const keys = ['bodyPart', 'name', 'target', 'equipment']

interface IProps {
    bodypart: string
    setBodyPart: (bodyPart: string) => void
    setExercises: (exercises: TExercise[]) => void
}

const SearchExercise: React.FC<IProps> = ({
    bodypart,
    setBodyPart,
    setExercises,
}) => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [fetchedExercises, setFetchedExercises] = useState<
        TExercise[] | null
    >(null)
    const [isExercisesLoading, setIsExercisesLoading] = useState<boolean>(false)
    const [exercisesError, setExercisesError] = useState<unknown | null>(null)

    const [categories, setCategories] = useState<string[]>([])
    const [isCategoriesLoading, setIsCategoriesLoading] =
        useState<boolean>(false)
    const [categoriesError, setCategoriesError] = useState<unknown | null>(null)

    const handleSearchChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(event.target.value.toLowerCase()),
        []
    )

    const handleFetchData = async () => {
        if (!searchValue.trim()) return // Ignore empty value

        setExercisesError(null)
        setIsExercisesLoading(true)

        try {
            const response = await fetch(
                'https://exercisedb.p.rapidapi.com/exercises',
                requestOptions
            )
            const data = (await response.json()) as Record<string, string>[]

            const filterdData = data.filter(exercise =>
                keys.some(key =>
                    exercise[key].toLowerCase().includes(searchValue)
                )
            ) as TExercise[] | []

            setFetchedExercises(filterdData)
            setSearchValue('')
        } catch (error) {
            setExercisesError(error)
        }

        setIsExercisesLoading(false)
    }

    useEffect(() => {
        ;(async () => {
            setCategoriesError(null)
            setIsCategoriesLoading(true)
            try {
                const response = await fetch(
                    'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
                    requestOptions
                )
                const data = await response.json()

                setCategories(data)
            } catch (error) {
                setCategoriesError(error)
            }
            setIsCategoriesLoading(false)
        })()

        return () => {
            setCategories([])
            setIsCategoriesLoading(false)
        }
    }, [])

    console.log(
        '\nfetchedExercises:',
        fetchedExercises,
        'isExercisesLoading:',
        isExercisesLoading,
        'exercisesError:',
        exercisesError
    )

    return (
        <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
            <Typography
                fontWeight={700}
                sx={{ fontSize: { lg: '44px', xs: '30px' } }}
                mb="49px"
                textAlign="center"
            >
                Awesome Exercises You <br /> Should Know
            </Typography>
            <Box position="relative" mb="72px">
                <TextField
                    sx={{
                        input: {
                            fontWeight: '700',
                            border: 'none',
                            borderRadius: '4px',
                        },
                        width: { lg: '1170px', xs: '350px' },
                        backgroundColor: '#fff',
                        borderRadius: '40px',
                    }}
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search Exercises"
                    type="text"
                />
                <Button
                    className="search-btn"
                    sx={{
                        bgcolor: '#FF2625',
                        color: '#fff',
                        textTransform: 'none',
                        width: { lg: '173px', xs: '80px' },
                        height: '56px',
                        position: 'absolute',
                        right: '0px',
                        fontSize: { lg: '20px', xs: '14px' },
                    }}
                    onClick={handleFetchData}
                >
                    Search
                </Button>
            </Box>
            <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
                <HorizontalScrollbar
                    bodypart={bodypart}
                    setBodyPart={setBodyPart}
                    categories={categories}
                />
            </Box>
        </Stack>
    )
}

export default SearchExercise
