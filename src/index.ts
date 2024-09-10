import { chunk } from "./packages/array-operations";
// import graphqlParser from "./packages/graphql-parser";

const main = () => {
  const baseArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const chunks = chunk(baseArray, 3);

  console.log("chunks: ", chunks);
};

main();
