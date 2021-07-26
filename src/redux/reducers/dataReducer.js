import {
    SET_WIZARD,
    SET_DELETE_DESIGN,
    SET_UNDO,
    SET_RING,
    SET_RING_PAIR_PRICE,
    SET_RING_1_PRICE,
    SET_RING_2_PRICE,
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
    SET_RING_1_NUMBER_OF_WAVES,
    SET_RING_2_WAVE_HEIGHT,
    SET_RING_2_NUMBER_OF_WAVES,
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
    SET_RING_1_DIAMOND_POSITION,
    SET_RING_2_DIAMOND_POSITION,
    SET_RING_PAIR_ENGRAVING_TEXT,
    SET_RING_1_ENGRAVING_TEXT,
    SET_RING_2_ENGRAVING_TEXT,
    SET_RING_PAIR_ENGRAVING_FONT,
    SET_RING_1_ENGRAVING_FONT,
    SET_RING_2_ENGRAVING_FONT,
    SET_RING_PAIR_GROOVE,
    SET_RING_1_GROOVE,
    SET_RING_2_GROOVE,
    SET_RING_PAIR_GROOVE_WIDTH,
    SET_RING_1_GROOVE_WIDTH,
    SET_RING_2_GROOVE_WIDTH,
    SET_RING_PAIR_GROOVE_SURFACE,
    SET_RING_1_GROOVE_SURFACE,
    SET_RING_2_GROOVE_SURFACE,
    SET_RING_PAIR_DESIGN_GROOVES_TYPES,
    SET_RING_PAIR_DESIGN_GROOVES_WIDTHS,
    SET_RING_PAIR_DESIGN_GROOVES_SURFACES,
    SET_RING_PAIR_DESIGN_GROOVES_ALIGNMENTS,
    SET_RING_1_DESIGN_GROOVES_TYPES,
    SET_RING_1_DESIGN_GROOVES_WIDTHS,
    SET_RING_1_DESIGN_GROOVES_SURFACES,
    SET_RING_1_DESIGN_GROOVES_ALIGNMENTS,
    SET_RING_2_DESIGN_GROOVES_TYPES,
    SET_RING_2_DESIGN_GROOVES_WIDTHS,
    SET_RING_2_DESIGN_GROOVES_SURFACES,
    SET_RING_2_DESIGN_GROOVES_ALIGNMENTS,
    SET_RING_PAIR_DESIGN_GROOVE_ADD,
    SET_RING_1_DESIGN_GROOVE_ADD,
    SET_RING_2_DESIGN_GROOVE_ADD,
    UPDATE_RING_PAIR_DESIGN_GROOVES_TYPES,
    UPDATE_RING_PAIR_DESIGN_GROOVES_WIDTHS,
    UPDATE_RING_PAIR_DESIGN_GROOVES_SURFACES,
    UPDATE_RING_1_DESIGN_GROOVES_TYPES,
    UPDATE_RING_1_DESIGN_GROOVES_WIDTHS,
    UPDATE_RING_1_DESIGN_GROOVES_SURFACES,
    UPDATE_RING_2_DESIGN_GROOVES_TYPES,
    UPDATE_RING_2_DESIGN_GROOVES_WIDTHS,
    UPDATE_RING_2_DESIGN_GROOVES_SURFACES,
    DELETE_RING_PAIR_DESIGN_GROOVE,
    DELETE_RING_1_DESIGN_GROOVE,
    DELETE_RING_2_DESIGN_GROOVE,
    DELETE_RING_PAIR_ALL,
    DELETE_RING_1_ALL,
    DELETE_RING_2_ALL,
    SET_RING_PAIR_DESIGN_GROOVES_SINE,
    SET_RING_PAIR_DESIGN_GROOVES_SINE_HEIGHT,
    SET_RING_1_DESIGN_GROOVES_SINE,
    SET_RING_1_DESIGN_GROOVES_SINE_HEIGHT,
    SET_RING_2_DESIGN_GROOVES_SINE,
    SET_RING_2_DESIGN_GROOVES_SINE_HEIGHT,
    UPDATE_RING_PAIR_DESIGN_GROOVES_ALIGNMENTS,
    UPDATE_RING_1_DESIGN_GROOVES_ALIGNMENTS,
    UPDATE_RING_2_DESIGN_GROOVES_ALIGNMENTS,
    UPDATE_RING_PAIR_DESIGN_GROOVES_POSITIONS,
    UPDATE_RING_1_DESIGN_GROOVES_POSITIONS,
    UPDATE_RING_2_DESIGN_GROOVES_POSITIONS,
    SET_RING_PAIR_DESIGN_GROOVES_POSITIONS,
    SET_RING_1_DESIGN_GROOVES_POSITIONS,
    SET_RING_2_DESIGN_GROOVES_POSITIONS,
    SET_RING_DESIGN_GROOVES_INDEX,
    LOAD_FILE,
} from '../types';

const initialState = {
    wizard: 'profiles',
    undo: false,
    ring: 'pair',
    ring_1_price: 943,
    ring_2_price: 943,
    ring_1_disabled: false,
    ring_2_disabled: false,
    ring_1_material: 'one_color',
    ring_2_material: 'one_color',
    ring_1_profiles: 'C',
    ring_2_profiles: 'C',
    ring_1_size: '18',
    ring_2_size: '30',
    ring_1_width: '6',
    ring_2_width: '6',
    ring_1_height: '4',
    ring_2_height: '4',
    ring_1_type: '',
    ring_2_type: '',
    ring_1_metal: 0,
    ring_2_metal: 0,
    ring_1_surface: 0,
    ring_2_surface: 0,
    ring_1_fineness: 375,
    ring_2_fineness: 375,
    ring_1_2_surface: 0,
    ring_1_2_metal: 0,
    ring_1_2_fineness: 375,
    ring_1_3_surface: 0,
    ring_1_3_metal: 0,
    ring_1_3_fineness: 375,
    ring_2_2_surface: 0,
    ring_2_2_metal: 0,
    ring_2_2_fineness: 375,
    ring_2_3_surface: 0,
    ring_2_3_metal: 0,
    ring_2_3_fineness: 375,
    ring_1_wave_height: 0,
    ring_2_wave_height: 0,
    ring_1_number_of_waves: 0,
    ring_2_number_of_waves: 0,
    ring_1_left_edge: 0,
    ring_1_right_edge: 0,
    ring_1_left_width: 0,
    ring_1_left_surface: 0,
    ring_1_right_width: 0,
    ring_1_right_surface: 0,
    ring_2_left_edge: 0,
    ring_2_right_edge: 0,
    ring_2_left_width: 0,
    ring_2_left_surface: 0,
    ring_2_right_width: 0,
    ring_2_right_surface: 0,
    ring_1_diamond_setting: 1,
    ring_2_diamond_setting: 1,
    ring_1_diamond_cut: 0,
    ring_2_diamond_cut: 0,
    ring_1_diamond_size: 0,
    ring_2_diamond_size: 0,
    ring_1_diamond_quality: 0,
    ring_2_diamond_quality: 0,
    ring_1_number_of_stones: 3,
    ring_2_number_of_stones: 3,
    ring_1_rows: 0,
    ring_2_rows: 0,
    ring_1_position: 1,
    ring_2_position: 1,
    ring_1_diamond_position: 0.5,
    ring_2_diamond_position: 0.5,
    ring_1_engraving_text: 'I LOVE YOU',
    ring_2_engraving_text: 'I LOVE YOU',
    ring_1_engraving_font: 0,
    ring_2_engraving_font: 0,
    ring_1_groove: 0,
    ring_1_groove_width: 0,
    ring_1_groove_surface: 0,
    ring_2_groove: 0,
    ring_2_groove_width: 0,
    ring_2_groove_surface: 0,
    ring_1_design_grooves_types: [],
    ring_1_design_grooves_widths: [],
    ring_1_design_grooves_surfaces: [],
    ring_1_design_grooves_alignments: [],
    ring_1_design_grooves_positions: [],
    ring_1_design_grooves_sines: [],
    ring_1_design_grooves_sine_heights: [],
    ring_2_design_grooves_types: [],
    ring_2_design_grooves_widths: [],
    ring_2_design_grooves_surfaces: [],
    ring_2_design_grooves_alignments: [],
    ring_2_design_grooves_positions: [],
    ring_2_design_grooves_sines: [],
    ring_2_design_grooves_sine_heights: [],
    ring_design_grooves_index: 0
};

export default function (state = initialState, action) {
    let grooveTypes = state.ring_1_design_grooves_types;
    let grooveTypes1 = state.ring_1_design_grooves_types;
    let grooveTypes2 = state.ring_2_design_grooves_types;
    let grooveWidths = state.ring_1_design_grooves_widths;
    let grooveWidths1 = state.ring_1_design_grooves_widths;
    let grooveWidths2 = state.ring_2_design_grooves_widths;
    let grooveSurfaces = state.ring_1_design_grooves_surfaces;
    let grooveSurfaces1 = state.ring_1_design_grooves_surfaces;
    let grooveSurfaces2 = state.ring_2_design_grooves_surfaces;
    let grooveAlignments = state.ring_1_design_grooves_alignments;
    let grooveAlignments1 = state.ring_1_design_grooves_alignments;
    let grooveAlignments2 = state.ring_2_design_grooves_alignments;
    let groovePositions = state.ring_1_design_grooves_positions;
    let groovePositions1 = state.ring_1_design_grooves_positions;
    let groovePositions2 = state.ring_2_design_grooves_positions;
    let grooveSines = state.ring_1_design_grooves_sines;
    let grooveSines1 = state.ring_1_design_grooves_sines;
    let grooveSines2 = state.ring_2_design_grooves_sines;
    let grooveSineHeights = state.ring_1_design_grooves_sine_heights;
    let grooveSineHeights1 = state.ring_1_design_grooves_sine_heights;
    let grooveSineHeights2 = state.ring_2_design_grooves_sine_heights;

    switch (action.type) {
        case SET_WIZARD:
            return { ...state, wizard: action.payload };
        case SET_DELETE_DESIGN:
            return initialState;
        case SET_UNDO:
            return {
                wizard: action.payload.wizard,
                undo: action.payload.undo,
                ring: action.payload.ring,
                ring_1_price: action.payload.ring_1_price,
                ring_2_price: action.payload.ring_2_price,
                ring_1_disabled: action.payload.ring_1_disabled,
                ring_2_disabled: action.payload.ring_2_disabled,
                ring_1_material: action.payload.ring_1_material,
                ring_2_material: action.payload.ring_2_material,
                ring_1_profiles: action.payload.ring_1_profiles,
                ring_2_profiles: action.payload.ring_2_profiles,
                ring_1_size: action.payload.ring_1_size,
                ring_2_size: action.payload.ring_2_size,
                ring_1_width: action.payload.ring_1_width,
                ring_2_width: action.payload.ring_2_width,
                ring_1_height: action.payload.ring_1_height,
                ring_2_height: action.payload.ring_2_height,
                ring_1_type: action.payload.ring_1_type,
                ring_2_type: action.payload.ring_2_type,
                ring_1_metal: action.payload.ring_1_metal,
                ring_2_metal: action.payload.ring_2_metal,
                ring_1_surface: action.payload.ring_1_surface,
                ring_2_surface: action.payload.ring_2_surface,
                ring_1_fineness: action.payload.ring_1_fineness,
                ring_2_fineness: action.payload.ring_2_fineness,
                ring_1_2_surface: action.payload.ring_1_2_surface,
                ring_1_2_metal: action.payload.ring_1_2_metal,
                ring_1_2_fineness: action.payload.ring_1_2_fineness,
                ring_1_3_surface: action.payload.ring_1_3_surface,
                ring_1_3_metal: action.payload.ring_1_3_metal,
                ring_1_3_fineness: action.payload.ring_1_3_fineness,
                ring_2_2_surface: action.payload.ring_2_2_surface,
                ring_2_2_metal: action.payload.ring_2_2_metal,
                ring_2_2_fineness: action.payload.ring_2_2_fineness,
                ring_2_3_surface: action.payload.ring_2_3_surface,
                ring_2_3_metal: action.payload.ring_2_3_metal,
                ring_2_3_fineness: action.payload.ring_2_3_fineness,
                ring_1_wave_height: action.payload.ring_1_wave_height,
                ring_2_wave_height: action.payload.ring_2_wave_height,
                ring_1_number_of_waves: action.payload.ring_1_number_of_waves,
                ring_2_number_of_waves: action.payload.ring_2_number_of_waves,
                ring_1_left_edge: action.payload.ring_1_left_edge,
                ring_1_right_edge: action.payload.ring_1_right_edge,
                ring_1_left_width: action.payload.ring_1_left_width,
                ring_1_left_surface: action.payload.ring_1_left_surface,
                ring_1_right_width: action.payload.ring_1_right_width,
                ring_1_right_surface: action.payload.ring_1_right_surface,
                ring_2_left_edge: action.payload.ring_2_left_edge,
                ring_2_right_edge: action.payload.ring_2_right_edge,
                ring_2_left_width: action.payload.ring_2_left_width,
                ring_2_left_surface: action.payload.ring_2_left_surface,
                ring_2_right_width: action.payload.ring_2_right_width,
                ring_2_right_surface: action.payload.ring_2_right_surface,
                ring_1_diamond_setting: action.payload.ring_1_diamond_setting,
                ring_2_diamond_setting: action.payload.ring_2_diamond_setting,
                ring_1_diamond_cut: action.payload.ring_1_diamond_cut,
                ring_2_diamond_cut: action.payload.ring_2_diamond_cut,
                ring_1_diamond_size: action.payload.ring_1_diamond_size,
                ring_2_diamond_size: action.payload.ring_2_diamond_size,
                ring_1_diamond_quality: action.payload.ring_1_diamond_quality,
                ring_2_diamond_quality: action.payload.ring_2_diamond_quality,
                ring_1_number_of_stones: action.payload.ring_1_number_of_stones,
                ring_2_number_of_stones: action.payload.ring_2_number_of_stones,
                ring_1_rows: action.payload.ring_1_rows,
                ring_2_rows: action.payload.ring_2_rows,
                ring_1_position: action.payload.ring_1_position,
                ring_2_position: action.payload.ring_2_position,
                ring_1_engraving_text: action.payload.ring_1_engraving_text,
                ring_2_engraving_text: action.payload.ring_2_engraving_text,
                ring_1_engraving_font: action.payload.ring_1_engraving_font,
                ring_2_engraving_font: action.payload.ring_2_engraving_font,
                ring_1_groove: action.payload.ring_1_groove,
                ring_1_groove_width: action.payload.ring_1_groove_width,
                ring_1_groove_surface: action.payload.ring_1_groove_surface,
                ring_2_groove: action.payload.ring_2_groove,
                ring_2_groove_width: action.payload.ring_2_groove_width,
                ring_2_groove_surface: action.payload.ring_2_groove_surface,
                ring_1_design_grooves_types: action.payload.ring_1_design_grooves_types,
                ring_1_design_grooves_widths: action.payload.ring_1_design_grooves_widths,
                ring_1_design_grooves_surfaces: action.payload.ring_1_design_grooves_surfaces,
                ring_1_design_grooves_alignments: action.payload.ring_1_design_grooves_alignments,
                ring_1_design_grooves_positions: action.payload.ring_1_design_grooves_positions,
                ring_2_design_grooves_types: action.payload.ring_2_design_grooves_types,
                ring_2_design_grooves_widths: action.payload.ring_2_design_grooves_widths,
                ring_2_design_grooves_surfaces: action.payload.ring_2_design_grooves_surfaces,
                ring_2_design_grooves_alignments: action.payload.ring_2_design_grooves_alignments,
                ring_2_design_grooves_positions: action.payload.ring_2_design_grooves_positions
            };
        case SET_RING:
            return { ...state, ring: action.payload };
        case SET_RING_PAIR_PRICE:
            return { ...state, ring_1_price: action.payload, ring_2_price: action.payload };
        case SET_RING_1_PRICE:
            return { ...state, ring_1_price: action.payload };
        case SET_RING_2_PRICE:
            return { ...state, ring_2_price: action.payload };
        case SET_PAIR_MATERIAL:
            return { ...state, ring_1_material: action.payload, ring_2_material: action.payload };
        case SET_RING_1_MATERIAL:
            return { ...state, ring_1_material: action.payload };
        case SET_RING_2_MATERIAL:
            return { ...state, ring_2_material: action.payload };
        case SET_RING_1_DISABLED:
            return { ...state, ring_1_disabled: action.payload };
        case SET_RING_2_DISABLED:
            return { ...state, ring_2_disabled: action.payload };
        case SET_RING_PAIR_PROFILES:
            return { ...state, ring_1_profiles: action.payload, ring_2_profiles: action.payload };
        case SET_RING_PAIR_SURFACE:
            return { ...state, material: action.payload.metal, ring_1_surface: action.payload.surface, ring_2_surface: action.payload.surface };
        case SET_RING_PAIR_METAL:
            return { ...state, material: action.payload.metal, ring_1_metal: action.payload.metals, ring_2_metal: action.payload.metals };
        case SET_RING_PAIR_FINENESS:
            return { ...state, material: action.payload.metal, ring_1_fineness: action.payload.fineness, ring_2_fineness: action.payload.fineness };
        case SET_RING_PAIR_2_SURFACE:
            return { ...state, material: action.payload.metal, ring_1_2_surface: action.payload.surface, ring_2_2_surface: action.payload.surface };
        case SET_RING_PAIR_2_METAL:
            return { ...state, material: action.payload.metal, ring_1_2_metal: action.payload.metals, ring_2_2_metal: action.payload.metals };
        case SET_RING_PAIR_2_FINENESS:
            return { ...state, material: action.payload.metal, ring_1_2_fineness: action.payload.fineness, ring_2_2_fineness: action.payload.fineness };
        case SET_RING_PAIR_3_SURFACE:
            return { ...state, material: action.payload.metal, ring_1_3_surface: action.payload.surface, ring_2_3_surface: action.payload.surface };
        case SET_RING_PAIR_3_METAL:
            return { ...state, material: action.payload.metal, ring_1_3_metal: action.payload.metals, ring_2_3_metal: action.payload.metals };
        case SET_RING_PAIR_3_FINENESS:
            return { ...state, material: action.payload.metal, ring_1_3_fineness: action.payload.fineness, ring_2_3_fineness: action.payload.fineness };
        case SET_RING_PAIR_WAVE_HEIGHT:
            return { ...state, material: action.payload.metal, ring_1_wave_height: action.payload.height, ring_2_wave_height: action.payload.height };
        case SET_RING_PAIR_NUMBER_OF_WAVES:
            return { ...state, material: action.payload.metal, ring_1_number_of_waves: action.payload.num, ring_2_number_of_waves: action.payload.num };
        case SET_RING_1_PROFILES:
            return { ...state, ring_1_profiles: action.payload };
        case SET_RING_1_SIZE:
            return { ...state, ring_1_size: action.payload };
        case SET_RING_1_TYPE:
            return { ...state, ring_1_type: action.payload };
        case SET_RING_1_WIDTH:
            return { ...state, ring_1_width: action.payload };
        case SET_RING_1_HEIGHT:
            return { ...state, ring_1_height: action.payload };
        case SET_RING_1_METAL:
            return { ...state, material: action.payload.metal, ring_1_metal: action.payload.metals };
        case SET_RING_1_SURFACE:
            return { ...state, material: action.payload.metal, ring_1_surface: action.payload.surface };
        case SET_RING_1_FINENESS:
            return { ...state, material: action.payload.metal, ring_1_fineness: action.payload.fineness };
        case SET_RING_1_2_METAL:
            return { ...state, material: action.payload.metal, ring_1_2_metal: action.payload.metals };
        case SET_RING_1_2_SURFACE:
            return { ...state, material: action.payload.metal, ring_1_2_surface: action.payload.surface };
        case SET_RING_1_2_FINENESS:
            return { ...state, material: action.payload.metal, ring_1_2_fineness: action.payload.fineness };
        case SET_RING_1_3_METAL:
            return { ...state, material: action.payload.metal, ring_1_3_metal: action.payload.metals };
        case SET_RING_1_3_SURFACE:
            return { ...state, material: action.payload.metal, ring_1_3_surface: action.payload.surface };
        case SET_RING_1_3_FINENESS:
            return { ...state, material: action.payload.metal, ring_1_3_fineness: action.payload.fineness };
        case SET_RING_1_WAVE_HEIGHT:
            return { ...state, material: action.payload.metal, ring_1_wave_height: action.payload.height };
        case SET_RING_1_NUMBER_OF_WAVES:
            return { ...state, material: action.payload.metal, ring_1_number_of_waves: action.payload.num };
        case SET_RING_2_PROFILES:
            return { ...state, ring_2_profiles: action.payload };
        case SET_RING_2_SIZE:
            return { ...state, ring_2_size: action.payload };
        case SET_RING_2_TYPE:
            return { ...state, ring_2_type: action.payload };
        case SET_RING_2_WIDTH:
            return { ...state, ring_2_width: action.payload };
        case SET_RING_2_HEIGHT:
            return { ...state, ring_2_height: action.payload };
        case SET_RING_2_METAL:
            return { ...state, material: action.payload.metal, ring_2_metal: action.payload.metals };
        case SET_RING_2_SURFACE:
            return { ...state, material: action.payload.metal, ring_2_surface: action.payload.surface };
        case SET_RING_2_FINENESS:
            return { ...state, material: action.payload.metal, ring_2_fineness: action.payload.fineness };
        case SET_RING_2_2_METAL:
            return { ...state, material: action.payload.metal, ring_2_2_metal: action.payload.metals };
        case SET_RING_2_2_SURFACE:
            return { ...state, material: action.payload.metal, ring_2_2_surface: action.payload.surface };
        case SET_RING_2_2_FINENESS:
            return { ...state, material: action.payload.metal, ring_2_2_fineness: action.payload.fineness };
        case SET_RING_2_3_METAL:
            return { ...state, material: action.payload.metal, ring_2_3_metal: action.payload.metals };
        case SET_RING_2_3_SURFACE:
            return { ...state, material: action.payload.metal, ring_2_3_surface: action.payload.surface };
        case SET_RING_2_3_FINENESS:
            return { ...state, material: action.payload.metal, ring_2_3_fineness: action.payload.fineness };
        case SET_RING_2_WAVE_HEIGHT:
            return { ...state, material: action.payload.metal, ring_2_wave_height: action.payload.height };
        case SET_RING_2_NUMBER_OF_WAVES:
            return { ...state, material: action.payload.metal, ring_2_number_of_waves: action.payload.num };
        case SET_RING_PAIR_LEFT_EDGE:
            return { ...state, ring_1_left_edge: action.payload, ring_2_left_edge: action.payload };
        case SET_RING_PAIR_RIGHT_EDGE:
            return { ...state, ring_1_right_edge: action.payload, ring_2_right_edge: action.payload };
        case SET_RING_1_LEFT_EDGE:
            return { ...state, ring_1_left_edge: action.payload };
        case SET_RING_1_RIGHT_EDGE:
            return { ...state, ring_1_right_edge: action.payload };
        case SET_RING_2_LEFT_EDGE:
            return { ...state, ring_2_left_edge: action.payload };
        case SET_RING_2_RIGHT_EDGE:
            return { ...state, ring_2_right_edge: action.payload };
        case SET_RING_PAIR_LEFT_WIDTH:
            return { ...state, ring_1_left_width: action.payload, ring_2_left_width: action.payload };
        case SET_RING_PAIR_LEFT_SURFACE:
            return { ...state, ring_1_left_surface: action.payload, ring_2_left_surface: action.payload };
        case SET_RING_PAIR_RIGHT_WIDTH:
            return { ...state, ring_1_right_width: action.payload, ring_2_right_width: action.payload };
        case SET_RING_PAIR_RIGHT_SURFACE:
            return { ...state, ring_1_right_surface: action.payload, ring_2_right_surface: action.payload };
        case SET_RING_1_LEFT_WIDTH:
            return { ...state, ring_1_left_width: action.payload };
        case SET_RING_1_LEFT_SURFACE:
            return { ...state, ring_1_left_surface: action.payload };
        case SET_RING_1_RIGHT_WIDTH:
            return { ...state, ring_1_right_width: action.payload };
        case SET_RING_1_RIGHT_SURFACE:
            return { ...state, ring_1_right_surface: action.payload };
        case SET_RING_2_LEFT_WIDTH:
            return { ...state, ring_2_left_width: action.payload };
        case SET_RING_2_LEFT_SURFACE:
            return { ...state, ring_2_left_surface: action.payload };
        case SET_RING_2_RIGHT_WIDTH:
            return { ...state, ring_2_right_width: action.payload };
        case SET_RING_2_RIGHT_SURFACE:
            return { ...state, ring_2_right_surface: action.payload };
        case SET_RING_PAIR_DIAMOND_SETTING:
            return { ...state, ring_1_diamond_setting: action.payload, ring_1_diamond_cut: 0, ring_1_diamond_size: 0, ring_1_diamond_quality: 0, ring_1_number_of_stones: 3, ring_1_rows: 0, ring_1_position: 1, ring_2_diamond_setting: action.payload, ring_2_diamond_cut: 0, ring_2_diamond_size: 0, ring_2_diamond_quality: 0, ring_2_number_of_stones: 3, ring_2_position: 1 };
        case SET_RING_1_DIAMOND_SETTING:
            return { ...state, ring_1_diamond_setting: action.payload, ring_1_diamond_cut: 0, ring_1_diamond_size: 0, ring_1_diamond_quality: 0, ring_1_number_of_stones: 3, ring_1_rows: 0, ring_1_position: 1 };
        case SET_RING_2_DIAMOND_SETTING:
            return { ...state, ring_2_diamond_setting: action.payload, ring_2_diamond_cut: 0, ring_2_diamond_size: 0, ring_2_diamond_quality: 0, ring_2_number_of_stones: 3, ring_2_rows: 0, ring_2_position: 1 };
        case SET_RING_PAIR_DIAMOND_CUT:
            return { ...state, ring_1_diamond_cut: action.payload, ring_2_diamond_cut: action.payload };
        case SET_RING_1_DIAMOND_CUT:
            return { ...state, ring_1_diamond_cut: action.payload };
        case SET_RING_2_DIAMOND_CUT:
            return { ...state, ring_2_diamond_cut: action.payload };
        case SET_RING_PAIR_DIAMOND_SIZE:
            return { ...state, ring_1_diamond_size: action.payload, ring_2_diamond_size: action.payload };
        case SET_RING_1_DIAMOND_SIZE:
            return { ...state, ring_1_diamond_size: action.payload };
        case SET_RING_2_DIAMOND_SIZE:
            return { ...state, ring_2_diamond_size: action.payload };
        case SET_RING_PAIR_DIAMOND_QUALITY:
            return { ...state, ring_1_diamond_quality: action.payload, ring_2_diamond_quality: action.payload };
        case SET_RING_1_DIAMOND_QUALITY:
            return { ...state, ring_1_diamond_quality: action.payload };
        case SET_RING_2_DIAMOND_QUALITY:
            return { ...state, ring_2_diamond_quality: action.payload };
        case SET_RING_PAIR_NUM_OF_STONES:
            return { ...state, ring_1_number_of_stones: action.payload, ring_2_number_of_stones: action.payload };
        case SET_RING_1_NUM_OF_STONES:
            return { ...state, ring_1_number_of_stones: action.payload };
        case SET_RING_2_NUM_OF_STONES:
            return { ...state, ring_2_number_of_stones: action.payload };
        case SET_RING_PAIR_ROWS:
            return { ...state, ring_1_rows: action.payload, ring_2_rows: action.payload };
        case SET_RING_1_ROWS:
            return { ...state, ring_1_rows: action.payload };
        case SET_RING_2_ROWS:
            return { ...state, ring_2_rows: action.payload };
        case SET_RING_PAIR_POSITION:
            return { ...state, ring_1_position: action.payload, ring_2_position: action.payload };
        case SET_RING_1_POSITION:
            return { ...state, ring_1_position: action.payload };
        case SET_RING_1_DIAMOND_POSITION:
            return { ...state, ring_1_diamond_position: action.payload };
        case SET_RING_2_DIAMOND_POSITION:
            return { ...state, ring_2_diamond_position: action.payload };
        case SET_RING_2_POSITION:
            return { ...state, ring_2_position: action.payload };
        case SET_RING_PAIR_ENGRAVING_TEXT:
            return { ...state, ring_1_engraving_text: action.payload, ring_2_engraving_text: action.payload };
        case SET_RING_1_ENGRAVING_TEXT:
            return { ...state, ring_1_engraving_text: action.payload };
        case SET_RING_2_ENGRAVING_TEXT:
            return { ...state, ring_2_engraving_text: action.payload };
        case SET_RING_PAIR_ENGRAVING_FONT:
            return { ...state, ring_1_engraving_font: action.payload, ring_2_engraving_font: action.payload };
        case SET_RING_1_ENGRAVING_FONT:
            return { ...state, ring_1_engraving_font: action.payload };
        case SET_RING_2_ENGRAVING_FONT:
            return { ...state, ring_2_engraving_font: action.payload };
        case SET_RING_PAIR_GROOVE:
            return { ...state, ring_1_groove: action.payload, ring_2_groove: action.payload };
        case SET_RING_1_GROOVE:
            return { ...state, ring_1_groove: action.payload };
        case SET_RING_2_GROOVE:
            return { ...state, ring_2_groove: action.payload };
        case SET_RING_PAIR_GROOVE_WIDTH:
            return { ...state, ring_1_groove_width: action.payload, ring_2_groove_width: action.payload };
        case SET_RING_1_GROOVE_WIDTH:
            return { ...state, ring_1_groove_width: action.payload };
        case SET_RING_2_GROOVE_WIDTH:
            return { ...state, ring_2_groove_width: action.payload };
        case SET_RING_PAIR_GROOVE_SURFACE:
            return { ...state, ring_1_groove_surface: action.payload, ring_2_groove_surface: action.payload };
        case SET_RING_1_GROOVE_SURFACE:
            return { ...state, ring_1_groove_surface: action.payload };
        case SET_RING_2_GROOVE_SURFACE:
            return { ...state, ring_2_groove_surface: action.payload };
        case SET_RING_PAIR_DESIGN_GROOVES_TYPES:
            return { ...state, ring_1_design_grooves_types: [...state.ring_1_design_grooves_types, action.payload], ring_2_design_grooves_types: [...state.ring_2_design_grooves_types, action.payload] };
        case SET_RING_PAIR_DESIGN_GROOVES_WIDTHS:
            return { ...state, ring_1_design_grooves_widths: [...state.ring_1_design_grooves_widths, action.payload], ring_2_design_grooves_widths: [...state.ring_2_design_grooves_widths, action.payload] };
        case SET_RING_PAIR_DESIGN_GROOVES_SURFACES:
            return { ...state, ring_1_design_grooves_surfaces: [...state.ring_1_design_grooves_surfaces, action.payload], ring_2_design_grooves_surfaces: [...state.ring_2_design_grooves_surfaces, action.payload] };
        case SET_RING_PAIR_DESIGN_GROOVES_ALIGNMENTS:
            return { ...state, ring_1_design_grooves_alignments: [...state.ring_1_design_grooves_alignments, action.payload], ring_2_design_grooves_alignments: [...state.ring_2_design_grooves_alignments, action.payload] };
        case SET_RING_1_DESIGN_GROOVES_TYPES:
            return { ...state, ring_1_design_grooves_types: [...state.ring_1_design_grooves_types, action.payload] };
        case SET_RING_1_DESIGN_GROOVES_WIDTHS:
            return { ...state, ring_1_design_grooves_widths: [...state.ring_1_design_grooves_widths, action.payload] };
        case SET_RING_1_DESIGN_GROOVES_SURFACES:
            return { ...state, ring_1_design_grooves_surfaces: [...state.ring_1_design_grooves_surfaces, action.payload] };
        case SET_RING_1_DESIGN_GROOVES_ALIGNMENTS:
            return { ...state, ring_1_design_grooves_alignments: [...state.ring_1_design_grooves_alignments, action.payload] };
        case SET_RING_2_DESIGN_GROOVES_TYPES:
            return { ...state, ring_2_design_grooves_types: [...state.ring_2_design_grooves_types, action.payload] };
        case SET_RING_2_DESIGN_GROOVES_WIDTHS:
            return { ...state, ring_2_design_grooves_widths: [...state.ring_2_design_grooves_widths, action.payload] };
        case SET_RING_2_DESIGN_GROOVES_SURFACES:
            return { ...state, ring_2_design_grooves_surfaces: [...state.ring_2_design_grooves_surfaces, action.payload] };
        case SET_RING_2_DESIGN_GROOVES_ALIGNMENTS:
            return { ...state, ring_2_design_grooves_alignments: [...state.ring_2_design_grooves_alignments, action.payload] };
        case SET_RING_PAIR_DESIGN_GROOVE_ADD:
            localStorage.setItem('delete1', 0);
            localStorage.setItem('delete2', 0);
            localStorage.setItem('delete', 0);
            return { ...state, ring_1_design_grooves_types: [...state.ring_1_design_grooves_types, action.payload], ring_1_design_grooves_widths: [...state.ring_1_design_grooves_widths, 0], ring_1_design_grooves_surfaces: [...state.ring_1_design_grooves_surfaces, 0], ring_1_design_grooves_alignments: [...state.ring_1_design_grooves_alignments, 0], ring_1_design_grooves_positions: [...state.ring_1_design_grooves_positions, 2.5], ring_1_design_grooves_sines: [...state.ring_1_design_grooves_sines, -1], ring_1_design_grooves_sine_heights: [...state.ring_1_design_grooves_sine_heights, -1], ring_2_design_grooves_types: [...state.ring_2_design_grooves_types, action.payload], ring_2_design_grooves_widths: [...state.ring_2_design_grooves_widths, 0], ring_2_design_grooves_surfaces: [...state.ring_2_design_grooves_surfaces, 0], ring_2_design_grooves_alignments: [...state.ring_2_design_grooves_alignments, 0], ring_2_design_grooves_positions: [...state.ring_2_design_grooves_positions, 2.5], ring_2_design_grooves_sines: [...state.ring_2_design_grooves_sines, -1], ring_2_design_grooves_sine_heights: [...state.ring_2_design_grooves_sine_heights, -1] };
        case SET_RING_1_DESIGN_GROOVE_ADD:
            localStorage.setItem('delete', 0);
            localStorage.setItem('delete1', 0);
            return { ...state, ring_1_design_grooves_types: [...state.ring_1_design_grooves_types, action.payload], ring_1_design_grooves_widths: [...state.ring_1_design_grooves_widths, 0], ring_1_design_grooves_surfaces: [...state.ring_1_design_grooves_surfaces, 0], ring_1_design_grooves_alignments: [...state.ring_1_design_grooves_alignments, 0], ring_1_design_grooves_positions: [...state.ring_1_design_grooves_positions, 2.5], ring_1_design_grooves_sines: [...state.ring_1_design_grooves_sines, -1], ring_1_design_grooves_sine_heights: [...state.ring_1_design_grooves_sine_heights, -1] };
        case SET_RING_2_DESIGN_GROOVE_ADD:
            localStorage.setItem('delete', 0);
            localStorage.setItem('delete2', 0);
            return { ...state, ring_2_design_grooves_types: [...state.ring_2_design_grooves_types, action.payload], ring_2_design_grooves_widths: [...state.ring_2_design_grooves_widths, 0], ring_2_design_grooves_surfaces: [...state.ring_2_design_grooves_surfaces, 0], ring_2_design_grooves_alignments: [...state.ring_2_design_grooves_alignments, 0], ring_2_design_grooves_positions: [...state.ring_2_design_grooves_positions, 2.5], ring_2_design_grooves_sines: [...state.ring_2_design_grooves_sines, -1], ring_2_design_grooves_sine_heights: [...state.ring_2_design_grooves_sine_heights, -1] };
        case UPDATE_RING_PAIR_DESIGN_GROOVES_TYPES:
            grooveTypes1 = state.ring_1_design_grooves_types;
            grooveTypes2 = state.ring_2_design_grooves_types;
            grooveTypes1[action.payload.index] = action.payload.type;
            grooveTypes2[action.payload.index] = action.payload.type;
            return { ...state, ring_1_design_grooves_types: grooveTypes1, ring_2_design_grooves_types: grooveTypes2 };
        case UPDATE_RING_PAIR_DESIGN_GROOVES_WIDTHS:
            grooveWidths1 = state.ring_1_design_grooves_widths;
            grooveWidths2 = state.ring_2_design_grooves_widths;
            grooveWidths1[action.payload.index] = action.payload.width;
            grooveWidths2[action.payload.index] = action.payload.width;
            return { ...state, ring_1_design_grooves_widths: grooveWidths1, ring_2_design_grooves_widths: grooveWidths2 };
        case UPDATE_RING_PAIR_DESIGN_GROOVES_SURFACES:
            grooveSurfaces1 = state.ring_1_design_grooves_surfaces;
            grooveSurfaces2 = state.ring_2_design_grooves_surfaces;
            grooveSurfaces1[action.payload.index] = action.payload.surface;
            grooveSurfaces2[action.payload.index] = action.payload.surface;
            return { ...state, ring_1_design_grooves_surfaces: grooveSurfaces1, ring_2_design_grooves_surfaces: grooveSurfaces2 };
        case UPDATE_RING_PAIR_DESIGN_GROOVES_ALIGNMENTS:
            grooveAlignments1 = state.ring_1_design_grooves_alignments;
            grooveAlignments2 = state.ring_2_design_grooves_alignments;
            grooveAlignments1[action.payload.index] = action.payload.alignment;
            grooveAlignments2[action.payload.index] = action.payload.alignment;
            return { ...state, ring_1_design_grooves_alignments: grooveAlignments1, ring_2_design_grooves_alignments: grooveAlignments2 };
        case UPDATE_RING_1_DESIGN_GROOVES_TYPES:
            grooveTypes = state.ring_1_design_grooves_types;
            grooveTypes[action.payload.index] = action.payload.type;
            return { ...state, ring_1_design_grooves_types: grooveTypes };
        case UPDATE_RING_1_DESIGN_GROOVES_WIDTHS:
            grooveWidths = state.ring_1_design_grooves_widths;
            grooveWidths[action.payload.index] = action.payload.width;
            return { ...state, ring_1_design_grooves_widths: grooveWidths };
        case UPDATE_RING_1_DESIGN_GROOVES_SURFACES:
            grooveSurfaces = state.ring_1_design_grooves_surfaces;
            grooveSurfaces[action.payload.index] = action.payload.surface;
            return { ...state, ring_1_design_grooves_surfaces: grooveSurfaces };
        case UPDATE_RING_1_DESIGN_GROOVES_ALIGNMENTS:
            grooveAlignments = state.ring_1_design_grooves_alignments;
            grooveAlignments[action.payload.index] = action.payload.alignment;
            return { ...state, ring_1_design_grooves_alignments: grooveAlignments };
        case UPDATE_RING_2_DESIGN_GROOVES_TYPES:
            grooveTypes = state.ring_2_design_grooves_types;
            grooveTypes[action.payload.index] = action.payload.type;
            return { ...state, ring_2_design_grooves_types: grooveTypes };
        case UPDATE_RING_2_DESIGN_GROOVES_WIDTHS:
            grooveWidths = state.ring_2_design_grooves_widths;
            grooveWidths[action.payload.index] = action.payload.width;
            return { ...state, ring_2_design_grooves_widths: grooveWidths };
        case UPDATE_RING_2_DESIGN_GROOVES_SURFACES:
            grooveSurfaces = state.ring_2_design_grooves_surfaces;
            grooveSurfaces[action.payload.index] = action.payload.surface;
            return { ...state, ring_2_design_grooves_surfaces: grooveSurfaces };
        case UPDATE_RING_2_DESIGN_GROOVES_ALIGNMENTS:
            grooveAlignments = state.ring_2_design_grooves_alignments;
            grooveAlignments[action.payload.index] = action.payload.alignment;
            return { ...state, ring_2_design_grooves_alignments: grooveAlignments };
        case SET_RING_PAIR_DESIGN_GROOVES_SINE:
            grooveSines1 = state.ring_1_design_grooves_sines;
            grooveSines2 = state.ring_2_design_grooves_sines;
            grooveSines1[action.payload.index] = action.payload.sine;
            grooveSines2[action.payload.index] = action.payload.sine;
            return { ...state, ring_1_design_grooves_sines: grooveSines1, ring_2_design_grooves_sines: grooveSines2 };
        case SET_RING_PAIR_DESIGN_GROOVES_SINE_HEIGHT:
            grooveSineHeights1 = state.ring_1_design_grooves_sine_heights;
            grooveSineHeights2 = state.ring_2_design_grooves_sine_heights;
            grooveSineHeights1[action.payload.index] = action.payload.sine_height;
            grooveSineHeights2[action.payload.index] = action.payload.sine_height;
            return { ...state, ring_1_design_grooves_sine_heights: grooveSineHeights1, ring_2_design_grooves_sine_heights: grooveSineHeights2 };
        case SET_RING_1_DESIGN_GROOVES_SINE:
            grooveSines = state.ring_1_design_grooves_sines;
            grooveSines[action.payload.index] = action.payload.sine;
            return { ...state, ring_1_design_grooves_sines: grooveSines };
        case SET_RING_1_DESIGN_GROOVES_SINE_HEIGHT:
            grooveSineHeights = state.ring_1_design_grooves_sine_heights;
            grooveSineHeights[action.payload.index] = action.payload.sine_height;
            return { ...state, ring_1_design_grooves_sine_heights: grooveSineHeights };
        case SET_RING_2_DESIGN_GROOVES_SINE:
            grooveSines = state.ring_2_design_grooves_sines;
            grooveSines[action.payload.index] = action.payload.sine;
            return { ...state, ring_2_design_grooves_sines: grooveSines };
        case SET_RING_2_DESIGN_GROOVES_SINE_HEIGHT:
            grooveSineHeights = state.ring_2_design_grooves_sine_heights;
            grooveSineHeights[action.payload.index] = action.payload.sine_height;
            return { ...state, ring_2_design_grooves_sine_heights: grooveSineHeights };
        case SET_RING_PAIR_DESIGN_GROOVES_POSITIONS:
            groovePositions1 = state.ring_1_design_grooves_positions;
            groovePositions2 = state.ring_2_design_grooves_positions;
            groovePositions1[action.payload.index] = action.payload.position;
            groovePositions2[action.payload.index] = action.payload.position;
            return { ...state, ring_1_design_grooves_positions: groovePositions1, ring_2_design_grooves_positions: groovePositions2 };
        case SET_RING_1_DESIGN_GROOVES_POSITIONS:
            groovePositions = state.ring_1_design_grooves_positions;
            groovePositions[action.payload.index] = action.payload.position;
            return { ...state, ring_1_design_grooves_positions: groovePositions };
        case SET_RING_2_DESIGN_GROOVES_POSITIONS:
            groovePositions = state.ring_2_design_grooves_positions;
            groovePositions[action.payload.index] = action.payload.position;
            return { ...state, ring_2_design_grooves_positions: groovePositions };
        case UPDATE_RING_PAIR_DESIGN_GROOVES_POSITIONS:
            groovePositions1 = state.ring_1_design_grooves_positions;
            groovePositions2 = state.ring_2_design_grooves_positions;
            groovePositions1[action.payload.index] = action.payload.position;
            groovePositions2[action.payload.index] = action.payload.position;
            return { ...state, ring_1_design_grooves_positions: groovePositions1, ring_2_design_grooves_positions: groovePositions2 };
        case UPDATE_RING_1_DESIGN_GROOVES_POSITIONS:
            groovePositions = state.ring_1_design_grooves_positions;
            groovePositions[action.payload.index] = action.payload.position;
            return { ...state, ring_1_design_grooves_positions: groovePositions };
        case UPDATE_RING_2_DESIGN_GROOVES_POSITIONS:
            groovePositions = state.ring_2_design_grooves_positions;
            groovePositions[action.payload.index] = action.payload.position;
            return { ...state, ring_2_design_grooves_positions: groovePositions };
        case SET_RING_DESIGN_GROOVES_INDEX:
            return { ...state, ring_design_grooves_index: action.payload };
        case DELETE_RING_PAIR_DESIGN_GROOVE:
            grooveTypes1 = state.ring_1_design_grooves_types;
            grooveWidths1 = state.ring_1_design_grooves_widths;
            grooveSurfaces1 = state.ring_1_design_grooves_surfaces;
            grooveAlignments1 = state.ring_1_design_grooves_alignments;
            groovePositions1 = state.ring_1_design_grooves_positions;
            grooveSines1 = state.ring_1_design_grooves_sines;
            grooveSineHeights1 = state.ring_1_design_grooves_sine_heights;
            grooveTypes2 = state.ring_2_design_grooves_types;
            grooveWidths2 = state.ring_2_design_grooves_widths;
            grooveSurfaces2 = state.ring_2_design_grooves_surfaces;
            grooveAlignments2 = state.ring_2_design_grooves_alignments;
            groovePositions2 = state.ring_2_design_grooves_positions;
            grooveSines2 = state.ring_2_design_grooves_sines;
            grooveSineHeights2 = state.ring_2_design_grooves_sine_heights;
            if (localStorage.getItem('delete') % 2 === 0) {
                localStorage.setItem('delete', parseInt(localStorage.getItem('delete')) + 1);
                if (grooveTypes1.length === 1 || grooveTypes1.length === 0) {
                    grooveTypes1 = [];
                    grooveWidths1 = [];
                    grooveSurfaces1 = [];
                    grooveAlignments1 = [];
                    groovePositions1 = [];
                    grooveSines1 = [];
                    grooveSineHeights1 = [];
                } else {
                    grooveTypes1.splice(action.payload, 1);
                    grooveWidths1.splice(action.payload, 1);
                    grooveSurfaces1.splice(action.payload, 1);
                    grooveAlignments1.splice(action.payload, 1);
                    groovePositions1.splice(action.payload, 1);
                    grooveSines1.splice(action.payload, 1);
                    grooveSineHeights1.splice(action.payload, 1);
                }
                if (grooveTypes2.length === 1 || grooveTypes2.length === 0) {
                    grooveTypes2 = [];
                    grooveWidths2 = [];
                    grooveSurfaces2 = [];
                    grooveAlignments2 = [];
                    groovePositions2 = [];
                    grooveSines2 = [];
                    grooveSineHeights2 = [];
                } else {
                    grooveTypes2.splice(action.payload, 1);
                    grooveWidths2.splice(action.payload, 1);
                    grooveSurfaces2.splice(action.payload, 1);
                    grooveAlignments2.splice(action.payload, 1);
                    groovePositions2.splice(action.payload, 1);
                    grooveSines2.splice(action.payload, 1);
                    grooveSineHeights2.splice(action.payload, 1);
                }
                return {
                    ...state,
                    ring_1_design_grooves_types: grooveTypes1,
                    ring_1_design_grooves_widths: grooveWidths1,
                    ring_1_design_grooves_surfaces: grooveSurfaces1,
                    ring_1_design_grooves_alignments: grooveAlignments1,
                    ring_1_design_grooves_positions: groovePositions1,
                    ring_1_design_grooves_sines: grooveSines1,
                    ring_1_design_grooves_sine_heights: grooveSineHeights1,
                    ring_2_design_grooves_types: grooveTypes2,
                    ring_2_design_grooves_widths: grooveWidths2,
                    ring_2_design_grooves_surfaces: grooveSurfaces2,
                    ring_2_design_grooves_alignments: grooveAlignments2,
                    ring_2_design_grooves_positions: groovePositions2,
                    ring_2_design_grooves_sines: grooveSines2,
                    ring_2_design_grooves_sine_heights: grooveSineHeights2,
                };
            } else {
                localStorage.setItem('delete', parseInt(localStorage.getItem('delete')) + 1);
                return { ...state };
            }
        case DELETE_RING_1_DESIGN_GROOVE:
            grooveTypes1 = state.ring_1_design_grooves_types;
            grooveWidths1 = state.ring_1_design_grooves_widths;
            grooveSurfaces1 = state.ring_1_design_grooves_surfaces;
            grooveAlignments1 = state.ring_1_design_grooves_alignments;
            groovePositions1 = state.ring_1_design_grooves_positions;
            grooveSines1 = state.ring_1_design_grooves_sines;
            grooveSineHeights1 = state.ring_1_design_grooves_sine_heights;
            if (localStorage.getItem('delete1') % 2 === 0) {
                localStorage.setItem('delete1', parseInt(localStorage.getItem('delete1')) + 1);
                if (grooveTypes1.length === 1 || grooveTypes1.length === 0) {
                    return {
                        ...state,
                        ring_1_design_grooves_types: [],
                        ring_1_design_grooves_widths: [],
                        ring_1_design_grooves_surfaces: [],
                        ring_1_design_grooves_alignments: [],
                        ring_1_design_grooves_positions: [],
                        ring_1_design_grooves_sines: [],
                        ring_1_design_grooves_sine_heights: []
                    };
                }
                grooveTypes1.splice(action.payload, 1);
                grooveWidths1.splice(action.payload, 1);
                grooveSurfaces1.splice(action.payload, 1);
                grooveAlignments1.splice(action.payload, 1);
                groovePositions1.splice(action.payload, 1);
                grooveSines1.splice(action.payload, 1);
                grooveSineHeights1.splice(action.payload, 1);
                return {
                    ...state,
                    ring_1_design_grooves_types: grooveTypes1,
                    ring_1_design_grooves_widths: grooveWidths1,
                    ring_1_design_grooves_surfaces: grooveSurfaces1,
                    ring_1_design_grooves_alignments: grooveAlignments1,
                    ring_1_design_grooves_positions: groovePositions1,
                    ring_1_design_grooves_sines: grooveSines1,
                    ring_1_design_grooves_sine_heights: grooveSineHeights1
                };
            } else {
                localStorage.setItem('delete1', parseInt(localStorage.getItem('delete1')) + 1);
                return { ...state };
            }
        case DELETE_RING_2_DESIGN_GROOVE:
            grooveTypes2 = state.ring_2_design_grooves_types;
            grooveWidths2 = state.ring_2_design_grooves_widths;
            grooveSurfaces2 = state.ring_2_design_grooves_surfaces;
            grooveAlignments2 = state.ring_2_design_grooves_alignments;
            groovePositions2 = state.ring_2_design_grooves_positions;
            grooveSines2 = state.ring_2_design_grooves_sines;
            grooveSineHeights2 = state.ring_2_design_grooves_sine_heights;
            if (localStorage.getItem('delete2') % 2 === 0) {
                localStorage.setItem('delete2', parseInt(localStorage.getItem('delete2')) + 1);
                if (grooveTypes2.length === 1 || grooveTypes2.length === 0) {
                    return {
                        ...state,
                        ring_2_design_grooves_types: [],
                        ring_2_design_grooves_widths: [],
                        ring_2_design_grooves_surfaces: [],
                        ring_2_design_grooves_alignments: [],
                        ring_2_design_grooves_positions: [],
                        ring_2_design_grooves_sines: [],
                        ring_2_design_grooves_sine_heights: []
                    };
                }
                grooveTypes2.splice(action.payload, 1);
                grooveWidths2.splice(action.payload, 1);
                grooveSurfaces2.splice(action.payload, 1);
                grooveAlignments2.splice(action.payload, 1);
                groovePositions2.splice(action.payload, 1);
                grooveSines2.splice(action.payload, 1);
                grooveSineHeights2.splice(action.payload, 1);
                return {
                    ...state,
                    ring_2_design_grooves_types: grooveTypes2,
                    ring_2_design_grooves_widths: grooveWidths2,
                    ring_2_design_grooves_surfaces: grooveSurfaces2,
                    ring_2_design_grooves_alignments: grooveAlignments2,
                    ring_2_design_grooves_positions: groovePositions2,
                    ring_2_design_grooves_sines: grooveSines2,
                    ring_2_design_grooves_sine_heights: grooveSineHeights2
                };
            } else {
                localStorage.setItem('delete2', parseInt(localStorage.getItem('delete2')) + 1);
                return { ...state };
            }
        case DELETE_RING_PAIR_ALL:
            return { ...state, ring_1_design_grooves_types: [], ring_1_design_grooves_widths: [], ring_1_design_grooves_surfaces: [], ring_1_design_grooves_alignments: [], ring_1_design_grooves_positions: [], ring_1_design_grooves_sines: [], ring_1_design_grooves_sine_heights: [], ring_2_design_grooves_types: [], ring_2_design_grooves_widths: [], ring_2_design_grooves_surfaces: [], ring_2_design_grooves_alignments: [], ring_2_design_grooves_positions: [], ring_2_design_grooves_sines: [], ring_2_design_grooves_sine_heights: [] };
        case DELETE_RING_1_ALL:
            return { ...state, ring_1_design_grooves_types: [], ring_1_design_grooves_widths: [], ring_1_design_grooves_surfaces: [], ring_1_design_grooves_alignments: [], ring_1_design_grooves_positions: [], ring_1_design_grooves_sines: [], ring_1_design_grooves_sine_heights: [] };
        case DELETE_RING_2_ALL:
            return { ...state, ring_2_design_grooves_types: [], ring_2_design_grooves_widths: [], ring_2_design_grooves_surfaces: [], ring_2_design_grooves_alignments: [], ring_2_design_grooves_positions: [], ring_2_design_grooves_sines: [], ring_2_design_grooves_sine_heights: [] };
        case LOAD_FILE:
            return { ...action.payload };
        default:
            return state;
    }
}