import { CountNbOfOverlappedIntervals } from '../FunctionsTypes';

export const countNbOfOverlappedIntervals: CountNbOfOverlappedIntervals = (list, method) => {
    return list.reduce((totalOverlapped, tuple) => method(tuple) ? totalOverlapped + 1 : totalOverlapped, 0);
};
