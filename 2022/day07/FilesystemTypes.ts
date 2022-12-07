export type DirectoryOrFile = {
  type: "directory" | "file";
  name: string;
  size: number;
  nodes: DirectoryOrFile[];
  parent?: DirectoryOrFile;
};
export type AocFileSystem = {
  root: DirectoryOrFile;
  current: DirectoryOrFile;
};
export type ReadLsLine = (
  fileSystem: AocFileSystem
) => (line: string) => AocFileSystem;
