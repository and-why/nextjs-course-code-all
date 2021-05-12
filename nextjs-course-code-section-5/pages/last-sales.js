import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   fetch(
  //     'https://nextjs-course-6f90d-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json',
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(transformedSales);
  //       setIsLoading(false);
  //     });
  // }, []);
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (!sales) {
  //   return <p>No data yet</p>;
  // }

  // Using SWR instead of fetch
  const { data, error } = useSWR(
    'https://nextjs-course-6f90d-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json',
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>Failed to load</p>;
  }
  if (!sales && !data) {
    return <p>Loading</p>;
  }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    'https://nextjs-course-6f90d-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json',
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
  };
}
