const EVENTS = {
  WAKES_UP: "wakes up",
  FALLS_ASLEEP: "falls asleep",
  BEGINS_SHIFT: "begins shift"
};

const fs = require("fs");
fs.readFile("./input", (err, data) => {
  let input = data.toString("utf8").split("\n");
  let events_by_guard = input.sort().reduce(
    (acc, val) => {
      let { day, guard, event, minute } = parseInput(val);

      if (guard) {
        acc.currentGuard = guard;
      }

      if (!acc.currentGuard) {
        return acc;
      }

      if (!acc.log[acc.currentGuard]) {
        acc.log[acc.currentGuard] = { [day]: [] };
      }

      if (!acc.log[acc.currentGuard][day]) {
        acc.log[acc.currentGuard][day] = [];
      }

      acc.log[acc.currentGuard][day].push({ minute, event });
      return acc;
    },
    { currentGuard: null, log: {} }
  ).log;

  // const guards_by_sleep_duration = Object.keys(events_by_guard).reduce(
  //   (acc, guard) => {
  //     const guard_log = events_by_guard[guard];
  //     acc[guard] = guard_log.reduce(
  //       (history, { event, minute }) => {
  //         if (event === EVENTS.FALLS_ASLEEP) {
  //         }
  //       },
  //       {
  //         minutes_slept: 0,
  //         sleeping_since: null
  //       }
  //     );
  //   },
  //   {}
  // );

  console.log(JSON.stringify(events_by_guard, null, 2));
});

const parseInput = str => {
  const [preamble, record] = str.split("] ");
  const day = preamble.split(" ")[0].slice(1);
  const minute = parseInt(preamble.slice(-2));
  const { event, guard } = parseEvent(record);
  return {
    day,
    guard,
    event,
    minute
  };
};

const parseEvent = str => {
  if (str.indexOf("falls") === 0) {
    return { event: EVENTS.FALLS_ASLEEP };
  } else if (str.indexOf("wakes") === 0) {
    return { event: EVENTS.WAKES_UP };
  } else if (str.indexOf("Guard #") === 0) {
    const guard = str.slice(7).split(" begins")[0];

    return {
      event: EVENTS.BEGINS_SHIFT,
      guard
    };
  }

  return {};
};
