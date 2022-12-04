import { buildTupleOfIntervalFromString } from './buildTupleOfIntervalFromString';
import { BuildListOfTuplesFromString } from '../FunctionsTypes';

export const buildListOfTuplesFromString: BuildListOfTuplesFromString = (listing) => {
    return listing.trim()
        .split("\n")
        .map(line => buildTupleOfIntervalFromString(line));
};
