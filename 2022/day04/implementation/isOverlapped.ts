import { IsOverlapped } from '../FunctionsTypes';

export const isOverlapped: IsOverlapped = ([interval1, interval2]) => {
    return interval1.from <= interval2.from && interval1.to >= interval2.to ||
        interval2.from <= interval1.from && interval2.to >= interval1.to;
};
