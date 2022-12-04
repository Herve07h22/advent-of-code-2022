import { buildIntervalFromString } from './BuildIntervalFromString';
import { BuildTupleOfIntervalFromString } from '../FunctionsTypes';

export const buildTupleOfIntervalFromString: BuildTupleOfIntervalFromString = (intervalDescription) => {
    const match = intervalDescription.split(",");
    return [buildIntervalFromString(match[0]), buildIntervalFromString(match[1])];
};
