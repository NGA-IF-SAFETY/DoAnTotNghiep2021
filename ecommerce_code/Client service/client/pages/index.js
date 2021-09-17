import Link from 'next/link';
import { decode } from '../services/decryptData';

const LandingPage = ({ products }) => {

  const productList = products.map((product) => {
    return (
      <tr key={product.id}>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>
          <Link href="/products/[productId]" as={`/products/${product.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div style ={{textAlign: 'center'}}>
      
      <h1 style={{marginTop: '30px',marginBottom: '30px'}}>Products</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{productList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/products')

  const productsEncode = await decode(data.products);

  return { products: productsEncode };
};

export default LandingPage;