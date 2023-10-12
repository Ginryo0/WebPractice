import path from 'path';
import fs from 'fs/promises';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((prod) => (
        <li key={prod.id}>{prod.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
