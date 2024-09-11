// import { chunk } from "./packages/array-operations";
import { renderLiquid } from "./packages/liquid-render";
// import graphqlParser from "./packages/graphql-parser";

const main = async () => {
  const html = await renderLiquid("<h1>{{ name }}</h1>", { name: "shaheem" });
  console.log("html: ", html);
};

main();
