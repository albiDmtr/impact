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
import { viewStates, defaultCoords } from './viewStates.js';
import countryNames from './countryNames.js';

const radius = 1000;

interface Props {
  years: number[];
  country: string;
}

const Visualization = ({years, country}: Props) => {

  // get data
  const DATA_URL = `https://raw.githubusercontent.com/albiDmtr/impact/refs/heads/main/data/${country}_forest_loss.json`;
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
      opacity: 0.005,
      getFillColor: [255, 255, 255]
    }),
    new GeoJsonLayer({
      id: 'earth-borders',
      data: `https://raw.githubusercontent.com/georgique/world-geojson/refs/heads/develop/countries/${countryNames[country as keyof typeof countryNames]}.json`,
      stroked: false,
      filled: true,
      radiusMinPixels: 100,
      opacity: 0.001,
      getFillColor: [255, 255, 255]
    }),
    new ScatterplotLayer<DataPoint>({
      id: 'scatter-plot',
      data: DATA_URL,
      radiusScale: radius,
      radiusMinPixels: 0.25,
      getPosition: d => [d[0], d[1], 0],
      getFillColor: d => {
        return (
        2000+d[2] >= years[0] && 2000+d[2] <= years[1]
          ?
            [255, 25, 25, 255]
            :
            [255, 25, 25, 0]
      )},
      getRadius: 1,
      updateTriggers: {
        getFillColor: [years]
      }
    })
  ];

    useEffect(() => {
        document.querySelector('.mapboxgl-canvas')?.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none;');
    }, []);

  return (
    <>
      <DeckGL
          views={new GlobeView()}
          initialViewState={viewStates[country as keyof typeof viewStates] || defaultCoords}
          controller={true}
          layers={layers}
        >
        </DeckGL>
    </>
  );
}

export default Visualization;