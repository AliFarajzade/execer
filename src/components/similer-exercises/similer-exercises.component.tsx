import { TExercise } from '../../types/exercise.types'

import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import ExerciseCard from '../exercise-card/exercise-card.component'

interface IProps {
    equipments: TExercise[]
    targetMuscles: TExercise[]
}

const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext)

    return (
        <Typography
            onClick={() => scrollPrev('smooth')}
            className="right-arrow"
        >
            <img src="../assets/icons/left-arrow.png" alt="right-arrow" />
        </Typography>
    )
}

const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext)

    return (
        <Typography onClick={() => scrollNext('smooth')} className="left-arrow">
            <img src="../assets/icons/right-arrow.png" alt="right-arrow" />
        </Typography>
    )
}

const SimilerExercises: React.FC<IProps> = ({ targetMuscles, equipments }) => {
    return (
        <Box
            paddingBottom="100px"
            px="100px"
            sx={{ mt: { lg: '100px', xs: '0px' } }}
        >
            <Box marginBottom="100px">
                <Typography
                    sx={{ fontSize: { lg: '44px', xs: '25px' }, ml: '20px' }}
                    fontWeight={700}
                    color="#000"
                    mb="33px"
                >
                    Similar{' '}
                    <span
                        style={{
                            color: '#FF2625',
                            textTransform: 'capitalize',
                        }}
                    >
                        Target Muscle
                    </span>{' '}
                    exercises
                </Typography>
                <ScrollMenu>
                    {targetMuscles.slice(1, 4).map(target => (
                        <ExerciseCard
                            itemId={target.id}
                            key={target.name}
                            exercise={target}
                            exercisePage
                        />
                    ))}
                </ScrollMenu>
            </Box>
            <Box>
                <Typography
                    sx={{ fontSize: { lg: '44px', xs: '25px' }, ml: '20px' }}
                    fontWeight={700}
                    color="#000"
                    mb="33px"
                >
                    Exercises that uses the same{' '}
                    <span
                        style={{
                            color: '#FF2625',
                            textTransform: 'capitalize',
                        }}
                    >
                        equipment
                    </span>{' '}
                </Typography>
                <ScrollMenu>
                    {equipments.slice(5, 9).map(target => (
                        <ExerciseCard
                            itemId={target.id}
                            key={target.name}
                            exercise={target}
                            exercisePage
                        />
                    ))}
                </ScrollMenu>
            </Box>
        </Box>
    )
}

export default SimilerExercises
