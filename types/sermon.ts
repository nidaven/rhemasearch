interface Snippet {
    snippet: string;
    start_time: string;
}

export interface SermonProps {
    title: string;
    summary: string;
    date: string;
    url: string;
    image_url?: string;
    snippets: Snippet[];
}

export type SermonListProps = SermonProps[];

export type Accumulator = Record<string, SermonProps>;

  