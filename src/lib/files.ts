import * as fs from "fs";
import { promisify } from "util";

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

/**
 * Writes content to a file asynchronously.
 *
 * @param {string} fileName - The path and name of the file to write.
 * @param {string} content - The content to write to the file.
 * @returns {Promise<void>} A promise that resolves when the file has been written.
 * @throws Will throw an error if the file cannot be written.
 */
export const writeToFile = async (
  fileName: string,
  content: string
): Promise<void> => {
  try {
    await writeFileAsync(fileName, content, "utf8");
  } catch (err) {
    throw err;
  }
};

/**
 * Reads content from a file asynchronously.
 *
 * @param {string} fileName - The path and name of the file to read.
 * @returns {Promise<string>} A promise that resolves with the content of the file.
 * @throws Will throw an error if the file cannot be read.
 */
export const readFromFile = async (fileName: string): Promise<string> => {
  try {
    const content = await readFileAsync(fileName, "utf8");
    return content;
  } catch (err) {
    throw err;
  }
};
