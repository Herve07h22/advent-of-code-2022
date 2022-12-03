

export function findCommonString(s1: string, s2: string) {
    const longestString = s1.length > s2.length ? [s1, s2] : [s2, s1];
    return Array.from(longestString[0]).reduce(
        (commonItems, itemOfs1) => longestString[1].includes(itemOfs1) && !commonItems.includes(itemOfs1)
            ? [...commonItems, itemOfs1]
            : commonItems,
        [] as string[]
    );
}
