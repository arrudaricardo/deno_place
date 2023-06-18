import type { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import CellsGrid from "../islands/CellsGrid.tsx";
import {getCells, type Cell as TypeCell} from '../utils/db.ts'

interface HomeProps {
  cells: Array<TypeCell | undefined>;
}

export const handler: Handlers<HomeProps> = {
  async GET(_req, ctx) {
    const cells = await getCells()
    return ctx.render({ cells });
  },
};

export default function Home(props: PageProps<HomeProps>) {
  return (
    <>
      <Head>
        <title> Deno Place </title>
      </Head>
      <div >
        <CellsGrid cells={props.data.cells} />
      </div>
    </>
  );
}
