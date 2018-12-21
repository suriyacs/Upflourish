import axios from 'axios/index';

const create = video => axios({
  method: 'post',
  url: '/YTVideos',
  data: {
    learning_path_id: video.learningPathId,
    section_id: video.sectionId,
    title: video.name,
    description: video.about,
    is_playlist: video.isPlaylist,
    link: video.link,
    minutes: video.minutes,
    playlistVideos: video.playList
  }
});

module.exports = {
  create
};
