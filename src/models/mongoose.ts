import * as mongoose from "mongoose";
import * as chalk from "chalk";

export default (db: string) => {
    const connect = () => {
        mongoose.connect(db, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("Connected to DB!");
        }).catch(e => {
            console.log("Error connecting to db: ", chalk.red(e));
        });
    };
    connect();
};
