import useSWR from 'swr';
import styles from './itemList.module.css';
import type { Item } from '../types/types';
import Items from './Items';

export const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function ItemList() {
  const { data, error } = useSWR('/api/items', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const sortList = data.sort(function (a: Item, b: Item) {
    return a.priceM - b.priceM;
  });

  return (
    <div className={styles.itemList}>
      {sortList.map((item: Item) => {
        return (
          <>
            <Items
              id={item.id}
              type={item.type}
              name={item.name}
              description={item.description}
              priceM={item.priceM}
              priceL={item.priceL}
              imagePath={item.imagePath}
              deleted={item.deleted}
              toppingList={item.toppingList}
            />
          </>
        );
      })}
    </div>
  );
}
