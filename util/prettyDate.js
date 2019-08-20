module.exports = EpochDate => {
    // Creates the date.
    let date = new Date(EpochDate);
    // Sets the month names. These are their 3-character shortened versions for a much more beautiful and easy-to-read embed.
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // Gets the month & date.
    let month = monthNames[date.getMonth()];
    let day = date.getDate();
    // Sets the superscript for the dates.
    if (day == 1) day = "1st";
    if (day == 2) day = "2nd";
    if (day == 3) day = "3rd";
    if (day > 3 && day != 3) day = `${date.getDate()}th`;
    // Gets the year, in full.
    let year = date.getFullYear();
    // Gets the date & formats it properly.
    let time = `${(date.getHours() < 10 ? "0" : "") + date.getHours()}:${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}`;
    // Returns the formatted date/time.
    return `${month} ${day} ${year} ${time}`;
  }