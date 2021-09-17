import { decode } from '../../services/decryptData';
const OrderIndex = ({ orders }) => {

  const orderList = orders.map((order) => {
    return (
      <tr key={order.id}>
        <td>{order.product.title}</td>
        <td>{order.product.price}</td>
        <td>{order.status}</td>
      </tr>
    );
  });

  return (
    <div style ={{textAlign: 'center'}}>
      {/* <button onClick = {()=>{ 
        console.log(orders)
      }} >onClixk</button> */}
      <h1 style={{marginTop: '30px',marginBottom: '30px'}}>Orders</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{orderList}</tbody>
      </table>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');
  const  orderEncode = await decode(data.encryptedOrder)

  return { orders: orderEncode };
};

export default OrderIndex;
