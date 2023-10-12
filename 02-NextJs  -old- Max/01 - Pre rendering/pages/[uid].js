function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

export async function getServerSideProps(ctx) {
  const {
    params: { uid },
  } = ctx;

  return {
    props: {
      id: 'userId ' + uid,
    },
  };
}
