import BaseUrl from "./BaseUrl";
import axios from "axios";

const AnnouncmentService = {
    getAll: async function()
    {   
        return await axios.get(BaseUrl() + 'api/announcment/all');
    },

    addAnnouncmnet: async function(body)
    {   
        return await axios.post(BaseUrl() + 'api/announcment/add', body);
    },

    deleteAnnouncmnet: async function(id)
    {   
        return await axios.delete(BaseUrl() + 'api/announcment/delete/' + id);
    },

    updateAnnouncmnet: async function(body)
    {   
        return await axios.put(BaseUrl() + 'api/announcment/edit', body);
    },

    getAnnouncmnet: async function(id)
    {   
        return await axios.get(BaseUrl() + 'api/announcment/get/' + id);
    },
}

export default AnnouncmentService