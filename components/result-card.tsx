`use client`

import { Circle, Play, ChevronDown, ChevronUp } from "lucide-react"
import { History } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { SermonProps } from "@/types/sermon"
import SnippetsCard from "./snippet-card"
import { useState } from "react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../components/ui/collapsible'


type Props = {
    title: string
    text: string
    url: string
    //   category: string
    //   author: string
    image: string
    timestamp: string
}


function ResultCard({ title, summary, url, image_url, date, snippets }: SermonProps) {
    const numResults = snippets.length
    const [open, setOpen] = useState(false)
    // const formatted_time = sec_to_time(parseInt(timestamp))
    console.log(snippets)
    return (
        <Card className="grid justify-items-stretch bg-transparent mb-8">
            <div className="grid grid-cols-3 gap-3 max-h-36 pt-4 px-6 mb-4">
                <img src={image_url} className="max-h-24 object-fill place-self-center" />
                <div className="col-span-2 self-end">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{date}</CardDescription>
                    <p className="text-gray-500 text-sm">{numResults} result(s) found</p>
                </div>
            </div>
            <Collapsible className="grid grid-cols-auto w-full" open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger className="grow shrink-0 p-1 mx-2 text-center text-sm justify-center flex flex-row items-center bg-cyan-200/25 text-cyan-800/100">
                    {open ? 'Hide Summary' : 'Show Summary'}
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </CollapsibleTrigger>                
                <CollapsibleContent className="max-h-28 pt-4 overflow-y-auto text-sm text-cyan-600/80 p-4 mx-2 bg-cyan-300/10">
                    {summary}
                </CollapsibleContent>
            </Collapsible>
            <CardContent className="max-h-[400px] overflow-y-auto mt-4 p-2 lg:m-2 ">
                {snippets && snippets.map((snippet, index) => (
                    <SnippetsCard key={index} snippet={snippet.snippet} start_time={snippet.start_time} image_url={image_url} audio_url={url} title={title} />
                ))}
            </CardContent>
        </Card>
    )
}


export default ResultCard