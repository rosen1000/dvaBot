import * as zalgo from "to-zalgo";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            DB: string
        }
    }
}