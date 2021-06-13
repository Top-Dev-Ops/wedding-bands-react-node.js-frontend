import React from 'react';

import PropTypes from 'prop-types';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setRingPairProfiles, setRing1Profiles, setRing2Profiles } from '../../redux/actions';

import { profiles } from '../../assets/variables';

export default function ProfilesControl({ control }) {
    const { data } = control;

    // redux state
    const _state = useSelector(state => state);
    const dispatch = useDispatch();

    const { ring, ring_1_profiles, ring_2_profiles } = _state.data;
    const selected_profile = ring === 'pair' || ring === 'ring_1' ? ring_1_profiles : ring_2_profiles;

    function handleClick(event) {
        if (ring === 'pair') { dispatch(setRingPairProfiles(event.target.id)); }
        else if (ring === 'ring_1') { dispatch(setRing1Profiles(event.target.id)); }
        else { dispatch(setRing2Profiles(event.target.id)); }
    }

    return (
        <article id={data} className={`profile-control ${selected_profile === data && 'active'}`} onClick={handleClick}>
            <div id={data} className="profile-control-img-container">
                <div id={data} className="profile-control-label">{data}</div>
                <ImageComponent id={data} data={data} />
            </div>
        </article>
    );
}

function ImageComponent({ data }) {
    return (
        <img id={data} src={profiles[data.charCodeAt(0) - 65]} alt="single control" />
    );
}

ProfilesControl.propTypes = {
    control: PropTypes.object.isRequired,
}
