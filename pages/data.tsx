import cookie from "cookie";
import { request } from "graphql-request";

function About({ data: { task } }) {
  return (
    <div>
      <h1>Data from GraphQL</h1>
      <p>
        <b>Summary:</b> {task.summary}
      </p>
      <p>
        <b>isComplete:</b> {task.isComplete ? "yup" : "nope"}
      </p>
    </div>
  );
}

export async function getServerSideProps({
  req: {
    headers: { cookie: authCookie },
  },
}) {
  const cookies = cookie.parse(authCookie);
  const token = cookies["accessToken"];

  const query = `
  query {
    task {
      _id
      _partition
      isComplete
      summary
    }
  }
  `;
  const requestHeaders = {
    authorization: `Bearer ${token}`,
  };
  const res = await request({
    url: "https://realm.mongodb.com/api/client/v2.0/app/myappcopy-kecbo/graphql",
    document: query,
    requestHeaders,
  });
  console.log(res);
  return {
    props: { data: res },
  };
}

export default About;
