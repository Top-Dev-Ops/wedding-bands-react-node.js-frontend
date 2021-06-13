import two_1 from './img/two_colors_1.png';
import two_2 from './img/two_colors_2.png';
import two_3 from './img/two_colors_3.png';
import two_4 from './img/two_colors_4.png';
import two_5 from './img/two_colors_5.png';
import two_6 from './img/two_colors_6.png';
import three_1 from './img/three_colors_1.png';
import three_2 from './img/three_colors_2.png';
import three_3 from './img/three_colors_3.png';
import three_4 from './img/three_colors_4.png';
import three_5 from './img/three_colors_5.png';
import three_6 from './img/three_colors_6.png';
import three_7 from './img/three_colors_7.png';
import color_0 from './img/colors/yellow_gold.png';
import color_1 from './img/colors/apricot_gold.png';
import color_2 from './img/colors/red_gold.png';
import color_3 from './img/colors/gray_gold.png';
import color_4 from './img/colors/white_gold.png';
import color_5 from './img/colors/palladium.png';
import color_6 from './img/colors/platinum.png';
import material_0 from './img/materials/polished.png';
import material_1 from './img/materials/matt_finish.png';
import material_2 from './img/materials/exclusive_matt.png';
import material_3 from './img/materials/fine_matt.png';
import material_4 from './img/materials/bark.png';
import material_5 from './img/materials/cross_matt.png';
import material_6 from './img/materials/rubbed_matt.png';
import material_7 from './img/materials/rough_bark.png';
import A from './img/profiles/A.png';
import B from './img/profiles/B.png';
import C from './img/profiles/C.png';
import D from './img/profiles/D.png';
import E from './img/profiles/E.png';
import F from './img/profiles/F.png';
import G from './img/profiles/G.png';
import H from './img/profiles/H.png';
import I from './img/profiles/I.png';
import J from './img/profiles/J.png';
import K from './img/profiles/K.png';
import L from './img/profiles/L.png';
import M from './img/profiles/M.png';
import N from './img/profiles/N.png';
import O from './img/profiles/O.png';
import edge_0 from './img/edges/none_left.png';
import edge_1 from './img/edges/edge_left.png';
import edge_2 from './img/edges/carbon_left.png';
import edge_3 from './img/edges/milgrain_left.png';
import edge_4 from './img/edges/none_right.png';
import edge_5 from './img/edges/edge_right.png';
import edge_6 from './img/edges/carbon_right.png';
import edge_7 from './img/edges/milgrain_right.png';
import groove_0 from './img/grooves/u_groove.png';
import groove_1 from './img/grooves/v_groove.png';
import groove_2 from './img/grooves/right_angled_groove.png';
import diamond_0 from './img/diamonds/none.png';
import diamond_1 from './img/diamonds/bezel.png';
import diamond_2 from './img/diamonds/section.png';
import diamond_3 from './img/diamonds/channel.png';
import diamond_4 from './img/diamonds/cross_channel.png';
import diamond_5 from './img/diamonds/free.png';
import diamond_6 from './img/diamonds/side_bezel_left.png';
import diamond_7 from './img/diamonds/side_bezel_right.png';
import diamond_8 from './img/diamonds/side_section_left.png';
import diamond_9 from './img/diamonds/side_section_right.png';
import diamond_10 from './img/diamonds/clamping_open.png';
import diamond_11 from './img/diamonds/zarge.png';
import carbon from './img/grooves/carbon.png';
import milgrain from './img/grooves/milgrain.png';

const wizards = ['profiles', 'dimensions', 'metal', 'grooves', 'diamonds', 'engraving'];

const two_colors_images = [two_1, two_2, two_3, two_4, two_5, two_6];
const three_colors_images = [three_1, three_2, three_3, three_4, three_5, three_6, three_7];
const edges = [edge_0, edge_1, edge_2, edge_3, edge_4, edge_5, edge_6, edge_7];
const grooves = [groove_0, groove_1, groove_2];
const design_grooves = [carbon, milgrain];
const diamonds = [
    { name: 'None', image: diamond_0 },
    { name: 'Rubbed', image: diamond_1 },
    { name: 'Section', image: diamond_2 },
    { name: 'Channel', image: diamond_3 },
    { name: 'Cross channel', image: diamond_4 },
    { name: 'Free', image: diamond_5 },
    { name: 'Rubbed on the side', image: diamond_6 },
    { name: 'Rubbed on the side', image: diamond_7 },
    { name: 'Section on the side', image: diamond_8 },
    { name: 'Section on the side', image: diamond_9 },
    { name: 'Tensionring', image: diamond_10 },
    { name: 'Zarge', image: diamond_11 }
];

const surfaces = [
    { color: 'Yellow gold', image: color_0, value: 0 },
    { color: 'Apricot gold', image: color_1, value: 1 },
    { color: 'Red gold', image: color_2, value: 2 },
    { color: 'Gray gold', image: color_3, value: 3 },
    { color: 'White gold', image: color_4, value: 4 },
    { color: 'Palladium', image: color_5, value: 5 },
    { color: 'Platinum', image: color_6, value: 6 }
];
const metals = [
    { material: 'Polished', image: material_0, value: 0 },
    { material: 'Matt finish', image: material_1, value: 1 },
    { material: 'Exclusive matt', image: material_2, value: 2 },
    { material: 'Fine matt', image: material_3, value: 3 },
    { material: 'Bark', image: material_4, value: 4 },
    { material: 'Cross matt', image: material_5, value: 5 },
    { material: 'Rubbed matt', image: material_6, value: 6 },
    { material: 'Rough bark', image: material_7, value: 7 }
];

const profiles = [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O];

export { wizards, two_colors_images, three_colors_images, surfaces, metals, profiles, edges, grooves, diamonds, design_grooves };