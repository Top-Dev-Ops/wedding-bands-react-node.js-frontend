import React, { Component } from 'react';
import $ from 'jquery';

import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';
import { stopHandView, stopFullScreen, } from '../../redux/actions';

import Loading from '../Loading';

// three js engine for canvas rendering
import { Metal, Groove, Diamond, RingConfig } from '../../assets/mainConfig';
import { InitDisplay } from '../../assets/js/ring/screen';

class Canvas extends Component {
    constructor(props) {
        super(props);

        const {
            ring_1_profiles,
            ring_2_profiles,
            ring_1_size,
            ring_2_size,
            ring_1_width,
            ring_2_width,
            ring_1_height,
            ring_2_height
        } = props.data;

        this.ring_1_config = new RingConfig(parseInt(ring_1_profiles.charCodeAt(0) - 65), 2 + ring_1_width / 2, 1.2 + ring_1_height / 10, 45 + ring_1_size / 2, "I LOVE YOU");
        this.ring_2_config = new RingConfig(parseInt(ring_2_profiles.charCodeAt(0) - 65), 2 + ring_2_width / 2, 1.2 + ring_2_height / 10, 45 + ring_2_size / 2, "I LOVE YOU");

        // this.serverUrl = "http://localhost:4000/";
        this.serverUrl = "http://greatitteam.site:4000/"

        this.gGrooveStart = 0;
        this.mousePt = { x: 0, y: 0 };
        this.mouseCapture = false;
        this.captureIndex = 0;

        this.container = React.createRef();
    }

    /* checks if specific redux state changed & updates ring in canvas */
    checkIfReduxDataStateChanged(prevProps, nowProps) {
        let state_changed = false;

        if (prevProps.ring_1_disabled != nowProps.ring_1_disabled) { state_changed = true; }
        if (prevProps.ring_2_disabled != nowProps.ring_2_disabled) { state_changed = true; }
        if (prevProps.ring_1_material != nowProps.ring_1_material) { state_changed = true; }
        if (prevProps.ring_2_material != nowProps.ring_2_material) { state_changed = true; }
        if (prevProps.ring_1_profiles != nowProps.ring_1_profiles) { state_changed = true; }
        if (prevProps.ring_2_profiles != nowProps.ring_2_profiles) { state_changed = true; }
        if (prevProps.ring_1_size != nowProps.ring_1_size) { state_changed = true; }
        if (prevProps.ring_2_size != nowProps.ring_2_size) { state_changed = true; }
        if (prevProps.ring_1_width != nowProps.ring_1_width) { state_changed = true; }
        if (prevProps.ring_2_width != nowProps.ring_2_width) { state_changed = true; }
        if (prevProps.ring_1_height != nowProps.ring_1_height) { state_changed = true; }
        if (prevProps.ring_2_height != nowProps.ring_2_height) { state_changed = true; }
        if (prevProps.ring_1_metal != nowProps.ring_1_metal) { state_changed = true; }
        if (prevProps.ring_2_metal != nowProps.ring_2_metal) { state_changed = true; }
        if (prevProps.ring_1_surface != nowProps.ring_1_surface) { state_changed = true; }
        if (prevProps.ring_2_surface != nowProps.ring_2_surface) { state_changed = true; }
        if (prevProps.ring_1_fineness != nowProps.ring_1_fineness) { state_changed = true; }
        if (prevProps.ring_2_fineness != nowProps.ring_2_fineness) { state_changed = true; }
        if (prevProps.ring_1_2_surface != nowProps.ring_1_2_surface) { state_changed = true; }
        if (prevProps.ring_1_2_metal != nowProps.ring_1_2_metal) { state_changed = true; }
        if (prevProps.ring_1_2_fineness != nowProps.ring_1_2_fineness) { state_changed = true; }
        if (prevProps.ring_1_3_surface != nowProps.ring_1_3_surface) { state_changed = true; }
        if (prevProps.ring_1_3_metal != nowProps.ring_1_3_metal) { state_changed = true; }
        if (prevProps.ring_1_3_fineness != nowProps.ring_1_3_fineness) { state_changed = true; }
        if (prevProps.ring_2_2_surface != nowProps.ring_2_2_surface) { state_changed = true; }
        if (prevProps.ring_2_2_metal != nowProps.ring_2_2_metal) { state_changed = true; }
        if (prevProps.ring_2_2_fineness != nowProps.ring_2_2_fineness) { state_changed = true; }
        if (prevProps.ring_2_3_surface != nowProps.ring_2_3_surface) { state_changed = true; }
        if (prevProps.ring_2_3_metal != nowProps.ring_2_3_metal) { state_changed = true; }
        if (prevProps.ring_2_3_fineness != nowProps.ring_2_3_fineness) { state_changed = true; }
        if (prevProps.ring_1_wave_height != nowProps.ring_1_wave_height) { state_changed = true; }
        if (prevProps.ring_1_number_of_waves != nowProps.ring_1_number_of_waves) { state_changed = true; }
        if (prevProps.ring_2_wave_height != nowProps.ring_2_wave_height) { state_changed = true; }
        if (prevProps.ring_2_number_of_waves != nowProps.ring_2_number_of_waves) { state_changed = true; }
        if (prevProps.ring_1_diamond_setting != nowProps.ring_1_diamond_setting) { state_changed = true; }
        if (prevProps.ring_2_diamond_setting != nowProps.ring_2_diamond_setting) { state_changed = true; }
        if (prevProps.ring_1_diamond_cut != nowProps.ring_1_diamond_cut) { state_changed = true; }
        if (prevProps.ring_2_diamond_cut != nowProps.ring_2_diamond_cut) { state_changed = true; }
        if (prevProps.ring_1_diamond_size != nowProps.ring_1_diamond_size) { state_changed = true; }
        if (prevProps.ring_2_diamond_size != nowProps.ring_2_diamond_size) { state_changed = true; }
        if (prevProps.ring_1_diamond_quality != nowProps.ring_1_diamond_quality) { state_changed = true; }
        if (prevProps.ring_2_diamond_quality != nowProps.ring_2_diamond_quality) { state_changed = true; }
        if (prevProps.ring_1_number_of_stones != nowProps.ring_1_number_of_stones) { state_changed = true; }
        if (prevProps.ring_2_number_of_stones != nowProps.ring_2_number_of_stones) { state_changed = true; }
        if (prevProps.ring_1_rows != nowProps.ring_1_rows) { state_changed = true; }
        if (prevProps.ring_2_rows != nowProps.ring_2_rows) { state_changed = true; }
        if (prevProps.ring_1_position != nowProps.ring_1_position) { state_changed = true; }
        if (prevProps.ring_2_position != nowProps.ring_2_position) { state_changed = true; }
        if (prevProps.ring_1_engraving_text != nowProps.ring_1_engraving_text) { state_changed = true; }
        if (prevProps.ring_2_engraving_text != nowProps.ring_2_engraving_text) { state_changed = true; }
        if (prevProps.ring_1_engraving_font != nowProps.ring_1_engraving_font) { state_changed = true; }
        if (prevProps.ring_2_engraving_font != nowProps.ring_2_engraving_font) { state_changed = true; }
        if (prevProps.ring_1_left_edge != nowProps.ring_1_left_edge) { state_changed = true; }
        if (prevProps.ring_1_right_edge != nowProps.ring_1_right_edge) { state_changed = true; }
        if (prevProps.ring_1_left_width != nowProps.ring_1_left_width) { state_changed = true; }
        if (prevProps.ring_1_right_width != nowProps.ring_1_right_width) { state_changed = true; }
        if (prevProps.ring_1_left_surface != nowProps.ring_1_left_surface) { state_changed = true; }
        if (prevProps.ring_1_right_surface != nowProps.ring_1_right_surface) { state_changed = true; }
        if (prevProps.ring_2_left_edge != nowProps.ring_2_left_edge) { state_changed = true; }
        if (prevProps.ring_2_right_edge != nowProps.ring_2_right_edge) { state_changed = true; }
        if (prevProps.ring_2_left_width != nowProps.ring_2_left_width) { state_changed = true; }
        if (prevProps.ring_2_right_width != nowProps.ring_2_right_width) { state_changed = true; }
        if (prevProps.ring_2_left_surface != nowProps.ring_2_left_surface) { state_changed = true; }
        if (prevProps.ring_2_right_surface != nowProps.ring_2_right_surface) { state_changed = true; }
        if (prevProps.ring_1_design_grooves_types != nowProps.ring_1_design_grooves_types) { state_changed = true; }
        if (prevProps.ring_1_design_grooves_widths != nowProps.ring_1_design_grooves_widths) { state_changed = true; }
        if (prevProps.ring_1_design_grooves_surfaces != nowProps.ring_1_design_grooves_surfaces) { state_changed = true; }
        if (prevProps.ring_1_design_grooves_alignments != nowProps.ring_1_design_grooves_alignments) { state_changed = true; }
        if (prevProps.ring_1_design_grooves_positions != nowProps.ring_1_design_grooves_positions) { state_changed = true; }
        if (prevProps.ring_2_design_grooves_types != nowProps.ring_2_design_grooves_types) { state_changed = true; }
        if (prevProps.ring_2_design_grooves_widths != nowProps.ring_2_design_grooves_widths) { state_changed = true; }
        if (prevProps.ring_2_design_grooves_surfaces != nowProps.ring_2_design_grooves_surfaces) { state_changed = true; }
        if (prevProps.ring_2_design_grooves_alignments != nowProps.ring_2_design_grooves_alignments) { state_changed = true; }
        if (prevProps.ring_2_design_grooves_positions != nowProps.ring_2_design_grooves_positions) { state_changed = true; }

        if (state_changed) { this.testRingConfigurator('switch'); }
    }



    /* are called in  */
    checkTwoColorTab(metal, groove, ring_index) {
        var waveNums = [2, 3, 4];
        var waveHeights = [0.2, 0.25, 0.3, 0.35, 0.4, 0.5];
        var cat = [
            { slice: [1, 1], dir: 'V', sine: 0 },
            { slice: [2, 1], dir: 'V', sine: 0 },
            { slice: [3, 1], dir: 'V', sine: 0 },
            { slice: [1, 1], dir: 'V', sine: 1 },
            { slice: [1, 1], dir: 'V', sine: -1 },
            { slice: [1, 1], dir: 'H', sine: 0 },
        ];
        var positions = [0.5, 2 / 3.0, 3 / 4.0, 0.5, 0.5, 0.5];
        const index = ring_index === 1 ? parseInt(this.props.data.ring_1_material.replace('two_colors_', '')) : parseInt(this.props.data.ring_2_material.replace('two_colors_', ''));

        if (index >= 0) {
            if (ring_index === 1) {
                metal.setSurface([this.props.data.ring_1_metal, this.props.data.ring_1_2_metal]);
                metal.setGradient([this.props.data.ring_1_surface, this.props.data.ring_1_2_surface]);
            } else {
                metal.setSurface([this.props.data.ring_2_metal, this.props.data.ring_2_2_metal]);
                metal.setGradient([this.props.data.ring_2_surface, this.props.data.ring_2_2_surface]);
            }

            metal.dir = cat[index].dir;

            if (cat[index].sine > 0) {
                metal.sine = ring_index === 1 ? waveNums[parseInt(this.props.data.ring_1_number_of_waves)] : waveNums[parseInt(this.props.data.ring_2_number_of_waves)];
                metal.sineH = ring_index === 1 ? waveHeights[parseInt(this.props.data.ring_1_wave_height)] : waveHeights[parseInt(this.props.data.ring_2_wave_height)];
            } else if (cat[index].sine < 0) {
                metal.sine = 1;
                metal.sineH = ring_index === 1 ? waveHeights[parseInt(this.props.data.ring_1_wave_height)] * 2 / 3 : waveHeights[parseInt(this.props.data.ring_2_wave_height)] * 2 / 3;
            } else {
                metal.sine = 0;
            }
            metal.setSlice(cat[index].slice);

            if (groove.dir != 'H') {
                groove.type = 'u';
                groove.width = 0.35;
                groove.surface = 'polished';
                groove.dir = metal.dir;
                groove.sine = metal.sine;
                groove.sineH = metal.sineH;
                groove.position = positions[index];
                groove.separation = true;
            }
            return true;
        }
        return false;
    }
    checkThreeColorTab(metal, groove1, groove2, ring_index) {
        var cat = [
            { slice: [1, 1, 1] },
            { slice: [3, 1, 1] },
            { slice: [4, 1, 1] },
            { slice: [1, 2, 1] },
            { slice: [1, 3, 1] },
            { slice: [1, 4, 1] },
            { slice: [2, 1, 2] },
        ];
        var positions1 = [1 / 3.0, 3 / 5.0, 4 / 6.0, 1 / 4.0, 1 / 5.0, 1 / 6.0, 2 / 5.0];
        var positions2 = [2 / 3.0, 4 / 5.0, 5 / 6.0, 3 / 4.0, 4 / 5.0, 5 / 6.0, 3 / 5.0];
        const index = ring_index === 1 ? parseInt(this.props.data.ring_1_material.replace('three_colors_', '')) : parseInt(this.props.data.ring_2_material.replace('three_colors_', ''));
        if (index >= 0) {
            if (ring_index === 1) {
                metal.setSurface([this.props.data.ring_1_metal, this.props.data.ring_1_2_metal, this.props.data.ring_1_3_metal]);
                metal.setGradient([this.props.data.ring_1_surface, this.props.data.ring_1_2_surface, this.props.data.ring_1_3_surface]);
                metal.setSlice(cat[index].slice);
            } else {
                metal.setSurface([this.props.data.ring_2_metal, this.props.data.ring_2_2_metal, this.props.data.ring_2_3_metal]);
                metal.setGradient([this.props.data.ring_2_surface, this.props.data.ring_2_2_surface, this.props.data.ring_2_3_surface]);
                metal.setSlice(cat[index].slice);
            }

            metal.sine = 0;

            groove1.type = 'v';
            groove1.width = 0.35;
            groove1.surface = 'polished';
            groove1.dir = 'V';
            groove1.sine = 0;
            groove1.sineH = 0;
            groove1.position = positions1[index];
            groove1.separation = true;

            groove2.type = 'v';
            groove2.width = 0.35;
            groove2.surface = 'polished';
            groove2.dir = 'V';
            groove2.sine = 0;
            groove2.sineH = 0;
            groove2.position = positions2[index];
            groove2.separation = true;
        }
        return (index >= 0);
    }

    calcDiaStoneCount(ringConfig, diamond, cut, spacing) {
        let height = ringConfig.height;
        let circumference = ringConfig.circumference + Math.PI * 2 * height;
        let diaSizeArray = new Array(3);
        diaSizeArray['brilliant'] = Diamond.brilliantDiaSize;
        diaSizeArray['princess'] = Diamond.princessDiaSize;
        diaSizeArray['baguette'] = Diamond.baguetteDiaSize;

        let sizeIndex = 0;
        for (var i = 0; i < diaSizeArray[cut].length; i++) {
            if (diamond.size == diaSizeArray[cut][i].s) {
                sizeIndex = i;
                break;
            }
        }
        var h = diaSizeArray[cut][sizeIndex].h;
        var w = diaSizeArray[cut][sizeIndex].w;
        var a = diaSizeArray[cut][sizeIndex].a;
        var sinVal = Math.sin(a * Math.PI / 180),
            cosVal = Math.cos(a * Math.PI / 180);
        h = Math.abs(h * cosVal + w * sinVal);
        var stoneCount = 1;
        var gap = 0.1;
        if (cut == 'brilliant') { gap = 0.1; }
        else { gap = 0.1; }
        if (spacing == Diamond.spacing[0]) { stoneCount = parseInt((circumference + gap) / (h + gap)); }
        else if (spacing == Diamond.spacing[1]) { stoneCount = parseInt(circumference / (h * 1.5)); }
        else if (spacing == Diamond.spacing[2]) { stoneCount = parseInt(circumference / (h * 2)); }
        else if (spacing == Diamond.spacing[3]) { stoneCount = parseInt(circumference / (h * 3)); }
        else if (spacing == Diamond.spacing[4]) { stoneCount = parseInt(circumference / 3 / (h + gap)); }
        else if (spacing == Diamond.spacing[5]) { stoneCount = parseInt(circumference / 2 / (h + gap)); }
        else if (spacing == Diamond.spacing[6]) { stoneCount = parseInt(circumference / (h + gap)); }
        return stoneCount;
    }

    getPosCandidate(grooves) {
        var posArray = [0];
        for (var i = 0; i < grooves.grooveArray.length; i++) {
            var groove = grooves.grooveArray[i];
            if (groove.isNormal()) posArray.push(groove.position);
        }
        posArray.push(1);
        posArray.sort();
        var distArray = [];
        for (i = 0; i < posArray.length; i++) {
            var dist;
            if (i == posArray.length - 1) dist = { id: i, dist: 0 };
            else dist = { id: i, dist: posArray[i + 1] - posArray[i] };
            distArray.push(dist);
        }
        distArray.sort((d1, d2) => {
            if (d1.dist < d2.dist) return 1;
            else if (d1.dist > d2.dist) return -1;
            else return 0;
        });
        return (posArray[distArray[0].id + 1] + posArray[distArray[0].id]) / 2;
    }

    // mouse events on groove canvas
    mouseDownCanvas = e => {
        document.getElementById('grooveCanvas').removeEventListener('mousemove', this.grooveMouseDetector);
        this.mousePt = { x: e.clientX, y: e.clientY };
        document.getElementById('grooveCanvas').addEventListener('mousemove', this.grooveMouseMove);
    }
    grooveMouseDetector = e => {
        const canvas = document.getElementById('grooveCanvas');
        let captured = false;
        for (let i = 0; i < this.ring_1_config.grooves.grooveArray.length; i++) {
            let groove = this.ring_1_config.grooves.grooveArray[i];
            if (!groove.isNormal()) { continue; }
            if (groove.separation) { continue; }
            let x0 = canvas.width / 2 + groove.position * canvas.width / 2;

            if (Math.abs(e.layerX - x0) < 2) {
                captured = true;
                this.mouseCapture = true;
                this.captureIndex = i;
                document.getElementsByTagName('body')[0].style.cursor = 'col-resize';
                break;
            }
        }
        if (!captured) {
            this.mouseCapture = false;
            document.getElementsByTagName('body')[0].style.cursor = 'grab';
        }
    }
    mouseUpCanvas = () => {
        document.getElementById('grooveCanvas').removeEventListener('mousemove', this.grooveMouseMove);
        document.getElementById('grooveCanvas').addEventListener('mousemove', this.grooveMouseDetector);
        if (this.mouseCapture) {
            this.mouseCapture = false;
            this.ring_1_config.displayGroove(this.gGrooveStart, this.captureIndex);
            let sendData = {
                visibility: [!this.props.data.ring_1_disabled, !this.props.data.ring_2_disabled],
                num: [this.ring_1_config.profile, this.ring_2_config.profile],                              // profiles (profiles tab) - (0, 0)
                width: [this.ring_1_config.width, this.ring_2_config.width],                                // profile width - index of <select> (dimensions tab) - (5, 5)
                height: [this.ring_1_config.height, this.ring_2_config.height],                             // ring height - value of <select> (dimensions tab) - (1.6, 1.6)
                circumference: [this.ring_1_config.circumference, this.ring_2_config.circumference],        // ring size - value of <select> (dimensions tab) - (54, 70)
                metal: [this.ring_1_config.metal.toConfig(), this.ring_2_config.metal.toConfig()],          // ring metal - (0, 0) (dimensions tab)
                groove: [this.ring_1_config.grooves.toConfig(), this.ring_2_config.grooves.toConfig()],     // ring grooves (grooves/edges tab)
                edge: [this.ring_1_config.edges.toConfig(), this.ring_2_config.edges.toConfig()],           // ring edges (grooves/edges tab)
                diamond: [this.ring_1_config.diamond.toConfig(), this.ring_2_config.diamond.toConfig()],    // ring diamonds (diamonds tab)
                txt: [this.props.data.ring_1_engraving_text, this.props.data.ring_2_engraving_text]         // ring text (engraving tab) - (18k, 18k)
            };
            $.ajax({
                type: "post",
                url: `${this.serverUrl}getJson`,
                dataType: 'json',
                data: sendData,
                crossDomain: true,
                success: (res) => {
                    let { innerWidth: width, innerHeight: height } = window;
                    width = width > 1500 ? 600 : width > 992 ? parseInt(width * 0.3) : width > 600 ? 600 : width * 0.8;
                    InitDisplay.get_instance().switchRing(res.json);
                }
            });
        }
    }
    grooveMouseMove = e => {
        const canvas = document.getElementById('grooveCanvas');
        if (this.mouseCapture) {
            let groove = this.ring_1_config.grooves.grooveArray[this.captureIndex];
            const dx = e.clientX - this.mousePt.x;
            groove.position += dx / canvas.width;
            this.ring_1_config.grooves.grooveArray[this.captureIndex].position += dx / canvas.width;
            this.mousePt = { x: e.clientX, y: e.clientY };
            this.ring_1_config.displayGroove(this.gGrooveStart, this.captureIndex);
        } else {
            const H = canvas.height - 20;
            const dy = e.clientY - this.mousePt.y;
            this.gGrooveStart += 180 * dy / H;
            if (this.gGrooveStart < 0) { this.gGrooveStart += 360; }
            if (this.gGrooveStart > 360) { this.gGrooveStart -= 360; }
            this.mousePt = { x: e.clientX, y: e.clientY };
            this.props.data.wizard === 'grooves' && (this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1') && this.props.data.ring_1_design_grooves_types.length > 0 && this.ring_1_config.displayGroove(this.gGrooveStart);
            this.props.data.wizard === 'grooves' && this.props.data.ring === 'ring_2' && this.props.data.ring_2_design_grooves_types.length > 0 && this.ring_2_config.displayGroove(this.gGrooveStart);
        }
    }
    mouseLeaveCanvas = () => {
        if (!this.mouseCapture) { document.getElementsByTagName('body')[0].style.cursor = 'default'; }
    }

    /* initialises & updates ring in canvas */
    testRingConfigurator = (param, width) => {
        // reads ring configuration data from redux state
        const {
            ring_1_disabled,
            ring_2_disabled,
            ring_1_material,
            ring_2_material,
            ring_1_profiles,
            ring_2_profiles,
            ring_1_size,
            ring_2_size,
            ring_1_width,
            ring_2_width,
            ring_1_height,
            ring_2_height,
            ring_1_surface,
            ring_2_surface,
            ring_1_metal,
            ring_2_metal,
            ring_1_diamond_setting,
            ring_2_diamond_setting,
            ring_1_diamond_cut,
            ring_2_diamond_cut,
            ring_1_diamond_size,
            ring_2_diamond_size,
            ring_1_number_of_stones,
            ring_2_number_of_stones,
            ring_1_rows,
            ring_2_rows,
            ring_1_position,
            ring_2_position,
            ring_1_engraving_text,
            ring_2_engraving_text,
            ring_1_engraving_font,
            ring_2_engraving_font,
            ring_1_left_edge,
            ring_1_left_width,
            ring_1_left_surface,
            ring_1_right_edge,
            ring_1_right_width,
            ring_1_right_surface,
            ring_2_left_edge,
            ring_2_left_width,
            ring_2_left_surface,
            ring_2_right_edge,
            ring_2_right_width,
            ring_2_right_surface,
            ring_1_design_grooves_types,
            ring_2_design_grooves_types
        } = this.props.data;

        let metal = null;
        let groove = null;
        let groove1 = null;
        let groove2 = null;
        let diamond = null;

        let diaSizeArray = new Array(3);
        diaSizeArray['brilliant'] = Diamond.brilliantDiaSize;
        diaSizeArray['princess'] = Diamond.princessDiaSize;
        diaSizeArray['baguette'] = Diamond.baguetteDiaSize;

        const typeArray = ['n', 'rect', 'colorit'];
        const widthArray = [0.35, 0.5, 0.8, 1.0, 1.20, 1.5, 1.8, 2.0];
        const surfaceArray = ['polished', 'sandmatte-fine'];
        const surfaceArray2 = ['carbon', 'carbon'];

        this.ring_1_config = new RingConfig(parseInt(ring_1_profiles.charCodeAt(0) - 65), 2 + ring_1_width / 2, 1.2 + ring_1_height / 10, 45 + ring_1_size / 2, "I LOVE YOU");
        this.ring_2_config = new RingConfig(parseInt(ring_2_profiles.charCodeAt(0) - 65), 2 + ring_2_width / 2, 1.2 + ring_2_height / 10, 45 + ring_2_size / 2, "I LOVE YOU");

        /* precious metal */
        // ring one color
        if (ring_1_material.includes('one')) {
            metal = new Metal(1);
            metal.setSurface([ring_1_metal]);
            metal.setGradient([ring_1_surface]);
            this.ring_1_config.metal = metal;
        }
        if (ring_2_material.includes('one')) {
            metal = new Metal(1);
            metal.setSurface([ring_2_metal]);
            metal.setGradient([ring_2_surface]);
            this.ring_2_config.metal = metal;
        }
        // ring 2 colors
        if (ring_1_material.includes('two')) {
            metal = new Metal(2, 'V', 0);
            groove = new Groove();
            groove.separation = true;
            if (this.checkTwoColorTab(metal, groove, 1)) {
                this.ring_1_config.metal = metal;
                this.ring_1_config.grooves.reset();
                if (groove) { this.ring_1_config.grooves.add(groove); }
            }
        }
        if (ring_2_material.includes('two')) {
            metal = new Metal(2, 'V', 0);
            groove = new Groove();
            groove.separation = true;
            if (this.checkTwoColorTab(metal, groove, 2)) {
                this.ring_2_config.metal = metal;
                this.ring_2_config.grooves.reset();
                if (groove) { this.ring_2_config.grooves.add(groove); }
            }
        }
        // ring 3 colors
        if (ring_1_material.includes('three')) {
            metal = new Metal(3);
            groove1 = new Groove();
            groove2 = new Groove();
            if (this.checkThreeColorTab(metal, groove1, groove2, 1)) {
                this.ring_1_config.metal = metal;
                this.ring_1_config.grooves.reset();
                this.ring_1_config.grooves.add(groove1);
                this.ring_1_config.grooves.add(groove2);
            }
        }
        if (ring_2_material.includes('three')) {
            metal = new Metal(3);
            groove1 = new Groove();
            groove2 = new Groove();
            if (this.checkThreeColorTab(metal, groove1, groove2, 2)) {
                this.ring_2_config.metal = metal;
                this.ring_2_config.grooves.reset();
                this.ring_2_config.grooves.add(groove1);
                this.ring_2_config.grooves.add(groove2);
            }
        }

        /* grooves/edges */
        // ring 1 design grooves
        this.ring_1_config.grooves.deleteAll();
        for (let i = 0; i < ring_1_design_grooves_types.length; i++) {
            if (!this.ring_1_config.grooves.isAddable()) { break; }

            groove = new Groove();
            groove.separation = false;
            groove.type = 'v';
            groove.position = this.getPosCandidate(this.ring_1_config.grooves);
            groove.width = 0.35;
            this.ring_1_config.grooves.add(groove);
        }
        // ring 2 design grooves
        this.ring_2_config.grooves.deleteAll();
        for (let i = 0; i < ring_2_design_grooves_types.length; i++) {
            if (!this.ring_2_config.grooves.isAddable()) { break; }

            groove = new Groove();
            groove.separation = false;
            groove.type = 'v';
            groove.position = this.getPosCandidate(this.ring_2_config.grooves);
            groove.width = 0.35;
            this.ring_2_config.grooves.add(groove);
        }
        setTimeout(() => {
            this.props.data.wizard === 'grooves' && (this.props.data.ring === 'pair' || this.props.data.ring === 'ring_1') && ring_1_design_grooves_types.length > 0 && this.ring_1_config.displayGroove(0);
            this.props.data.wizard === 'grooves' && this.props.data.ring === 'ring_2' && ring_2_design_grooves_types.length > 0 && this.ring_2_config.displayGroove(0);
            this.props.data.wizard === 'grooves' && document.getElementById('grooveCanvas') != undefined && document.getElementById('grooveCanvas').addEventListener('mousedown', this.mouseDownCanvas);
            this.props.data.wizard === 'grooves' && document.getElementById('grooveCanvas') != undefined && document.getElementById('grooveCanvas').addEventListener('mousemove', this.grooveMouseDetector);
            this.props.data.wizard === 'grooves' && document.getElementById('grooveCanvas') != undefined && document.getElementById('grooveCanvas').addEventListener('mouseup', this.mouseUpCanvas);
            this.props.data.wizard === 'grooves' && document.getElementById('grooveCanvas') != undefined && document.getElementById('grooveCanvas').addEventListener('mouseleave', this.mouseLeaveCanvas);
        }, 1000);

        // ring 1 edges
        let type1 = typeArray[ring_1_left_edge];
        let width1 = widthArray[ring_1_left_width];
        let surface1 = ring_1_left_edge == 2 ? surfaceArray2[ring_1_left_surface] : surfaceArray[ring_1_left_surface];
        let type2 = typeArray[ring_1_right_edge];
        let width2 = widthArray[ring_1_right_width];
        let surface2 = ring_1_left_edge == 2 ? surfaceArray2[ring_1_right_surface] : surfaceArray[ring_1_right_surface];
        this.ring_1_config.edges.leftEdge.type = type1;
        this.ring_1_config.edges.leftEdge.width = width1;
        this.ring_1_config.edges.leftEdge.surface = surface1;
        this.ring_1_config.edges.leftEdge.position = 0;
        this.ring_1_config.edges.rightEdge.type = type2;
        this.ring_1_config.edges.rightEdge.width = width2;
        this.ring_1_config.edges.rightEdge.surface = surface2;
        this.ring_1_config.edges.rightEdge.position = 1;
        // ring 2 edges
        type1 = typeArray[ring_2_left_edge];
        width1 = widthArray[ring_2_left_width];
        surface1 = ring_2_left_edge == 2 ? surfaceArray2[ring_2_left_surface] : surfaceArray[ring_2_left_surface];
        type2 = typeArray[ring_2_right_edge];
        width2 = widthArray[ring_2_right_width];
        surface2 = ring_2_left_edge == 2 ? surfaceArray2[ring_2_right_surface] : surfaceArray[ring_2_right_surface];
        this.ring_2_config.edges.leftEdge.type = type1;
        this.ring_2_config.edges.leftEdge.width = width1;
        this.ring_2_config.edges.leftEdge.surface = surface1;
        this.ring_2_config.edges.leftEdge.position = 0;
        this.ring_2_config.edges.rightEdge.type = type2;
        this.ring_2_config.edges.rightEdge.width = width2;
        this.ring_2_config.edges.rightEdge.surface = surface2;
        this.ring_2_config.edges.rightEdge.position = 1;

        /* diamonds */
        // ring 1 diamonds
        diamond = this.ring_1_config.diamond;
        if (diamond.setting != Diamond.settingArray[parseInt(ring_1_diamond_setting)]) { diamond.setting = Diamond.settingArray[parseInt(ring_1_diamond_setting)]; }
        if (diamond.setting != 'none') {
            if (diamond.setting != 'section') { diamond.rows = 1; }
            diamond.cut = Diamond.cutArray[parseInt(ring_1_diamond_cut)];
            diamond.size = diaSizeArray[diamond.cut][parseInt(ring_1_diamond_size)].s;
        }
        if (diamond.setting == 'cross_channel') {
            diamond.stonePerRow = parseInt(ring_1_number_of_stones) + 1;
            diamond.rows = 1;
        } else if (diamond.rows == 1) {
            let stoneTotalCount = this.calcDiaStoneCount(this.ring_1_config, diamond, diamond.cut, Diamond.spacing[0]);
            let stoneCount = 1;
            switch (ring_1_number_of_stones) {
                case 0:
                    stoneCount = stoneTotalCount;
                    break;
                case 1:
                    stoneCount = parseInt(stoneTotalCount / 2);
                    break;
                case 2:
                    stoneCount = parseInt(stoneTotalCount / 3);
                    break;
                default:
                    stoneCount = parseInt(ring_1_number_of_stones) - 2;
                    break;
            }
            diamond.stonePerRow = stoneCount;
        } else { diamond.stonePerRow = parseInt(ring_1_number_of_stones) + 1; }
        diamond.rows = parseInt(ring_1_rows) + 1;
        diamond.position = ring_1_position == 0 ? 0 : ring_1_position == 2 ? 1 : 0.5;
        this.ring_1_config.diamond = diamond;
        // ring 2 diamonds
        diamond = this.ring_2_config.diamond;
        if (diamond != Diamond.settingArray[ring_2_diamond_setting]) { diamond.setting = Diamond.settingArray[ring_2_diamond_setting]; }
        if (diamond.setting != 'none') {
            if (diamond.setting != 'section') { diamond.rows = 1; }
            diamond.cut = Diamond.cutArray[ring_2_diamond_cut];
            diamond.size = diaSizeArray[diamond.cut][parseInt(ring_2_diamond_size)].s;
        }
        if (diamond.setting == 'cross_channel') {
            diamond.stonePerRow = parseInt(ring_2_number_of_stones) + 1;
            diamond.rows = 1;
        } else if (diamond.rows == 1) {
            let stoneTotalCount = this.calcDiaStoneCount(this.ring_2_config, diamond, diamond.cut, Diamond.spacing[0]);
            let stoneCount = 1;
            switch (ring_2_number_of_stones) {
                case 0:
                    stoneCount = stoneTotalCount;
                    break;
                case 1:
                    stoneCount = parseInt(stoneTotalCount / 2);
                    break;
                case 2:
                    stoneCount = parseInt(stoneTotalCount / 3);
                    break;
                default:
                    stoneCount = parseInt(ring_2_number_of_stones) - 2;
                    break;
            }
            diamond.stonePerRow = stoneCount;
        } else { diamond.stonePerRow = parseInt(ring_2_number_of_stones) + 1; }
        diamond.rows = parseInt(ring_2_rows) + 1;
        diamond.position = ring_2_position == 0 ? 0 : ring_2_position == 2 ? 1 : 0.5;
        this.ring_2_config.diamond = diamond;

        /* engraving */
        const fonts = ['hallmark', 'svnfont00', 'svnfont01', 'svnfont02', 'svnfont03', 'svnfont04', 'svnfont10', 'svnfont11', 'arial'];
        this.ring_1_config.engrave.carveType = ring_1_engraving_font < 5 ? 'laser' : 'diamond';
        this.ring_2_config.engrave.carveType = ring_2_engraving_font < 5 ? 'laser' : 'diamond';
        this.ring_1_config.engrave.txt = ring_1_engraving_text;
        this.ring_1_config.engrave.font = fonts[ring_1_engraving_font];
        this.ring_2_config.engrave.txt = ring_2_engraving_text;
        this.ring_2_config.engrave.font = fonts[ring_2_engraving_font];

        let sendData = {
            visibility: [!ring_1_disabled, !ring_2_disabled],
            num: [this.ring_1_config.profile, this.ring_2_config.profile],                              // profiles (profiles tab) - (0, 0)
            width: [this.ring_1_config.width, this.ring_2_config.width],                                // profile width - index of <select> (dimensions tab) - (5, 5)
            height: [this.ring_1_config.height, this.ring_2_config.height],                             // ring height - value of <select> (dimensions tab) - (1.6, 1.6)
            circumference: [this.ring_1_config.circumference, this.ring_2_config.circumference],        // ring size - value of <select> (dimensions tab) - (54, 70)
            metal: [this.ring_1_config.metal.toConfig(), this.ring_2_config.metal.toConfig()],          // ring metal - (0, 0) (dimensions tab)
            groove: [this.ring_1_config.grooves.toConfig(), this.ring_2_config.grooves.toConfig()],     // ring grooves (grooves/edges tab)
            edge: [this.ring_1_config.edges.toConfig(), this.ring_2_config.edges.toConfig()],           // ring edges (grooves/edges tab)
            diamond: [this.ring_1_config.diamond.toConfig(), this.ring_2_config.diamond.toConfig()],    // ring diamonds (diamonds tab)
            engrave: [this.ring_1_config.engrave.toConfig(), this.ring_2_config.engrave.toConfig()]     // ring text (engraving tab) - (18k, 18k)
        };

        if (param === 'init' || param === 'switch') {
            $.ajax({
                type: "post",
                url: this.serverUrl + 'getJson',
                dataType: 'json',
                data: sendData,
                crossDomain: true,
                success: (res) => {
                    let { innerWidth: width, innerHeight: height } = window;
                    width = width > 1500 ? 600 : width > 992 ? parseInt(width * 0.3) : width > 600 ? 600 : width * 0.8;
                    if (param === 'init') { InitDisplay.get_instance().init('#container', width, res.json); }
                    else { InitDisplay.get_instance().switchRing(res.json); }
                }
            });
        } else if (param === 'handview') {
            $.ajax({
                type: 'post',
                url: this.serverUrl + 'getHandJson',
                dataType: 'json',
                data: sendData,
                crossDomain: true,
                success: (res) => {
                    InitDisplay.get_instance().testHandView(res.json);
                }
            });
        } else if (param === 'fullscreen') { InitDisplay.get_instance().requestFullscreen(); }
    }

    /* updates ring when resizing window */
    resizeWindow = () => { this.testRingConfigurator('switch'); }

    /* closes hand view modal when clicking outside modal */
    mouseDownWindow = e => { e.target.id === 'canvas_modal' && this.props.stopHandView(); }
    mouseUpWindow = () => {
        // document.getElementById('grooveCanvas').removeEventListener('mousemove', this.grooveMouseMove);
        // document.getElementById('grooveCanvas').addEventListener('mousemove', this.grooveMouseDetector);
        // if (this.mouseCapture) {
        //     this.mouseCapture = false;
        //     this.ring_1_config.displayGroove(this.captureIndex);
        // }
    }

    /* initialises ring in canvas */
    componentDidMount() {
        this.testRingConfigurator('init');
        window.addEventListener('resize', this.resizeWindow);
        window.addEventListener('mousedown', this.mouseDownWindow);
        window.addEventListener('mouseup', this.mouseUpWindow);
    }

    /* updates ring in canvas when redux state changes (user interaction) */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.checkIfReduxDataStateChanged(prevProps.data, this.props.data)) { this.testRingConfigurator('switch'); }
        if (this.props.ui.hand_view) { this.testRingConfigurator('handview'); }
        if (this.props.ui.full_screen) {
            this.testRingConfigurator('fullscreen');
            this.props.stopFullScreen();
        }
    }

    render() {
        const { loading, hand_view } = this.props.ui;

        return (
            <>
                {loading && <Loading />}
                {!loading && <>
                    <div id="container" className="ring-canvas" ref={this.container}></div>
                    <div id="canvas_modal" className={hand_view ? 'canvas-modal d-flex' : 'canvas-modal d-none'}>
                        <div id="handview_container"></div>
                    </div></>}
            </>
        );
    }
}

Canvas.propTypes = {
    data: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    stopHandView: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ data: state.data, ui: state.ui });
const mapActionsToProps = { stopHandView, stopFullScreen };

export default connect(mapStateToProps, mapActionsToProps)(Canvas);