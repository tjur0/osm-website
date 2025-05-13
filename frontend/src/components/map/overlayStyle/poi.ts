/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { OverlayStyle } from "../style-specification-types";

const PMTILES_URL = process.env.NEXT_PUBLIC_PM_TILES_URL;

const colors = [
  "hsl(292, 52%, 35%)",
  "hsl(2, 55%, 48%)",
  "hsl(176, 97%, 36%)",
  "hsl(67, 49%, 50%)",
  "hsl(47, 77%, 63%)",
  "hsl(18, 98%, 54%)",
  "hsl(222, 67%, 52%)",
  "hsl(312, 72%, 46%)",
  "hsl(202, 58%, 46%)",
  "hsl(257, 66%, 56%)",
];

export function getPoisOverylay(filter): OverlayStyle {
  return {
    id: "design",
    order: 100,
    sources: {
      "mbtiles-source": {
        type: "vector",
        vector: "pmtiles",
        url: `pmtiles://${PMTILES_URL}`,
        baseUrl: `${PMTILES_URL}`,
        attribution: "OpenStreetMap",
      },
    },
    layers: [
      {
        id: "points",
        type: "circle",
        source: "mbtiles-source",
        "source-layer": "poisndjson",
        paint: {
          "circle-radius": 10,
          "circle-opacity": 0,
        },
        minzoom: 0,
        maxzoom: 22,
      },
      {
        id: "points-outline",
        type: "circle",
        source: "mbtiles-source",
        "source-layer": "poisndjson",
        paint: {
          "circle-radius": 9,
          "circle-color": "#000",
        },
        filter: filter,
        minzoom: 0,
        maxzoom: 22,
      },
      {
        id: "points-outline-white",
        type: "circle",
        source: "mbtiles-source",
        "source-layer": "poisndjson",
        paint: {
          "circle-radius": 7,
          "circle-color": "#fff",
        },
        filter: filter,
        minzoom: 0,
        maxzoom: 22,
      },
      {
        id: "points-overlay",
        type: "circle",
        source: "mbtiles-source",
        "source-layer": "poisndjson",
        paint: {
          "circle-radius": 4,
          "circle-color": "#734a08",
        },
        minzoom: 0,
        maxzoom: 22,
      },
      {
        id: "points-label",
        type: "symbol",
        source: "mbtiles-source",
        "source-layer": "poisndjson",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["noto_sans_regular"],
          "text-size": 12,
          "text-offset": [0, 1.2],
          "text-anchor": "top",
        },
        paint: {
          "text-color": "#000000",
          "text-opacity": 0.9,
        },
        minzoom: 14,
        maxzoom: 22,
      },
    ],
  } as OverlayStyle;
}
