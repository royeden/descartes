import type { ResourcesResponse } from "pages/api/resources/get-all";
import useSWR from "swr";

import Viewer from "~components/Viewer";

export default function Explorer(): JSX.Element {
  // TODO move this to a component down in the tree to consume server status as well
  const { data } = useSWR<ResourcesResponse>(
    "/api/resources/get-all",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 60000 }
  );

  return data?.resources ? <Viewer resources={data.resources} /> : <></>;
}
