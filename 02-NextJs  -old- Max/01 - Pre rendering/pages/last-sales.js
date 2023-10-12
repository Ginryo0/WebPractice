import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
  const [sales, setSales] = useState([]);
  const { data, error } = useSWR('/dummy-sales.json', (url) => {
    return fetch(url).then((res) => res.json());
  });

  useEffect(() => {
    if (data) {
      const arr = [];
      for (const key of Object.keys(data.sales)) {
        const obj = {
          id: key,
          username: data.sales[key].username,
          amount: data.sales[key].amount,
        };
        arr.push(obj);
      }
      setSales(arr);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data && !sales) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.amount}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;
