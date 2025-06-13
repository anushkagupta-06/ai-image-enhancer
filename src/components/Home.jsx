import { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import {enhancedImageAPI} from "../utils/enhanceImageApi";

export default function() {
    const [uploadImage, setUploadImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadImageHandler = async (file) => {
        setUploadImage(URL.createObjectURL(file));
        setLoading(true);
        //call the API to enhance the image
        try{
            const enhancedURL = await enhancedImageAPI(file);
            setEnhancedImage(enhancedURL);
            setLoading(false);
        } catch(error) {
            console.log(error);
            alert("Error while enhancing the image. Please try again later!")
        }
    }
    console.log(enhancedImage?.image);
    return(
        <div>
            <ImageUpload uploadImageHandler={uploadImageHandler}/>
            <ImagePreview loading={loading} uploaded={uploadImage} enhanced={enhancedImage?.image} />
        </div>
    );
}