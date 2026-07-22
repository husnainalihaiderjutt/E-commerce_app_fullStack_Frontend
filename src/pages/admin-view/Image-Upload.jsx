import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input';
import { useEffect, useRef } from 'react'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from "sonner"

const ProductImageUpload = ({imageLoadingState,setImageLoadingState,imageFile,setImageFile,uploadedImageUrl,setUploadedImageUrl}) => {
const inputRef=useRef(null);

const handleImageFileChange = (e)=>{
    const selectedFile = e.target.files?.[0];
    if(selectedFile) setImageFile(selectedFile);
}
const handleDrop = (e)=>{
    e.preventDefault()
}
const handleDragOver = (e)=>{
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if(droppedFile) setImageFile(droppedFile);
}
const handleRemoveImage = ()=>{
    setImageFile(null);
    if(inputRef.current){
        inputRef.current.value = ''
    }
}

async function uploadImageToCloudinary() {
    setImageLoadingState(true);

    const data = new FormData();
    data.append("my_file", imageFile);

    try {
        const response = await axios.post(
            "http://localhost:5000/api/admin/products/upload-image",
            data
        );

        if (response?.data?.success) {
            setUploadedImageUrl(response.data.result.url);
            toast.success("Image Uploaded Successfully", { position: "top-right" });
        }
    } catch (error) {
        toast.error("Error occurred while uploading image", { position: "top-right" });
    } finally {
        setImageLoadingState(false);
    }
}

useEffect(()=>{
    if(imageFile !==null) uploadImageToCloudinary()
},[imageFile])
return (
    <div className='w-full max-w-md mx-auto mb-4 '>
        <Label className="text-lg font-semibold mb-2 block">Upload Image </Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4 '>
            <Input id="image-upload" type='file'  ref={inputRef} onChange={handleImageFileChange} />
            { !imageFile ? <Label className='flex flex-col items-center justify-center h-32 cursor-pointer' htmlFor='image-upload'>
              <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2'/>
              <span>Drag & drop or click to Upload Image</span>
            </Label> :(
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                     <FileIcon className='w-7 h-8 text-primary mr-2'/>    
                </div>
                <p className='text-sm font-medium'>{imageFile.name}</p> 
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={handleRemoveImage}>
                     <XIcon className='w-4 h-4'/>
                     <span className='sr-only'>Remove File</span>
                </Button>       
            </div>)}
        </div>
    </div>
    
  )
}

export default ProductImageUpload