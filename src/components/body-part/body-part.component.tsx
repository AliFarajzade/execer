import { Stack, Typography } from '@mui/material'

interface IProps {
    category: string
    bodypart: string
    setBodyPart: (bodyPart: string) => void
    itemId: string
}

const BodyPart: React.FC<IProps> = ({ category, bodypart, setBodyPart }) => {
    return (
        <Stack
            m="0 40px"
            itemType="button"
            alignItems="center"
            justifyContent="center"
            className="bodyPart-card"
            sx={
                bodypart === category
                    ? {
                          borderTop: '4px solid #FF2625',
                          background: '#fff',
                          borderBottomLeftRadius: '20px',
                          width: '270px',
                          height: '282px',
                          cursor: 'pointer',
                          gap: '47px',
                      }
                    : {
                          background: '#fff',
                          borderBottomLeftRadius: '20px',
                          width: '270px',
                          height: '282px',
                          cursor: 'pointer',
                          gap: '47px',
                      }
            }
            onClick={() => {
                setBodyPart(category)
                window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' })
            }}
        >
            <img
                src="/assets/icons/gym.png"
                alt="dumbbell"
                style={{ width: '40px', height: '40px' }}
            />
            <Typography
                fontSize="24px"
                fontWeight="bold"
                fontFamily="Alegreya"
                color="#3A1212"
                textTransform="capitalize"
            >
                {' '}
                {category}
            </Typography>
        </Stack>
    )
}

export default BodyPart
