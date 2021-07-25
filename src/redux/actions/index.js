import {
    SET_LOADING,
    STOP_LOADING,
    SET_HAND_VIEW,
    STOP_HAND_VIEW,
    SET_FULL_SCREEN,
    STOP_FULL_SCREEN,
    SET_DELETE_DESIGN,
    SET_UNDO,
    SET_WIZARD,
    SET_RING,
    SET_PAIR_MATERIAL,
    SET_RING_1_MATERIAL,
    SET_RING_2_MATERIAL,
    SET_RING_1_DISABLED,
    SET_RING_2_DISABLED,
    SET_RING_PAIR_PROFILES,
    SET_RING_PAIR_SURFACE,
    SET_RING_PAIR_METAL,
    SET_RING_PAIR_FINENESS,
    SET_RING_PAIR_2_SURFACE,
    SET_RING_PAIR_2_METAL,
    SET_RING_PAIR_2_FINENESS,
    SET_RING_PAIR_3_SURFACE,
    SET_RING_PAIR_3_METAL,
    SET_RING_PAIR_3_FINENESS,
    SET_RING_PAIR_WAVE_HEIGHT,
    SET_RING_PAIR_NUMBER_OF_WAVES,
    SET_RING_1_PROFILES,
    SET_RING_2_PROFILES,
    SET_RING_1_SIZE,
    SET_RING_2_SIZE,
    SET_RING_1_TYPE,
    SET_RING_2_TYPE,
    SET_RING_1_COLOR,
    SET_RING_2_COLOR,
    SET_RING_1_WIDTH,
    SET_RING_2_WIDTH,
    SET_RING_1_HEIGHT,
    SET_RING_2_HEIGHT,
    SET_RING_1_METAL,
    SET_RING_2_METAL,
    SET_RING_1_SURFACE,
    SET_RING_2_SURFACE,
    SET_RING_1_FINENESS,
    SET_RING_2_FINENESS,
    SET_RING_1_2_SURFACE,
    SET_RING_1_2_METAL,
    SET_RING_1_2_FINENESS,
    SET_RING_1_3_SURFACE,
    SET_RING_1_3_METAL,
    SET_RING_1_3_FINENESS,
    SET_RING_2_2_SURFACE,
    SET_RING_2_2_METAL,
    SET_RING_2_2_FINENESS,
    SET_RING_2_3_SURFACE,
    SET_RING_2_3_METAL,
    SET_RING_2_3_FINENESS,
    SET_RING_1_WAVE_HEIGHT,
    SET_RING_2_WAVE_HEIGHT,
    SET_RING_1_NUMBER_OF_WAVES,
    SET_RING_2_NUMBER_OF_WAVES,
    SET_RING_PAIR_PRICE,
    SET_RING_1_PRICE,
    SET_RING_2_PRICE,
    SET_RING_PAIR_LEFT_EDGE,
    SET_RING_PAIR_RIGHT_EDGE,
    SET_RING_1_LEFT_EDGE,
    SET_RING_1_RIGHT_EDGE,
    SET_RING_2_LEFT_EDGE,
    SET_RING_2_RIGHT_EDGE,
    SET_RING_PAIR_LEFT_WIDTH,
    SET_RING_PAIR_LEFT_SURFACE,
    SET_RING_PAIR_RIGHT_WIDTH,
    SET_RING_PAIR_RIGHT_SURFACE,
    SET_RING_1_LEFT_WIDTH,
    SET_RING_1_LEFT_SURFACE,
    SET_RING_1_RIGHT_WIDTH,
    SET_RING_1_RIGHT_SURFACE,
    SET_RING_2_LEFT_WIDTH,
    SET_RING_2_LEFT_SURFACE,
    SET_RING_2_RIGHT_WIDTH,
    SET_RING_2_RIGHT_SURFACE,
    SET_RING_PAIR_GROOVE,
    SET_RING_1_GROOVE,
    SET_RING_2_GROOVE,
    SET_RING_PAIR_GROOVE_WIDTH,
    SET_RING_1_GROOVE_WIDTH,
    SET_RING_2_GROOVE_WIDTH,
    SET_RING_PAIR_GROOVE_SURFACE,
    SET_RING_1_GROOVE_SURFACE,
    SET_RING_2_GROOVE_SURFACE,
    SET_RING_PAIR_ENGRAVING_TEXT,
    SET_RING_1_ENGRAVING_TEXT,
    SET_RING_2_ENGRAVING_TEXT,
    SET_RING_PAIR_ENGRAVING_FONT,
    SET_RING_1_ENGRAVING_FONT,
    SET_RING_2_ENGRAVING_FONT,
    SET_RING_PAIR_DIAMOND_SETTING,
    SET_RING_1_DIAMOND_SETTING,
    SET_RING_2_DIAMOND_SETTING,
    SET_RING_PAIR_DIAMOND_CUT,
    SET_RING_1_DIAMOND_CUT,
    SET_RING_2_DIAMOND_CUT,
    SET_RING_PAIR_DIAMOND_SIZE,
    SET_RING_1_DIAMOND_SIZE,
    SET_RING_2_DIAMOND_SIZE,
    SET_RING_PAIR_DIAMOND_QUALITY,
    SET_RING_1_DIAMOND_QUALITY,
    SET_RING_2_DIAMOND_QUALITY,
    SET_RING_PAIR_NUM_OF_STONES,
    SET_RING_1_NUM_OF_STONES,
    SET_RING_2_NUM_OF_STONES,
    SET_RING_PAIR_ROWS,
    SET_RING_1_ROWS,
    SET_RING_2_ROWS,
    SET_RING_PAIR_POSITION,
    SET_RING_1_POSITION,
    SET_RING_2_POSITION,
    SET_RING_PAIR_DESIGN_GROOVES_TYPES,
    SET_RING_PAIR_DESIGN_GROOVES_WIDTHS,
    SET_RING_PAIR_DESIGN_GROOVES_SURFACES,
    SET_RING_PAIR_DESIGN_GROOVES_ALIGNMENTS,
    SET_RING_PAIR_DESIGN_GROOVES_POSITIONS,
    SET_RING_1_DESIGN_GROOVES_TYPES,
    SET_RING_1_DESIGN_GROOVES_WIDTHS,
    SET_RING_1_DESIGN_GROOVES_SURFACES,
    SET_RING_1_DESIGN_GROOVES_ALIGNMENTS,
    SET_RING_1_DESIGN_GROOVES_POSITIONS,
    SET_RING_2_DESIGN_GROOVES_TYPES,
    SET_RING_2_DESIGN_GROOVES_WIDTHS,
    SET_RING_2_DESIGN_GROOVES_SURFACES,
    SET_RING_2_DESIGN_GROOVES_ALIGNMENTS,
    SET_RING_2_DESIGN_GROOVES_POSITIONS,
    SET_RING_PAIR_DESIGN_GROOVE_ADD,
    SET_RING_1_DESIGN_GROOVE_ADD,
    SET_RING_2_DESIGN_GROOVE_ADD,
    SET_RING_PAIR_DESIGN_GROOVES_SINE,
    SET_RING_PAIR_DESIGN_GROOVES_SINE_HEIGHT,
    SET_RING_1_DESIGN_GROOVES_SINE,
    SET_RING_1_DESIGN_GROOVES_SINE_HEIGHT,
    SET_RING_2_DESIGN_GROOVES_SINE,
    SET_RING_2_DESIGN_GROOVES_SINE_HEIGHT,
    UPDATE_RING_PAIR_DESIGN_GROOVES_SINE,
    UPDATE_RING_PAIR_DESIGN_GROOVES_SINE_HEIGHT,
    UPDATE_RING_1_DESIGN_GROOVES_SINE,
    UPDATE_RING_1_DESIGN_GROOVES_SINE_HEIGHT,
    UPDATE_RING_2_DESIGN_GROOVES_SINE,
    UPDATE_RING_2_DESIGN_GROOVES_SINE_HEIGHT,
    UPDATE_RING_PAIR_DESIGN_GROOVES_TYPES,
    UPDATE_RING_PAIR_DESIGN_GROOVES_WIDTHS,
    UPDATE_RING_PAIR_DESIGN_GROOVES_SURFACES,
    UPDATE_RING_PAIR_DESIGN_GROOVES_ALIGNMENTS,
    UPDATE_RING_PAIR_DESIGN_GROOVES_POSITIONS,
    UPDATE_RING_1_DESIGN_GROOVES_TYPES,
    UPDATE_RING_1_DESIGN_GROOVES_WIDTHS,
    UPDATE_RING_1_DESIGN_GROOVES_SURFACES,
    UPDATE_RING_1_DESIGN_GROOVES_ALIGNMENTS,
    UPDATE_RING_1_DESIGN_GROOVES_POSITIONS,
    UPDATE_RING_2_DESIGN_GROOVES_TYPES,
    UPDATE_RING_2_DESIGN_GROOVES_WIDTHS,
    UPDATE_RING_2_DESIGN_GROOVES_SURFACES,
    UPDATE_RING_2_DESIGN_GROOVES_ALIGNMENTS,
    UPDATE_RING_2_DESIGN_GROOVES_POSITIONS,
    SET_RING_DESIGN_GROOVES_INDEX,
    DELETE_RING_PAIR_DESIGN_GROOVE,
    DELETE_RING_1_DESIGN_GROOVE,
    DELETE_RING_2_DESIGN_GROOVE,
    DELETE_RING_PAIR_ALL,
    DELETE_RING_1_ALL,
    DELETE_RING_2_ALL,
    LOAD_FILE
} from '../types';

// loading actions
const setLoading = () => (dispatch) => { dispatch({ type: SET_LOADING }); }
const stopLoading = () => (dispatch) => { dispatch({ type: STOP_LOADING }); }

// ring canvas controls actions
const setHandView = () => (dispatch) => { dispatch({ type: SET_HAND_VIEW }); }
const stopHandView = () => (dispatch) => { dispatch({ type: STOP_HAND_VIEW }); }
const setFullScreen = () => (dispatch) => { dispatch({ type: SET_FULL_SCREEN }); }
const stopFullScreen = () => (dispatch) => { dispatch({ type: STOP_FULL_SCREEN }); }

// ring back actions in 'settings footer'
const setDeleteDesign = () => (dispatch) => { dispatch({ type: SET_DELETE_DESIGN }); }
const setUndo = (undo) => (dispatch) => { dispatch({ type: SET_UNDO, payload: undo }); }

// wizard action
const setWizard = (wizard) => (dispatch) => {
    dispatch({ type: SET_WIZARD, payload: wizard });
    if (wizard === 'dimensions') { dispatch({ type: SET_RING, payload: 'pair' }); }
}

// ring price actions
const setRingPairPrice = (price) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_PRICE, payload: price });
    dispatch({ type: STOP_LOADING });
}
const setRing1Price = (price) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_PRICE, payload: price });
    dispatch({ type: STOP_LOADING });
}
const setRing2Price = (price) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_PRICE, payload: price });
    dispatch({ type: STOP_LOADING });
}

// ring select actions
const setRing = (ring) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING, payload: ring });
    dispatch({ type: STOP_LOADING });
}

// ring disable actions
const setRing1Disabled = (disabled) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_DISABLED, payload: disabled });
    dispatch({ type: STOP_LOADING });
}
const setRing2Disabled = (disabled) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_DISABLED, payload: disabled });
    dispatch({ type: STOP_LOADING });
}

// ring material actions in 'Precious metal' tab
const setPairMaterial = (material) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_PAIR_MATERIAL, payload: material });
}
const setRing1Material = (material) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_MATERIAL, payload: material });
}
const setRing2Material = (material) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_MATERIAL, payload: material });
}

// ring pair actions
const setRingPairProfiles = (profiles) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_PROFILES, payload: profiles });
}
const setRingPairSurface = (surface) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_SURFACE, payload: surface });
}
const setRingPairMetal = (metal) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_METAL, payload: metal });
}
const setRingPairFineness = (fineness) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_FINENESS, payload: fineness });
}
const setRingPair2Surface = (surface) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_2_SURFACE, payload: surface });
}
const setRingPair2Metal = (metal) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_2_METAL, payload: metal });
}
const setRingPair2Fineness = (fineness) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_2_FINENESS, fineness });
}
const setRingPair3Surface = (surface) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_3_SURFACE, payload: surface });
}
const setRingPair3Metal = (metal) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_3_METAL, payload: metal });
}
const setRingPair3Fineness = (fineness) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_3_FINENESS, payload: fineness });
}
const setRingPairWaveHeight = (height) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_WAVE_HEIGHT, payload: height });
}
const setRingPairNumberOfWaves = (num) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_PAIR_NUMBER_OF_WAVES, payload: num });
}

// ring 1 actions
const setRing1Profiles = (profiles) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_PROFILES, payload: profiles });
}
const setRing1Size = (size) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_SIZE, payload: size });
}
const setRing1Type = (type) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_TYPE, payload: type });
}
const setRing1Color = (color) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_COLOR, payload: color });
}
const setRing1Width = (width) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_WIDTH, payload: width });
}
const setRing1Height = (height) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_HEIGHT, payload: height });
}
const setRing1Metal = (metal) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_METAL, payload: metal });
}
const setRing1Surface = (surface) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_SURFACE, payload: surface });
}
const setRing1Fineness = (fineness) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_FINENESS, payload: fineness });
}
const setRing12Metal = (metal) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_2_METAL, payload: metal });
}
const setRing12Surface = (surface) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_2_SURFACE, payload: surface });
}
const setRing12Fineness = (fineness) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_2_FINENESS, payload: fineness });
}
const setRing13Metal = (metal) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_3_METAL, payload: metal });
}
const setRing13Surface = (surface) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_3_SURFACE, payload: surface });
}
const setRing13Fineness = (fineness) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_3_FINENESS, payload: fineness });
}
const setRing1WaveHeight = (height) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_WAVE_HEIGHT, payload: height });
}
const setRing1NumberOfWaves = (num) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_1_NUMBER_OF_WAVES, payload: num });
}

// ring 2 actions
const setRing2Profiles = (profiles) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_PROFILES, payload: profiles });
}
const setRing2Size = (size) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_SIZE, payload: size });
}
const setRing2Type = (type) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_TYPE, payload: type });
}
const setRing2Color = (color) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_COLOR, payload: color });
}
const setRing2Width = (width) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_WIDTH, payload: width });
}
const setRing2Height = (height) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_HEIGHT, payload: height });
}
const setRing2Metal = (metal) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_METAL, payload: metal });
}
const setRing2Surface = (surface) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_SURFACE, payload: surface });
}
const setRing2Fineness = (fineness) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_FINENESS, payload: fineness });
}
const setRing22Metal = (metal) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_2_METAL, payload: metal });
}
const setRing22Surface = (surface) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_2_SURFACE, payload: surface });
}
const setRing22Fineness = (fineness) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_2_FINENESS, payload: fineness });
}
const setRing23Metal = (metal) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_3_METAL, payload: metal });
}
const setRing23Surface = (surface) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_3_SURFACE, payload: surface });
}
const setRing23Fineness = (fineness) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_3_FINENESS, payload: fineness });
}
const setRing2WaveHeight = (height) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_WAVE_HEIGHT, payload: height });
}
const setRing2NumberOfWaves = (num) => (dispatch) => {
    dispatch({ type: SET_LOADING });
    dispatch({ type: SET_RING_2_NUMBER_OF_WAVES, payload: num });
}

// edge actions
const setRingPairLeftEdge = (edge) => (dispatch) => { dispatch({ type: SET_RING_PAIR_LEFT_EDGE, payload: edge }); }
const setRingPairRightEdge = (edge) => (dispatch) => { dispatch({ type: SET_RING_PAIR_RIGHT_EDGE, payload: edge }); }
const setRing1LeftEdge = (edge) => (dispatch) => { dispatch({ type: SET_RING_1_LEFT_EDGE, payload: edge }); }
const setRing1RightEdge = (edge) => (dispatch) => { dispatch({ type: SET_RING_1_RIGHT_EDGE, payload: edge }); }
const setRing2LeftEdge = (edge) => (dispatch) => { dispatch({ type: SET_RING_2_LEFT_EDGE, payload: edge }); }
const setRing2RightEdge = (edge) => (dispatch) => { dispatch({ type: SET_RING_2_RIGHT_EDGE, payload: edge }); }
const setRingPairLeftWidth = (edge) => (dispatch) => { dispatch({ type: SET_RING_PAIR_LEFT_WIDTH, payload: edge }); }
const setRingPairRightWidth = (edge) => (dispatch) => { dispatch({ type: SET_RING_PAIR_RIGHT_WIDTH, payload: edge }); }
const setRingPairLeftSurface = (edge) => (dispatch) => { dispatch({ type: SET_RING_PAIR_LEFT_SURFACE, payload: edge }); }
const setRingPairRightSurface = (edge) => (dispatch) => { dispatch({ type: SET_RING_PAIR_RIGHT_SURFACE, payload: edge }); }
const setRing1LeftWidth = (edge) => (dispatch) => { dispatch({ type: SET_RING_1_LEFT_WIDTH, payload: edge }); }
const setRing1RightWidth = (edge) => (dispatch) => { dispatch({ type: SET_RING_1_RIGHT_WIDTH, payload: edge }); }
const setRing1LeftSurface = (edge) => (dispatch) => { dispatch({ type: SET_RING_1_LEFT_SURFACE, payload: edge }); }
const setRing1RightSurface = (edge) => (dispatch) => { dispatch({ type: SET_RING_1_RIGHT_SURFACE, payload: edge }); }
const setRing2LeftWidth = (edge) => (dispatch) => { dispatch({ type: SET_RING_2_LEFT_WIDTH, payload: edge }); }
const setRing2RightWidth = (edge) => (dispatch) => { dispatch({ type: SET_RING_2_RIGHT_WIDTH, payload: edge }); }
const setRing2LeftSurface = (edge) => (dispatch) => { dispatch({ type: SET_RING_2_LEFT_SURFACE, payload: edge }); }
const setRing2RightSurface = (edge) => (dispatch) => { dispatch({ type: SET_RING_2_RIGHT_SURFACE, payload: edge }); }

// design groove actions
const setRingPairDesignGroovesTypes = (types) => dispatch => { dispatch({ type: SET_RING_PAIR_DESIGN_GROOVES_TYPES, payload: types }); }
const setRingPairDesignGroovesWidths = (types) => dispatch => { dispatch({ type: SET_RING_PAIR_DESIGN_GROOVES_WIDTHS, payload: types }); }
const setRingPairDesignGroovesSurfaces = (types) => dispatch => { dispatch({ type: SET_RING_PAIR_DESIGN_GROOVES_SURFACES, payload: types }); }
const setRingPairDesignGroovesAlignments = (types) => dispatch => { dispatch({ type: SET_RING_PAIR_DESIGN_GROOVES_ALIGNMENTS, payload: types }); }
const setRingPairDesignGroovesPositions = (types) => dispatch => { dispatch({ type: SET_RING_PAIR_DESIGN_GROOVES_POSITIONS, payload: types }); }
const setRingPairDesignGroovesSine = (sine) => dispatch => { dispatch({ type: SET_RING_PAIR_DESIGN_GROOVES_SINE, payload: sine }); }
const setRing1DesignGroovesSine = (sine) => dispatch => { dispatch({ type: SET_RING_1_DESIGN_GROOVES_SINE, payload: sine }); }
const setRing2DesignGroovesSine = (sine) => dispatch => { dispatch({ type: SET_RING_2_DESIGN_GROOVES_SINE, payload: sine }); }
const setRingPairDesignGroovesSineHeight = (sine) => dispatch => { dispatch({ type: SET_RING_PAIR_DESIGN_GROOVES_SINE_HEIGHT, payload: sine }); }
const setRing1DesignGroovesSineHeight = (sine) => dispatch => { dispatch({ type: SET_RING_1_DESIGN_GROOVES_SINE_HEIGHT, payload: sine }); }
const setRing2DesignGroovesSineHeight = (sine) => dispatch => { dispatch({ type: SET_RING_2_DESIGN_GROOVES_SINE_HEIGHT, payload: sine }); }
const updateRingPairDesignGroovesSine = (sine) => dispatch => { dispatch({ type: UPDATE_RING_PAIR_DESIGN_GROOVES_SINE, payload: sine }); }
const updateRing1DesignGroovesSine = (sine) => dispatch => { dispatch({ type: UPDATE_RING_1_DESIGN_GROOVES_SINE, payload: sine }); }
const updateRing2DesignGroovesSine = (sine) => dispatch => { dispatch({ type: UPDATE_RING_2_DESIGN_GROOVES_SINE, payload: sine }); }
const updateRingPairDesignGroovesSineHeight = (sine) => dispatch => { dispatch({ type: UPDATE_RING_PAIR_DESIGN_GROOVES_SINE_HEIGHT, payload: sine }); }
const updateRing1DesignGroovesSineHeight = (sine) => dispatch => { dispatch({ type: UPDATE_RING_1_DESIGN_GROOVES_SINE_HEIGHT, payload: sine }); }
const updateRing2DesignGroovesSineHeight = (sine) => dispatch => { dispatch({ type: UPDATE_RING_2_DESIGN_GROOVES_SINE_HEIGHT, payload: sine }); }
const setRing1DesignGroovesTypes = (types) => dispatch => { dispatch({ type: SET_RING_1_DESIGN_GROOVES_TYPES, payload: types }); }
const setRing1DesignGroovesWidths = (types) => dispatch => { dispatch({ type: SET_RING_1_DESIGN_GROOVES_WIDTHS, payload: types }); }
const setRing1DesignGroovesSurfaces = (types) => dispatch => { dispatch({ type: SET_RING_1_DESIGN_GROOVES_SURFACES, payload: types }); }
const setRing1DesignGroovesAlignments = (types) => dispatch => { dispatch({ type: SET_RING_1_DESIGN_GROOVES_ALIGNMENTS, payload: types }); }
const setRing1DesignGroovesPositions = (types) => dispatch => { dispatch({ type: SET_RING_1_DESIGN_GROOVES_POSITIONS, payload: types }); }
const setRing2DesignGroovesTypes = (types) => dispatch => { dispatch({ type: SET_RING_2_DESIGN_GROOVES_TYPES, payload: types }); }
const setRing2DesignGroovesWidths = (types) => dispatch => { dispatch({ type: SET_RING_2_DESIGN_GROOVES_WIDTHS, payload: types }); }
const setRing2DesignGroovesSurfaces = (types) => dispatch => { dispatch({ type: SET_RING_2_DESIGN_GROOVES_SURFACES, payload: types }); }
const setRing2DesignGroovesAlignments = (types) => dispatch => { dispatch({ type: SET_RING_2_DESIGN_GROOVES_ALIGNMENTS, payload: types }); }
const setRing2DesignGroovesPositions = (types) => dispatch => { dispatch({ type: SET_RING_2_DESIGN_GROOVES_POSITIONS, payload: types }); }
const setRingPairDesignGrooveAdd = (add) => dispatch => { dispatch({ type: SET_RING_PAIR_DESIGN_GROOVE_ADD, payload: add }); }
const setRing1DesignGrooveAdd = (add) => dispatch => { dispatch({ type: SET_RING_1_DESIGN_GROOVE_ADD, payload: add }); }
const setRing2DesignGrooveAdd = (add) => dispatch => { dispatch({ type: SET_RING_2_DESIGN_GROOVE_ADD, payload: add }); }
const updateRingPairDesignGroovesTypes = (type) => dispatch => { dispatch({ type: UPDATE_RING_PAIR_DESIGN_GROOVES_TYPES, payload: type }); }
const updateRingPairDesignGroovesWidths = (width) => dispatch => { dispatch({ type: UPDATE_RING_PAIR_DESIGN_GROOVES_WIDTHS, payload: width }); }
const updateRingPairDesignGroovesSurfaces = (surface) => dispatch => { dispatch({ type: UPDATE_RING_PAIR_DESIGN_GROOVES_SURFACES, payload: surface }); }
const updateRingPairDesignGroovesAlignments = (alignment) => dispatch => { dispatch({ type: UPDATE_RING_PAIR_DESIGN_GROOVES_ALIGNMENTS, payload: alignment }); }
const updateRingPairDesignGroovesPositions = (position) => dispatch => { dispatch({ type: UPDATE_RING_PAIR_DESIGN_GROOVES_POSITIONS, payload: position }); }
const updateRing1DesignGroovesTypes = (type) => dispatch => { dispatch({ type: UPDATE_RING_1_DESIGN_GROOVES_TYPES, payload: type }); }
const updateRing1DesignGroovesWidths = (width) => dispatch => { dispatch({ type: UPDATE_RING_1_DESIGN_GROOVES_WIDTHS, payload: width }); }
const updateRing1DesignGroovesSurfaces = (surface) => dispatch => { dispatch({ type: UPDATE_RING_1_DESIGN_GROOVES_SURFACES, payload: surface }); }
const updateRing1DesignGroovesAlignments = (alignment) => dispatch => { dispatch({ type: UPDATE_RING_1_DESIGN_GROOVES_ALIGNMENTS, payload: alignment }); }
const updateRing1DesignGroovesPositions = (position) => dispatch => { dispatch({ type: UPDATE_RING_1_DESIGN_GROOVES_POSITIONS, payload: position }); }
const updateRing2DesignGroovesTypes = (type) => dispatch => { dispatch({ type: UPDATE_RING_2_DESIGN_GROOVES_TYPES, payload: type }); }
const updateRing2DesignGroovesWidths = (width) => dispatch => { dispatch({ type: UPDATE_RING_2_DESIGN_GROOVES_WIDTHS, payload: width }); }
const updateRing2DesignGroovesSurfaces = (surface) => dispatch => { dispatch({ type: UPDATE_RING_2_DESIGN_GROOVES_SURFACES, payload: surface }); }
const updateRing2DesignGroovesAlignments = (alignment) => dispatch => { dispatch({ type: UPDATE_RING_2_DESIGN_GROOVES_ALIGNMENTS, payload: alignment }); }
const updateRing2DesignGroovesPositions = (position) => dispatch => { dispatch({ type: UPDATE_RING_2_DESIGN_GROOVES_POSITIONS, payload: position }); }
const setRingDesignGroovesIndex = (index) => dispatch => { dispatch({ type: SET_RING_DESIGN_GROOVES_INDEX, payload: index }); }
const deleteRingPairDesignGroove = (del) => dispatch => { dispatch({ type: DELETE_RING_PAIR_DESIGN_GROOVE, payload: del }); }
const deleteRing1DesignGroove = (del) => dispatch => { dispatch({ type: DELETE_RING_1_DESIGN_GROOVE, payload: del }); }
const deleteRing2DesignGroove = (del) => dispatch => { dispatch({ type: DELETE_RING_2_DESIGN_GROOVE, payload: del }); }
const deleteRingPairAll = () => dispatch => { dispatch({ type: DELETE_RING_PAIR_ALL }); }
const deleteRing1All = () => dispatch => { dispatch({ type: DELETE_RING_1_ALL }); }
const deleteRing2All = () => dispatch => { dispatch({ type: DELETE_RING_2_ALL }); }

// separation groove actions
const setRingPairGroove = (groove) => (dispatch) => { dispatch({ type: SET_RING_PAIR_GROOVE, payload: groove }); }
const setRing1Groove = (groove) => (dispatch) => { dispatch({ type: SET_RING_1_GROOVE, payload: groove }); }
const setRing2Groove = (groove) => (dispatch) => { dispatch({ type: SET_RING_2_GROOVE, payload: groove }); }
const setRingPairGrooveWidth = (width) => (dispatch) => { dispatch({ type: SET_RING_PAIR_GROOVE_WIDTH, payload: width }); }
const setRing1GrooveWidth = (width) => (dispatch) => { dispatch({ type: SET_RING_1_GROOVE_WIDTH, payload: width }); }
const setRing2GrooveWidth = (width) => (dispatch) => { dispatch({ type: SET_RING_2_GROOVE_WIDTH, payload: width }); }
const setRingPairGrooveSurface = (surface) => (dispatch) => { dispatch({ type: SET_RING_PAIR_GROOVE_SURFACE, payload: surface }); }
const setRing1GrooveSurface = (surface) => (dispatch) => { dispatch({ type: SET_RING_1_GROOVE_SURFACE, payload: surface }); }
const setRing2GrooveSurface = (surface) => (dispatch) => { dispatch({ type: SET_RING_2_GROOVE_SURFACE, payload: surface }); }

// diamond setting(type) actions
const setRingPairDiamondSetting = (setting) => (dispatch) => { dispatch({ type: SET_RING_PAIR_DIAMOND_SETTING, payload: setting }); }
const setRing1DiamondSetting = (setting) => (dispatch) => { dispatch({ type: SET_RING_1_DIAMOND_SETTING, payload: setting }); }
const setRing2DiamondSetting = (setting) => (dispatch) => { dispatch({ type: SET_RING_2_DIAMOND_SETTING, payload: setting }); }

// diamond cut actions
const setRingPairDiamondCut = (cut) => (dispatch) => { dispatch({ type: SET_RING_PAIR_DIAMOND_CUT, payload: cut }); }
const setRing1DiamondCut = (cut) => (dispatch) => { dispatch({ type: SET_RING_1_DIAMOND_CUT, payload: cut }); }
const setRing2DiamondCut = (cut) => (dispatch) => { dispatch({ type: SET_RING_2_DIAMOND_CUT, payload: cut }); }

// diamond size actions
const setRingPairDiamondSize = (size) => (dispatch) => { dispatch({ type: SET_RING_PAIR_DIAMOND_SIZE, payload: size }); }
const setRing1DiamondSize = (size) => (dispatch) => { dispatch({ type: SET_RING_1_DIAMOND_SIZE, payload: size }); }
const setRing2DiamondSize = (size) => (dispatch) => { dispatch({ type: SET_RING_2_DIAMOND_SIZE, payload: size }); }

// diamond quality actions
const setRingPairDiamondQuality = (quality) => (dispatch) => { dispatch({ type: SET_RING_PAIR_DIAMOND_QUALITY, payload: quality }); }
const setRing1DiamondQuality = (quality) => (dispatch) => { dispatch({ type: SET_RING_1_DIAMOND_QUALITY, payload: quality }); }
const setRing2DiamondQuality = (quality) => (dispatch) => { dispatch({ type: SET_RING_2_DIAMOND_QUALITY, payload: quality }); }

// diamond number of stones actions
const setRingPairNumOfStones = (num) => (dispatch) => { dispatch({ type: SET_RING_PAIR_NUM_OF_STONES, payload: num }); }
const setRing1NumOfStones = (num) => (dispatch) => { dispatch({ type: SET_RING_1_NUM_OF_STONES, payload: num }); }
const setRing2NumOfStones = (num) => (dispatch) => { dispatch({ type: SET_RING_2_NUM_OF_STONES, payload: num }); }

// diamond rows actions
const setRingPairRows = (rows) => (dispatch) => { dispatch({ type: SET_RING_PAIR_ROWS, payload: rows }); }
const setRing1Rows = (rows) => (dispatch) => { dispatch({ type: SET_RING_1_ROWS, payload: rows }); }
const setRing2Rows = (rows) => (dispatch) => { dispatch({ type: SET_RING_2_ROWS, payload: rows }); }

// diamond position actions
const setRingPairPosition = (position) => (dispatch) => { dispatch({ type: SET_RING_PAIR_POSITION, payload: position }); }
const setRing1Position = (position) => (dispatch) => { dispatch({ type: SET_RING_1_POSITION, payload: position }); }
const setRing2Position = (position) => (dispatch) => { dispatch({ type: SET_RING_2_POSITION, payload: position }); }

// engraving text actions
const setRingPairEngravingText = (text) => (dispatch) => { dispatch({ type: SET_RING_PAIR_ENGRAVING_TEXT, payload: text }); }
const setRing1EngravingText = (text) => (dispatch) => { dispatch({ type: SET_RING_1_ENGRAVING_TEXT, payload: text }); }
const setRing2EngravingText = (text) => (dispatch) => { dispatch({ type: SET_RING_2_ENGRAVING_TEXT, payload: text }); }
const setRingPairEngravingFont = (font) => dispatch => { dispatch({ type: SET_RING_PAIR_ENGRAVING_FONT, payload: font }); }
const setRing1EngravingFont = (font) => dispatch => { dispatch({ type: SET_RING_1_ENGRAVING_FONT, payload: font }); }
const setRing2EngravingFont = (font) => dispatch => { dispatch({ type: SET_RING_2_ENGRAVING_FONT, payload: font }); }

// load file
const loadFile = (state) => dispatch => { dispatch({ type: LOAD_FILE, payload: state }); }

export {
    setLoading,
    stopLoading,
    setHandView,
    stopHandView,
    setFullScreen,
    stopFullScreen,
    setDeleteDesign,
    setUndo,
    setWizard,
    setRing,
    setRingPairPrice,
    setRing1Price,
    setRing2Price,
    setPairMaterial,
    setRing1Material,
    setRing2Material,
    setRing1Disabled,
    setRing2Disabled,
    setRingPairProfiles,
    setRingPairSurface,
    setRingPairMetal,
    setRingPairFineness,
    setRingPair2Surface,
    setRingPair2Metal,
    setRingPair2Fineness,
    setRingPair3Surface,
    setRingPair3Metal,
    setRingPair3Fineness,
    setRingPairWaveHeight,
    setRingPairNumberOfWaves,
    setRing1Profiles,
    setRing1Width,
    setRing1Height,
    setRing1Size,
    setRing1Type,
    setRing1Color,
    setRing1Metal,
    setRing1Surface,
    setRing1Fineness,
    setRing12Metal,
    setRing12Surface,
    setRing12Fineness,
    setRing13Metal,
    setRing13Surface,
    setRing13Fineness,
    setRing1WaveHeight,
    setRing1NumberOfWaves,
    setRing2Profiles,
    setRing2Size,
    setRing2Width,
    setRing2Height,
    setRing2Type,
    setRing2Color,
    setRing2Metal,
    setRing2Surface,
    setRing2Fineness,
    setRing22Metal,
    setRing22Surface,
    setRing22Fineness,
    setRing23Metal,
    setRing23Surface,
    setRing23Fineness,
    setRing2WaveHeight,
    setRing2NumberOfWaves,
    setRingPairLeftEdge,
    setRingPairRightEdge,
    setRing1LeftEdge,
    setRing1RightEdge,
    setRing2LeftEdge,
    setRing2RightEdge,
    setRingPairLeftWidth,
    setRingPairRightWidth,
    setRingPairLeftSurface,
    setRingPairRightSurface,
    setRing1LeftWidth,
    setRing1RightWidth,
    setRing1LeftSurface,
    setRing1RightSurface,
    setRing2LeftWidth,
    setRing2RightWidth,
    setRing2LeftSurface,
    setRing2RightSurface,
    setRingPairEngravingText,
    setRing1EngravingText,
    setRing2EngravingText,
    setRingPairEngravingFont,
    setRing1EngravingFont,
    setRing2EngravingFont,
    setRingPairDiamondSetting,
    setRing1DiamondSetting,
    setRing2DiamondSetting,
    setRingPairDiamondCut,
    setRing1DiamondCut,
    setRing2DiamondCut,
    setRingPairDiamondSize,
    setRing1DiamondSize,
    setRing2DiamondSize,
    setRingPairDiamondQuality,
    setRing1DiamondQuality,
    setRing2DiamondQuality,
    setRingPairNumOfStones,
    setRing1NumOfStones,
    setRing2NumOfStones,
    setRingPairRows,
    setRing1Rows,
    setRing2Rows,
    setRingPairPosition,
    setRing1Position,
    setRing2Position,
    setRingPairGroove,
    setRing1Groove,
    setRing2Groove,
    setRingPairGrooveWidth,
    setRing1GrooveWidth,
    setRing2GrooveWidth,
    setRingPairGrooveSurface,
    setRing1GrooveSurface,
    setRing2GrooveSurface,
    setRingPairDesignGroovesTypes,
    setRingPairDesignGroovesWidths,
    setRingPairDesignGroovesSurfaces,
    setRingPairDesignGroovesAlignments,
    setRingPairDesignGroovesPositions,
    setRing1DesignGroovesTypes,
    setRing1DesignGroovesWidths,
    setRing1DesignGroovesSurfaces,
    setRing1DesignGroovesAlignments,
    setRing1DesignGroovesPositions,
    setRing2DesignGroovesTypes,
    setRing2DesignGroovesWidths,
    setRing2DesignGroovesSurfaces,
    setRing2DesignGroovesAlignments,
    setRing2DesignGroovesPositions,
    setRingPairDesignGrooveAdd,
    setRing1DesignGrooveAdd,
    setRing2DesignGrooveAdd,
    updateRingPairDesignGroovesTypes,
    updateRingPairDesignGroovesWidths,
    updateRingPairDesignGroovesSurfaces,
    updateRingPairDesignGroovesAlignments,
    updateRingPairDesignGroovesPositions,
    updateRing1DesignGroovesTypes,
    updateRing1DesignGroovesWidths,
    updateRing1DesignGroovesSurfaces,
    updateRing1DesignGroovesAlignments,
    updateRing1DesignGroovesPositions,
    updateRing2DesignGroovesTypes,
    updateRing2DesignGroovesWidths,
    updateRing2DesignGroovesSurfaces,
    updateRing2DesignGroovesAlignments,
    updateRing2DesignGroovesPositions,
    deleteRingPairDesignGroove,
    deleteRing1DesignGroove,
    deleteRing2DesignGroove,
    deleteRingPairAll,
    deleteRing1All,
    deleteRing2All,
    setRingPairDesignGroovesSine,
    setRing1DesignGroovesSine,
    setRing2DesignGroovesSine,
    setRingPairDesignGroovesSineHeight,
    setRing1DesignGroovesSineHeight,
    setRing2DesignGroovesSineHeight,
    updateRingPairDesignGroovesSine,
    updateRingPairDesignGroovesSineHeight,
    updateRing1DesignGroovesSine,
    updateRing2DesignGroovesSine,
    updateRing1DesignGroovesSineHeight,
    updateRing2DesignGroovesSineHeight,
    setRingDesignGroovesIndex,
    loadFile,
};