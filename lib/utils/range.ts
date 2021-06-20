// https://dev.to/nycdude777/comment/be3l
// https://dev.to/ycmjason/how-to-create-range-in-javascript-539i

export default function* range(
  start: number,
  end?: number,
  include = false,
  step = 1
) {
  if (end === undefined) [end, start] = [start, 0];
  const countUp = start <= end;

  for (
    let n = start;
    countUp ? n < end + Number(include) : n > end - Number(include);
    countUp ? (n += step) : (n -= step)
  )
    yield n;
}
