function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );

  return { day, month };
}

export default formatDate;
