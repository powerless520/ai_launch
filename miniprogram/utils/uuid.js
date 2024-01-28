const UserUtils = {
    generateRandomUserID: function(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let userID = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            userID += characters.charAt(randomIndex);
        }

        return userID;
    }
};

export default UserUtils;
