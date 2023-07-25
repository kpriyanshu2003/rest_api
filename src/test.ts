import { Response, Request } from "express";

async function fetchWordMeaning(word: string): Promise<string | null> {
  try {
    const response = await fetch(`http://localhost:3000/fact`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from the API.");
    }
    const data = await response.json();
    const meaning = data.fact;
    if (meaning) {
      return meaning;
    } else {
      throw new Error("No meaning found for the word.");
    }
  } catch (error: any) {
    console.error("Error fetching meaning:", error.message);
    return null;
  }
}

type Test = { func: string };
function test(val: Test) {
  try {
    switch (val.func) {
      case "dictionary":
        console.log(fetchWordMeaning("val"));
        return fetchWordMeaning("value");
        break;
      default:
        throw new Error("Error thorown");
    }
  } catch (e) {
    return {
      message: "Endpoint used for testing only.",
      instruction: "Endpoint runnig in default case.",
      statusCode: "200",
    };
  }
}

const data = {
  posts: [
    {
      title: "First Blog Post",
      author: "John Doe",
      date: "2023-07-23",
      content: "<p>This is the content of my first blog post.</p>",
    },
    {
      title: "Second Blog Post",
      author: "Jane Smith",
      date: "2023-07-25",
      content: "<p>This is the content of my second blog post.</p>",
    },
    {
      title: "Third Blog Post",
      author: "Priyanshu Kumar",
      date: "2023-07-25",
      content:
        "<p>This is created using a template engine known as Mustache, this is quite easy to use and looks almost like generic HTML, CSS and JS. Also, I can use it easily alongside Express easily.",
    },
    // Add more blog posts here...
  ],
};

function templating(req: Request, res: Response) {
  res.render("custom", data);
}

export { test, templating };
