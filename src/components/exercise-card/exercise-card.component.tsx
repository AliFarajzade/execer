import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { TExercise } from '../../types/exercise.types'

interface IProps {
    exercise: TExercise
    exercisePage?: boolean
    itemId?: string
}

const ExerciseCard: React.FC<IProps> = ({ exercise, exercisePage }) => {
    return (
        <Link
            style={{ marginRight: exercisePage ? '40px' : '0' }}
            className="exercise-card"
            to={`/exercise/${exercise.id}`}
        >
            <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
            <Stack direction="row">
                <Button
                    sx={{
                        ml: '21px',
                        color: '#fff',
                        background: '#FFA9A9',
                        fontSize: '14px',
                        borderRadius: '20px',
                        textTransform: 'capitalize',
                    }}
                >
                    {exercise.bodyPart}
                </Button>
                <Button
                    sx={{
                        ml: '21px',
                        color: '#fff',
                        background: '#FCC757',
                        fontSize: '14px',
                        borderRadius: '20px',
                        textTransform: 'capitalize',
                    }}
                >
                    {exercise.target}
                </Button>
            </Stack>
            <Typography
                ml="21px"
                color="#000"
                fontWeight="bold"
                sx={{ fontSize: { lg: '24px', xs: '20px' } }}
                mt="11px"
                pb="10px"
                textTransform="capitalize"
            >
                {exercise.name}
            </Typography>
        </Link>
    )
}

export default ExerciseCard
