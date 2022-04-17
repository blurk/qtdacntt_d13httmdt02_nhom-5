import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { listOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { formatter } from '../utils';

export default function OrderListScreen({ history }) {
	const { loading, error, orders } = useSelector((state) => state.orderList);

	const { userInfo } = useSelector((state) => state.userLogin);

	const dispatch = useDispatch();

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo]);

	return (
		<>
			<h1>Đơn hàng</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table responsive striped hover bordered className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Người dùng</th>
							<th>Thời gian</th>
							<th>Tổng giá</th>
							<th>Đã thanh toán</th>
							<th>Đã giao hàng</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>{formatter.format(order.totalPrice)}</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button variant='light' className='btn-sm'>
											Chi tiết
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
}
