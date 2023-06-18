import { signal, computed, type Signal } from "@preact/signals";
import { type Cell as TypeCell } from "../utils/db.ts";
import { CellChannel } from "../server/message.ts";

interface Props {
  cell?: TypeCell;
  index: number;
  width: number;
  height: number;
}

async function setCell(index: number, hexColor: string) {
  const body = {
    index,
    hexColor,
  };
  return await fetch("/api/cells", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function CellGrid({ index, width, height, cell }: Props) {
  const color = signal(cell?.hexColor ?? "#ffffff");
  const isFocus = signal(false);

  const handleColorInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    color.value = target.value;
  };

  const handleColorChange = () => {
    setCell(index, color.value);
  };

  const backgroundStyle = computed(
    () => `
      position: relative;
      cursor: pointer;
      background-color: ${color};
      width: ${width}px; 
      height: ${height}px; 
      ${isFocus.value ? "border: 2px solid black;" : ""}
   `
  );

  return (
    <div style={backgroundStyle}>
      <input
        onFocus={(e) => {
          isFocus.value = true;
        }}
        onBlur={(e) => {
          isFocus.value = false;
        }}
        class="opacity-0 absolute w-full h-full cursor-inherit"
        type="color"
        value={color}
        onChange={handleColorChange}
        onInput={handleColorInput}
      />
    </div>
  );
}
