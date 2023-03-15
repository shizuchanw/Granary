import { format, intervalToDuration } from "date-fns";

const dateFormat = (dateString) => {
  let date = new Date(dateString);
  let interval = intervalToDuration({
    start: date,
    end: Date.now(),
  });
  if (interval["years"] >= 1) {
    return format(date, "yyyy-MM-dd HH:mm");
  } else if (interval["months"] >= 1) {
    return format(date, "MM-dd HH:mm");
  } else if (interval["days"] >= 20) {
    return format(date, "MM-dd HH:mm");
  } else if (interval["days"] >= 1) {
    return interval["days"] + "天前" + format(date, "HH:mm");
  } else return format(date, "HH:mm");
};

export { dateFormat };
