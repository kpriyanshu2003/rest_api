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

export { test };
