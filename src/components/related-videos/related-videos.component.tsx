import { Box, Stack, Typography } from '@mui/material'

interface IProps {
    youtubeData: any
    exerciseName: string
}

const RelatedVideos: React.FC<IProps> = ({ exerciseName, youtubeData }) => {
    console.log(youtubeData)

    return (
        <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
            <Typography
                sx={{ fontSize: { lg: '44px', xs: '25px' } }}
                fontWeight={700}
                color="#000"
                mb="33px"
            >
                Watch{' '}
                <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>
                    {exerciseName}
                </span>{' '}
                exercise videos
            </Typography>
            <Stack
                sx={{
                    flexDirection: { lg: 'row' },
                    gap: { lg: '110px', xs: '0px' },
                }}
                justifyContent="flex-start"
                flexWrap="wrap"
                alignItems="center"
            >
                {youtubeData.contents
                    .slice(0, 3)
                    ?.map((item: any, index: number) => (
                        <a
                            key={index}
                            className="exercise-video"
                            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                style={{ borderTopLeftRadius: '20px' }}
                                src={item.video.thumbnails[0].url}
                                alt={item.video.title}
                            />
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: { lg: '28px', xs: '18px' },
                                    }}
                                    fontWeight={600}
                                    color="#000"
                                >
                                    {item.video.title}
                                </Typography>
                                <Typography fontSize="14px" color="#000">
                                    {item.video.channelName}
                                </Typography>
                            </Box>
                        </a>
                    ))}
            </Stack>
        </Box>
    )
}

export default RelatedVideos