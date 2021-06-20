import type { ResourcesResponse } from "pages/api/resources/get-all";
import { CenterResponse } from "pages/api/resources/get-center";
import useSWR from "swr";

import Viewer from "~components/Viewer";

export default function Explorer(): JSX.Element {
  // TODO move this to a component down in the tree to consume server status as well
  const { data } = useSWR<ResourcesResponse>(
    "/api/resources/get-all",
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 60000 }
  );

  const { data: center } = useSWR<CenterResponse>(
    "/api/resources/get-center",
    (url) => fetch(url).then((res) => res.json())
  );

  return center?.center && data?.resources ? (
    <Viewer center={center.center} resources={data.resources} />
  ) : (
    <></>
  );
}
