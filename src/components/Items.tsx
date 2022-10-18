import styles from './itemList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import type { Item } from 'types/types';

export default function Items(props: Item) {
  return (
    <div className={styles.item}>
      <Link href={`/items/${props.id}`}>
        <a>
          <Image
            src={props.imagePath}
            alt="ピザ"
            width={200}
            height={125}
          />
          <div className={styles.itemText}>
            <p className={styles.itemName}>{props.name}</p>
            <br />
            <span className={styles.sizeM}>&nbsp;M&nbsp;</span>
            &nbsp;{props.priceM.toLocaleString()}円(税抜)
            <br />
            <span className={styles.sizeL}>&nbsp;L&nbsp;</span>
            &nbsp;{props.priceL.toLocaleString()}円(税抜)
          </div>
        </a>
      </Link>
    </div>
  );
}
