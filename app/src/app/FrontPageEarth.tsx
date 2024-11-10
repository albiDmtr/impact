'use client';
import DeckGL from '@deck.gl/react';
import React, {useState, useEffect, useCallback} from 'react';
import {
    type GlobeViewState,
  _GlobeView as GlobeView,
  LinearInterpolator,
  COORDINATE_SYSTEM
} from '@deck.gl/core';
import {GeoJsonLayer} from '@deck.gl/layers';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {SphereGeometry} from '@luma.gl/engine';

const defaultCoords = {
    latitude: 30.095304663042754,
    longitude: 13.343460989762177,
    zoom: 2
};
const transitionInterpolator = new LinearInterpolator();

const FrontPageEarth = () => {
    const [viewState, updateViewState] = useState<GlobeViewState>(defaultCoords);

    const rotateCamera = useCallback(() => {
        updateViewState(v => ({
            ...v,
            latitude: v.latitude + 50,
            longitude: v.longitude + 50,
            transitionDuration: 30000,
            transitionInterpolator,
            onTransitionEnd: rotateCamera
        }));
      }, []);

  // get data
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
    })
  ];

    useEffect(() => {
        document.querySelector('.mapboxgl-canvas')?.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none;');
    }, []);

  return (
    <>
      <DeckGL
          views={new GlobeView()}
          viewState={viewState}
          controller={true}
          layers={layers}
          onLoad={rotateCamera}
          onViewStateChange={v => updateViewState(v.viewState)}
        >
        </DeckGL>
    </>
  );
}

export default FrontPageEarth;