export const heartBeatFrequency = 10000; // in miliseconds
export const timeOutValue = 25; // in minutes

export var spectatorMode = false;
export function setSpectatorMode(bool){
    spectatorMode = bool
}

export var user_1 = ""
export function setUser_1(str){
    user_1 = str
}

export var user_2 = ""
export async function setUser_2(str){
    user_2=str;
    console.log(user_2)
}

