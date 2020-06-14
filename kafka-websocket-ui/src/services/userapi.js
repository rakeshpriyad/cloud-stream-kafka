import Axios from "axios";

const api = Axios.create({
    baseURL: 'http://localhost:8080/api/',
});

const userAPI = {
    getMessages: (groupId) => {
        console.log('Calling get messages from API');
        return api.get(`messages/${groupId}`);
    },

   /*  sendMessage: (userId, userName) => {
        let user = {
            id: userId,
            accountNo: "123",
            userName: userName
        }
        return api.post(`sendUser`, user);
    }, */

    sendMessage: (user) => {
        return api.post(`sendUser`, user);
    }
}


export default userAPI;
