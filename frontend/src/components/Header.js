import React from 'react'
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Route } from 'react-router-dom'
import { logout } from '../actions/userActions'
import LanguageSwitcher from './LanguageSwitcher'
import SearchBox from './SearchBox'

export default function Header() {
	const dispatch = useDispatch()

	const { t } = useTranslation()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const logoutHandler = () => {
		dispatch(logout())
	}

	const { cartItems } = useSelector((state) => state.cart)

	return (
		<header>
			<Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>{process.env.REACT_APP_SHOP_NAME}</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Route render={({ history }) => <SearchBox history={history} />} />
						<Nav className='ml-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i>
									{cartItems.length > 0 && (
										<Badge pill variant='info'>
											{cartItems.length}
										</Badge>
									)}
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>{t('profile')}</NavDropdown.Item>
									</LinkContainer>

									<NavDropdown.Item onClick={logoutHandler}>
										{t('button.logOut')}
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i> {t('button.signIn')}
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title={t('header.admin.title')} id='adminMenu'>
									<LinkContainer to='/admin/userList'>
										<NavDropdown.Item>
											{t('header.admin.users')}
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/productList'>
										<NavDropdown.Item>
											{t('header.admin.products')}
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderList'>
										<NavDropdown.Item>
											{t('header.admin.orders')}
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}

							<LanguageSwitcher />
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}
