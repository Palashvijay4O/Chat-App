import axios from 'axios';

export const getInviteDetails = (query) => {
    
    return axios.post('/inviteDetails', {id: query.substr(3)}).then(response => {   
        return response.data;
    })
}

export default getInviteDetails;