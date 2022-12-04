import { Interval } from './Interval';

// OK let's do the challenge in a functionnal programming way

// Types are usefull to connect the Domain to the Implementation.
// See Domain Modeling Made Functional - Scott Wlaschin
// https://www.youtube.com/watch?v=2JB1_e5wZmU

export type IsOverlapped = (intervals: [Interval, Interval]) => Boolean;

export type BuildIntervalFromString = (intervalDescription: string) => Interval;

export type BuildTupleOfIntervalFromString = (intervalDescription: string) => [Interval, Interval];

export type BuildListOfTuplesFromString = (listing: string) => [Interval, Interval][];

export type CountNbOfOverlappedIntervals = (list: [Interval, Interval][], method: IsOverlapped) => number;
