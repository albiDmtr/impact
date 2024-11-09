'use client';
import DeckGL from '@deck.gl/react';
import StaticMap from 'react-map-gl';
import React, {useState, useCallback, useEffect} from 'react';
import { LinearInterpolator } from '@deck.gl/core';
import {HeatmapLayer} from '@deck.gl/aggregation-layers';

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const INITIAL_VIEW_STATE = {
  latitude: 40.732777509541414,
  longitude: -73.99210821089324,
  zoom: 11,
  pitch: 30,
  bearing: 0
};

type DataType = {
  from: [longitude: number, latitude: number];
  to: [longitude: number, latitude: number];
};

const transitionInterpolator = new LinearInterpolator();

const Visualization = () => {

  // get data
  const DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/screen-grid/uber-pickup-locations.json';
  type DataPoint = [longitude: number, latitude: number, count: number];
  const layers = [
    new HeatmapLayer<DataPoint>({
      data: DATA_URL,
      id: 'heatmap-layer',
      pickable: false,
      getPosition: d => [d[0], d[1]],
      getWeight: d => d[2],
      radiusPixels: 5,
      intensity: 2.2,
      threshold: 0.12,
      colorRange: [[34, 245, 80],[34, 245, 80]]

    })
  ];

  const [viewState, updateViewState] = useState<Record<string, any>>(INITIAL_VIEW_STATE);


  const rotateCamera = useCallback(() => {
    updateViewState(v => ({
      ...v,
      bearing: v.bearing + 30,
      transitionDuration: 30000,
      transitionInterpolator,
      onTransitionEnd: rotateCamera
    }));
  }, []);

    useEffect(() => {
        document.querySelector('.mapboxgl-canvas')?.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none;');
    }, []);

  return (
    <DeckGL
    viewState={viewState}
    controller={true}
    onLoad={rotateCamera}
    onViewStateChange={v => updateViewState(v.viewState)}
    layers={layers}
    >
    <StaticMap
      mapStyle="mapbox://styles/albidmtr/cm39gbxix01iy01pihhx11m64"
      mapboxAccessToken={mapboxToken}
      dragRotate={true}
      dragPan={false}
      doubleClickZoom={false}/>
  </DeckGL>
  );
}

export default Visualization;