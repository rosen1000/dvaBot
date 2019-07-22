const Keyv = require("keyv");
const dataBaseServers = new Keyv(process.env.DB, { namespace: "servers" });
const dataBaseUsers = new Keyv(process.env.DB, { namespace: "server-members" });
dataBaseServers.on("error", e => console.log("MongoDB(servers) connection error: " + e));
dataBaseUsers.on("error", e => console.log("MongoDB(users) connection error: " + e));
const file = require("./keyv.js");

module.exports = {
    servers: {
        set: function (key, value) {
            dataBaseServers.set(key, value);
        },
        get: function (key) {
            return dataBaseServers.get(key);
        },
        delete: function (key) {
            dataBaseServers.delete(key);
        },
        users: {
            set: function (serverID, memberID, type, value, push = false) {
                let member = dataBaseUsers.get(serverID.memberID);
                if (!member[type]) member[type] = "";
                if (push) member[type] += value;
                else member[type] = value;
                let a = file.servers.users.get(serverID);
                a[memberID] = member;
                dataBaseUsers.set(server, a);
            },
            get: function (serverID, memberID) {
                if (memberID) return dataBaseUsers.get(serverID.memberID);
                else return dataBaseUsers.get(serverID);
            },
            delete: function (serverID, memberID) {
                dataBaseUsers.delete(serverID[memberID]);
            }
        }
    }
}