import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import Swal from 'sweetalert2'


const Signouted = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Đăng xuất thành công',
        showConfirmButton: false,
        timer: 1500
      })
      Router.push('/')
    }
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
};

export default Signouted; 