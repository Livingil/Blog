import { H2 } from '../h2/h2';
import styled from 'styled-components';

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const ErrorContainer = ({ error }) => {
	return (
		error && (
			<Div>
				<H2>ERROR</H2>
				<div>{error}</div>
			</Div>
		)
	);
};

export const Error = styled(ErrorContainer)``;
