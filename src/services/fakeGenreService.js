export const ALL_GENRES_ID = 0;

export const genres = [
  { _id: '5b21ca3eeb7f6fbccd471818', name: 'Action' },
  { _id: '5b21ca3eeb7f6fbccd471814', name: 'Comedy' },
  { _id: '5b21ca3eeb7f6fbccd471820', name: 'Thriller' },
];

export function getGenres() {
  return new Promise(res => {
    setTimeout(() => {
      res(genres);
    }, 1);
  });
}
