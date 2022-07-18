const date = new Date();

// ✅ Get EST date time string
// "1/27/2022, 2:45:30 AM"
console.log(
  date.toLocaleString("en-US", {
    timeZone: "America/New_York",
  })
);

// ✅ Get EST date object
export function changeTimeZone(date, timeZone) {
  if (typeof date === "string") {
    return new Date(
      new Date(date).toLocaleString("en-US", {
        timeZone,
      })
    );
  }

  return new Date(
    date.toLocaleString("en-US", {
      timeZone,
    })
  );
}

// 👇️ Thu Jan 27 2022 02:45:30
console.log(changeTimeZone(new Date(), "America/New_York"));
