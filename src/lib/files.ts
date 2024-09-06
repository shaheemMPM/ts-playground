import * as fs from "fs";

export const writeToFile = (fileName: string, content: string): void => {
  fs.writeFile(fileName, content, "utf8", (err) => {
    if (err) throw err;
  });
};

// Example usage:
// writeToFile("path/to/file.txt", "This is the content of the file");
