import axios from 'axios';
        
export async function getImagesByQuery(query, page) {
    const server = axios.create({
        baseURL: 'https://pixabay.com/api/',
        params: {
            key: '34647227-856c4916cf69f9df89be744ef',
            q: query,
            page: page,
            per_page: "15",
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
    },
    });
    try {
        const response = await server.get();
        const data = response.data;
        return data;
    }
        catch(error) {
            console.log("API error", error);
            throw error;
        };
    
};