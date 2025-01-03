export function random(len: number) {
    let option = "qwwewqrtfvddxsfszwae1212232@";
    let length = option.length
    let ans = "";
    for (let i = 0; i < length; i++) {
        ans += option[Math.floor(Math.random() * length)]
    }

    return ans;
}