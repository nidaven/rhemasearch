import Head from "next/head"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ResultCard from "@/components/result-card"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"
import { useState } from "react"
import getConfig from "next/config"
import next from "next/types"
import { SermonListProps } from "@/types/sermon"
import PlayerComponent from "@/components/player"


const queryDefinition = "snippet start_time fromSermon { ... on Sermon {title, url, date, summary, image_url } }";

export default function IndexPage() {
  const [searchInput, setSearchInput] = useState('');
  const [result, setResult] = useState<SermonListProps>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSearchClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/search?searchInput=${searchInput}`);
      const data: SermonListProps = await response.json();
      console.log(data);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Seeka</title>
        <meta
          name="description"
          content="Next.js template for buildlsing apps with Radix UI and Tailwind CSS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="items-center gap-6 pb-4 pt-10 px-10 ">
        <div className="justify-center flex-col items-start gap-2">
          <h1 className="text-6xl font-extrabold leading-tight tracking-tighter text-center">
            Seeka <br className="hidden sm:inline" />
          </h1>
          <h2 className="text-xl text-yellow-500 dark:text-yellow-400/80 md:text-2xl lg:text-3xl pt-1 text-center">Search the <b>transcripts</b> of your favourite sermons.</h2>
          <p className="text-sm text-gray-500/60 dark:text-slate-400 items-center justify-center pt-4 text-center">
            <br className="hidden" /> Find the sermons you&rsquo;ve been looking for with ease using our powerful search tool, allowing you to find and play from the exact context you remember.
          </p>
        </div>
        <div className="items-center mt-4 justify-center">
          <div className="flex justify-center">
            <Input
              id="search-input"
              className="w-full max-w-[800px] mb-4"
              placeholder="Search for a sermon"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <Button disabled={isLoading} onClick={() => handleSearchClick()} className="w-full max-w-[800px] items-center text-center">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Search
            </Button>
          </div>
        </div>
      </section>
      <section className="container grid items-center gap-6 pt-2 pb-2 md:py-10 px-2 sm:py-4 ">
        <div className="items-start justify-center gap-6 rounded-lg p-4 md:grid lg:grid grid-cols-2">
          {result.length > 0 ? (<div className="m-4 text-muted-foreground">{`Found ${result.length} results`}</div>) : null}
          <div className="col-span-2 pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 items-start gap-6">
            {result.map((item, index) => (
              <ResultCard
                key={item.url}
                snippets={item.snippets}
                title={item.title}
                url={item.url}
                image_url={item.image_url}
                date={item.date}
                summary={item.summary}
              />
            ))}
          </div>
          <PlayerComponent />
        </div>
      </section>
    </Layout>
  )
}
