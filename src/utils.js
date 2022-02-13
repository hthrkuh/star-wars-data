
export const fetchList = async (url, list = []) => {
  const res = await fetch(url);
  const data = await res.json();
  if (data.next) {
    await fetchList(data.next, list);
  }
  list.push(...data.results);
  return list;
};

export const fetchItem = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
