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

const radius = 1000;

const Visualization = () => {

  // get data
  const DATA_URL = 'https://raw.githubusercontent.com/albiDmtr/impact/refs/heads/main/data/Belgium_forest_loss.json';
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
      data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_land.geojson',
      stroked: false,
      filled: true,
      extruded: true,
      getElevation: -26000,
      opacity: 0.01,
      getFillColor: [255, 255, 255]
    }),
    new GeoJsonLayer({
      id: 'earth-borders',
      data: 'https://raw.githubusercontent.com/georgique/world-geojson/refs/heads/develop/countries/brazil.json',
      stroked: false,
      filled: true,
      radiusMinPixels: 100,
      opacity: 0.1,
      getFillColor: [255, 255, 255]
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
    }),
    new SimpleMeshLayer({
      id: 'earth-sphere',
      data: [0],
      mesh: new SphereGeometry({radius: 6.3e6, nlat: 36, nlong: 72}),
      coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
      getPosition: [0, 0, 0],
      getColor: [0, 34, 34],
      texture: 'https://raw.githubusercontent.com/albiDmtr/impact/refs/heads/main/data/earth.jpg',
      sizeScale: 10
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