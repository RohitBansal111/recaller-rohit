const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  var minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (prefomattedDate) {
    return ` ${day} ${month} ${year}`;
  }

  if (hideYear) {
    return `${day} ${month} ${year}`;
  }

  return `${day} ${month} ${year}`;
}

export function dateSince(dateParam) {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000;
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 5) {
    return "Today";
  } else if (seconds < 90) {
    return "Today";
  } else if (minutes < 60) {
    return `Today`;
  } else if (isToday) {
    return getFormattedDate(date, "Today");
  } else if (isYesterday) {
    return getFormattedDate(date);
  } else if (isThisYear) {
    return getFormattedDate(date, false, true);
  }

  return getFormattedDate(date);
}
