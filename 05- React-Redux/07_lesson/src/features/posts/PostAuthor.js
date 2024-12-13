import { useSelector } from 'react-redux';
import { selectAllUsers, useGetUsersQuery } from '../users/usersSlice';
import { Link } from 'react-router-dom';

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user) => user.id === userId);

  //   const { author } = useGetUsersQuery('getUsers', {
  //     selectFromResult: {
  //       author: data?.entities[userId],
  //     },
  //   });

  return (
    <span>
      by{' '}
      {author ? (
        <Link to={`/user/${userId}`}>{author.name}</Link>
      ) : (
        'Unknown author'
      )}
    </span>
  );
};
export default PostAuthor;
