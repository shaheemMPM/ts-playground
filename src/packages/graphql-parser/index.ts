import dayjs from "dayjs";
import path from "path";
import {
  parse,
  print,
  visit,
  OperationDefinitionNode,
  FieldNode,
} from "graphql";
import gql from "graphql-tag";
import { readFromFile, writeToFile } from "../../lib/files";

const extractFields = (query: string): string => {
  const ast = parse(query);
  let fields = "";

  visit(ast, {
    OperationDefinition(node: OperationDefinitionNode) {
      if (node.operation === "query") {
        const orderField = node.selectionSet.selections.find(
          (selection) =>
            selection.kind === "Field" && selection.name.value === "order"
        ) as FieldNode;

        if (orderField && orderField.selectionSet) {
          fields = print(orderField.selectionSet);
        }
      }
    },
  });

  return fields.slice(1, -1).trim();
};

const generateMultipleOrdersQuery = (
  extractedFields: string,
  startDate: string
): string => {
  const queryAST = gql`
    query ($cursor: String) {
      orders(query: "created_at:>='${startDate}'", first: 50, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ${extractedFields}
          }
        }
      }
    }
  `;

  return print(queryAST);
};

const graphqlParser = async () => {
  const rootDir = path.resolve(__dirname, "../../..");
  const getOrderQueryPath = path.join(
    rootDir,
    "src",
    "packages",
    "graphql-parser",
    "getOrder.gql"
  );
  const outputPath = path.join(rootDir, "data", "multipleOrdersQuery.gql");

  try {
    const getOrderQuery = await readFromFile(getOrderQueryPath);

    const extractedFields = extractFields(getOrderQuery);

    const startDate = dayjs()
      .subtract(25, "hour")
      .format("YYYY-MM-DDTHH:mm:ss");
    const multipleOrdersQuery = generateMultipleOrdersQuery(
      extractedFields,
      startDate
    );

    await writeToFile(outputPath, multipleOrdersQuery);
    console.log("Multiple orders query generated successfully.");
  } catch (error) {
    console.error("Error in graphqlParser:", error);
  }
};

export default graphqlParser;
