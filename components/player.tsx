import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactHowler from 'react-howler';
import raf from 'raf';
import { Play, Pause } from 'lucide-react';
import { Slider } from './ui/slider';
import usePlayerStore from '../lib/store'
import { sec_to_time, sec_to_timestamp } from '../lib/sec_to_time'

export default function PlayerComponent() {
    const [playing, setPlaying] = useState(false);
    const [seek, setSeek] = useState(0.0);
    const [loaded, setLoaded] = useState(true);
    const [duration, setDuration] = useState<number | null>(null);
    const [isSeeking, setIsSeeking] = useState(false);

    const title = usePlayerStore(state => state.title)
    const timestamp = usePlayerStore(state => state.timestamp)
    const url = usePlayerStore(state => state.url)
    const image_url = usePlayerStore(state => state.image)

    // In useEffect hook
    useEffect(() => {
        if (playerRef.current && loaded) {
            playerRef.current.seek(timestamp);
        }
    }, [url, timestamp, loaded]);

    const playerRef = useRef(null);
    let _raf: number;


    useEffect(() => {
        return () => {
            clearRAF();
        };
    }, []);

    const handleOnPlay = () => {
        setPlaying(true);
        renderSeekPosonSeek();
    };

    const handleOnEnd = () => {
        setPlaying(false);
        clearRAF();
    };

    const handleOnLoad = () => {
        setLoaded(true);
        setDuration(playerRef.current.duration());
    };

    const handlePlayToggle = useCallback(() => {
        setPlaying((prevPlaying) => !prevPlaying);
    }, []);

    const handleMouseDownSeek = () => {
        setIsSeeking(true);
    };

    const handleMouseUpSeek = (e: React.MouseEvent<HTMLInputElement>) => {
        setIsSeeking(false);
        const newSeekValue = parseFloat((e.target as HTMLInputElement).value);
        playerRef.current.seek(newSeekValue);
        setSeek(newSeekValue);
        console.log(seek)
        console.log(newSeekValue)
    };

    const handleSeekingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        // console.log('seek:')
        // console.log(seek)
        setSeek(parseFloat(e.target.value));
    };

    // useEffect(() => {
    //     if (playing) {
    //         renderSeekPos();
    //     }
    // }
    // , [seek]);

    const renderSeekPosonSeek = () => {
        if (!isSeeking) {
            setSeek(playerRef.current.seek());
        }
        if (playing) {
            _raf = raf(renderSeekPosonSeek);
        }
    };

    const renderSeekPos = useCallback(() => {
        if (playerRef.current && !isSeeking) {
            setSeek(playerRef.current.seek());
        }
        if (playing) {
            _raf = raf(renderSeekPos);
        }
    }, [playing, isSeeking]);

    useEffect(() => {
        if (playing) {
            raf(renderSeekPos);
        }
    }, [playing, renderSeekPos]);

    const clearRAF = () => {
        raf.cancel(_raf);
    };


    return (
        <>
            {loaded && (
                <div className="fixed bottom-0 left-0 w-full bg-gray-200/80 p-4 dark:bg-[#001d3d] ">
                    <ReactHowler
                        src='https://anchor.fm/s/efc0a2c/podcast/play/64765651/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2023-1-9%2F182e7a2a-a472-cb96-46f8-88f3a7801e89.mp3'
                        playing={playing}
                        onLoad={handleOnLoad}
                        onPlay={handleOnPlay}
                        onEnd={handleOnEnd}
                        ref={playerRef}
                    />
                    {/* <Slider
                        min={0}
                        max={1}
                        // onChange={handleSeeking}
                        // onPointerUp={handleSeekComplete}
                    /> */}
                    <div className='grid grid-cols-5 max-h-24'>
                        <div className='col-span-1'>
                            <img src={image_url} className='p-2 max-h-28 max-w-28' />
                        </div>
                        <div className='col-span-4'>
                            <div className="seek">
                                <label>
                                    <span className="slider-container">
                                        <input
                                            className='w-full mb-4 '
                                            type="range"
                                            min="0"
                                            max={duration ? duration.toFixed(2) : 0}
                                            step=".01"
                                            value={seek}
                                            onChange={handleSeekingChange}
                                            onPointerDown={handleMouseDownSeek}
                                            onPointerUp={handleMouseUpSeek}
                                            draggable="false"
                                        />
                                    </span>
                                </label>
                            </div>
                            <div className='grid grid-cols-4'>
                                <div className='col-span-2 col-start-1 col-end-2'>
                                    <p className='text-gray-600 text-sm font-bold dark:text-cyan-300'>{title}</p>
                                </div>
                                <div className='col-span-2 col-start-3 col-end-5'>
                                    <div className="col-span-2 col-start-3 col-end-5 flex flex-row justify-between items-center">
                                        <button onClick={handlePlayToggle} className=' font-extrabold '>
                                            {playing ? <Pause /> : <Play />}
                                        </button>
                                        <p className='text-gray-600 text-sm dark:text-white/80'>
                                            {sec_to_timestamp(parseFloat(seek.toFixed(2)))}
                                            {' / '}
                                            {duration ? sec_to_timestamp(parseFloat(duration.toFixed(2))) : 'NaN'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );


}