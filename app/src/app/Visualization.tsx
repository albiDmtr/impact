'use client';
import DeckGL from '@deck.gl/react';
import React, {useEffect} from 'react';
import {
  _GlobeView as GlobeView,
  COORDINATE_SYSTEM
} from '@deck.gl/core';
import {ScatterplotLayer} from '@deck.gl/layers';
import {GeoJsonLayer} from '@deck.gl/layers';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {SphereGeometry} from '@luma.gl/engine';
import viewStates from './viewStates.js';

const radius = 3;

const Visualization = () => {

  // get data
  const DATA_URL = 'https://raw.githubusercontent.com/albiDmtr/impact/refs/heads/main/data/testForRes.json';
  type DataPoint = [longitude: number, latitude: number, count: number];
  const layers = [
    new SimpleMeshLayer({
      id: 'earth-sphere',
      data: [0],
      mesh: new SphereGeometry({radius: 6.3e6, nlat: 36, nlong: 72}),
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      getPosition: [0, 0, 0],
      getColor: [34, 34, 34]
    }),
    new GeoJsonLayer({
      id: 'earth-land',
      data: 'https://raw.githubusercontent.com/albiDmtr/impact/refs/heads/main/geojson/earth.geo.json',
      // Styles
      stroked: false,
      filled: true,
      opacity: 0.1,
      getFillColor: [120, 120, 120]
    }),
    new ScatterplotLayer<DataPoint>({
      id: 'scatter-plot',
      data: DATA_URL,
      radiusScale: radius,
      radiusMinPixels: 0.25,
      getPosition: d => [d[0], d[1], 0],
      getFillColor: d => (d[2] === 1 ? [255, 0, 0] : [0, 0, 255]),
      getRadius: 1,
      updateTriggers: {
        getFillColor: [[255, 0, 0], [0, 0, 255], [0, 255, 0]]
      }
    })
  ];

    useEffect(() => {
        document.querySelector('.mapboxgl-canvas')?.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none;');
    }, []);

  return (
    <DeckGL
      views={new GlobeView()}
      initialViewState={viewStates['br']}
      controller={true}
      layers={layers}
    >
  </DeckGL>
  );
}

export default Visualization;