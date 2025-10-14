import profile from "./profile";
const APIEndpoints = {
    upload_file: `${profile.getBaseUrl()}/upload-file/`,
    get_all_Video: `${profile.getBaseUrl()}/list-videos/`,
    get_Upload_Status: `${profile.getBaseUrl()}//video-status/?video_id={id}`,
    Promot_Api: `${profile.getBaseUrl()}/open-ended-analysis/?video_id={Video_Id}&prompt={Prompt}`,
    video_status: `${profile.getBaseUrl()}/video-status/`,
    download_video: `${profile.getBaseUrl()}/download-video/?video_id={Video_Id}`,
};
export default APIEndpoints;