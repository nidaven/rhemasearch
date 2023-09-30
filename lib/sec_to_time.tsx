function divmod(x: number, y: number): [number, number] {
    const quotient = Math.floor(x / y)
    const modulus = x % y
    return [quotient, modulus]
}

export function sec_to_time(seconds: number): string {
    let [minutes, secs] = divmod(seconds, 60);
    let [hours, remainingMinutes] = divmod(minutes, 60);
    return `${hours}h:${remainingMinutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}m:${secs.toLocaleString('en-US', { minimumIntegerDigits: 2, maximumFractionDigits: 0, useGrouping: false })}s`;
}


export function sec_to_timestamp(seconds: number): string {
    let [minutes, secs] = divmod(seconds, 60);
    let [hours, remainingMinutes] = divmod(minutes, 60);
    return `${hours}:${remainingMinutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:${secs.toLocaleString('en-US', { minimumIntegerDigits: 2, maximumFractionDigits: 0, useGrouping: false })}`;
}