import { Stack } from '@mui/material'
import { LineWave } from 'react-loader-spinner'

const Loader = () => (
    <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="100%"
    >
        <LineWave
            color="blue"
            height={220}
            width={220}
            ariaLabel="three-circles-rotating"
        />
    </Stack>
)

export default Loader
