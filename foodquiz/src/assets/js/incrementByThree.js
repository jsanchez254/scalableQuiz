var x = -1;
var act = 0;

export function increment(){
    if(act == 0){
        act = 1
        return -1;
    }
    console.log("COME ON ",x);
    x += 3;
    return x;
}

export function getAnswer1(){
    return x;
}