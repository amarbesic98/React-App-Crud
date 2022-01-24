import axios from 'axios';

const url = 'http://localhost:3010/contacts';

export const getContact = async (id) => {
    let newId = id || '';
    return await axios.get(`${url}/${newId}`);
}

export const addContact=(contact) =>{
    return axios.post(url,contact);
}

export const editContact=(id,contact)=>{
    return axios.put(`${url}/${id}`,contact);
}

export const deleteContact=(id)=> {
    return axios.delete(`${url}/${id}`);
}

