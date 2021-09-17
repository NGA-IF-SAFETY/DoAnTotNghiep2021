import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import Swal from 'sweetalert2';
import { decode } from '../../services/decryptData';


const ProductShow = ({product, error}) => {

  React.useEffect(() => {
    // window is accessible here.
    if(error){
      Swal.fire({
              icon: 'error',
              title: error,
              showConfirmButton: false,
              timer: 2000
            }).then(()=>{
                Router.push('/')
            })
    }
  }, []);

  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      productId: product?.id
    },

    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Created a order success',
        showConfirmButton: false,
        timer: 1500
      }),
        Router.push('/orders')
    }
  });
  

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      { error ? '':
        (
          <>
            <h1 style={{ marginTop: '100px', marginBottom: '20px' }}>{product?.title}</h1>
            <h4 style={{ marginBottom: '20px' }}>Price: {product?.price}</h4>
            {errors}
            <button onClick={() => doRequest()} className="btn btn-primary">
              Purchase
            </button>
          </>
        )
      }
      
    </div>
  );
};

ProductShow.getInitialProps = async ({ query }, client) => {
  const { productId } = query;
  const { data }   = await client.get(`/api/products/${productId}`);
  if(data && data?.errors){
    return {error: data.errors}
  }
  const productsEncode = await decode(data.encryptedProduct);
  return { product: productsEncode }
};

export default ProductShow; 