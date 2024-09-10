/**
 * Splits an array into chunks of the specified size.
 * @param array The array to be chunked.
 * @param size The size of each chunk.
 * @returns An array of chunks.
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  return array.reduce((chunks: T[][], item: T, index: number) => {
    const chunkIndex = Math.floor(index / size);

    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = []; // start a new chunk
    }

    chunks[chunkIndex].push(item);

    return chunks;
  }, []);
};
