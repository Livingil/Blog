export const getCommentsCount = (postId, comments = []) => {
	const postComments = comments.filter(({ postId: commentPostId }) => commentPostId === postId);
	return postComments.length;
};
