export function computeItemPriority(item: string) {
    if (item.toUpperCase() === item) {
        return 26 + alphabeticalPosition(item);
    } else {
        return alphabeticalPosition(item);
    }
}
export function alphabeticalPosition(letter: string) {
    return letter.toUpperCase().charCodeAt(0) - 64;
}

export function computeItemsPrioritySum(items: string[]) {
    return items.reduce(
        (total, item) => total + computeItemPriority(item),
        0
    );
}
