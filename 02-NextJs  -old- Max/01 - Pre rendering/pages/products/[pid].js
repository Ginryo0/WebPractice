import path from 'path';
import fs from 'fs/promises';

function ProductDetailsPage({ product }) {
  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(ctx) {
  const {
    params: { pid },
  } = ctx;

  const data = await getData();

  const product = data.products.find((prod) => prod.id === pid);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const { products } = await getData();
  const paths = products.map((prod) => ({ params: { pid: prod.id } }));
  return {
    paths,
    fallback: false,
  };
}

export default ProductDetailsPage;
