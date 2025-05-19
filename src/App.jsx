import styled from 'styled-components';

const Div = styled.div`
	text-align: center;
`;

export const App = () => {
	return (
		<>
			<Div>
				<div>Hello developer</div>
				<div>
					<i className="fa fa-bath" aria-hidden="true"></i>
				</div>
			</Div>
		</>
	);
};
