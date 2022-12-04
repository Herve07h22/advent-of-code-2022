import { IsOverlapped } from '../FunctionsTypes';
import { isOverlapped } from './isOverlapped';

export const isPartiallyOverlapped: IsOverlapped = ([interval1, interval2]) => {
    return isOverlapped([interval1, interval2])
        || (interval1.from <= interval2.from && interval1.to >= interval2.from)
        || (interval1.from <= interval2.to && interval1.to >= interval2.to);
};
