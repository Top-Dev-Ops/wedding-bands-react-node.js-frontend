import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

export default function HorizontalSlider({ ring_number }) {
    const _state = useSelector(state => state);
    const { ring_1_material, ring_1_surface, ring_1_2_surface, ring_1_3_surface, ring_1_width, ring_2_material, ring_2_surface, ring_2_2_surface, ring_2_3_surface, ring_2_width } = _state.data;
    const canvas_colors = ['#eaca7c', '#dbb177', '#dbac88', '#ac9f93', '#c1bdbc', '#b2b7b9', '#bcbbbb'];

    const profile_width = ring_number === 'Ring 1' ? ring_1_width / 2 + 2 : ring_2_width / 2 + 2;

    let color = "";
    let left_0 = "0%";
    let left_1 = "0%";
    let left_2 = "0%";
    let width_0 = "0%";
    let width_1 = "0%";
    let width_2 = "0%";
    let left_start_0 = "0%";
    let left_start_1 = "0%";
    let left_start_2 = "0%";
    let ratio_0 = (profile_width / 2).toFixed(2) + ' mm';
    let ratio_1 = (profile_width / 2).toFixed(2) + ' mm';
    let ratio_2 = (profile_width / 2).toFixed(2) + ' mm';

    if (ring_number === 'Ring 1') {
        if (ring_1_material.includes('one')) {
            color = `${canvas_colors[parseInt(ring_1_surface)]}`;
            left_0 = "50%";
            width_0 = "100%";
            ratio_0 = profile_width + " mm";
        } else if (ring_1_material.includes('two')) {
            const ratio = ring_1_material.charAt(ring_1_material.length - 1);
            if (ratio == 0 || ratio == 3 || ratio == 4) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_1_surface)]} 0%, ${canvas_colors[parseInt(ring_1_surface)]} 49%, #000 50%, ${canvas_colors[parseInt(ring_1_2_surface)]} 51%, ${canvas_colors[parseInt(ring_1_2_surface)]} 100%)`;
                left_0 = "25%";
                left_1 = "75%";
                width_0 = "49.5%";
                width_1 = "49.5%";
                left_start_1 = "50.5%";
            } else if (ratio == 1) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_1_surface)]} 0%, ${canvas_colors[parseInt(ring_1_surface)]} 65%, #000 66%, ${canvas_colors[parseInt(ring_1_2_surface)]} 67%, ${canvas_colors[parseInt(ring_1_2_surface)]} 100%)`;
                left_0 = "33%";
                left_1 = "83%";
                width_0 = '65.5%';
                width_1 = "33.5%";
                left_start_1 = "66.5%";
                ratio_0 = (2 * profile_width / 3).toFixed(2) + ' mm';
                ratio_1 = (profile_width / 3).toFixed(2) + ' mm';
            } else {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_1_surface)]} 0%, ${canvas_colors[parseInt(ring_1_surface)]} 74%, #000 75%, ${canvas_colors[parseInt(ring_1_2_surface)]} 76%, ${canvas_colors[parseInt(ring_1_2_surface)]} 100%)`;
                left_0 = "37%";
                left_1 = "89%";
                width_0 = "74.5%";
                width_1 = "24.5%";
                left_start_1 = "75.5%";
                ratio_0 = (profile_width * .75).toFixed(2) + ' mm';
                ratio_1 = (profile_width * .25).toFixed(2) + ' mm';
            }
        } else {
            const ratio = ring_1_material.charAt(ring_1_material.length - 1);
            if (ratio == 0) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_1_surface)]} 0%, ${canvas_colors[parseInt(ring_1_surface)]} 32%, #000 33%, ${canvas_colors[parseInt(ring_1_2_surface)]} 34%, ${canvas_colors[parseInt(ring_1_2_surface)]} 65%, #000 66%, ${canvas_colors[parseInt(ring_1_3_surface)]} 67%, ${canvas_colors[parseInt(ring_1_3_surface)]} 100%)`;
                left_0 = "16%";
                left_1 = "50%";
                left_2 = "83%";
                width_0 = "32.5%";
                width_1 = "32%";
                width_2 = "33.5%";
                left_start_1 = "33.5%";
                left_start_2 = "66.5%";
                ratio_0 = (profile_width / 3).toFixed(2) + " mm";
                ratio_1 = (profile_width / 3).toFixed(2) + " mm";
                ratio_2 = (profile_width / 3).toFixed(2) + " mm";
            } else if (ratio == 1) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_1_surface)]} 0%, ${canvas_colors[parseInt(ring_1_surface)]} 60%, #000 61%, ${canvas_colors[parseInt(ring_1_2_surface)]} 62%, ${canvas_colors[parseInt(ring_1_2_surface)]} 80%, #000 81%, ${canvas_colors[parseInt(ring_1_3_surface)]} 82%, ${canvas_colors[parseInt(ring_1_3_surface)]} 100%)`;
                left_0 = "30%";
                left_1 = "71%";
                left_2 = "91%";
                width_0 = "60.5%";
                width_1 = "19%";
                width_2 = "18.5%";
                left_start_1 = "61.5%";
                left_start_2 = "81.5%";
                ratio_0 = (profile_width * .6).toFixed(2) + ' mm';
                ratio_1 = (profile_width * .2).toFixed(2) + ' mm';
                ratio_2 = (profile_width * .2).toFixed(2) + ' mm';
            } else if (ratio == 2) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_1_surface)]} 0%, ${canvas_colors[parseInt(ring_1_surface)]} 64%, #000 65%, ${canvas_colors[parseInt(ring_1_2_surface)]} 66%, ${canvas_colors[parseInt(ring_1_2_surface)]} 83%, #000 84%, ${canvas_colors[parseInt(ring_1_3_surface)]} 85%, ${canvas_colors[parseInt(ring_1_3_surface)]} 100%)`;
                left_0 = "32%";
                left_1 = "74%";
                left_2 = "93%";
                width_0 = "64.5%";
                width_1 = "18%";
                width_2 = "15.5%";
                left_start_1 = "65.5%";
                left_start_2 = "84.5%";
                ratio_0 = (profile_width * 2 / 3).toFixed(2) + ' mm';
                ratio_1 = (profile_width / 6).toFixed(2) + ' mm';
                ratio_2 = (profile_width / 6).toFixed(2) + ' mm';
            } else if (ratio == 3) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_1_surface)]} 0%, ${canvas_colors[parseInt(ring_1_surface)]} 24%, #000 25%, ${canvas_colors[parseInt(ring_1_2_surface)]} 26%, ${canvas_colors[parseInt(ring_1_2_surface)]} 75%, #000 76%, ${canvas_colors[parseInt(ring_1_3_surface)]} 77%, ${canvas_colors[parseInt(ring_1_3_surface)]} 100%)`;
                left_0 = "12%";
                left_1 = "46%";
                left_2 = "88%";
                width_0 = "24.5%";
                width_1 = "50%";
                width_2 = "23.5%";
                left_start_1 = "25.5%";
                left_start_2 = "76.5%";
                ratio_0 = (profile_width * .25).toFixed(2) + ' mm';
                ratio_1 = (profile_width * .5).toFixed(2) + ' mm';
                ratio_2 = (profile_width * .25).toFixed(2) + ' mm';
            } else if (ratio == 4) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_1_surface)]} 0%, ${canvas_colors[parseInt(ring_1_surface)]} 20%, #000 21%, ${canvas_colors[parseInt(ring_1_2_surface)]} 22%, ${canvas_colors[parseInt(ring_1_2_surface)]} 79%, #000 80%, ${canvas_colors[parseInt(ring_1_3_surface)]} 81%, ${canvas_colors[parseInt(ring_1_3_surface)]} 100%)`;
                left_0 = "10%";
                left_1 = "50%";
                left_2 = "90%";
                width_0 = "20.5%";
                width_1 = "58%";
                width_2 = "19.5%";
                left_start_1 = "21.5%";
                left_start_2 = "80.5%";
                ratio_0 = (profile_width * .2).toFixed(2) + ' mm';
                ratio_1 = (profile_width * .6).toFixed(2) + ' mm';
                ratio_2 = (profile_width * .2).toFixed(2) + ' mm';
            } else if (ratio == 5) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_1_surface)]} 0%, ${canvas_colors[parseInt(ring_1_surface)]} 16%, #000 17%, ${canvas_colors[parseInt(ring_1_2_surface)]} 18%, ${canvas_colors[parseInt(ring_1_2_surface)]} 81%, #000 82%, ${canvas_colors[parseInt(ring_1_3_surface)]} 83%, ${canvas_colors[parseInt(ring_1_3_surface)]} 100%)`;
                left_0 = "8%";
                left_1 = "50%";
                left_2 = "92%";
                width_0 = "16.5%";
                width_1 = "64%";
                width_2 = "17.5%";
                left_start_1 = "17.5%";
                left_start_2 = "82.5%";
                ratio_1 = (profile_width * 2 / 3).toFixed(2) + ' mm';
                ratio_0 = (profile_width / 6).toFixed(2) + ' mm';
                ratio_2 = (profile_width / 6).toFixed(2) + ' mm';
            } else {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_1_surface)]} 0%, ${canvas_colors[parseInt(ring_1_surface)]} 40%, #000 41%, ${canvas_colors[parseInt(ring_1_2_surface)]} 42%, ${canvas_colors[parseInt(ring_1_2_surface)]} 58%, #000 59%, ${canvas_colors[parseInt(ring_1_3_surface)]} 60%, ${canvas_colors[parseInt(ring_1_3_surface)]} 100%)`;
                left_0 = "20%";
                left_1 = "50%";
                left_2 = "80%";
                width_0 = "40.5%";
                width_1 = "17%";
                width_2 = "40.5%";
                left_start_1 = "41.5%";
                left_start_2 = "59.5%";
                ratio_0 = (profile_width * .4).toFixed(2) + ' mm';
                ratio_1 = (profile_width * .2).toFixed(2) + ' mm';
                ratio_2 = (profile_width * .4).toFixed(2) + ' mm';
            }
        }
    } else {
        if (ring_2_material.includes('one')) {
            color = `${canvas_colors[parseInt(ring_2_surface)]}`;
            left_0 = "50%";
            width_0 = "100%";
            ratio_0 = profile_width + ' mm';
        } else if (ring_2_material.includes('two')) {
            const ratio = ring_2_material.charAt(ring_2_material.length - 1);
            if (ratio == 0 || ratio == 3 || ratio == 4) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_2_surface)]} 0%, ${canvas_colors[parseInt(ring_2_surface)]} 49%, #000 50%, ${canvas_colors[parseInt(ring_2_2_surface)]} 51%, ${canvas_colors[parseInt(ring_2_2_surface)]} 100%)`;
                left_0 = "25%";
                left_1 = "75%";
                width_0 = "49.5%";
                width_1 = "49.5%";
                left_start_1 = "50.5%";
            } else if (ratio == 1) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_2_surface)]} 0%, ${canvas_colors[parseInt(ring_2_surface)]} 65%, #000 66%, ${canvas_colors[parseInt(ring_2_2_surface)]} 67%, ${canvas_colors[parseInt(ring_2_2_surface)]} 100%)`;
                left_0 = "33%";
                left_1 = "83%";
                width_0 = '65.5%';
                width_1 = "33.5%";
                left_start_1 = "66.5%";
                ratio_0 = (2 * profile_width / 3).toFixed(2) + ' mm';
                ratio_1 = (profile_width / 3).toFixed(2) + ' mm';
            } else {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_2_surface)]} 0%, ${canvas_colors[parseInt(ring_2_surface)]} 74%, #000 75%, ${canvas_colors[parseInt(ring_2_2_surface)]} 76%, ${canvas_colors[parseInt(ring_2_2_surface)]} 100%)`;
                left_0 = "37%";
                left_1 = "89%";
                width_0 = "74.5%";
                width_1 = "24.5%";
                left_start_1 = "75.5%";
                ratio_0 = (profile_width * .75).toFixed(2) + ' mm';
                ratio_1 = (profile_width * .25).toFixed(2) + ' mm';
            }
        } else {
            const ratio = ring_2_material.charAt(ring_2_material.length - 1);
            if (ratio == 0) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_2_surface)]} 0%, ${canvas_colors[parseInt(ring_2_surface)]} 32%, #000 33%, ${canvas_colors[parseInt(ring_2_2_surface)]} 34%, ${canvas_colors[parseInt(ring_2_2_surface)]} 65%, #000 66%, ${canvas_colors[parseInt(ring_2_3_surface)]} 67%, ${canvas_colors[parseInt(ring_2_3_surface)]} 100%)`;
                left_0 = "16%";
                left_1 = "50%";
                left_2 = "83%";
                width_0 = "32.5%";
                width_1 = "32%";
                width_2 = "33.5%";
                left_start_1 = "33.5%";
                left_start_2 = "66.5%";
                ratio_0 = (profile_width / 3).toFixed(2) + ' mm';
                ratio_1 = (profile_width / 3).toFixed(2) + ' mm';
                ratio_2 = (profile_width / 3).toFixed(2) + ' mm';
            } else if (ratio == 1) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_2_surface)]} 0%, ${canvas_colors[parseInt(ring_2_surface)]} 60%, #000 61%, ${canvas_colors[parseInt(ring_2_2_surface)]} 62%, ${canvas_colors[parseInt(ring_2_2_surface)]} 80%, #000 81%, ${canvas_colors[parseInt(ring_2_3_surface)]} 82%, ${canvas_colors[parseInt(ring_2_3_surface)]} 100%)`;
                left_0 = "30%";
                left_1 = "71%";
                left_2 = "91%";
                width_0 = "60.5%";
                width_1 = "19%";
                width_2 = "18.5%";
                left_start_1 = "61.5%";
                left_start_2 = "81.5%";
                ratio_0 = (profile_width * .6).toFixed(2) + ' mm';
                ratio_1 = (profile_width * .2).toFixed(2) + ' mm';
                ratio_2 = (profile_width * .2).toFixed(2) + ' mm';
            } else if (ratio == 2) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_2_surface)]} 0%, ${canvas_colors[parseInt(ring_2_surface)]} 64%, #000 65%, ${canvas_colors[parseInt(ring_2_2_surface)]} 66%, ${canvas_colors[parseInt(ring_2_2_surface)]} 83%, #000 84%, ${canvas_colors[parseInt(ring_2_3_surface)]} 85%, ${canvas_colors[parseInt(ring_2_3_surface)]} 100%)`;
                left_0 = "32%";
                left_1 = "74%";
                left_2 = "93%";
                width_0 = "64.5%";
                width_1 = "18%";
                width_2 = "15.5%";
                left_start_1 = "65.5%";
                left_start_2 = "84.5%";
                ratio_0 = (profile_width * 2 / 3).toFixed(2) + ' mm';
                ratio_1 = (profile_width / 6).toFixed(2) + ' mm';
                ratio_2 = (profile_width / 6).toFixed(2) + ' mm';
            } else if (ratio == 3) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_2_surface)]} 0%, ${canvas_colors[parseInt(ring_2_surface)]} 24%, #000 25%, ${canvas_colors[parseInt(ring_2_2_surface)]} 26%, ${canvas_colors[parseInt(ring_2_2_surface)]} 75%, #000 76%, ${canvas_colors[parseInt(ring_2_3_surface)]} 77%, ${canvas_colors[parseInt(ring_2_3_surface)]} 100%)`;
                left_0 = "12%";
                left_1 = "46%";
                left_2 = "88%";
                width_0 = "24.5%";
                width_1 = "50%";
                width_2 = "23.5%";
                left_start_1 = "25.5%";
                left_start_2 = "76.5%";
                ratio_0 = (profile_width * .25).toFixed(2) + ' mm';
                ratio_1 = (profile_width * .5).toFixed(2) + ' mm';
                ratio_2 = (profile_width * .25).toFixed(2) + ' mm';
            } else if (ratio == 4) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_2_surface)]} 0%, ${canvas_colors[parseInt(ring_2_surface)]} 20%, #000 21%, ${canvas_colors[parseInt(ring_2_2_surface)]} 22%, ${canvas_colors[parseInt(ring_2_2_surface)]} 79%, #000 80%, ${canvas_colors[parseInt(ring_2_3_surface)]} 81%, ${canvas_colors[parseInt(ring_2_3_surface)]} 100%)`;
                left_0 = "10%";
                left_1 = "50%";
                left_2 = "90%";
                width_0 = "20.5%";
                width_1 = "58%";
                width_2 = "19.5%";
                left_start_1 = "21.5%";
                left_start_2 = "80.5%";
                ratio_0 = (profile_width * .2).toFixed(2) + ' mm';
                ratio_1 = (profile_width * .6).toFixed(2) + ' mm';
                ratio_2 = (profile_width * .2).toFixed(2) + ' mm';
            } else if (ratio == 5) {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_2_surface)]} 0%, ${canvas_colors[parseInt(ring_2_surface)]} 16%, #000 17%, ${canvas_colors[parseInt(ring_2_2_surface)]} 18%, ${canvas_colors[parseInt(ring_2_2_surface)]} 81%, #000 82%, ${canvas_colors[parseInt(ring_2_3_surface)]} 83%, ${canvas_colors[parseInt(ring_2_3_surface)]} 100%)`;
                left_0 = "8%";
                left_1 = "50%";
                left_2 = "92%";
                width_0 = "16.5%";
                width_1 = "64%";
                width_2 = "17.5%";
                left_start_1 = "17.5%";
                left_start_2 = "82.5%";
                ratio_0 = (profile_width / 6).toFixed(2) + ' mm';
                ratio_1 = (profile_width * 2 / 3).toFixed(2) + ' mm';
                ratio_2 = (profile_width / 6).toFixed(2) + ' mm';
            } else {
                color = `linear-gradient(to right, ${canvas_colors[parseInt(ring_2_surface)]} 0%, ${canvas_colors[parseInt(ring_2_surface)]} 40%, #000 41%, ${canvas_colors[parseInt(ring_2_2_surface)]} 42%, ${canvas_colors[parseInt(ring_2_2_surface)]} 58%, #000 59%, ${canvas_colors[parseInt(ring_2_3_surface)]} 60%, ${canvas_colors[parseInt(ring_2_3_surface)]} 100%)`;
                left_0 = "20%";
                left_1 = "50%";
                left_2 = "80%";
                width_0 = "40.5%";
                width_1 = "17%";
                width_2 = "40.5%";
                left_start_1 = "41.5%";
                left_start_2 = "59.5%";
                ratio_0 = (profile_width * .4).toFixed(2) + ' mm';
                ratio_1 = (profile_width * .2).toFixed(2) + ' mm';
                ratio_2 = (profile_width * .4).toFixed(2) + ' mm';
            }
        }
    }

    return (
        <section className="horizontal-slider">
            <label>{ring_number}</label>
            <div className="color-canvas" style={{ background: `${color}` }}>
                <span style={{ left: `${left_0}` }}>1</span>
                {ring_number === 'Ring 1' && !ring_1_material.includes('one') && <span style={{ left: `${left_1}` }}>2</span>}
                {ring_number === 'Ring 1' && ring_1_material.includes('three') && <span style={{ left: `${left_2}` }}>3</span>}
                {ring_number === 'Ring 2' && !ring_2_material.includes('one') && <span style={{ left: `${left_1}` }}>2</span>}
                {ring_number === 'Ring 2' && ring_2_material.includes('three') && <span style={{ left: `${left_2}` }}>3</span>}
            </div>
            <div className="ratio-canvas">
                <div className="vertical-1" style={{ width: `${width_0}`, left: `${left_start_0}` }}></div>
                {ring_number === 'Ring 1' && !ring_1_material.includes('one') && <div className="vertical-2" style={{ width: `${width_1}`, left: `${left_start_1}` }}></div>}
                {ring_number === 'Ring 1' && ring_1_material.includes('three') && <div className="vertical-3" style={{ width: `${width_2}`, left: `${left_start_2}` }}></div>}
                {ring_number === 'Ring 2' && !ring_2_material.includes('one') && <div className="vertical-2" style={{ width: `${width_1}`, left: `${left_start_1}` }}></div>}
                {ring_number === 'Ring 2' && ring_2_material.includes('three') && <div className="vertical-3" style={{ width: `${width_2}`, left: `${left_start_2}` }}></div>}
                <div className="horizontal-1" style={{ width: `${width_0}`, left: `${left_start_0}` }}></div>
                {ring_number === 'Ring 1' && !ring_1_material.includes('one') && <div className="horizontal-2" style={{ width: `${width_1}`, left: `${left_start_1}` }}></div>}
                {ring_number === 'Ring 1' && ring_1_material.includes('three') && <div className="horizontal-3" style={{ width: `${width_2}`, left: `${left_start_2}` }}></div>}
                {ring_number === 'Ring 2' && !ring_2_material.includes('one') && <div className="horizontal-2" style={{ width: `${width_1}`, left: `${left_start_1}` }}></div>}
                {ring_number === 'Ring 2' && ring_2_material.includes('three') && <div className="horizontal-3" style={{ width: `${width_2}`, left: `${left_start_2}` }}></div>}
                <div className="label-1" style={{ left: `${left_0}` }}>{ratio_0}</div>
                {ring_number === 'Ring 1' && !ring_1_material.includes('one') && <div className="label-2" style={{ left: `${left_1}` }}>{ratio_1}</div>}
                {ring_number === 'Ring 1' && ring_1_material.includes('three') && <div className="label-3" style={{ left: `${left_2}` }}>{ratio_2}</div>}
                {ring_number === 'Ring 2' && !ring_2_material.includes('one') && <div className="label-2" style={{ left: `${left_1}` }}>{ratio_1}</div>}
                {ring_number === 'Ring 2' && ring_2_material.includes('three') && <div className="label-3" style={{ left: `${left_2}` }}>{ratio_2}</div>}
            </div>

        </section>
    );
}

HorizontalSlider.propTypes = {
    ring_number: PropTypes.string.isRequired,
}