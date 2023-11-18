// services/searchService.ts
import weaviate, { WeaviateClient } from "weaviate-ts-client";
import { Accumulator, SermonListProps } from "@/types/sermon"

const client: WeaviateClient = weaviate.client({
	scheme: "https",
	host: process.env.WEAVIATE_URL,
});

// const openaiApiKey = "YOUR_API_KEY_HERE";

interface Snippet {
	snippet: string;
	start_time: string;
	sermon_title: string;
	url: string;
	image_url?: string;
	date?: string;
	summary?: string;
}

interface Snippets {
	snippets: Snippet[];
}

const queryDefinition =
	`
  snippet 
  start_time 
  fromSermon 
      { ... 
        on Sermon 
          {
            title, 
            url, 
            date, 
            summary, 
            image_url 
          } 
      } _additional 
        { distance }
`;

async function weaviateSearch(searchInput: string): Promise<SermonListProps> {
	const limit = 20;
	const sermon_class = "SermonSegment"
	const query_definition = queryDefinition

	const res = await client.graphql
		.get()
		.withNearText({
			concepts: [searchInput],
		})
		.withClassName(sermon_class)
		.withFields(query_definition)
		.withLimit(limit)
		.do();

	console.log(res)
	const results = res.data.Get.SermonSegment;

	const snippetsList: Snippets = {
		snippets: results.map((snippet: any) => ({
			snippet: snippet.snippet,
			start_time: snippet.start_time,
			sermon_title: snippet.fromSermon[0].title,
			// url: `${snippet.fromSermon[0].url}?t=${Math.floor(parseFloat(snippet.start_time))}`,
			url: snippet.fromSermon[0].url,
			image_url: snippet.fromSermon[0].image_url,
			date: snippet.fromSermon[0].date,
			summary: snippet.fromSermon[0].summary
		}))
	};

	const relevantSnippets = snippetsList.snippets.filter((snippet) => snippet.snippet.split(' ').length > 10);

	const groupedSnippetsbySermon = relevantSnippets.reduce((acc: Accumulator, snippet: Snippet) => {
		if (!acc[snippet.sermon_title]) {
			acc[snippet.sermon_title] = {
				title: snippet.sermon_title,
				url: snippet.url,
				image_url: snippet.image_url,
				summary: snippet.summary,
				date: snippet.date,
				snippets: [],
			}
		}
		
		acc[snippet.sermon_title].snippets.push({
			snippet: snippet.snippet,
			start_time: snippet.start_time,
		})

		return acc;

	}, {})

	// console.log(groupedSnippetsbySermon);
	const groupedSnippetsbySermonArray = Object.values(groupedSnippetsbySermon);
	// console.log(groupedSnippetsbySermonArray);
	return groupedSnippetsbySermonArray;
}

export default weaviateSearch