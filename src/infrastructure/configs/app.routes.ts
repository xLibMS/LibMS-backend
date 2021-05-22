const root = '/api';
const usersRoot = `${root}/user`;
const booksRoot = `${root}/book`;
const reservationRoot = `${root}/reservations`;
const books = `${root}/books`;

export const routes = {
  user: {
    root: usersRoot,
    profile: `${usersRoot}/@me`,
    delete: `${usersRoot}/:id`,
    auth: `${usersRoot}/auth`,
    refresh: `${usersRoot}/refresh`,
  },
  book: {
    root: booksRoot,
    books,
    authors: `${booksRoot}/authors`,
  },
  reservation: {
    reservations: `${reservationRoot}`,
    createReservation: `${reservationRoot}/create-reservation`,
    acceptReservation: `${reservationRoot}/accept-reservation/:id`,
    rejectReservation: `${reservationRoot}/reject-reservation/:id`,
    cancelReservation: `${reservationRoot}/cancel-reservation/:id`,
  },
};
