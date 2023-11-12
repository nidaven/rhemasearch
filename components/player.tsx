import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactHowler from 'react-howler';
import { Howl } from 'howler';
import raf from 'raf';
import { Play, Pause } from 'lucide-react';
import { urlState, timestampState, imageUrlState, titleState, loadedState } from '../lib/signals'
import { signal } from '@preact/signals-react';
import { sec_to_time, sec_to_timestamp } from '../lib/sec_to_time'


export default function PlayerComponent() {
    
    const playing = signal(false)
    const duration = signal(0.0)
    const seeking = signal(false)
    const seek = signal(0.0)
    const playerLoad = signal(false)

    const [audio, setAudio] = useState<Howl | null>(null);
    const _raf = useRef();
    
    
    // In useEffect hook

    // In useEffect hook
    useEffect(() => {
        if (playerRef.current && playerLoad.value && playing.value) {
            playerRef.current.seek(timestampState.value);
            console.log(`The timestamp has been moved to: ${timestampState.value}`)
        }
    }, [timestampState.value]);

    const playerRef = useRef(null);

    // console.log(`The current URL is: ${urlState.value} and the timestamp is: ${timestampState.value}`)

    const handleOnPlay = () => {
        playing.value = true
        console.log('The player has started playing')
        renderSeekPosonSeek();
    };

    const handleOnEnd = () => {
        playing.value = false
        console.log('The player has ended')
        clearRAF();
    };

    const handleOnLoad = () => {
        playing.value = true
        console.log('New instance loaded')
        duration.value = playerRef.current.duration();
        console.log(`The duration is: ${duration.value}`)
    };

    const handlePlayToggle = () => {
        console.log('Attempting to play')
        console.log(`Before: ${playing.value} is the current playing state`)
        playing.value = !playing.value
        console.log(`${playing.value} is the current playing state`)
    }

    const handleMouseDownSeek = () => {
        seeking.value = true
    };

    const handleMouseUpSeek = (e: React.MouseEvent<HTMLInputElement>) => {
        seeking.value = false
        const newSeekValue = parseFloat((e.target as HTMLInputElement).value);
        playerRef.current.seek(newSeekValue);
        seek.value = newSeekValue
    };

    const handleSeekingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSeekValue = parseFloat((e.target as HTMLInputElement).value);
        playerRef.current.seek(newSeekValue);
        seek.value = newSeekValue
    };

    const renderSeekPosonSeek = () => {
        if (playerRef.current && !seeking.value) {
            seek.value = playerRef.current.seek();
        }
        if (playing) {
            _raf.current = raf(renderSeekPosonSeek);
        }
    };

    const clearRAF = () => {
        raf.cancel(_raf.current);
        console.log('unmounting player component')
    };

    useEffect(() => {
        return () => {    
            clearRAF();
        };
    }, []);

    return (
        <>
            {loadedState.value && (
                <div className="fixed bottom-0 left-0 w-full bg-gray-200/80 p-4 dark:bg-[#001d3d] ">
                    <ReactHowler
                        key={urlState.value}
                        src='https://anchor.fm/s/efc0a2c/podcast/play/26922858/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-19%2F5faf6d57-3535-76ef-2f0f-2682e72c8184.mp3'
                        playing={playing.value}
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
                            <img src={imageUrlState.value} className='p-2 max-h-28 max-w-28' />
                        </div>
                        <div className='col-span-4'>
                            <div className="seek">
                                <label>
                                    <span className="slider-container">
                                        <input
                                            className='w-full mb-4 '
                                            type="range"
                                            min="0"
                                            max={duration.value ? duration.value.toFixed(2) : 0}
                                            step=".01"
                                            value={seek.value}
                                            onChange={handleSeekingChange}
                                            onPointerDown={handleMouseDownSeek}
                                            onPointerUp={handleMouseUpSeek}
                                            draggable="true"
                                        />
                                    </span>
                                </label>
                            </div>
                            <div className='grid grid-cols-4'>
                                <div className='col-span-2 col-start-1 col-end-2'>
                                    <p className='text-gray-600 text-sm md:font-bold dark:text-cyan-300'>{titleState.value}</p>
                                </div>
                                <div className='col-span-2 col-start-3 col-end-5'>
                                    <div className="col-span-2 col-start-3 col-end-5 flex flex-row justify-between items-center">
                                        <button onClick={handlePlayToggle} className=' font-extrabold '>
                                            {playing.value ? <Pause /> : <Play />}
                                        </button>
                                        <p className='text-gray-600 text-sm dark:text-white/80'>
                                            {sec_to_timestamp(parseFloat(seek.value.toFixed(2)))}
                                            {' / '}
                                            {duration ? sec_to_timestamp(parseFloat(duration.value.toFixed(2))) : 'NaN'}
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