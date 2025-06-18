import { useEffect, useMemo, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { Pagination, PostCard, Search } from './components';
import styled from 'styled-components';
import { PAGINATION_LIMIT } from '../../constans';
import { debounce, getLastPageFromLinks } from './utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(({ res: { posts, links } }) => {
			setPosts(posts);
			setLastPage(getLastPageFromLinks(links));
		});
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			{posts.length > 0 ? (
				<div className="post-list">
					{posts.map(({ id, title, publishedAt, commentsCount, imageUrl }) => (
						<PostCard
							key={id}
							id={id}
							title={title}
							publishedAt={publishedAt}
							commentsCount={commentsCount}
							imageUrl={imageUrl}
						/>
					))}
				</div>
			) : (
				<div className="no-posts-found">No articles found</div>
			)}
			{lastPage > 1 && posts.length > 0 && <Pagination page={page} lastPage={lastPage} setPage={setPage} />}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}

	& .no-posts-found {
		font-size: 18px;
		margin-top: 40px;
		text-align: center;
	}
`;
