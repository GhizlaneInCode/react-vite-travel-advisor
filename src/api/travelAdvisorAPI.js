import axios from 'axios';


export const getPlaces = async (lat, lng, type) => {

    try {
        const { data: { data } } = await axios.get(`https://maps-data.p.rapidapi.com/searchmaps.php`, {
            params: {
                query: type,
                limit: '20',
                lang: 'en',
                lat: lat,
                lng: lng,
                offset: '0',
                zoom: '13'
            },
            headers: {
                'X-RapidAPI-Key': `${import.meta.env.VITE_API_KEY}`,
                'X-RapidAPI-Host': 'maps-data.p.rapidapi.com'
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

