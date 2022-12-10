export function readCommandsList(commands: string) {
    return commands.trim().split('\n').flatMap(line => {
        const [direction, steps] = line.split(" ");
        return new Array(parseInt(steps)).fill(direction);
    });
}
