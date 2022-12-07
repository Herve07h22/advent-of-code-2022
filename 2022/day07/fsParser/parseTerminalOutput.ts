import { AocFileSystem, ReadLsLine, DirectoryOrFile } from "../FilesystemTypes";
import { computeSize } from "../fsManagement/computeSizeOfDirectories";

export function parseTerminalOutput(
  terminalOutput: string,
  fileSystem: AocFileSystem,
  lsMode = false
): AocFileSystem {
  const lines = terminalOutput.trim().split("\n");
  const [nextLine, ...otherLines] = lines;
  // End of parsing
  if (!nextLine) {
    const updatedRootWithSizes = computeSize(fileSystem.root);
    return { root: updatedRootWithSizes, current: updatedRootWithSizes };
  }

  const restOfTerminalOutput = otherLines.join("\n");
  if (lsMode === true) {
    if (!nextLine.startsWith("$")) {
      return parseTerminalOutput(
        restOfTerminalOutput,
        readLsLine(fileSystem)(nextLine),
        true
      );
    }
  }
  if (nextLine.startsWith("$ ls")) {
    return parseTerminalOutput(restOfTerminalOutput, fileSystem, true);
  }
  if (nextLine.startsWith("$ cd /")) {
    fileSystem.current = fileSystem.root;
    return parseTerminalOutput(restOfTerminalOutput, fileSystem, false);
  }
  if (nextLine.startsWith("$ cd ..")) {
    if (!fileSystem.current.parent)
      throw new Error(`Cannot cd .. when you are at root`);
    fileSystem.current = fileSystem.current.parent;
    return parseTerminalOutput(restOfTerminalOutput, fileSystem, false);
  }
  if (nextLine.startsWith("$ cd")) {
    const targetDirName = nextLine.slice(5);
    const targetDir = fileSystem.current.nodes.find(
      (node) => node.name === targetDirName
    );
    if (!targetDir) throw new Error(`No dir with this name : ${targetDirName}`);
    fileSystem.current = targetDir;
    return parseTerminalOutput(restOfTerminalOutput, fileSystem, false);
  }
  return fileSystem;
}

const readLsLine: ReadLsLine = (fileSystem) => (line) => {
  const [sizeOrDir, name] = line.split(" ");
  const newItem: DirectoryOrFile =
    sizeOrDir === "dir"
      ? {
          type: "directory",
          name,
          size: 0,
          nodes: [],
          parent: fileSystem.current,
        }
      : {
          type: "file",
          name,
          size: parseInt(sizeOrDir),
          nodes: [],
          parent: fileSystem.current,
        };
  fileSystem.current.nodes.push(newItem);
  return fileSystem;
};
