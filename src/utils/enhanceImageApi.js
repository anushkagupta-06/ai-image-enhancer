import axios from 'axios';
const API_KEY = "wxsycztmknktut2dg";
const BASE_URL = "https://techhk.aoscdn.com/";
const MAX_RETRIES = 20;

export const enhancedImageAPI = async(file) => {
    //code to get api and get enhanced image url
    try{
         const taskId = await uploadImage(file);
         console.log("Image Uploaded Successfully, TaskID : ",taskId);

         const enhancedImageData = await PollForEnhancedImage(taskId);
         console.log("Enhanced Image Data : ", enhancedImageData);

         console.log(enhancedImageData);
         return enhancedImageData;
    } catch(error) {
        console.log("Error enhancing image : ",error.message);
    }
};

const uploadImage = async (file) => {
    //code to upload image
    const formData = new FormData();
    formData.append("image_file",file);
    const {data} = await axios.post(`${BASE_URL}/api/tasks/visual/scale`,formData, {headers: {
        "Content-Type" : "multipart/form-data",
        "X-API-KEY" : API_KEY,
    }});
    // "/api/tasks/visual/scale" ----->POST request
    if(!data?.data?.task_id){
        throw new Error("Failed to Upload Image! Task ID not found.");
    }
    return data.data.task_id;
};
const fetchEnhancedImage = async (taskId) => {
    //fetch enhanced image
    const {data} = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`, {headers: {
        "Content-Type" : "multipart/form-data",
        "X-API-KEY" : API_KEY,
    }}); 
    // "/api/tasks/visual/scale/{task_id}" ----->GET request
    if(!data?.data){
        throw new Error("Failed to Enhanced Image! Image not found.");
    }
    return data.data;
};

//function for POLLING
const PollForEnhancedImage = async (taskId, retries=0) => {
    const result = await fetchEnhancedImage(taskId);
    if(result.state === 4){       //for state code=4 there is no image and is on the processing stage
        console.log(`Processing...(${retries}/${MAX_RETRIES})`);
        if(retries>=MAX_RETRIES){
            throw new Error("Max tries reached. Please try again later.");
        }
        //wait for 2 sec
        await new Promise((resolve) => setTimeout(resolve,2000));

        return PollForEnhancedImage(taskId, retries+1);
    }
    console.log("Enhanced image URL : ",result);
    return result;
}



//{status: 200, message: 'success', data: {…}}
// data
// : 
// {task_id: '686dc59d-8ba7-4447-a975-1f8a8521f891'}
// message
// : 
// "success"
// status
// : 
// 200
// [[Prototype]]
// : 
// Object