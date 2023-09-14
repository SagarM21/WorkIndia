const shuffleSeats = (seat) => {
  for (let i = seat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [seat[i], seat[j]] = [seat[j], seat[i]];
  }
};

module.exports = shuffleSeats;
