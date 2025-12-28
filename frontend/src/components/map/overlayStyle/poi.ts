/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { OverlayStyle } from "../style-specification-types";

const PMTILES_URL = process.env.NEXT_PUBLIC_PMTILES_URL;
const TILES_URL = process.env.NEXT_PUBLIC_TILES_URL;
const SOURCE_LAYER = "pois";

const SELECTED_POINT_RADIUS_OUTLINE = 9;
const SELECTED_POINT_RADIUS_WHITE = 7;
const SELECTED_POINT_RADIUS_COLOR = 4;

if (!TILES_URL) {
  throw new Error(
    "NEXT_PUBLIC_TILES_URL is not defined in environment variables"
  );
}

export function getPoisOverlay(filter, sourceName, selectedPoi): OverlayStyle {
  const source = `osm-tiles-source-${sourceName}`;

  const sources = {
    "osm-tiles-source-live": {
      type: "vector",
      url: `${TILES_URL}`,
      baseUrl: `${TILES_URL}`,
      attribution: "OpenStreetMap",
    },
    "osm-tiles-source-pmtiles": {
      type: "vector",
      vector: "pmtiles",
      url: `pmtiles://${PMTILES_URL}`,
      baseUrl: `${PMTILES_URL}`,
      attribution: "OpenStreetMap",
    },
  };

  const layers = [
    {
      id: "selected-poi-area",
      type: "fill",
      source: "selected-poi",
      filter: ["==", ["geometry-type"], "Polygon"],
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          0.2,
          0,
          "#fff",
          1,
          ["to-color", ["get", "color"]],
        ],
        "fill-opacity": 0.4,
      },
      minzoom: 0,
      maxzoom: 22,
    },
    {
      id: "selected-poi-area-outline",
      type: "line",
      source: "selected-poi",
      filter: ["==", ["geometry-type"], "Polygon"],
      paint: {
        "line-color": ["get", "color"],
        "line-width": 2,
        "line-opacity": 0.8,
      },
      minzoom: 0,
      maxzoom: 22,
    },
    {
      id: "points",
      type: "circle",
      source: source,
      "source-layer": SOURCE_LAYER,
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
      source: source,
      "source-layer": SOURCE_LAYER,
      paint: {
        "circle-radius": 6,
        "circle-color": "#404040",
      },
      minzoom: 0,
      maxzoom: 22,
    },
    {
      id: "points-color",
      type: "circle",
      source: source,
      "source-layer": SOURCE_LAYER,
      paint: {
        "circle-radius": 4,
        "circle-color": ["get", "color"],
      },
      minzoom: 0,
      maxzoom: 22,
    },
    {
      id: "points-selection-outline",
      type: "circle",
      source: source,
      "source-layer": SOURCE_LAYER,
      paint: {
        "circle-radius": SELECTED_POINT_RADIUS_OUTLINE,
        "circle-color": "#000",
      },
      filter: filter,
      minzoom: 0,
      maxzoom: 22,
    },
    {
      id: "points-selection-outline-white",
      type: "circle",
      source: source,
      "source-layer": SOURCE_LAYER,
      paint: {
        "circle-radius": SELECTED_POINT_RADIUS_WHITE,
        "circle-color": "#fff",
      },
      filter: filter,
      minzoom: 0,
      maxzoom: 22,
    },
    {
      id: "points-selection-color",
      type: "circle",
      source: source,
      "source-layer": SOURCE_LAYER,
      paint: {
        "circle-radius": SELECTED_POINT_RADIUS_COLOR,
        "circle-color": ["get", "color"],
      },
      filter: filter,
      minzoom: 0,
      maxzoom: 22,
    },
    {
      id: "points-label",
      type: "symbol",
      source: source,
      "source-layer": SOURCE_LAYER,
      layout: {
        "text-field": [
          "case",
          [">", ["length", ["to-string", ["get", "name"]]], 14],
          ["concat", ["slice", ["to-string", ["get", "name"]], 0, 14], "..."],
          ["get", "name"],
        ],
        "text-font": ["noto_sans_regular"],
        "text-size": 11,
        "text-offset": [0, 0.8],
        "text-anchor": "top",
      },
      paint: {
        "text-color": "#0a0a0a",
        "text-opacity": 0.9,
      },
      minzoom: 14,
      maxzoom: 22,
    },
  ];

  if (selectedPoi) {
    sources["selected-poi"] = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          ...(selectedPoi.point
            ? [
                {
                  type: "Feature",
                  geometry: selectedPoi.point,
                  properties: {
                    id: selectedPoi.id,
                    type: selectedPoi.type,
                    name: selectedPoi.name,
                    color: selectedPoi.color,
                  },
                },
              ]
            : []),
          ...(selectedPoi.area
            ? [
                {
                  type: "Feature",
                  geometry: selectedPoi.area,
                  properties: {
                    id: selectedPoi.id,
                    type: selectedPoi.type,
                    name: selectedPoi.name,
                    color: selectedPoi.color,
                  },
                },
              ]
            : []),
        ],
      },
    };
  } else {
    sources["selected-poi"] = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    };
  }

  layers.push(
    {
      id: "selected-poi-point",
      type: "circle",
      source: "selected-poi",
      filter: ["==", ["geometry-type"], "Point"],
      paint: {
        "circle-radius": SELECTED_POINT_RADIUS_OUTLINE,
        "circle-color": "#000",
      },
      minzoom: 0,
      maxzoom: 22,
    },
    {
      id: "selected-poi-point-white",
      type: "circle",
      source: "selected-poi",
      filter: ["==", ["geometry-type"], "Point"],
      paint: {
        "circle-radius": SELECTED_POINT_RADIUS_WHITE,
        "circle-color": "#fff",
      },
      minzoom: 0,
      maxzoom: 22,
    },
    {
      id: "selected-poi-point-color",
      type: "circle",
      source: "selected-poi",
      filter: ["==", ["geometry-type"], "Point"],
      paint: {
        "circle-radius": SELECTED_POINT_RADIUS_COLOR,
        "circle-color": ["get", "color"],
      },
      minzoom: 0,
      maxzoom: 22,
    }
  );

  return {
    id: "design",
    order: 100,
    sources,
    layers,
  } as OverlayStyle;
}
