import profile from "./profile";
const APIEndpoints = {
    upload_file: `${profile.getBaseUrl()}/upload-file/`,
    get_all_reports: `${profile.getBaseUrl()}/all-reports/`,
    get_report_by_id: `${profile.getBaseUrl()}/report/?video_id={id}`,
    delete_report_by_id: `${profile.getBaseUrl()}/report/?video_id={id}`,
    get_Upload_Status: `${profile.getBaseUrl()}//video-status/?video_id={id}`,
    Promot_Api: `${profile.getBaseUrl()}/open-ended-analysis/?video_index_id={Video_Id}&prompt={Prompt}`,
};
export default APIEndpoints;