import { Play, PlayCircleIcon } from 'lucide-react';
import { sec_to_time } from '../lib/sec_to_time';
import usePlayerStore from '@/lib/store';
import { urlState, timestampState, imageUrlState, titleState, loadedState } from '../lib/signals'

type SnippetsCardProps = {
    snippet: string;
    start_time: string;
    audio_url: string;
    image_url: string;
    title: string
};

function SnippetsCard({ snippet, start_time, audio_url, image_url, title }: SnippetsCardProps) {
    const setUrl = usePlayerStore(state => state.setAudioUrl)
    const setTimestamp = usePlayerStore(state => state.setTimestamp)
    const setImage = usePlayerStore(state => state.setImage)
    const setTitle = usePlayerStore(state => state.setTitle)
    const setFirstLoad = usePlayerStore(state => state.setLoaded)

    const handleTimestampClick = () => {
        // urlState.value = audio_url;
        // timestampState.value = parseInt(start_time) - 10; // subtract 15 seconds
        // imageUrlState.value = image_url;
        // titleState.value = title;
        setFirstLoad(true);
        setUrl(audio_url);
        setTimestamp(parseInt(start_time) - 10); // subtract 15 seconds
        setImage(image_url);
        setTitle(title);
    };

    

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
            <div 
                className='flex flex-row gap-1 justify-end items-center text-red-500 place-self-end text-sm' 
                onClick={handleTimestampClick}
            >
                <div className='text-sm tracking-tighter font-bold text-red-400'>listen from</div> <Play size={11} />{sec_to_time(parseInt(start_time))}
            </div>
            <div className='mt-1 light:text-gray-600 tracking-tight text-sm text-justify'>{snippet}</div>
        </div>
    );
}

export default SnippetsCard;