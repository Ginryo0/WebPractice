import path from 'path';
import fs from 'fs/promises';

function ProductDetailsPage({ product }) {
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}

export async function getStaticProps(ctx) {
  const {
    params: { pid },
  } = ctx;

  const filePath = path.join(process.cwd(), 'data', 'dummy.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((prod) => prod.id === pid);

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { pid: 'p1' },
      },
      { params: { pid: 'p2' } },
      {
        params: { pid: 'p3' },
      },
    ],
    fallback: false,
  };
}

export default ProductDetailsPage;
