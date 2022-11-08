import { useState, useEffect } from 'react';
import styles from './search.module.css';
import useSWR from 'swr';
import ItemList from './ItemList';
import type { Item } from '../types/types';
import Items from './Items';

export const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function Search() {
  const { data, error } = useSWR('/api/items', fetcher);

  //formの入力される値の書き換え用
  const [searchWord, setSearchWord] = useState('');
  //form内の値が変更された時に発火するメソッド(stateの値をformに記述された値に変換)
  const searchOnInput = (event: any) => {
    setSearchWord(event.target.value);
  };

  //formで検索された値を保存する用
  const [searchData, setSearchData] = useState([]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  //検索ボタンイベント
  const onSearch = () => {
    setSearchData(
      data.filter((event: any) => {
        return event.name.indexOf(searchWord) >= 0; //data配列の中からsearchWordを検索してフィルターにかける
      })
    );
  };

  //クリアボタンイベント
  const onClickClear = () => {
    setSearchWord('');
    setSearchData([]);
  };

  return (
    <>
      <form
        method="post"
        action="#"
        className={styles.searchContents}
      >
        <p className={styles.search}>商品を検索する</p>
        <div className={styles.itemTitle}>
          {/* 商品名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
          <input
            type="text"
            id="name"
            name="name"
            placeholder="キーワードを入力"
            value={searchWord}
            onChange={searchOnInput}
            className={styles.searchForm}
          />
        </div>
        <br />
        <button
          type="button"
          value="SEARCH"
          onClick={() => onSearch()}
          className={styles.searchButton}
        >
          検索
        </button>
        &nbsp;&nbsp;
        <button
          type="reset"
          onClick={() => onClickClear()}
          className={styles.clearButton}
        >
          クリア
        </button>
      </form>

      <div className={styles.searchResult}>
        {searchWord.length <= 0 ? (
          <ItemList />
        ) : (
          searchData.map((item: Item) => {
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
          })
        )}
      </div>
    </>
  );
}
