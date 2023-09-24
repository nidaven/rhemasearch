`use client`

import { Circle } from "lucide-react"
import { History } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { SermonProps }  from "@/types/sermon"

type Props = {
    title: string
    text: string
    url: string
    //   category: string
    //   author: string
    image: string
    timestamp: string
}

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

function ResultCard({ title, summary, url, image_url, date, snippets  }: SermonProps) {

    // const formatted_time = sec_to_time(parseInt(timestamp))
    console.log(snippets)
    return (
        <Card>
            <CardHeader>
                <img src={image_url} alt={title} style={{ marginRight: '1rem' }} />
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{summary}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div>{date}</div>
                {snippets && snippets.map((snippet, index) => (
                    <div key={index}>
                        <div>{snippet.snippet}</div>
                        <div>{sec_to_time(parseInt(snippet.start_time))}</div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default ResultCard