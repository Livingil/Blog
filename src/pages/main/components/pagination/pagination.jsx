import styled from 'styled-components';
import { Button } from '../../../../components';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				Back to start
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Previous
			</Button>
			<div className="current-page">Page: {page}</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Next
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				To the end
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: 0 0 20px;
	padding: 0 35px;

	& button {
		margin: 0 5px;
	}

	& .current-page {
		width: 100%;
		height: 32px;
		text-align: center;
		border: 1px solid #000;
		align-content: center;
		margin: 0 5px;
	}
`;
