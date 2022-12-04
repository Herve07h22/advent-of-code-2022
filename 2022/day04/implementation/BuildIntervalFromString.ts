import { BuildIntervalFromString } from '../FunctionsTypes';

export const buildIntervalFromString: BuildIntervalFromString = (intervalDescription) => {
    const match = intervalDescription.split("-");
    return { from: parseInt(match && match[0] || "0"), to: parseInt(match && match[1] || "0") };
};
