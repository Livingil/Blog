import styled from 'styled-components';
import { ControlPanel, Logo } from './componens';

const Discription = styled.div`
	font-style: italic;
	margin-top: 10px;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Discription>
			Web-technologi
			<br /> Writing code
			<br /> Error analysis
		</Discription>
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 120px;
	padding: 10px 40px;
	box-shadow: 0px -2px 17px #000;
	background-color: #fff;
`;
