import gql from "graphql-tag";
import { writeToFile } from "../lib/files";

const graphqltag = () => {
  const parsed = gql`
    query GetOrder($id: ID!) {
      order(id: $id) {
        createdAt
        discountCodes
        email
        fullyPaid
        id
        shippingLine {
          title
        }
      }
    }
  `;

  const fileName = "./data/parsed.json";
  writeToFile(fileName, JSON.stringify(parsed, null, 2));

  console.log("Parsed Stored in: ", fileName);
};

export default graphqltag;
