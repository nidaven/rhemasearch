import { Play } from 'lucide-react';

type SnippetsCardProps = {
    snippet: string;
    start_time: string;
};

function divmod(x: number, y: number): [number, number] {
    const quotient = Math.floor(x / y)
    const modulus = x % y
    return [quotient, modulus]
}

function sec_to_time(seconds: number): string {
    let [minutes, secs] = divmod(seconds, 60);
    let [hours, remainingMinutes] = divmod(minutes, 60);
    return `${hours}h:${remainingMinutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}m:${secs.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}s`
}


function SnippetsCard({ snippet, start_time }: SnippetsCardProps) {
    return (
        <div className='my-2 p-4 light:bg-gray-100/25 rounded-lg relative overflow-clip'>
            <svg
                className="text-20xl text-cyan-300/50 absolute -top-2 -left-2"
                fill="none"
                height="48"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
            <div className='flex flex-row gap-2 justify-end items-center text-gray-400 place-self-end px- '><Play size={16} /> {sec_to_time(parseInt(start_time))}</div>
            <div className='mt-1 light:text-gray-600 tracking-tight text-sm text-justify'>{snippet}</div>
        </div>
    );
}

export default SnippetsCard;