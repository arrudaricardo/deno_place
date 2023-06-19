import Cell from "./Cell.tsx";
import { type Cell as TypeCell } from "../utils/db.ts";
import { useRef, useEffect, useState } from "preact/hooks";
import InfoCell from "./InfoCell.tsx";

interface Props {
  cells: Array<TypeCell | undefined>;
}

export default function CellGrid(props: Props) {
  const [cells, setCells] = useState(props.cells);
  const [size, setSize] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const collumnSize = 20;

  useEffect(() => {
    const events = new EventSource(`/api/cells/events`);
    const listener = (e: MessageEvent) => {
      const msg = JSON.parse(e.data);
      fetch(`/api/cells/${msg.index}`)
        .then((resp) => resp.json())
        .then((json) => {
          json as TypeCell;
          setCells((cells) => {
            cells[msg.index] = json;
            return structuredClone(cells);
          });
        });
    };
    events.onmessage = listener;
    return events.removeEventListener("message", listener);
  }, []);

  useEffect(() => {
    globalThis.addEventListener("resize", updateSize);
    return () => {
      globalThis.removeEventListener("resize", updateSize);
    };
  }, []);

  function updateSize() {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setSize({
        x: clientWidth / collumnSize,
        y: clientHeight / (cells.length / collumnSize),
      });
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      updateSize();
    }
  }, [containerRef]);

  const gridStyle = `
    display: grid;
    align-content: center;
    justify-items: end;
    grid-template-columns: repeat(${collumnSize}, 1fr);
  `;

  return (
    <div
      ref={containerRef}
      class="mx-auto sm:w-10/12 md:w-8/12	lg:w-5/12 xl:w/3/12 h-screen "
      style={gridStyle}
    >
      {cells.map((cell, index) => {
        if (collumnSize - 1 === index) {
          return <InfoCell width={size.x} height={size.y} />;
        } else {
          return (
            <Cell
              key={index + "_cell"}
              width={size.x}
              height={size.y}
              cell={cell}
              index={index}
            />
          );
        }
      })}
    </div>
  );
}
