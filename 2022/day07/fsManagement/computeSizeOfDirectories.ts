import { DirectoryOrFile } from "../FilesystemTypes";

export function computeSize(directoryOrFile: DirectoryOrFile): DirectoryOrFile {
  if (directoryOrFile.type === "file") return directoryOrFile;
  const updatedNodes = directoryOrFile.nodes.map(computeSize);
  const size = updatedNodes.reduce((sum, item) => sum + item.size, 0);
  return {
    ...directoryOrFile,
    nodes: updatedNodes,
    size,
  };
}
export function computeSizeOfDirectories(
  directoryOrFile: DirectoryOrFile,
  maxSize = 100000
): number {
  if (directoryOrFile.type === "file") return 0;
  const sizeOfSubDirectories = directoryOrFile.nodes.reduce(
    (sum, item) => sum + computeSizeOfDirectories(item, maxSize),
    0
  );
  return directoryOrFile.size < maxSize
    ? directoryOrFile.size + sizeOfSubDirectories
    : sizeOfSubDirectories;
}
