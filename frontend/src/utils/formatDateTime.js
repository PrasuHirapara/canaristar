export const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const time = date.toLocaleTimeString("en-US", options);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${time} | ${day} ${month}, ${year}`;
};
