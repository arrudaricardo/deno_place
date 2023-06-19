import { signal, computed, type Signal } from "@preact/signals";
import { type Cell as TypeCell } from "../utils/db.ts";

interface Props {
  width: number;
  height: number;
}

export default function InfoCell({ width, height }: Props) {
  const style = computed(
    () => `
      position: relative;
      cursor: pointer;
      width: ${width}px; 
      height: ${height}px; 
      font-size: 1.5cqh;
   `
  );

  return (
    <button
      style={style}
      class="font-bold bg-transparent text-center w-full h-full rainbow"
      onClick={() => window.open("https://github.com/arrudaricardo/deno_place", "_blank")}
    >
      ?
    </button>
  );
}
