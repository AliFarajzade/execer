import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { exerciseRequestOptions } from '../../helpers/request-options.helper'
import { TExercise } from '../../types/exercise.types'
import HorizontalScrollbar from '../horizontal-scrollbar/horizontal-scrollbar.component'
import Loader from '../loader/loader.component'

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

        try {
            const response = await fetch(
                'https://exercisedb.p.rapidapi.com/exercises',
                exerciseRequestOptions
            )
            const data = (await response.json()) as Record<string, string>[]

            const filterdData = data.filter(exercise =>
                keys.some(key =>
                    exercise[key].toLowerCase().includes(searchValue)
                )
            ) as TExercise[] | []

            setExercises(filterdData)
            setSearchValue('')
        } catch (error) {
            setExercisesError(error)
        }
    }

    useEffect(() => {
        ;(async () => {
            setCategoriesError(null)
            setIsCategoriesLoading(true)
            try {
                const response = await fetch(
                    'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
                    exerciseRequestOptions
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
            {isCategoriesLoading ? (
                <Loader />
            ) : (
                <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
                    <HorizontalScrollbar
                        bodypart={bodypart}
                        setBodyPart={setBodyPart}
                        categories={categories}
                    />
                </Box>
            )}
        </Stack>
    )
}

export default SearchExercise
