import dynamic from "next/dynamic";
// import { GetStaticProps } from 'next'
// import getImages from "../lib/api/images";
import { Layout } from "../components/layout";
import Skeleton from "../components/viewer/skeleton";

const Viewer = dynamic(() => import("../components/viewer"), {
  loading: Skeleton,
  ssr: false,
});

type Props = {
  images: string[];
}

export default function Ver({ images = [...Array(784)] }: Props) {
  return (
    <Layout
      className="flex flex-col flex-1 w-full min-h-full"
      footer={false}
      seo={{
        title: "Ver basura arder",
        description: "Donde explorar la basura digital que se va quemando",
      }}
    >
      <h1>Ver basura arder</h1>
      <Viewer images={images} />
    </Layout>
  );
}

// TODO fetch images
// export const getStaticProps: GetStaticProps = async (context) => {
//   const images = await getImages();
//   return {
//     props: {
//       images
//     }
//   }
// }
