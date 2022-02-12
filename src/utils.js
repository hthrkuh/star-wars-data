export const fetchList = async (url) => {
  const list = [];
  const res = await fetch(url);
  const data = await res.json();
  if (data.next) {
    const newList = await fetchList(data.next);
    list.push(...newList);
  }
  list.push(...data.results);
  return list;
};

export const fetchItem = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
