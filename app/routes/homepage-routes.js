const express = require('express');
const router = express.Router();
const { addTrack,
        getAllData,
        newPlaylist,
        updateTimeValues,
        getSong, 
        newTrackOrder,
        deleteSong,
        deletePlaylist, 
        logoutRequest,
        renderHomepage } = require('../controllers/homepage-controller');

router.get('/', renderHomepage);
router.post('/AddTrack', addTrack);
router.get('/GetAllData', getAllData);
router.post('/NewPlaylist', newPlaylist);
router.post('/UpdateTimeValues', updateTimeValues);
router.post('/GetSong', getSong);
router.post('/NewTrackOrder', newTrackOrder);
router.post('/DeleteSong', deleteSong);
router.post('/DeletePlaylist', deletePlaylist);

module.exports = router;