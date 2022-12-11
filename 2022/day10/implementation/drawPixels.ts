export const drawPixels = (pixels: Array<"#" | ".">) => pixels.reduce(
    (output, pixel) => output + ([40, 81, 122, 163, 204].includes(output.length) ? "\n" + pixel : pixel),
    ""
);
