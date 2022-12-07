import { DirectoryOrFile } from "../FilesystemTypes";

export function createFilesystem() {
  const rootDir: DirectoryOrFile = {
    type: "directory",
    name: "/",
    size: 0,
    nodes: [],
  };
  const fileSystem = {
    root: rootDir,
    current: rootDir,
  };
  return fileSystem;
}
