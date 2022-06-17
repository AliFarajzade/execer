export const requestOptions = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_EXERCISEDB_SECRET_KEY as string,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
}
