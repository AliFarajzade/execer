import { Typography } from '@mui/material'
import { useContext } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import BodyPart from '../body-part/body-part.component'

interface IProps {
    categories: string[]
    bodypart: string
    setBodyPart: (bodyPart: string) => void
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

const HorizontalScrollbar: React.FC<IProps> = ({
    categories,
    bodypart,
    setBodyPart,
}) => {
    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {categories.map(category => (
                <BodyPart
                    itemId={category}
                    category={category}
                    bodypart={bodypart}
                    setBodyPart={setBodyPart}
                    key={category}
                />
            ))}
        </ScrollMenu>
    )
}

export default HorizontalScrollbar
