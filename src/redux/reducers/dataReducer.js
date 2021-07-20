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
    DELETE_RING_PAIR_DESIGN_GROOVE,
    DELETE_RING_1_DESIGN_GROOVE,
    DELETE_RING_2_DESIGN_GROOVE,
    DELETE_RING_PAIR_ALL,
    DELETE_RING_1_ALL,
    DELETE_RING_2_ALL,
    LOAD_FILE
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
    ring_1_diamond_setting: 0,
    ring_2_diamond_setting: 0,
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
    ring_2_design_grooves_types: [],
    ring_2_design_grooves_widths: [],
    ring_2_design_grooves_surfaces: [],
    ring_2_design_grooves_alignments: [],
    ring_2_design_grooves_positions: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_WIZARD:
            localStorage.setItem('state', JSON.stringify({ ...state, wizard: action.payload }));
            return { ...state, wizard: action.payload };
        case SET_DELETE_DESIGN:
            localStorage.setItem('state', JSON.stringify(initialState));
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
            localStorage.setItem('state', JSON.stringify({ ...state, ring: action.payload }));
            return { ...state, ring: action.payload };
        case SET_RING_PAIR_PRICE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_price: action.payload, ring_2_price: action.payload }));
            return { ...state, ring_1_price: action.payload, ring_2_price: action.payload };
        case SET_RING_1_PRICE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_price: action.payload }));
            return { ...state, ring_1_price: action.payload };
        case SET_RING_2_PRICE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_price: action.payload }));
            return { ...state, ring_2_price: action.payload };
        case SET_PAIR_MATERIAL:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_material: action.payload, ring_2_material: action.payload }));
            return { ...state, ring_1_material: action.payload, ring_2_material: action.payload };
        case SET_RING_1_MATERIAL:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_material: action.payload }));
            return { ...state, ring_1_material: action.payload };
        case SET_RING_2_MATERIAL:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_material: action.payload }));
            return { ...state, ring_2_material: action.payload };
        case SET_RING_1_DISABLED:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_disabled: action.payload }));
            return { ...state, ring_1_disabled: action.payload };
        case SET_RING_2_DISABLED:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_disabled: action.payload }));
            return { ...state, ring_2_disabled: action.payload };
        case SET_RING_PAIR_PROFILES:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_profiles: action.payload, ring_2_profiles: action.payload }));
            return { ...state, ring_1_profiles: action.payload, ring_2_profiles: action.payload };
        case SET_RING_PAIR_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_surface: action.payload.surface, ring_2_surface: action.payload.surface }));
            return { ...state, material: action.payload.metal, ring_1_surface: action.payload.surface, ring_2_surface: action.payload.surface };
        case SET_RING_PAIR_METAL:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_metal: action.payload.metals, ring_2_metal: action.payload.metals }));
            return { ...state, material: action.payload.metal, ring_1_metal: action.payload.metals, ring_2_metal: action.payload.metals };
        case SET_RING_PAIR_FINENESS:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_fineness: action.payload.fineness, ring_2_fineness: action.payload.fineness }));
            return { ...state, material: action.payload.metal, ring_1_fineness: action.payload.fineness, ring_2_fineness: action.payload.fineness };
        case SET_RING_PAIR_2_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_2_surface: action.payload.surface, ring_2_2_surface: action.payload.surface }));
            return { ...state, material: action.payload.metal, ring_1_2_surface: action.payload.surface, ring_2_2_surface: action.payload.surface };
        case SET_RING_PAIR_2_METAL:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_2_metal: action.payload.metals, ring_2_2_metal: action.payload.metals }));
            return { ...state, material: action.payload.metal, ring_1_2_metal: action.payload.metals, ring_2_2_metal: action.payload.metals };
        case SET_RING_PAIR_2_FINENESS:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_2_fineness: action.payload.fineness, ring_2_2_fineness: action.payload.fineness }));
            return { ...state, material: action.payload.metal, ring_1_2_fineness: action.payload.fineness, ring_2_2_fineness: action.payload.fineness };
        case SET_RING_PAIR_3_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_3_surface: action.payload.surface, ring_2_3_surface: action.payload.surface }));
            return { ...state, material: action.payload.metal, ring_1_3_surface: action.payload.surface, ring_2_3_surface: action.payload.surface };
        case SET_RING_PAIR_3_METAL:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_3_metal: action.payload.metals, ring_2_3_metal: action.payload.metals }));
            return { ...state, material: action.payload.metal, ring_1_3_metal: action.payload.metals, ring_2_3_metal: action.payload.metals };
        case SET_RING_PAIR_3_FINENESS:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_3_fineness: action.payload.fineness, ring_2_3_fineness: action.payload.fineness }));
            return { ...state, material: action.payload.metal, ring_1_3_fineness: action.payload.fineness, ring_2_3_fineness: action.payload.fineness };
        case SET_RING_PAIR_WAVE_HEIGHT:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_wave_height: action.payload.height, ring_2_wave_height: action.payload.height }));
            return { ...state, material: action.payload.metal, ring_1_wave_height: action.payload.height, ring_2_wave_height: action.payload.height };
        case SET_RING_PAIR_NUMBER_OF_WAVES:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_number_of_waves: action.payload.num, ring_2_number_of_waves: action.payload.num }));
            return { ...state, material: action.payload.metal, ring_1_number_of_waves: action.payload.num, ring_2_number_of_waves: action.payload.num };
        case SET_RING_1_PROFILES:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_profiles: action.payload }));
            return { ...state, ring_1_profiles: action.payload };
        case SET_RING_1_SIZE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_size: action.payload }));
            return { ...state, ring_1_size: action.payload };
        case SET_RING_1_TYPE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_type: action.payload }));
            return { ...state, ring_1_type: action.payload };
        case SET_RING_1_WIDTH:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_width: action.payload }));
            return { ...state, ring_1_width: action.payload };
        case SET_RING_1_HEIGHT:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_height: action.payload }));
            return { ...state, ring_1_height: action.payload };
        case SET_RING_1_METAL:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_metal: action.payload.metals }));
            return { ...state, material: action.payload.metal, ring_1_metal: action.payload.metals };
        case SET_RING_1_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_surface: action.payload.surface }));
            return { ...state, material: action.payload.metal, ring_1_surface: action.payload.surface };
        case SET_RING_1_FINENESS:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_fineness: action.payload.fineness }));
            return { ...state, material: action.payload.metal, ring_1_fineness: action.payload.fineness };
        case SET_RING_1_2_METAL:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_2_metal: action.payload.metals }));
            return { ...state, material: action.payload.metal, ring_1_2_metal: action.payload.metals };
        case SET_RING_1_2_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_2_surface: action.payload.surface }));
            return { ...state, material: action.payload.metal, ring_1_2_surface: action.payload.surface };
        case SET_RING_1_2_FINENESS:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_2_fineness: action.payload.fineness }));
            return { ...state, material: action.payload.metal, ring_1_2_fineness: action.payload.fineness };
        case SET_RING_1_3_METAL:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_3_metal: action.payload.metals }));
            return { ...state, material: action.payload.metal, ring_1_3_metal: action.payload.metals };
        case SET_RING_1_3_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_3_surface: action.payload.surface }));
            return { ...state, material: action.payload.metal, ring_1_3_surface: action.payload.surface };
        case SET_RING_1_3_FINENESS:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_3_fineness: action.payload.fineness }));
            return { ...state, material: action.payload.metal, ring_1_3_fineness: action.payload.fineness };
        case SET_RING_1_WAVE_HEIGHT:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_wave_height: action.payload.height }));
            return { ...state, material: action.payload.metal, ring_1_wave_height: action.payload.height };
        case SET_RING_1_NUMBER_OF_WAVES:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_1_number_of_waves: action.payload.num }));
            return { ...state, material: action.payload.metal, ring_1_number_of_waves: action.payload.num };
        case SET_RING_2_PROFILES:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_profiles: action.payload }));
            return { ...state, ring_2_profiles: action.payload };
        case SET_RING_2_SIZE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_size: action.payload }));
            return { ...state, ring_2_size: action.payload };
        case SET_RING_2_TYPE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_type: action.payload }));
            return { ...state, ring_2_type: action.payload };
        case SET_RING_2_WIDTH:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_width: action.payload }));
            return { ...state, ring_2_width: action.payload };
        case SET_RING_2_HEIGHT:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_height: action.payload }));
            return { ...state, ring_2_height: action.payload };
        case SET_RING_2_METAL:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_2_metal: action.payload.metals }));
            return { ...state, material: action.payload.metal, ring_2_metal: action.payload.metals };
        case SET_RING_2_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_2_surface: action.payload.surface }));
            return { ...state, material: action.payload.metal, ring_2_surface: action.payload.surface };
        case SET_RING_2_FINENESS:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_2_fineness: action.payload.fineness }));
            return { ...state, material: action.payload.metal, ring_2_fineness: action.payload.fineness };
        case SET_RING_2_2_METAL:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_2_2_metal: action.payload.metals }));
            return { ...state, material: action.payload.metal, ring_2_2_metal: action.payload.metals };
        case SET_RING_2_2_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_2_2_surface: action.payload.surface }));
            return { ...state, material: action.payload.metal, ring_2_2_surface: action.payload.surface };
        case SET_RING_2_2_FINENESS:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_2_2_fineness: action.payload.fineness }));
            return { ...state, material: action.payload.metal, ring_2_2_fineness: action.payload.fineness };
        case SET_RING_2_3_METAL:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_2_3_metal: action.payload.metals }));
            return { ...state, material: action.payload.metal, ring_2_3_metal: action.payload.metals };
        case SET_RING_2_3_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_2_3_surface: action.payload.surface }));
            return { ...state, material: action.payload.metal, ring_2_3_surface: action.payload.surface };
        case SET_RING_2_3_FINENESS:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_2_3_fineness: action.payload.fineness }));
            return { ...state, material: action.payload.metal, ring_2_3_fineness: action.payload.fineness };
        case SET_RING_2_WAVE_HEIGHT:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_2_wave_height: action.payload.height }));
            return { ...state, material: action.payload.metal, ring_2_wave_height: action.payload.height };
        case SET_RING_2_NUMBER_OF_WAVES:
            localStorage.setItem('state', JSON.stringify({ ...state, material: action.payload.metal, ring_2_number_of_waves: action.payload.num }));
            return { ...state, material: action.payload.metal, ring_2_number_of_waves: action.payload.num };
        case SET_RING_PAIR_LEFT_EDGE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_left_edge: action.payload, ring_2_left_edge: action.payload }));
            return { ...state, ring_1_left_edge: action.payload, ring_2_left_edge: action.payload };
        case SET_RING_PAIR_RIGHT_EDGE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_right_edge: action.payload, ring_2_right_edge: action.payload }));
            return { ...state, ring_1_right_edge: action.payload, ring_2_right_edge: action.payload };
        case SET_RING_1_LEFT_EDGE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_left_edge: action.payload }));
            return { ...state, ring_1_left_edge: action.payload };
        case SET_RING_1_RIGHT_EDGE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_right_edge: action.payload }));
            return { ...state, ring_1_right_edge: action.payload };
        case SET_RING_2_LEFT_EDGE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_left_edge: action.payload }));
            return { ...state, ring_2_left_edge: action.payload };
        case SET_RING_2_RIGHT_EDGE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_right_edge: action.payload }));
            return { ...state, ring_2_right_edge: action.payload };
        case SET_RING_PAIR_LEFT_WIDTH:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_left_width: action.payload, ring_2_left_width: action.payload }));
            return { ...state, ring_1_left_width: action.payload, ring_2_left_width: action.payload };
        case SET_RING_PAIR_LEFT_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_left_surface: action.payload, ring_2_left_surface: action.payload }));
            return { ...state, ring_1_left_surface: action.payload, ring_2_left_surface: action.payload };
        case SET_RING_PAIR_RIGHT_WIDTH:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_right_width: action.payload, ring_2_right_width: action.payload }));
            return { ...state, ring_1_right_width: action.payload, ring_2_right_width: action.payload };
        case SET_RING_PAIR_RIGHT_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_right_surface: action.payload, ring_2_right_surface: action.payload }));
            return { ...state, ring_1_right_surface: action.payload, ring_2_right_surface: action.payload };
        case SET_RING_1_LEFT_WIDTH:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_left_width: action.payload }));
            return { ...state, ring_1_left_width: action.payload };
        case SET_RING_1_LEFT_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_left_surface: action.payload }));
            return { ...state, ring_1_left_surface: action.payload };
        case SET_RING_1_RIGHT_WIDTH:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_right_width: action.payload }));
            return { ...state, ring_1_right_width: action.payload };
        case SET_RING_1_RIGHT_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_right_surface: action.payload }));
            return { ...state, ring_1_right_surface: action.payload };
        case SET_RING_2_LEFT_WIDTH:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_left_width: action.payload }));
            return { ...state, ring_2_left_width: action.payload };
        case SET_RING_2_LEFT_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_left_surface: action.payload }));
            return { ...state, ring_2_left_surface: action.payload };
        case SET_RING_2_RIGHT_WIDTH:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_right_width: action.payload }));
            return { ...state, ring_2_right_width: action.payload };
        case SET_RING_2_RIGHT_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_right_surface: action.payload }));
            return { ...state, ring_2_right_surface: action.payload };
        case SET_RING_PAIR_DIAMOND_SETTING:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_diamond_setting: action.payload, ring_1_diamond_cut: 0, ring_1_diamond_size: 0, ring_1_diamond_quality: 0, ring_1_number_of_stones: 3, ring_1_rows: 0, ring_1_position: 1, ring_2_diamond_setting: action.payload, ring_2_diamond_cut: 0, ring_2_diamond_size: 0, ring_2_diamond_quality: 0, ring_2_number_of_stones: 3, ring_2_position: 1 }));
            return { ...state, ring_1_diamond_setting: action.payload, ring_1_diamond_cut: 0, ring_1_diamond_size: 0, ring_1_diamond_quality: 0, ring_1_number_of_stones: 3, ring_1_rows: 0, ring_1_position: 1, ring_2_diamond_setting: action.payload, ring_2_diamond_cut: 0, ring_2_diamond_size: 0, ring_2_diamond_quality: 0, ring_2_number_of_stones: 3, ring_2_position: 1 };
        case SET_RING_1_DIAMOND_SETTING:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_diamond_setting: action.payload, ring_1_diamond_cut: 0, ring_1_diamond_size: 0, ring_1_diamond_quality: 0, ring_1_number_of_stones: 3, ring_1_rows: 0, ring_1_position: 1 }));
            return { ...state, ring_1_diamond_setting: action.payload, ring_1_diamond_cut: 0, ring_1_diamond_size: 0, ring_1_diamond_quality: 0, ring_1_number_of_stones: 3, ring_1_rows: 0, ring_1_position: 1 };
        case SET_RING_2_DIAMOND_SETTING:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_diamond_setting: action.payload, ring_2_diamond_cut: 0, ring_2_diamond_size: 0, ring_2_diamond_quality: 0, ring_2_number_of_stones: 3, ring_2_rows: 0, ring_2_position: 1 }));
            return { ...state, ring_2_diamond_setting: action.payload, ring_2_diamond_cut: 0, ring_2_diamond_size: 0, ring_2_diamond_quality: 0, ring_2_number_of_stones: 3, ring_2_rows: 0, ring_2_position: 1 };
        case SET_RING_PAIR_DIAMOND_CUT:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_diamond_cut: action.payload, ring_2_diamond_cut: action.payload }));
            return { ...state, ring_1_diamond_cut: action.payload, ring_2_diamond_cut: action.payload };
        case SET_RING_1_DIAMOND_CUT:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_diamond_cut: action.payload }));
            return { ...state, ring_1_diamond_cut: action.payload };
        case SET_RING_2_DIAMOND_CUT:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_diamond_cut: action.payload }));
            return { ...state, ring_2_diamond_cut: action.payload };
        case SET_RING_PAIR_DIAMOND_SIZE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_diamond_size: action.payload, ring_2_diamond_size: action.payload }));
            return { ...state, ring_1_diamond_size: action.payload, ring_2_diamond_size: action.payload };
        case SET_RING_1_DIAMOND_SIZE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_diamond_size: action.payload }));
            return { ...state, ring_1_diamond_size: action.payload };
        case SET_RING_2_DIAMOND_SIZE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_diamond_size: action.payload }));
            return { ...state, ring_2_diamond_size: action.payload };
        case SET_RING_PAIR_DIAMOND_QUALITY:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_diamond_quality: action.payload, ring_2_diamond_quality: action.payload }));
            return { ...state, ring_1_diamond_quality: action.payload, ring_2_diamond_quality: action.payload };
        case SET_RING_1_DIAMOND_QUALITY:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_diamond_quality: action.payload }));
            return { ...state, ring_1_diamond_quality: action.payload };
        case SET_RING_2_DIAMOND_QUALITY:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_diamond_quality: action.payload }));
            return { ...state, ring_2_diamond_quality: action.payload };
        case SET_RING_PAIR_NUM_OF_STONES:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_number_of_stones: action.payload, ring_2_number_of_stones: action.payload }));
            return { ...state, ring_1_number_of_stones: action.payload, ring_2_number_of_stones: action.payload };
        case SET_RING_1_NUM_OF_STONES:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_number_of_stones: action.payload }));
            return { ...state, ring_1_number_of_stones: action.payload };
        case SET_RING_2_NUM_OF_STONES:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_number_of_stones: action.payload }));
            return { ...state, ring_2_number_of_stones: action.payload };
        case SET_RING_PAIR_ROWS:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_rows: action.payload, ring_2_rows: action.payload }));
            return { ...state, ring_1_rows: action.payload, ring_2_rows: action.payload };
        case SET_RING_1_ROWS:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_rows: action.payload }));
            return { ...state, ring_1_rows: action.payload };
        case SET_RING_2_ROWS:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_rows: action.payload }));
            return { ...state, ring_2_rows: action.payload };
        case SET_RING_PAIR_POSITION:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_position: action.payload, ring_2_position: action.payload }));
            return { ...state, ring_1_position: action.payload, ring_2_position: action.payload };
        case SET_RING_1_POSITION:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_position: action.payload }));
            return { ...state, ring_1_position: action.payload };
        case SET_RING_2_POSITION:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_position: action.payload }));
            return { ...state, ring_2_position: action.payload };
        case SET_RING_PAIR_ENGRAVING_TEXT:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_engraving_text: action.payload, ring_2_engraving_text: action.payload }));
            return { ...state, ring_1_engraving_text: action.payload, ring_2_engraving_text: action.payload };
        case SET_RING_1_ENGRAVING_TEXT:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_engraving_text: action.payload }));
            return { ...state, ring_1_engraving_text: action.payload };
        case SET_RING_2_ENGRAVING_TEXT:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_engraving_text: action.payload }));
            return { ...state, ring_2_engraving_text: action.payload };
        case SET_RING_PAIR_ENGRAVING_FONT:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_engraving_font: action.payload, ring_2_engraving_font: action.payload }));
            return { ...state, ring_1_engraving_font: action.payload, ring_2_engraving_font: action.payload };
        case SET_RING_1_ENGRAVING_FONT:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_engraving_font: action.payload }));
            return { ...state, ring_1_engraving_font: action.payload };
        case SET_RING_2_ENGRAVING_FONT:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_engraving_font: action.payload }));
            return { ...state, ring_2_engraving_font: action.payload };
        case SET_RING_PAIR_GROOVE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_groove: action.payload, ring_2_groove: action.payload }));
            return { ...state, ring_1_groove: action.payload, ring_2_groove: action.payload };
        case SET_RING_1_GROOVE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_groove: action.payload }));
            return { ...state, ring_1_groove: action.payload };
        case SET_RING_2_GROOVE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_groove: action.payload }));
            return { ...state, ring_2_groove: action.payload };
        case SET_RING_PAIR_GROOVE_WIDTH:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_groove_width: action.payload, ring_2_groove_width: action.payload }));
            return { ...state, ring_1_groove_width: action.payload, ring_2_groove_width: action.payload };
        case SET_RING_1_GROOVE_WIDTH:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_groove_width: action.payload }));
            return { ...state, ring_1_groove_width: action.payload };
        case SET_RING_2_GROOVE_WIDTH:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_groove_width: action.payload }));
            return { ...state, ring_2_groove_width: action.payload };
        case SET_RING_PAIR_GROOVE_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_groove_surface: action.payload, ring_2_groove_surface: action.payload }));
            return { ...state, ring_1_groove_surface: action.payload, ring_2_groove_surface: action.payload };
        case SET_RING_1_GROOVE_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_groove_surface: action.payload }));
            return { ...state, ring_1_groove_surface: action.payload };
        case SET_RING_2_GROOVE_SURFACE:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_groove_surface: action.payload }));
            return { ...state, ring_2_groove_surface: action.payload };
        case SET_RING_PAIR_DESIGN_GROOVES_TYPES:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_types: [...state.ring_1_design_grooves_types, action.payload], ring_2_design_grooves_types: [...state.ring_2_design_grooves_types, action.payload] }));
            return { ...state, ring_1_design_grooves_types: [...state.ring_1_design_grooves_types, action.payload], ring_2_design_grooves_types: [...state.ring_2_design_grooves_types, action.payload] };
        case SET_RING_PAIR_DESIGN_GROOVES_WIDTHS:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_widths: [...state.ring_1_design_grooves_widths, action.payload], ring_2_design_grooves_widths: [...state.ring_2_design_grooves_widths, action.payload] }));
            return { ...state, ring_1_design_grooves_widths: [...state.ring_1_design_grooves_widths, action.payload], ring_2_design_grooves_widths: [...state.ring_2_design_grooves_widths, action.payload] };
        case SET_RING_PAIR_DESIGN_GROOVES_SURFACES:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_surfaces: [...state.ring_1_design_grooves_surfaces, action.payload], ring_2_design_grooves_surfaces: [...state.ring_2_design_grooves_surfaces, action.payload] }));
            return { ...state, ring_1_design_grooves_surfaces: [...state.ring_1_design_grooves_surfaces, action.payload], ring_2_design_grooves_surfaces: [...state.ring_2_design_grooves_surfaces, action.payload] };
        case SET_RING_PAIR_DESIGN_GROOVES_ALIGNMENTS:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_alignments: [...state.ring_1_design_grooves_alignments, action.payload], ring_2_design_grooves_alignments: [...state.ring_2_design_grooves_alignments, action.payload] }));
            return { ...state, ring_1_design_grooves_alignments: [...state.ring_1_design_grooves_alignments, action.payload], ring_2_design_grooves_alignments: [...state.ring_2_design_grooves_alignments, action.payload] };
        case SET_RING_PAIR_DESIGN_GROOVES_POSITIONS:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_positions: [...state.ring_1_design_grooves_positions, action.payload], ring_2_design_grooves_positions: [...state.ring_2_design_grooves_positions, action.payload] }));
            return { ...state, ring_1_design_grooves_positions: [...state.ring_1_design_grooves_positions, action.payload], ring_2_design_grooves_positions: [...state.ring_2_design_grooves_positions, action.payload] };
        case SET_RING_1_DESIGN_GROOVES_TYPES:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_types: [...state.ring_1_design_grooves_types, action.payload] }));
            return { ...state, ring_1_design_grooves_types: [...state.ring_1_design_grooves_types, action.payload] };
        case SET_RING_1_DESIGN_GROOVES_WIDTHS:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_widths: [...state.ring_1_design_grooves_widths, action.payload] }));
            return { ...state, ring_1_design_grooves_widths: [...state.ring_1_design_grooves_widths, action.payload] };
        case SET_RING_1_DESIGN_GROOVES_SURFACES:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_surfaces: [...state.ring_1_design_grooves_surfaces, action.payload] }));
            return { ...state, ring_1_design_grooves_surfaces: [...state.ring_1_design_grooves_surfaces, action.payload] };
        case SET_RING_1_DESIGN_GROOVES_ALIGNMENTS:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_alignments: [...state.ring_1_design_grooves_alignments, action.payload] }));
            return { ...state, ring_1_design_grooves_alignments: [...state.ring_1_design_grooves_alignments, action.payload] };
        case SET_RING_1_DESIGN_GROOVES_POSITIONS:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_positions: [...state.ring_1_design_grooves_positions, action.payload] }));
            return { ...state, ring_1_design_grooves_positions: [...state.ring_1_design_grooves_positions, action.payload] };
        case SET_RING_2_DESIGN_GROOVES_TYPES:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_design_grooves_types: [...state.ring_2_design_grooves_types, action.payload] }));
            return { ...state, ring_2_design_grooves_types: [...state.ring_2_design_grooves_types, action.payload] };
        case SET_RING_2_DESIGN_GROOVES_WIDTHS:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_design_grooves_widths: [...state.ring_2_design_grooves_widths, action.payload] }));
            return { ...state, ring_2_design_grooves_widths: [...state.ring_2_design_grooves_widths, action.payload] };
        case SET_RING_2_DESIGN_GROOVES_SURFACES:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_design_grooves_surfaces: [...state.ring_2_design_grooves_surfaces, action.payload] }));
            return { ...state, ring_2_design_grooves_surfaces: [...state.ring_2_design_grooves_surfaces, action.payload] };
        case SET_RING_2_DESIGN_GROOVES_ALIGNMENTS:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_design_grooves_alignments: [...state.ring_2_design_grooves_alignments, action.payload] }));
            return { ...state, ring_2_design_grooves_alignments: [...state.ring_2_design_grooves_alignments, action.payload] };
        case SET_RING_2_DESIGN_GROOVES_POSITIONS:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_design_grooves_positions: [...state.ring_2_design_grooves_positions, action.payload] }));
            return { ...state, ring_2_design_grooves_positions: [...state.ring_2_design_grooves_positions, action.payload] };
        case SET_RING_PAIR_DESIGN_GROOVE_ADD:
            localStorage.getItem('state', JSON.stringify({ ...state, ring_1_design_grooves_types: [...state.ring_1_design_grooves_types, action.payload], ring_1_design_grooves_widths: [...state.ring_1_design_grooves_widths, 0], ring_1_design_grooves_surfaces: [...state.ring_1_design_grooves_surfaces, 0], ring_1_design_grooves_alignments: [...state.ring_1_design_grooves_alignments, 0], ring_1_design_grooves_positions: [...state.ring_1_design_grooves_positions, 1.17], ring_2_design_grooves_types: [...state.ring_2_design_grooves_types, action.payload], ring_2_design_grooves_widths: [...state.ring_2_design_grooves_widths, 0], ring_2_design_grooves_surfaces: [...state.ring_2_design_grooves_surfaces, 0], ring_2_design_grooves_alignments: [...state.ring_2_design_grooves_alignments, 0], ring_2_design_grooves_positions: [...state.ring_2_design_grooves_positions, 1.17] }));
            return { ...state, ring_1_design_grooves_types: [...state.ring_1_design_grooves_types, action.payload], ring_1_design_grooves_widths: [...state.ring_1_design_grooves_widths, 0], ring_1_design_grooves_surfaces: [...state.ring_1_design_grooves_surfaces, 0], ring_1_design_grooves_alignments: [...state.ring_1_design_grooves_alignments, 0], ring_1_design_grooves_positions: [...state.ring_1_design_grooves_positions, 1.17], ring_2_design_grooves_types: [...state.ring_2_design_grooves_types, action.payload], ring_2_design_grooves_widths: [...state.ring_2_design_grooves_widths, 0], ring_2_design_grooves_surfaces: [...state.ring_2_design_grooves_surfaces, 0], ring_2_design_grooves_alignments: [...state.ring_2_design_grooves_alignments, 0], ring_2_design_grooves_positions: [...state.ring_2_design_grooves_positions, 1.17] };
        case SET_RING_1_DESIGN_GROOVE_ADD:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_types: [...state.ring_1_design_grooves_types, action.payload], ring_1_design_grooves_widths: [...state.ring_1_design_grooves_widths, 0], ring_1_design_grooves_surfaces: [...state.ring_1_design_grooves_surfaces, 0], ring_1_design_grooves_alignments: [...state.ring_1_design_grooves_alignments, 0], ring_1_design_grooves_positions: [...state.ring_1_design_grooves_positions, 1.17] }));
            return { ...state, ring_1_design_grooves_types: [...state.ring_1_design_grooves_types, action.payload], ring_1_design_grooves_widths: [...state.ring_1_design_grooves_widths, 0], ring_1_design_grooves_surfaces: [...state.ring_1_design_grooves_surfaces, 0], ring_1_design_grooves_alignments: [...state.ring_1_design_grooves_alignments, 0], ring_1_design_grooves_positions: [...state.ring_1_design_grooves_positions, 1.17] };
        case SET_RING_2_DESIGN_GROOVE_ADD:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_design_grooves_types: [...state.ring_2_design_grooves_types, action.payload], ring_2_design_grooves_widths: [...state.ring_2_design_grooves_widths, 0], ring_2_design_grooves_surfaces: [...state.ring_2_design_grooves_surfaces, 0], ring_2_design_grooves_alignments: [...state.ring_2_design_grooves_alignments, 0], ring_2_design_grooves_positions: [...state.ring_2_design_grooves_positions, 1.17] }));
            return { ...state, ring_2_design_grooves_types: [...state.ring_2_design_grooves_types, action.payload], ring_2_design_grooves_widths: [...state.ring_2_design_grooves_widths, 0], ring_2_design_grooves_surfaces: [...state.ring_2_design_grooves_surfaces, 0], ring_2_design_grooves_alignments: [...state.ring_2_design_grooves_alignments, 0], ring_2_design_grooves_positions: [...state.ring_2_design_grooves_positions, 1.17] };
        case UPDATE_RING_PAIR_DESIGN_GROOVES_TYPES:
            state.ring_1_design_grooves_types[action.payload.index] = action.payload.type;
            state.ring_2_design_grooves_types[action.payload.index] = action.payload.type;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_PAIR_DESIGN_GROOVES_WIDTHS:
            state.ring_1_design_grooves_widths[action.payload.index] = action.payload.width;
            state.ring_2_design_grooves_widths[action.payload.index] = action.payload.width;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_PAIR_DESIGN_GROOVES_SURFACES:
            state.ring_1_design_grooves_surfaces[action.payload.index] = action.payload.surface;
            state.ring_2_design_grooves_surfaces[action.payload.index] = action.payload.surface;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_PAIR_DESIGN_GROOVES_ALIGNMENTS:
            state.ring_1_design_grooves_alignments[action.payload.index] = action.payload.alignment;
            state.ring_2_design_grooves_alignments[action.payload.index] = action.payload.alignment;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_PAIR_DESIGN_GROOVES_POSITIONS:
            state.ring_1_design_grooves_positions[action.payload.index] = action.payload.position;
            state.ring_2_design_grooves_positions[action.payload.index] = action.payload.position;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_1_DESIGN_GROOVES_TYPES:
            state.ring_1_design_grooves_types[action.payload.index] = action.payload.type;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_1_DESIGN_GROOVES_WIDTHS:
            state.ring_1_design_grooves_widths[action.payload.index] = action.payload.width;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_1_DESIGN_GROOVES_SURFACES:
            state.ring_1_design_grooves_surfaces[action.payload.index] = action.payload.surface;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_1_DESIGN_GROOVES_ALIGNMENTS:
            state.ring_1_design_grooves_alignments[action.payload.index] = action.payload.alignment;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_1_DESIGN_GROOVES_POSITIONS:
            state.ring_1_design_grooves_positions[action.payload.index] = action.payload.position;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_2_DESIGN_GROOVES_TYPES:
            state.ring_2_design_grooves_types[action.payload.index] = action.payload.type;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_2_DESIGN_GROOVES_WIDTHS:
            state.ring_2_design_grooves_widths[action.payload.index] = action.payload.width;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_2_DESIGN_GROOVES_SURFACES:
            state.ring_2_design_grooves_surfaces[action.payload.index] = action.payload.surface;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_2_DESIGN_GROOVES_ALIGNMENTS:
            state.ring_2_design_grooves_alignments[action.payload.index] = action.payload.alignment;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case UPDATE_RING_2_DESIGN_GROOVES_POSITIONS:
            state.ring_2_design_grooves_positions[action.payload.index] = action.payload.position;
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case DELETE_RING_PAIR_DESIGN_GROOVE:
            state.ring_1_design_grooves_types.splice(action.payload, 1);
            state.ring_1_design_grooves_widths.splice(action.payload, 1);
            state.ring_1_design_grooves_surfaces.splice(action.payload, 1);
            state.ring_1_design_grooves_alignments.splice(action.payload, 1);
            state.ring_1_design_grooves_positions.splice(action.payload, 1);
            state.ring_2_design_grooves_types.splice(action.payload, 1);
            state.ring_2_design_grooves_widths.splice(action.payload, 1);
            state.ring_2_design_grooves_surfaces.splice(action.payload, 1);
            state.ring_2_design_grooves_alignments.splice(action.payload, 1);
            state.ring_2_design_grooves_positions.splice(action.payload, 1);
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case DELETE_RING_1_DESIGN_GROOVE:
            state.ring_1_design_grooves_types.splice(action.payload, 1);
            state.ring_1_design_grooves_widths.splice(action.payload, 1);
            state.ring_1_design_grooves_surfaces.splice(action.payload, 1);
            state.ring_1_design_grooves_alignments.splice(action.payload, 1);
            state.ring_1_design_grooves_positions.splice(action.payload, 1);
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case DELETE_RING_2_DESIGN_GROOVE:
            state.ring_2_design_grooves_types.splice(action.payload, 1);
            state.ring_2_design_grooves_widths.splice(action.payload, 1);
            state.ring_2_design_grooves_surfaces.splice(action.payload, 1);
            state.ring_2_design_grooves_alignments.splice(action.payload, 1);
            state.ring_2_design_grooves_positions.splice(action.payload, 1);
            localStorage.setItem('state', JSON.stringify(state));
            return state;
        case DELETE_RING_PAIR_ALL:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_types: [], ring_1_design_grooves_widths: [], ring_1_design_grooves_surfaces: [], ring_1_design_grooves_alignments: [], ring_1_design_grooves_positions: [], ring_2_design_grooves_types: [], ring_2_design_grooves_widths: [], ring_2_design_grooves_surfaces: [], ring_2_design_grooves_alignments: [], ring_2_design_grooves_positions: [] }));
            return { ...state, ring_1_design_grooves_types: [], ring_1_design_grooves_widths: [], ring_1_design_grooves_surfaces: [], ring_1_design_grooves_alignments: [], ring_1_design_grooves_positions: [], ring_2_design_grooves_types: [], ring_2_design_grooves_widths: [], ring_2_design_grooves_surfaces: [], ring_2_design_grooves_alignments: [], ring_2_design_grooves_positions: [] };
        case DELETE_RING_1_ALL:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_1_design_grooves_types: [], ring_1_design_grooves_widths: [], ring_1_design_grooves_surfaces: [], ring_1_design_grooves_alignments: [], ring_1_design_grooves_positions: [] }));
            return { ...state, ring_1_design_grooves_types: [], ring_1_design_grooves_widths: [], ring_1_design_grooves_surfaces: [], ring_1_design_grooves_alignments: [], ring_1_design_grooves_positions: [] };
        case DELETE_RING_2_ALL:
            localStorage.setItem('state', JSON.stringify({ ...state, ring_2_design_grooves_types: [], ring_2_design_grooves_widths: [], ring_2_design_grooves_surfaces: [], ring_2_design_grooves_alignments: [], ring_2_design_grooves_positions: [] }));
            return { ...state, ring_2_design_grooves_types: [], ring_2_design_grooves_widths: [], ring_2_design_grooves_surfaces: [], ring_2_design_grooves_alignments: [], ring_2_design_grooves_positions: [] };
        case LOAD_FILE:
            return { ...action.payload };
        default:
            localStorage.setItem('state', JSON.stringify(state));
            return state;
    }
}