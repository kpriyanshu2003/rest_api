import { Response, Request } from "express";

function test(req: Request, res: Response) {
  console.log("\n------------------");
  console.log("Body ", req.body);
  console.log("Query ", req.query);
  console.log("URL ", req.url);
  console.log("Params ", req.params);
  console.log("User IP ", req.ip);
  console.log("User IPs ", req.ips);
  console.log(req.path);
  res.json({
    message: "Endpoint used for testing only.",
    instruction: "Endpoint runnig in default case.",
    statusCode: "200",
  });
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
  ],
};

function templating(req: Request, res: Response) {
  res.render("custom", data);
}

export { test, templating };
