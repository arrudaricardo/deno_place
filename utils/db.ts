// deno-lint-ignore ban-ts-comment
// @ts-ignore
const kv = await Deno.openKv();

export const CELLS_MAX_SIZE = 1000;

interface Editor {
  hostname: string;
}
export interface Cell {
  hexColor: string;
  editor: Editor;
  timestamp: number;
}
type CellIndex = number;
type CellKey = ["cell", CellIndex];

/**
 * Returns a cell in the grid
 */
export async function getCell(index: CellIndex): Promise<Cell> {
  const key: CellKey = ["cell", index];
  const res = await kv.get<Cell>(key);
  return res.value;
}

/**
 * Sets a cell in the grid
 */
export async function setCell(index: CellIndex, cell: Cell) {
  if (index < 0 || index >= CELLS_MAX_SIZE) {
    throw new Error(`Cell index ${index} is out of bounds`);
  }
  const key: CellKey = ["cell", index];
  await kv.set<Cell>(key, cell).value;
}

/**
 * Returns all cells in the grid
 */
export async function getCells() {
  const key: [CellKey[0]] = ["cell"];
  const iterCells = await kv.list<Cell>({ prefix: key });
  const cells: Array<Cell | undefined> = Array(CELLS_MAX_SIZE);

  let empty = true;
  for await (const cell of iterCells) {
    const index = cell.key[1];
    cells[index] = cell.value;
    empty = false;
  }

  if (empty) {
      for (let i = 0; i < CELLS_MAX_SIZE; i++) {
        setCell(i, {
          hexColor:
            "#" +
            ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
          editor: {
            hostname: "none",
          },
          timestamp: Date.now(),
        });
    }
  }
  return cells;
}
