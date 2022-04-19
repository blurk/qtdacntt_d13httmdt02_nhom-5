import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useTranslation } from 'react-i18next'
import { listOrders } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { formatDate, formatter } from '../utils'

export default function OrderListScreen({ history }) {
	const { loading, error, orders } = useSelector((state) => state.orderList)

	const { userInfo } = useSelector((state) => state.userLogin)

	const dispatch = useDispatch()
	const { t, i18n } = useTranslation()

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders())
		} else {
			history.push('/login')
		}
	}, [dispatch, history, userInfo])

	return (
		<>
			<h1>{t('header.admin.orders')}</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table responsive striped hover bordered className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>{t('admin.list.user')}</th>
							<th>{t('admin.list.date')}</th>
							<th>{t('admin.list.totalPrice')}</th>
							<th>{t('admin.list.paid')}</th>
							<th>{t('admin.list.delivered')}</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{formatDate(order.createdAt, i18n.language)}</td>
								<td>{formatter.format(order.totalPrice)}</td>
								<td>
									{order.isPaid ? (
										formatDate(order.paidAt, i18n.language)
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										formatDate(order.deliveredAt, i18n.language)
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button variant='info' className='btn-sm'>
											{t('button.details')}
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}
