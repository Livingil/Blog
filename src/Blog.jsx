import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

const Content = styled.div`
	padding: 120px 0;
`;

const H1 = styled.h1`
	text-align: center;
`;
const Header = () => <div>Header</div>;

const Footer = () => <div>Footer</div>;

export const Blog = () => {
	return (
		<>
			<Header />
			<Content>
				<H1>Hello developer</H1>
				<Routes>
					<Route path="/" element={<div>Home page</div>} />
					<Route path="/login" element={<div>Authorization</div>} />
					<Route path="/register" element={<div>Registration</div>} />
					<Route path="/users" element={<div>Users</div>} />
					<Route path="/post" element={<div>New article</div>} />
					<Route path="/post/:postId" element={<div>Article</div>} />
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</Content>
			<Footer />
		</>
	);
};
