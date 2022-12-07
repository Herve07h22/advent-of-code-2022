import { AocFileSystem, DirectoryOrFile } from "../FilesystemTypes";

export function computeFreeSpaceMissing(updatedFileSystem: AocFileSystem) {
  const freeSpaceLeft = 70000000 - updatedFileSystem.root.size;
  const freeSpaceToIncrease =
    freeSpaceLeft < 30000000 ? 30000000 - freeSpaceLeft : 0;
  return freeSpaceToIncrease;
}
export function findSmallestDirThatHasSize(
  directoryOrFile: DirectoryOrFile,
  size = 30000000
): DirectoryOrFile {
  // Assuming that this directory is bug enough, could we find a smaller one ?
  // 24 933 642
  const smallerDirs = directoryOrFile.nodes.filter(
    (item) => item.size >= size && item.type === "directory"
  );
  if (smallerDirs.length) {
    // Find the smallest on
    return smallerDirs.reduce((smallest, current) => {
      const currentSmallest = findSmallestDirThatHasSize(current, size);
      return currentSmallest.size < smallest.size ? currentSmallest : smallest;
    }, directoryOrFile);
  }
  return directoryOrFile;
}
