import { Layout } from "~components/Layout";

export default function Investigacion(): JSX.Element {
  return (
    <Layout
      className="flex flex-col flex-1 w-full min-h-full"
      footer={true}
      seo={{
        description: "Donde explorar la basura digital que se va quemando",
        title: "Ver basura arder",
      }}
    >
      <div></div>
    </Layout>
  );
}
