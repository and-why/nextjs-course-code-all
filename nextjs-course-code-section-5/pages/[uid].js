export default function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context) {
  const { params } = context;

  console.log('server side regering');
  return {
    props: {
      id: 'userid-' + userId,
    },
  };
}
